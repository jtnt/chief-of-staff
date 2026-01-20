"""
Search utilities for finding conversations in Claude.ai data exports.
"""

import ijson
import json
from pathlib import Path
from typing import Dict, List, Set, Tuple, Any
from datetime import datetime
from collections import defaultdict

from config import (
    CONFIDENCE_THRESHOLDS,
    SEARCH_SETTINGS,
    GENERIC_TERM_THRESHOLD
)


def normalize_text(text: str) -> str:
    """Normalize text for searching (lowercase, strip)."""
    return text.lower().strip()


def extract_message_text_simple(content: List[Dict]) -> str:
    """Extract text from message content array (simplified)."""
    text_parts = []
    for item in content:
        if isinstance(item, dict) and item.get('type') == 'text':
            text_parts.append(item.get('text', ''))
    return ' '.join(text_parts)


def parse_keywords(keywords: List[str]) -> List[List[str]]:
    """
    Parse keywords into phrase lists.

    "manoj ramnani" -> ["manoj", "ramnani"] (phrase)
    "salesintel" -> ["salesintel"] (single word)

    Args:
        keywords: List of keyword strings (may contain phrases)

    Returns:
        List of word lists (each inner list is a phrase)
    """
    parsed = []
    for keyword in keywords:
        words = normalize_text(keyword).split()
        if words:
            parsed.append(words)
    return parsed


def calculate_generic_term_penalty(
    conversations_file: Path,
    keywords: List[str],
    sample_size: int = 100
) -> Dict[str, float]:
    """
    Calculate penalty for generic terms that appear too frequently.

    Args:
        conversations_file: Path to conversations.json
        keywords: List of keywords to check
        sample_size: Number of conversations to sample

    Returns:
        Dict mapping keyword -> penalty factor (0.0 to 1.0)
    """
    # Count how many conversations contain each keyword
    keyword_counts = defaultdict(int)
    total_sampled = 0

    with open(conversations_file, 'rb') as f:
        conversations = ijson.items(f, 'item')

        for conv in conversations:
            if total_sampled >= sample_size:
                break

            # Check title and summary
            search_text = normalize_text(
                conv.get('name', '') + ' ' + conv.get('summary', '')
            )

            for keyword in keywords:
                if normalize_text(keyword) in search_text:
                    keyword_counts[keyword] += 1

            total_sampled += 1

    # Calculate penalties
    penalties = {}
    for keyword in keywords:
        frequency = keyword_counts[keyword] / total_sampled if total_sampled > 0 else 0

        if frequency > GENERIC_TERM_THRESHOLD:
            # Linear penalty: 1.0 at threshold, down to 0.5 at 50% frequency
            penalty = max(0.5, 1.0 - (frequency - GENERIC_TERM_THRESHOLD) * 2)
            penalties[keyword] = penalty
        else:
            penalties[keyword] = 1.0  # No penalty

    return penalties


def score_conversation(
    conversation: Dict,
    keyword_phrases: List[List[str]],
    date_after: str = None,
    date_before: str = None,
    generic_penalties: Dict[str, float] = None
) -> Tuple[float, List[str]]:
    """
    Calculate confidence score for a conversation matching keywords.

    Args:
        conversation: Conversation dict
        keyword_phrases: List of keyword phrase word lists
        date_after: Filter: created after this date (ISO format)
        date_before: Filter: created before this date (ISO format)
        generic_penalties: Optional dict of keyword -> penalty factor

    Returns:
        Tuple of (confidence_score, match_reasons)
    """
    title = normalize_text(conversation.get('name', ''))
    summary = normalize_text(conversation.get('summary', ''))
    created_at = conversation.get('created_at', '')

    score = 0.0
    match_reasons = []
    matched_phrases = set()

    # Date filtering (required)
    if date_after or date_before:
        try:
            created_date = datetime.fromisoformat(created_at.replace('Z', '+00:00'))

            if date_after:
                # Handle date-only strings by adding time component and timezone
                after_str = date_after
                if 'T' not in after_str:
                    after_str += 'T00:00:00+00:00'
                after_date = datetime.fromisoformat(after_str.replace('Z', '+00:00'))
                if created_date < after_date:
                    return 0.0, ['Date before range']

            if date_before:
                # Handle date-only strings by adding time component and timezone
                before_str = date_before
                if 'T' not in before_str:
                    before_str += 'T23:59:59+00:00'
                before_date = datetime.fromisoformat(before_str.replace('Z', '+00:00'))
                if created_date > before_date:
                    return 0.0, ['Date after range']
        except Exception as e:
            # Can't parse date - skip this conversation
            return 0.0, [f'Invalid date format: {str(e)}']

    # Score each keyword phrase
    for phrase_words in keyword_phrases:
        phrase_text = ' '.join(phrase_words)
        is_phrase = len(phrase_words) > 1

        # Check title
        if phrase_text in title:
            if is_phrase:
                score += CONFIDENCE_THRESHOLDS['title_phrase_match']
                match_reasons.append(f'"{phrase_text}" in title (phrase)')
                matched_phrases.add(phrase_text)
            else:
                score += CONFIDENCE_THRESHOLDS['title_word_match']
                match_reasons.append(f'"{phrase_text}" in title')
                matched_phrases.add(phrase_text)

        # Check summary
        elif phrase_text in summary:
            if is_phrase:
                score += CONFIDENCE_THRESHOLDS['summary_phrase_match']
                match_reasons.append(f'"{phrase_text}" in summary (phrase)')
                matched_phrases.add(phrase_text)
            else:
                score += CONFIDENCE_THRESHOLDS['summary_word_match']
                match_reasons.append(f'"{phrase_text}" in summary')
                matched_phrases.add(phrase_text)

    # Check first N messages for content matches
    messages = conversation.get('chat_messages', [])
    if isinstance(messages, dict):
        messages = list(messages.values())

    content_matches = 0
    preview_count = SEARCH_SETTINGS['message_preview_count']

    for msg in messages[:preview_count]:
        content = extract_message_text_simple(msg.get('content', []))
        content_text = normalize_text(content)

        for phrase_words in keyword_phrases:
            phrase_text = ' '.join(phrase_words)
            if phrase_text in content_text:
                content_matches += 1
                if phrase_text not in matched_phrases:
                    matched_phrases.add(phrase_text)
                break  # Count each message once

    if content_matches > 0:
        content_score = min(
            content_matches * CONFIDENCE_THRESHOLDS['content_match'],
            CONFIDENCE_THRESHOLDS['content_match_cap']
        )
        score += content_score
        match_reasons.append(f'{content_matches} matches in first {preview_count} messages')

    # Apply generic term penalties
    if generic_penalties and matched_phrases:
        for phrase in matched_phrases:
            if phrase in generic_penalties:
                penalty = generic_penalties[phrase]
                if penalty < 1.0:
                    old_score = score
                    score *= penalty
                    match_reasons.append(f'Generic term penalty: {phrase} ({penalty:.2f}x)')

    # Bonus for multiple different keyword phrases
    if len(matched_phrases) > 1:
        bonus = 0.1 * (len(matched_phrases) - 1)
        score += bonus
        match_reasons.append(f'Multiple keywords matched: {len(matched_phrases)}')

    return score, match_reasons


def search_conversations(
    conversations_file: Path,
    keywords: List[str],
    date_after: str = None,
    date_before: str = None,
    min_confidence: float = None,
    exclude_uuids: Set[str] = None,
    calculate_penalties: bool = True,
    progress_callback = None
) -> List[Dict]:
    """
    Search conversations using streaming JSON parser.

    Args:
        conversations_file: Path to conversations.json
        keywords: List of keywords/phrases to search for
        date_after: Filter: created after (ISO date)
        date_before: Filter: created before (ISO date)
        min_confidence: Minimum confidence score to include
        exclude_uuids: Set of UUIDs to exclude from results
        calculate_penalties: Whether to calculate generic term penalties
        progress_callback: Optional function to call with progress updates

    Returns:
        List of conversation match dicts with scores
    """
    if min_confidence is None:
        min_confidence = CONFIDENCE_THRESHOLDS['minimum_confidence']

    if exclude_uuids is None:
        exclude_uuids = set()

    # Parse keywords into phrases
    keyword_phrases = parse_keywords(keywords)

    # Calculate generic term penalties
    generic_penalties = None
    if calculate_penalties:
        generic_penalties = calculate_generic_term_penalty(
            conversations_file,
            keywords
        )

    matches = []
    processed = 0
    batch_size = SEARCH_SETTINGS['batch_size']

    with open(conversations_file, 'rb') as f:
        conversations = ijson.items(f, 'item')

        for conv in conversations:
            processed += 1

            # Progress callback
            if progress_callback and processed % batch_size == 0:
                progress_callback(processed)

            # Skip excluded UUIDs
            uuid = conv.get('uuid')
            if uuid in exclude_uuids:
                continue

            # Score conversation
            score, match_reasons = score_conversation(
                conv,
                keyword_phrases,
                date_after,
                date_before,
                generic_penalties
            )

            # Add to matches if score meets threshold
            if score >= min_confidence:
                # Get message count
                messages = conv.get('chat_messages', [])
                message_count = len(messages) if isinstance(messages, list) else len(messages.values())

                # Get summary preview
                summary = conv.get('summary', '')
                summary_preview = (
                    summary[:SEARCH_SETTINGS['summary_preview_length']] + '...'
                    if len(summary) > SEARCH_SETTINGS['summary_preview_length']
                    else summary
                )

                # Get first message preview
                first_message = ''
                if isinstance(messages, list) and len(messages) > 0:
                    first_message = extract_message_text_simple(messages[0].get('content', []))
                elif isinstance(messages, dict) and len(messages) > 0:
                    first_msg = list(messages.values())[0]
                    first_message = extract_message_text_simple(first_msg.get('content', []))

                first_message_preview = (
                    first_message[:SEARCH_SETTINGS['message_preview_length']] + '...'
                    if len(first_message) > SEARCH_SETTINGS['message_preview_length']
                    else first_message
                )

                matches.append({
                    'uuid': uuid,
                    'name': conv.get('name'),
                    'created_at': conv.get('created_at'),
                    'updated_at': conv.get('updated_at'),
                    'message_count': message_count,
                    'confidence': round(score, 3),
                    'match_reasons': match_reasons,
                    'summary_preview': summary_preview,
                    'first_message_preview': first_message_preview,
                    'confirmed': None  # For review process
                })

    # Final progress callback
    if progress_callback:
        progress_callback(processed, final=True)

    # Sort by confidence (highest first)
    matches.sort(key=lambda x: x['confidence'], reverse=True)

    return matches


def load_search_results(candidates_file: Path) -> Dict:
    """
    Load search results from candidates.json.

    Args:
        candidates_file: Path to candidates.json

    Returns:
        Dict with search_params and matches
    """
    with open(candidates_file, 'r', encoding='utf-8') as f:
        return json.load(f)


def save_search_results(
    candidates_file: Path,
    matches: List[Dict],
    search_params: Dict
) -> None:
    """
    Save search results to candidates.json.

    Args:
        candidates_file: Path to save candidates.json
        matches: List of conversation match dicts
        search_params: Dict of search parameters used
    """
    data = {
        'search_params': search_params,
        'search_timestamp': datetime.now().isoformat(),
        'total_matches': len(matches),
        'matches': matches
    }

    with open(candidates_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


def update_match_confirmation(
    candidates_file: Path,
    uuid: str,
    confirmed: bool
) -> None:
    """
    Update confirmation status for a match in candidates.json.

    Args:
        candidates_file: Path to candidates.json
        uuid: UUID of conversation to update
        confirmed: True/False/None for confirmation status
    """
    data = load_search_results(candidates_file)

    for match in data['matches']:
        if match['uuid'] == uuid:
            match['confirmed'] = confirmed
            break

    save_search_results(
        candidates_file,
        data['matches'],
        data['search_params']
    )
