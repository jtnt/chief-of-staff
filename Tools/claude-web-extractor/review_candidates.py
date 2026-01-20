#!/usr/bin/env python3
"""
Interactive review tool for confirming conversation search results.

Shows preview of each conversation and prompts for confirmation.
Saves confirmed UUIDs to file for extraction.
"""

import sys
import argparse
from pathlib import Path
from typing import Dict, List

# Add parent directory to path for imports
sys.path.insert(0, str(Path(__file__).parent))

from config import FILENAME_PATTERNS
from utils import (
    load_search_results,
    save_search_results,
    is_valid_uuid,
)


def display_conversation_preview(match: Dict, index: int, total: int):
    """Display conversation preview for review."""
    print("=" * 70)
    print(f"Conversation {index} of {total}")
    print("=" * 70)
    print()
    print(f"Name: {match['name']}")
    print(f"UUID: {match['uuid']}")
    print(f"Date: {match['created_at'][:10]}")
    print(f"Messages: {match['message_count']}")
    print(f"Confidence: {match['confidence']:.3f}")
    print()
    print("Match reasons:")
    for reason in match['match_reasons']:
        print(f"  - {reason}")
    print()

    # Show summary preview
    if match.get('summary_preview'):
        print("Summary (preview):")
        print(match['summary_preview'])
        print()

    # Show first message preview
    if match.get('first_message_preview'):
        print("First message (preview):")
        print(match['first_message_preview'])
        print()


def get_user_decision() -> str:
    """Get user decision for current conversation."""
    while True:
        response = input("Include this conversation? [y/n/skip/add-manual/quit]: ").strip().lower()

        if response in ['y', 'yes']:
            return 'confirm'
        elif response in ['n', 'no']:
            return 'reject'
        elif response in ['s', 'skip']:
            return 'skip'
        elif response in ['a', 'add', 'add-manual']:
            return 'add-manual'
        elif response in ['q', 'quit', 'exit']:
            return 'quit'
        else:
            print("Invalid response. Please enter: y, n, skip, add-manual, or quit")


def add_manual_uuid(confirmed_uuids: List[str]) -> bool:
    """Prompt user to manually add a UUID."""
    print()
    print("Enter UUID to add manually (or 'cancel' to go back):")
    uuid_input = input("UUID: ").strip()

    if uuid_input.lower() in ['cancel', 'c', '']:
        return False

    if not is_valid_uuid(uuid_input):
        print(f"Error: Invalid UUID format: {uuid_input}")
        return False

    if uuid_input in confirmed_uuids:
        print(f"UUID already confirmed: {uuid_input}")
        return True

    confirmed_uuids.append(uuid_input)
    print(f"✓ Added UUID: {uuid_input}")
    return True


def main():
    parser = argparse.ArgumentParser(
        description='Interactive review of conversation search results',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Usage:
  1. Run find_conversations.py to generate candidates.json
  2. Run this script to review and confirm matches
  3. Use confirmed_uuids.txt with extract_conversations.py

Example:
  %(prog)s --candidates ./SalesIntel/candidates.json

Interactive commands:
  y / yes        - Confirm this conversation
  n / no         - Reject this conversation
  skip           - Skip for now (decide later)
  add-manual     - Manually enter a UUID to add
  quit           - Save progress and exit
        """
    )

    parser.add_argument(
        '--candidates',
        type=Path,
        required=True,
        help='Path to candidates.json from find_conversations.py'
    )
    parser.add_argument(
        '--output-file',
        type=Path,
        help='Output file for confirmed UUIDs (default: confirmed_uuids.txt in same directory)'
    )
    parser.add_argument(
        '--resume',
        action='store_true',
        help='Resume from previous session (uses confirmation status in candidates.json)'
    )

    args = parser.parse_args()

    # Validate candidates file
    if not args.candidates.exists():
        print(f"Error: Candidates file not found: {args.candidates}", file=sys.stderr)
        sys.exit(1)

    # Load search results
    try:
        data = load_search_results(args.candidates)
    except Exception as e:
        print(f"Error loading candidates: {e}", file=sys.stderr)
        sys.exit(1)

    matches = data['matches']
    search_params = data['search_params']

    # Determine output file
    if args.output_file:
        output_file = args.output_file
    else:
        output_dir = args.candidates.parent
        output_file = output_dir / FILENAME_PATTERNS['confirmed_uuids']

    # Initialize tracking
    confirmed_uuids = []
    rejected_uuids = []
    skipped_uuids = []

    # Resume from previous session
    if args.resume:
        for match in matches:
            if match.get('confirmed') is True:
                confirmed_uuids.append(match['uuid'])
            elif match.get('confirmed') is False:
                rejected_uuids.append(match['uuid'])
            elif match.get('confirmed') is None:
                skipped_uuids.append(match['uuid'])

        print(f"Resuming previous session:")
        print(f"  Already confirmed: {len(confirmed_uuids)}")
        print(f"  Already rejected: {len(rejected_uuids)}")
        print(f"  Remaining: {len(skipped_uuids)}")
        print()

    # Display search parameters
    print("=" * 70)
    print("REVIEW CONVERSATION CANDIDATES")
    print("=" * 70)
    print(f"Project: {search_params.get('project_name', 'Unknown')}")
    print(f"Keywords: {', '.join(search_params.get('keywords', []))}")
    print(f"Total candidates: {len(matches)}")
    print("=" * 70)
    print()

    # Review each conversation
    try:
        for idx, match in enumerate(matches, 1):
            # Skip if already reviewed (in resume mode)
            if args.resume and match.get('confirmed') is not None:
                continue

            # Display preview
            display_conversation_preview(match, idx, len(matches))

            # Get decision
            decision = get_user_decision()

            if decision == 'confirm':
                confirmed_uuids.append(match['uuid'])
                match['confirmed'] = True
                print("✓ Confirmed")
                print()

            elif decision == 'reject':
                rejected_uuids.append(match['uuid'])
                match['confirmed'] = False
                print("✗ Rejected")
                print()

            elif decision == 'skip':
                skipped_uuids.append(match['uuid'])
                match['confirmed'] = None
                print("⊘ Skipped")
                print()

            elif decision == 'add-manual':
                add_manual_uuid(confirmed_uuids)
                # Don't mark current conversation - ask again
                idx -= 1
                continue

            elif decision == 'quit':
                print("\nSaving progress and exiting...")
                break

            # Save progress after each decision
            save_search_results(args.candidates, matches, search_params)

    except KeyboardInterrupt:
        print("\n\nInterrupted. Saving progress...")

    # Final save
    save_search_results(args.candidates, matches, search_params)

    # Save confirmed UUIDs to file
    if confirmed_uuids:
        output_file.write_text('\n'.join(confirmed_uuids) + '\n', encoding='utf-8')
        print(f"\nConfirmed UUIDs saved to: {output_file}")

    # Print summary
    print()
    print("=" * 70)
    print("REVIEW SUMMARY")
    print("=" * 70)
    print(f"Confirmed: {len(confirmed_uuids)}")
    print(f"Rejected: {len(rejected_uuids)}")
    print(f"Skipped: {len(skipped_uuids)}")
    print(f"Total reviewed: {len(confirmed_uuids) + len(rejected_uuids) + len(skipped_uuids)}")
    print("=" * 70)
    print()

    if confirmed_uuids:
        print("Next steps:")
        print(f"  Extract conversations: python3 extract_conversations.py \\")
        print(f"    --uuids-file {output_file} \\")
        print(f"    --output-dir [output_directory]")
        print()

    if skipped_uuids:
        print(f"To resume review later:")
        print(f"  python3 review_candidates.py --candidates {args.candidates} --resume")
        print()


if __name__ == '__main__':
    main()
