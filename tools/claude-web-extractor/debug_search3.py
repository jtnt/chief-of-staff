#!/usr/bin/env python3
"""
Step-by-step debug of search logic with print statements.
"""

import sys
import ijson
from pathlib import Path
from datetime import datetime
from collections import defaultdict

sys.path.insert(0, str(Path(__file__).parent))

from config import CONFIDENCE_THRESHOLDS, SEARCH_SETTINGS
from utils.search import parse_keywords, extract_message_text_simple

# Paths
CONVERSATIONS_FILE = Path("/Users/jtnt/Documents/AI/Data Exports/claude data export 20260120 90 days/data-2026-01-20-11-36-38-batch-0000/conversations.json")
TARGET_UUID = "c7579b6e-484d-4154-94fc-18c190d3f50f"

keywords = ["lunch and learn"]
keyword_phrases = parse_keywords(keywords)

print(f"Keywords: {keywords}")
print(f"Parsed phrases: {keyword_phrases}")
print()

date_after = "2025-11-01"
date_before = "2026-01-31"
min_confidence = 0.1

print("Searching for target conversation...")
print()

with open(CONVERSATIONS_FILE, 'rb') as f:
    conversations = ijson.items(f, 'item')

    for conv in conversations:
        if conv.get('uuid') != TARGET_UUID:
            continue

        print(f"Found target conversation!")
        print(f"UUID: {conv.get('uuid')}")
        print(f"Name: {conv.get('name')}")
        print()

        # Step 1: Check date filtering
        print("Step 1: Date filtering")
        print("-" * 70)

        created_at = conv.get('created_at', '')
        print(f"Created at: {created_at}")

        try:
            created_date = datetime.fromisoformat(created_at.replace('Z', '+00:00'))
            print(f"Parsed created_date: {created_date}")

            # After date
            after_str = date_after
            if 'T' not in after_str:
                after_str += 'T00:00:00'
            after_date = datetime.fromisoformat(after_str.replace('Z', '+00:00'))
            print(f"After date: {after_date}")
            print(f"created_date < after_date: {created_date < after_date}")

            if created_date < after_date:
                print("✗ FILTERED OUT: Date before range")
                break

            # Before date
            before_str = date_before
            if 'T' not in before_str:
                before_str += 'T23:59:59'
            before_date = datetime.fromisoformat(before_str.replace('Z', '+00:00'))
            print(f"Before date: {before_date}")
            print(f"created_date > before_date: {created_date > before_date}")

            if created_date > before_date:
                print("✗ FILTERED OUT: Date after range")
                break

            print("✓ PASSED date filter")

        except Exception as e:
            print(f"✗ Date parsing error: {e}")
            import traceback
            traceback.print_exc()
            break

        print()

        # Step 2: Keyword scoring
        print("Step 2: Keyword scoring")
        print("-" * 70)

        title = conv.get('name', '').lower()
        summary = conv.get('summary', '').lower()

        print(f"Title (normalized): {title}")
        print(f"Summary preview: {summary[:200]}...")
        print()

        score = 0.0
        match_reasons = []

        for phrase_words in keyword_phrases:
            phrase_text = ' '.join(phrase_words)
            is_phrase = len(phrase_words) > 1

            print(f"Checking phrase: '{phrase_text}' (is_phrase={is_phrase})")
            print(f"  phrase in title: {phrase_text in title}")
            print(f"  phrase in summary: {phrase_text in summary}")

            if phrase_text in title:
                if is_phrase:
                    points = CONFIDENCE_THRESHOLDS['title_phrase_match']
                    score += points
                    reason = f'"{phrase_text}" in title (phrase)'
                    match_reasons.append(reason)
                    print(f"  ✓ Match in title (phrase): +{points} points")
                else:
                    points = CONFIDENCE_THRESHOLDS['title_word_match']
                    score += points
                    reason = f'"{phrase_text}" in title'
                    match_reasons.append(reason)
                    print(f"  ✓ Match in title: +{points} points")

            elif phrase_text in summary:
                if is_phrase:
                    points = CONFIDENCE_THRESHOLDS['summary_phrase_match']
                    score += points
                    reason = f'"{phrase_text}" in summary (phrase)'
                    match_reasons.append(reason)
                    print(f"  ✓ Match in summary (phrase): +{points} points")
                else:
                    points = CONFIDENCE_THRESHOLDS['summary_word_match']
                    score += points
                    reason = f'"{phrase_text}" in summary'
                    match_reasons.append(reason)
                    print(f"  ✓ Match in summary: +{points} points")
            else:
                print(f"  ✗ No match in title or summary")

            print()

        print(f"Total score: {score}")
        print(f"Min confidence: {min_confidence}")
        print(f"Pass threshold: {score >= min_confidence}")
        print()

        if score >= min_confidence:
            print("✓ CONVERSATION WOULD BE INCLUDED IN RESULTS")
        else:
            print("✗ CONVERSATION FILTERED OUT (score too low)")

        break
