#!/usr/bin/env python3
"""
Debug script with full search logic to see where it's failing.
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

from utils.search import search_conversations

# Paths
CONVERSATIONS_FILE = Path("/Users/jtnt/Documents/AI/Data Exports/claude data export 20260120 90 days/data-2026-01-20-11-36-38-batch-0000/conversations.json")

# Simple test with just one keyword
keywords = ["lunch and learn"]

print("Testing search with single keyword: 'lunch and learn'")
print("Date range: 2025-11-01 to 2026-01-31")
print("Min confidence: 0.1 (very low to catch everything)")
print()

try:
    matches = search_conversations(
        CONVERSATIONS_FILE,
        keywords,
        date_after="2025-11-01",
        date_before="2026-01-31",
        min_confidence=0.1,
        calculate_penalties=False
    )

    print(f"Found {len(matches)} matches")

    if matches:
        print()
        print("Top 5 matches:")
        for i, match in enumerate(matches[:5], 1):
            print(f"{i}. {match['name']}")
            print(f"   UUID: {match['uuid']}")
            print(f"   Confidence: {match['confidence']}")
            print(f"   Match reasons: {match['match_reasons']}")
            print()
    else:
        print("No matches found!")
        print()
        print("This suggests an issue with the search logic.")

except Exception as e:
    print(f"Error during search: {e}")
    import traceback
    traceback.print_exc()
