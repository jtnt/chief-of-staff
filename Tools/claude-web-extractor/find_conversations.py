#!/usr/bin/env python3
"""
Find conversations in Claude.ai data export using keyword search.

Uses streaming JSON parser for memory efficiency and confidence scoring
to rank matches. Supports interactive mode with guided prompts.
"""

import sys
import argparse
from pathlib import Path
from typing import List
from datetime import datetime
from tqdm import tqdm

# Add parent directory to path for imports
sys.path.insert(0, str(Path(__file__).parent))

from config import (
    get_conversations_json_path,
    CONFIDENCE_THRESHOLDS,
    FILENAME_PATTERNS
)
from utils import (
    validate_output_directory,
    search_conversations,
    save_search_results,
)


def interactive_mode():
    """Interactive mode with prompts for search parameters."""
    print("=" * 70)
    print("INTERACTIVE CONVERSATION SEARCH")
    print("=" * 70)
    print()

    # Project name
    project_name = input("Project name (optional, for reference): ").strip()

    # Keywords
    print("\nKeywords:")
    print("  Enter project-SPECIFIC keywords that uniquely identify conversations.")
    print("  Good: proper names, specific phrases, unique deliverables")
    print("  Bad: generic company names, common terms like 'AI' or 'training'")
    print()
    print("  Example for SalesIntel project:")
    print("    manoj ramnani, lunch and learn at salesintel, sko presentation")
    print()

    keywords_input = input("Keywords (comma or space separated): ").strip()
    if not keywords_input:
        print("Error: Must provide at least one keyword")
        sys.exit(1)

    # Parse keywords (split by comma or space)
    if ',' in keywords_input:
        keywords = [k.strip() for k in keywords_input.split(',') if k.strip()]
    else:
        keywords = [k.strip() for k in keywords_input.split() if k.strip()]

    # Date range
    print("\nDate range (optional):")
    print("  Format: YYYY-MM-DD or YYYY-MM-DDTHH:MM:SS")
    print("  Leave blank to skip date filtering")
    print()

    date_after = input("  Created after (date): ").strip() or None
    date_before = input("  Created before (date): ").strip() or None

    # Confidence threshold
    print("\nConfidence threshold:")
    print(f"  Default: {CONFIDENCE_THRESHOLDS['minimum_confidence']}")
    print("  Lower = more results (may include false positives)")
    print("  Higher = fewer results (may miss some conversations)")
    print()

    threshold_input = input(f"  Minimum confidence (0.0-1.0, default {CONFIDENCE_THRESHOLDS['minimum_confidence']}): ").strip()
    if threshold_input:
        try:
            min_confidence = float(threshold_input)
        except ValueError:
            print(f"Invalid threshold, using default: {CONFIDENCE_THRESHOLDS['minimum_confidence']}")
            min_confidence = CONFIDENCE_THRESHOLDS['minimum_confidence']
    else:
        min_confidence = CONFIDENCE_THRESHOLDS['minimum_confidence']

    # Output directory
    print("\nOutput directory:")
    print("  Where to save candidates.json with search results")
    print()

    output_input = input("  Output directory (default: current directory): ").strip()
    output_dir = Path(output_input) if output_input else Path.cwd()

    # Data source
    print("\nData source:")
    print("  Leave blank to auto-detect latest export")
    print()

    data_input = input("  Path to conversations.json (optional): ").strip()
    conversations_file = Path(data_input) if data_input else None

    return {
        'project_name': project_name,
        'keywords': keywords,
        'date_after': date_after,
        'date_before': date_before,
        'min_confidence': min_confidence,
        'output_dir': output_dir,
        'conversations_file': conversations_file,
    }


def main():
    parser = argparse.ArgumentParser(
        description='Find conversations using keyword search',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Interactive mode (guided prompts)
  %(prog)s --interactive

  # Search with good specific keywords
  %(prog)s --project-name "SalesIntel" \\
           --keywords "manoj ramnani" "lunch and learn at salesintel" "sko presentation" \\
           --date-after "2025-11-01" \\
           --date-before "2026-01-31" \\
           --output-dir "./SalesIntel/Claude.ai Chats"

  # Search with date range only
  %(prog)s --keywords "client presentation" \\
           --date-after "2025-12-01" \\
           --min-confidence 0.4

Keyword Selection Tips:
  GOOD keywords (specific to this project):
    - Proper names: "manoj ramnani" "mike levy"
    - Specific events: "december 3 presentation" "lunch and learn"
    - Unique phrases: "salesintel lunch and learn" (not just "salesintel")
    - Project deliverables: "taco framework" "run of show"

  BAD keywords (too generic):
    - Company names alone: "salesintel" "razzo"
    - Common terms: "AI" "training" "presentation"
    - Your own name: "nicholas"

  Strategy:
    1. Start with 3-5 highly specific keywords
    2. Review results to gauge quality
    3. Adjust confidence threshold or add more keywords as needed
        """
    )

    # Interactive mode
    parser.add_argument(
        '--interactive',
        action='store_true',
        help='Interactive mode with guided prompts'
    )

    # Search parameters
    parser.add_argument(
        '--project-name',
        help='Project name (for reference only)'
    )
    parser.add_argument(
        '--keywords',
        nargs='+',
        help='Keywords or phrases to search for (space-separated, or use quotes for phrases)'
    )
    parser.add_argument(
        '--date-after',
        help='Filter: created after this date (YYYY-MM-DD or ISO format)'
    )
    parser.add_argument(
        '--date-before',
        help='Filter: created before this date (YYYY-MM-DD or ISO format)'
    )
    parser.add_argument(
        '--min-confidence',
        type=float,
        help=f'Minimum confidence score (default: {CONFIDENCE_THRESHOLDS["minimum_confidence"]})'
    )

    # Exclusions
    parser.add_argument(
        '--exclude-uuids',
        type=Path,
        help='File with UUIDs to exclude (one per line)'
    )

    # Data source
    parser.add_argument(
        '--conversations-file',
        type=Path,
        help='Path to conversations.json (auto-detects if not provided)'
    )

    # Output
    parser.add_argument(
        '--output-dir',
        type=Path,
        help='Output directory for candidates.json (default: current directory)'
    )

    # Options
    parser.add_argument(
        '--no-penalties',
        action='store_true',
        help='Skip generic term penalty calculation'
    )

    args = parser.parse_args()

    # Interactive mode
    if args.interactive:
        params = interactive_mode()
        project_name = params['project_name']
        keywords = params['keywords']
        date_after = params['date_after']
        date_before = params['date_before']
        min_confidence = params['min_confidence']
        output_dir = params['output_dir']
        conversations_file = params['conversations_file']
    else:
        # Command line mode
        if not args.keywords:
            parser.error("--keywords required (or use --interactive)")

        project_name = args.project_name or "Unknown Project"
        keywords = args.keywords
        date_after = args.date_after
        date_before = args.date_before
        min_confidence = args.min_confidence or CONFIDENCE_THRESHOLDS['minimum_confidence']
        output_dir = args.output_dir or Path.cwd()
        conversations_file = args.conversations_file

    # Validate output directory
    try:
        validate_output_directory(output_dir, create=True)
    except ValueError as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)

    # Determine conversations.json path
    if not conversations_file:
        conversations_file = get_conversations_json_path()
        if not conversations_file:
            print(
                "Error: Could not find conversations.json\n"
                "  Use --conversations-file to specify location",
                file=sys.stderr
            )
            sys.exit(1)

    if not conversations_file.exists():
        print(f"Error: Conversations file not found: {conversations_file}", file=sys.stderr)
        sys.exit(1)

    # Load exclude UUIDs
    exclude_uuids = set()
    if args.exclude_uuids and args.exclude_uuids.exists():
        with open(args.exclude_uuids, 'r') as f:
            exclude_uuids = {line.strip() for line in f if line.strip()}
        print(f"Excluding {len(exclude_uuids)} UUIDs from search")

    # Print search parameters
    print("=" * 70)
    print("CONVERSATION SEARCH")
    print("=" * 70)
    print(f"Project: {project_name}")
    print(f"Keywords: {', '.join(keywords)}")
    if date_after:
        print(f"After: {date_after}")
    if date_before:
        print(f"Before: {date_before}")
    print(f"Min confidence: {min_confidence}")
    print(f"Data source: {conversations_file}")
    print(f"Output: {output_dir}")
    print("=" * 70)
    print()

    # Progress callback
    pbar = None

    def progress_callback(processed, final=False):
        nonlocal pbar
        if pbar is None:
            pbar = tqdm(desc="Searching conversations", unit=" convs")
        if final:
            pbar.close()
        else:
            pbar.update(1)

    # Run search
    try:
        print("Searching conversations...")
        matches = search_conversations(
            conversations_file,
            keywords,
            date_after=date_after,
            date_before=date_before,
            min_confidence=min_confidence,
            exclude_uuids=exclude_uuids,
            calculate_penalties=not args.no_penalties,
            progress_callback=progress_callback
        )

        print(f"\nFound {len(matches)} conversations matching criteria")

        if not matches:
            print("\nNo matches found. Try:")
            print("  - Using more specific keywords")
            print("  - Lowering confidence threshold")
            print("  - Expanding date range")
            sys.exit(0)

        # Save results
        candidates_file = output_dir / FILENAME_PATTERNS['candidates']

        search_params = {
            'project_name': project_name,
            'keywords': keywords,
            'date_after': date_after,
            'date_before': date_before,
            'min_confidence': min_confidence,
            'excluded_count': len(exclude_uuids),
        }

        save_search_results(candidates_file, matches, search_params)

        print(f"\nResults saved to: {candidates_file}")
        print()

        # Show top 5 matches
        print("Top 5 matches:")
        print("-" * 70)
        for i, match in enumerate(matches[:5], 1):
            print(f"{i}. {match['name']}")
            print(f"   UUID: {match['uuid']}")
            print(f"   Date: {match['created_at'][:10]}")
            print(f"   Messages: {match['message_count']}")
            print(f"   Confidence: {match['confidence']:.3f}")
            print(f"   Match reasons: {', '.join(match['match_reasons'][:3])}")
            print()

        print("=" * 70)
        print("Next steps:")
        print(f"  1. Review results: cat {candidates_file}")
        print(f"  2. Interactive review: python3 review_candidates.py --candidates {candidates_file}")
        print(f"  3. Or extract directly: python3 extract_conversations.py --uuids-file confirmed_uuids.txt")
        print("=" * 70)

    except Exception as e:
        print(f"\nError during search: {e}", file=sys.stderr)
        import traceback
        traceback.print_exc()
        sys.exit(1)


if __name__ == '__main__':
    main()
