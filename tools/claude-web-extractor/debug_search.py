#!/usr/bin/env python3
"""
Debug script to understand why search is returning 0 results.
"""

import sys
import ijson
from pathlib import Path
from datetime import datetime

# Paths
CONVERSATIONS_FILE = Path("/Users/jtnt/Documents/AI/Data Exports/claude data export 20260120 90 days/data-2026-01-20-11-36-38-batch-0000/conversations.json")
TARGET_UUID = "c7579b6e-484d-4154-94fc-18c190d3f50f"  # First SalesIntel UUID

print("Debug: Checking conversations.json structure and search logic")
print("=" * 70)
print()

# Test 1: Can we parse the file with ijson?
print("Test 1: Streaming JSON parsing")
print("-" * 70)
count = 0
found_target = False

with open(CONVERSATIONS_FILE, 'rb') as f:
    conversations = ijson.items(f, 'item')

    for conv in conversations:
        count += 1

        if conv.get('uuid') == TARGET_UUID:
            found_target = True
            print(f"✓ Found target UUID at position {count}")
            print(f"  Name: {conv.get('name')}")
            print(f"  Created: {conv.get('created_at')}")
            print(f"  Summary preview: {conv.get('summary', '')[:100]}...")
            print()
            break

        if count % 100 == 0:
            print(f"  Processed {count} conversations...")

print(f"Total conversations processed: {count}")
print(f"Target found: {found_target}")
print()

# Test 2: Check date parsing
print("Test 2: Date filtering")
print("-" * 70)

if found_target:
    with open(CONVERSATIONS_FILE, 'rb') as f:
        conversations = ijson.items(f, 'item')

        for conv in conversations:
            if conv.get('uuid') == TARGET_UUID:
                created_at = conv.get('created_at')
                print(f"Created at (raw): {created_at}")

                # Test date parsing
                try:
                    created_date = datetime.fromisoformat(created_at.replace('Z', '+00:00'))
                    print(f"Parsed date: {created_date}")
                    print(f"Date only: {created_date.strftime('%Y-%m-%d')}")

                    # Test date comparison
                    date_after = "2025-11-01"
                    date_before = "2026-01-31"

                    after_date = datetime.fromisoformat(date_after + "T00:00:00+00:00")
                    before_date = datetime.fromisoformat(date_before + "T23:59:59+00:00")

                    print()
                    print(f"Filtering with:")
                    print(f"  After: {date_after} ({after_date})")
                    print(f"  Before: {date_before} ({before_date})")
                    print()

                    if created_date < after_date:
                        print(f"✗ Would be filtered out: created_date < after_date")
                    elif created_date > before_date:
                        print(f"✗ Would be filtered out: created_date > before_date")
                    else:
                        print(f"✓ Would pass date filter")

                except Exception as e:
                    print(f"✗ Date parsing error: {e}")

                break
print()

# Test 3: Check keyword matching
print("Test 3: Keyword matching")
print("-" * 70)

keywords = ["manoj ramnani", "lunch and learn"]

if found_target:
    with open(CONVERSATIONS_FILE, 'rb') as f:
        conversations = ijson.items(f, 'item')

        for conv in conversations:
            if conv.get('uuid') == TARGET_UUID:
                title = conv.get('name', '').lower()
                summary = conv.get('summary', '').lower()

                print(f"Title: {conv.get('name')}")
                print(f"Title (lowercase): {title}")
                print()
                print(f"Summary preview: {conv.get('summary', '')[:200]}...")
                print()

                for keyword in keywords:
                    keyword_lower = keyword.lower()
                    in_title = keyword_lower in title
                    in_summary = keyword_lower in summary

                    print(f"Keyword '{keyword}':")
                    print(f"  In title: {in_title}")
                    print(f"  In summary: {in_summary}")
                    print()

                break
