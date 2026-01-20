"""
Validation utilities for Claude.ai conversation extraction.
"""

import re
from pathlib import Path
from typing import List, Set, Tuple
import json


def is_valid_uuid(uuid_str: str) -> bool:
    """
    Check if string is a valid UUID format.

    Args:
        uuid_str: String to validate

    Returns:
        True if valid UUID format
    """
    uuid_pattern = re.compile(
        r'^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
        re.IGNORECASE
    )
    return bool(uuid_pattern.match(uuid_str.strip()))


def validate_uuids(uuids: List[str]) -> Tuple[List[str], List[str]]:
    """
    Validate a list of UUIDs.

    Args:
        uuids: List of UUID strings

    Returns:
        Tuple of (valid_uuids, invalid_uuids)
    """
    valid = []
    invalid = []

    for uuid in uuids:
        uuid = uuid.strip()
        if uuid:  # Skip empty lines
            if is_valid_uuid(uuid):
                valid.append(uuid)
            else:
                invalid.append(uuid)

    return valid, invalid


def load_uuids_from_file(file_path: Path) -> List[str]:
    """
    Load UUIDs from a text file (one per line).

    Args:
        file_path: Path to UUID file

    Returns:
        List of valid UUIDs

    Raises:
        FileNotFoundError: If file doesn't exist
        ValueError: If file contains invalid UUIDs
    """
    if not file_path.exists():
        raise FileNotFoundError(f"UUID file not found: {file_path}")

    with open(file_path, 'r', encoding='utf-8') as f:
        lines = [line.strip() for line in f if line.strip()]

    valid_uuids, invalid_uuids = validate_uuids(lines)

    if invalid_uuids:
        raise ValueError(
            f"Invalid UUIDs found in {file_path}:\n" +
            "\n".join(f"  - {uuid}" for uuid in invalid_uuids[:5]) +
            (f"\n  ... and {len(invalid_uuids) - 5} more" if len(invalid_uuids) > 5 else "")
        )

    return valid_uuids


def check_conversations_exist(
    conversations_file: Path,
    uuids: List[str],
    use_streaming: bool = True
) -> Tuple[Set[str], Set[str]]:
    """
    Check which UUIDs exist in conversations.json.

    Args:
        conversations_file: Path to conversations.json
        uuids: List of UUIDs to check
        use_streaming: Use streaming parser for large files

    Returns:
        Tuple of (found_uuids, missing_uuids)
    """
    uuid_set = set(uuids)
    found_uuids = set()

    if use_streaming:
        import ijson

        with open(conversations_file, 'rb') as f:
            # Parse conversations array
            conversations = ijson.items(f, 'item')

            for conv in conversations:
                conv_uuid = conv.get('uuid')
                if conv_uuid in uuid_set:
                    found_uuids.add(conv_uuid)

                # Early exit if all found
                if len(found_uuids) == len(uuid_set):
                    break
    else:
        # Load entire file (for small files)
        with open(conversations_file, 'r', encoding='utf-8') as f:
            data = json.load(f)

        conversations = data if isinstance(data, list) else [data]

        for conv in conversations:
            conv_uuid = conv.get('uuid')
            if conv_uuid in uuid_set:
                found_uuids.add(conv_uuid)

    missing_uuids = uuid_set - found_uuids
    return found_uuids, missing_uuids


def validate_output_directory(output_dir: Path, create: bool = True) -> None:
    """
    Validate output directory exists and is writable.

    Args:
        output_dir: Directory to validate
        create: Create directory if it doesn't exist

    Raises:
        ValueError: If directory is invalid or not writable
    """
    if output_dir.exists():
        if not output_dir.is_dir():
            raise ValueError(f"Output path exists but is not a directory: {output_dir}")

        # Test if writable
        test_file = output_dir / '.write_test'
        try:
            test_file.touch()
            test_file.unlink()
        except (PermissionError, OSError) as e:
            raise ValueError(f"Output directory is not writable: {output_dir}") from e

    elif create:
        try:
            output_dir.mkdir(parents=True, exist_ok=True)
        except (PermissionError, OSError) as e:
            raise ValueError(f"Cannot create output directory: {output_dir}") from e
    else:
        raise ValueError(f"Output directory does not exist: {output_dir}")


def validate_json_file(json_file: Path, expected_keys: List[str] = None) -> None:
    """
    Validate JSON file exists and is parseable.

    Args:
        json_file: Path to JSON file
        expected_keys: Optional list of expected top-level keys

    Raises:
        FileNotFoundError: If file doesn't exist
        ValueError: If file is not valid JSON or missing expected keys
    """
    if not json_file.exists():
        raise FileNotFoundError(f"JSON file not found: {json_file}")

    try:
        with open(json_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
    except json.JSONDecodeError as e:
        raise ValueError(f"Invalid JSON in {json_file}: {e}") from e

    if expected_keys:
        if isinstance(data, dict):
            missing_keys = set(expected_keys) - set(data.keys())
            if missing_keys:
                raise ValueError(
                    f"Missing expected keys in {json_file}: {missing_keys}"
                )
        elif isinstance(data, list) and len(data) > 0:
            # Check first item if data is a list
            missing_keys = set(expected_keys) - set(data[0].keys())
            if missing_keys:
                raise ValueError(
                    f"Missing expected keys in first item of {json_file}: {missing_keys}"
                )
