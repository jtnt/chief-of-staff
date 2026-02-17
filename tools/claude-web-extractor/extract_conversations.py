#!/usr/bin/env python3
"""
Extract specific conversations from Claude.ai data export.
Converts JSON conversation data to structured markdown files.

Supports:
- Direct UUID input (command line or file)
- Project document extraction from projects.json
- Project metadata generation
- Memory-efficient streaming for large files
"""

import sys
import json
import argparse
from pathlib import Path
from typing import Dict, List, Any
import ijson

# Add parent directory to path for imports
sys.path.insert(0, str(Path(__file__).parent))

from config import (
    get_conversations_json_path,
    get_projects_json_path,
    FILENAME_PATTERNS
)
from utils import (
    load_uuids_from_file,
    validate_uuids,
    validate_output_directory,
    create_markdown_file,
    create_project_info_file,
    load_projects_json,
    find_project_by_id,
    extract_project_documents,
)


def extract_conversation_by_uuid(
    conversations_file: Path,
    uuid: str,
    use_streaming: bool = True
) -> Dict:
    """
    Extract a single conversation by UUID.

    Args:
        conversations_file: Path to conversations.json
        uuid: UUID to extract
        use_streaming: Use streaming parser for large files

    Returns:
        Conversation dict or None if not found
    """
    if use_streaming:
        with open(conversations_file, 'rb') as f:
            conversations = ijson.items(f, 'item')

            for conv in conversations:
                if conv.get('uuid') == uuid:
                    return conv
    else:
        with open(conversations_file, 'r', encoding='utf-8') as f:
            data = json.load(f)

        conversations = data if isinstance(data, list) else [data]

        for conv in conversations:
            if conv.get('uuid') == uuid:
                return conv

    return None


def extract_conversations(
    conversations_file: Path,
    conversation_uuids: List[str],
    output_dir: Path,
    project_id: str = None,
    projects_file: Path = None,
    use_streaming: bool = True
) -> Dict[str, Any]:
    """
    Extract specific conversations from Claude.ai export.

    Args:
        conversations_file: Path to conversations.json
        conversation_uuids: List of UUIDs to extract
        output_dir: Directory to save markdown files
        project_id: Optional project UUID for extracting project documents
        projects_file: Path to projects.json (required if project_id provided)
        use_streaming: Use streaming parser for large files

    Returns:
        Dict with extraction results and statistics
    """
    # Validate output directory
    validate_output_directory(output_dir, create=True)

    # Initialize results
    results = {
        'extracted': [],
        'not_found': [],
        'total_messages': 0,
        'project_info': None,
        'project_documents': []
    }

    # Extract project documents if project_id provided
    project = None
    if project_id and projects_file:
        print(f"\nLoading project information...")
        try:
            projects = load_projects_json(projects_file)
            project = find_project_by_id(projects, project_id)

            if project:
                print(f"Found project: {project.get('name')}")

                # Extract documents
                doc_files, doc_bytes = extract_project_documents(project, output_dir)

                if doc_files:
                    print(f"Extracted {len(doc_files)} project documents ({doc_bytes:,} bytes)")
                    results['project_documents'] = doc_files
                else:
                    print("No project documents to extract")

                results['project_info'] = project
            else:
                print(f"Warning: Project {project_id} not found in {projects_file}")
        except Exception as e:
            print(f"Error extracting project documents: {e}")

    # Extract conversations
    print(f"\nExtracting {len(conversation_uuids)} conversations...")
    print(f"Using {'streaming' if use_streaming else 'full-load'} parser")

    for idx, uuid in enumerate(conversation_uuids, 1):
        print(f"\n[{idx}/{len(conversation_uuids)}] Searching for {uuid}...")

        conversation = extract_conversation_by_uuid(
            conversations_file,
            uuid,
            use_streaming
        )

        if conversation:
            # Create markdown file
            filename = create_markdown_file(conversation, output_dir)

            # Get message count
            chat_messages = conversation.get('chat_messages', [])
            if isinstance(chat_messages, dict):
                msg_count = len(chat_messages)
            else:
                msg_count = len(chat_messages)

            results['extracted'].append({
                'uuid': uuid,
                'filename': filename,
                'title': conversation.get('name', 'Untitled'),
                'message_count': msg_count,
                'created_at': conversation.get('created_at', '')
            })
            results['total_messages'] += msg_count

            print(f"✓ {filename} ({msg_count} messages)")
        else:
            results['not_found'].append(uuid)
            print(f"✗ Not found: {uuid}")

    # Create project info file if we have project data
    if project and results['extracted']:
        print(f"\nCreating project info file...")
        info_file = create_project_info_file(
            project,
            output_dir,
            results['extracted'],
            results['project_documents']
        )
        print(f"✓ Created {info_file.name}")

    # Print summary
    print(f"\n{'='*70}")
    print(f"Extraction complete!")
    print(f"  Extracted: {len(results['extracted'])} conversations")
    print(f"  Not found: {len(results['not_found'])} conversations")
    print(f"  Total messages: {results['total_messages']}")
    if results['project_documents']:
        print(f"  Project documents: {len(results['project_documents'])}")
    print(f"  Output directory: {output_dir}")
    print(f"{'='*70}")

    return results


def main():
    parser = argparse.ArgumentParser(
        description='Extract conversations from Claude.ai data export',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Extract by direct UUIDs
  %(prog)s --uuids "abc-123" "def-456" --output-dir ./output

  # Extract from UUID file
  %(prog)s --uuids-file confirmed_uuids.txt --output-dir ./output

  # Extract with project documents
  %(prog)s --uuids-file uuids.txt \\
           --project-id "019b2735-40ef-77c5-9853-a829c7ebc819" \\
           --output-dir ./output

  # Use custom export location
  %(prog)s --uuids-file uuids.txt \\
           --data-export "/path/to/export" \\
           --output-dir ./output
        """
    )

    # Input sources
    parser.add_argument(
        '--uuids',
        nargs='+',
        help='List of conversation UUIDs to extract'
    )
    parser.add_argument(
        '--uuids-file',
        type=Path,
        help='File containing UUIDs (one per line)'
    )

    # Data source
    parser.add_argument(
        '--data-export',
        type=Path,
        help='Path to data export folder (auto-detects if not provided)'
    )
    parser.add_argument(
        '--conversations-file',
        type=Path,
        help='Path to conversations.json (overrides auto-detection)'
    )
    parser.add_argument(
        '--projects-file',
        type=Path,
        help='Path to projects.json (required if using --project-id)'
    )

    # Output
    parser.add_argument(
        '--output-dir',
        type=Path,
        required=True,
        help='Output directory for markdown files'
    )

    # Project extraction
    parser.add_argument(
        '--project-id',
        help='Project UUID to extract documents from'
    )

    # Options
    parser.add_argument(
        '--no-streaming',
        action='store_true',
        help='Load entire file instead of streaming (faster for small files)'
    )

    args = parser.parse_args()

    # Get UUIDs from command line or file
    uuids = args.uuids or []
    if args.uuids_file:
        try:
            file_uuids = load_uuids_from_file(args.uuids_file)
            uuids.extend(file_uuids)
        except (FileNotFoundError, ValueError) as e:
            print(f"Error loading UUIDs: {e}", file=sys.stderr)
            sys.exit(1)

    if not uuids:
        parser.error("Must provide --uuids or --uuids-file")

    # Validate UUIDs
    valid_uuids, invalid_uuids = validate_uuids(uuids)
    if invalid_uuids:
        print(f"Warning: {len(invalid_uuids)} invalid UUIDs (skipping them)")
        for uuid in invalid_uuids[:5]:
            print(f"  - {uuid}")
        if len(invalid_uuids) > 5:
            print(f"  ... and {len(invalid_uuids) - 5} more")

    if not valid_uuids:
        print("Error: No valid UUIDs provided", file=sys.stderr)
        sys.exit(1)

    # Determine conversations.json path
    if args.conversations_file:
        conversations_file = args.conversations_file
    elif args.data_export:
        conversations_file = args.data_export / 'conversations.json'
    else:
        conversations_file = get_conversations_json_path()
        if not conversations_file:
            print(
                "Error: Could not find conversations.json\n"
                "  Use --conversations-file or --data-export to specify location",
                file=sys.stderr
            )
            sys.exit(1)

    if not conversations_file.exists():
        print(f"Error: Conversations file not found: {conversations_file}", file=sys.stderr)
        sys.exit(1)

    # Determine projects.json path (if needed)
    projects_file = None
    if args.project_id:
        if args.projects_file:
            projects_file = args.projects_file
        elif args.data_export:
            projects_file = args.data_export / 'projects.json'
        else:
            projects_file = get_projects_json_path()

        if not projects_file or not projects_file.exists():
            print(
                "Error: Project ID provided but projects.json not found\n"
                "  Use --projects-file to specify location",
                file=sys.stderr
            )
            sys.exit(1)

    # Run extraction
    print(f"Data source: {conversations_file}")
    print(f"Output directory: {args.output_dir}")
    print(f"UUIDs to extract: {len(valid_uuids)}")

    try:
        results = extract_conversations(
            conversations_file,
            valid_uuids,
            args.output_dir,
            project_id=args.project_id,
            projects_file=projects_file,
            use_streaming=not args.no_streaming
        )

        # Exit with error if any conversations not found
        if results['not_found']:
            sys.exit(1)

    except Exception as e:
        print(f"\nError during extraction: {e}", file=sys.stderr)
        import traceback
        traceback.print_exc()
        sys.exit(1)


if __name__ == '__main__':
    main()
