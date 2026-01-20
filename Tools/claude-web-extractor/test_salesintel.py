#!/usr/bin/env python3
"""
Test script to validate search tool finds all 15 SalesIntel conversations.
"""

import sys
from pathlib import Path

# Add parent directory to path for imports
sys.path.insert(0, str(Path(__file__).parent))

from utils import search_conversations, load_uuids_from_file

# Known SalesIntel UUIDs (ground truth)
SALESINTEL_UUIDS_FILE = Path("/Users/jtnt/Documents/Projects/Clients/SalesIntel/Claude.ai Chats/salesintel_uuids.txt")

# Latest export
CONVERSATIONS_FILE = Path("/Users/jtnt/Documents/AI/Data Exports/claude data export 20260120 90 days/data-2026-01-20-11-36-38-batch-0000/conversations.json")

# Good keywords from plan
GOOD_KEYWORDS = [
    "manoj ramnani",
    "mike levy",
    "salesintel lunch and learn",
    "sko presentation",
    "december 3",
    "taco framework"
]

# Bad keywords (should produce false positives)
BAD_KEYWORDS = [
    "salesintel",
    "razzo",
    "AI training"
]

def test_with_good_keywords():
    """Test search with good specific keywords."""
    print("=" * 70)
    print("TEST 1: Search with GOOD keywords (specific, project-unique)")
    print("=" * 70)
    print(f"Keywords: {', '.join(GOOD_KEYWORDS)}")
    print()

    # Load known UUIDs
    known_uuids = set(load_uuids_from_file(SALESINTEL_UUIDS_FILE))
    print(f"Known SalesIntel conversations: {len(known_uuids)}")
    print()

    # Run search
    print("Searching...")
    matches = search_conversations(
        CONVERSATIONS_FILE,
        GOOD_KEYWORDS,
        date_after="2025-11-01",
        date_before="2026-01-31",
        min_confidence=0.5
    )

    print(f"\nFound {len(matches)} conversations")
    print()

    # Check how many of the known UUIDs were found
    found_uuids = {m['uuid'] for m in matches}
    known_found = found_uuids & known_uuids
    known_missed = known_uuids - found_uuids
    false_positives = found_uuids - known_uuids

    print(f"Results:")
    print(f"  Known conversations found: {len(known_found)}/{len(known_uuids)} ({len(known_found)/len(known_uuids)*100:.1f}%)")
    print(f"  Known conversations missed: {len(known_missed)}")
    print(f"  Potential false positives: {len(false_positives)}")
    print()

    if known_missed:
        print(f"Missed UUIDs:")
        for uuid in list(known_missed)[:5]:
            print(f"  - {uuid}")
        if len(known_missed) > 5:
            print(f"  ... and {len(known_missed) - 5} more")
        print()

    # Show top 5 matches
    print("Top 5 matches by confidence:")
    for i, match in enumerate(matches[:5], 1):
        is_known = "✓" if match['uuid'] in known_uuids else "?"
        print(f"{i}. [{is_known}] {match['name']}")
        print(f"   Confidence: {match['confidence']:.3f}")
        print(f"   Match reasons: {', '.join(match['match_reasons'][:2])}")
        print()

    success = len(known_found) == len(known_uuids)
    return success, known_found, known_missed, false_positives


def test_with_bad_keywords():
    """Test search with bad generic keywords (should show many false positives)."""
    print()
    print("=" * 70)
    print("TEST 2: Search with BAD keywords (generic, not project-specific)")
    print("=" * 70)
    print(f"Keywords: {', '.join(BAD_KEYWORDS)}")
    print("Expected: Many results, many false positives")
    print()

    # Run search
    print("Searching...")
    matches = search_conversations(
        CONVERSATIONS_FILE,
        BAD_KEYWORDS,
        date_after="2025-11-01",
        date_before="2026-01-31",
        min_confidence=0.5
    )

    print(f"\nFound {len(matches)} conversations")
    print("This demonstrates why generic keywords are problematic.")
    print()


def main():
    if not SALESINTEL_UUIDS_FILE.exists():
        print(f"Error: UUID file not found: {SALESINTEL_UUIDS_FILE}")
        sys.exit(1)

    if not CONVERSATIONS_FILE.exists():
        print(f"Error: Conversations file not found: {CONVERSATIONS_FILE}")
        sys.exit(1)

    # Test with good keywords
    success, known_found, known_missed, false_positives = test_with_good_keywords()

    # Test with bad keywords (demonstration only)
    test_with_bad_keywords()

    # Final verdict
    print()
    print("=" * 70)
    print("VALIDATION RESULT")
    print("=" * 70)
    if success:
        print("✓ SUCCESS: Search tool found all 15 known SalesIntel conversations")
        print(f"  Found: {len(known_found)}/15")
        print(f"  False positives: {len(false_positives)}")
    else:
        print("✗ PARTIAL SUCCESS: Search tool found most conversations")
        print(f"  Found: {len(known_found)}/15")
        print(f"  Missed: {len(known_missed)}/15")
        print(f"  False positives: {len(false_positives)}")
        print()
        print("Recommendations:")
        print("  - Lower confidence threshold")
        print("  - Add more keywords")
        print("  - Check date range includes all conversations")
    print("=" * 70)

    sys.exit(0 if success else 1)


if __name__ == '__main__':
    main()
