"""
Configuration settings for Claude.ai conversation extraction tool.
"""

from pathlib import Path
import os

# Default export data location
# Each export is in a subfolder like: claude data export 20260120 90 days/data-YYYY-MM-DD-HH-MM-SS-batch-0000/
DEFAULT_EXPORT_DIR = Path.home() / "Documents/AI/Data Exports"

# Confidence scoring thresholds
CONFIDENCE_THRESHOLDS = {
    'title_phrase_match': 0.4,      # Full keyword phrase in conversation title
    'title_word_match': 0.2,        # Single word from phrase in title
    'summary_phrase_match': 0.3,    # Full phrase in summary
    'summary_word_match': 0.15,     # Single word from phrase in summary
    'content_match': 0.1,           # Match in message content (max 0.3 total)
    'content_match_cap': 0.3,       # Maximum bonus from content matches
    'minimum_confidence': 0.5,      # Default minimum to show results
}

# Generic term penalty
# Terms appearing in > this % of conversations get penalized
GENERIC_TERM_THRESHOLD = 0.20

# Search settings
SEARCH_SETTINGS = {
    'message_preview_count': 10,    # Number of messages to search in content
    'batch_size': 50,               # Conversations per batch
    'summary_preview_length': 200,  # Characters to show in preview
    'message_preview_length': 300,  # Characters for first message preview
}

# File naming conventions
FILENAME_PATTERNS = {
    'conversation': '{date}_{slug}.md',
    'synthesis': 'synthesis-{theme}.md',
    'candidates': 'candidates.json',
    'confirmed_uuids': 'confirmed_uuids.txt',
    'project_info': 'project-info.md',
    'project_docs_dir': 'project-docs',
}

# Output folder structure
OUTPUT_FOLDERS = {
    'conversations': '.',            # Conversation markdown files in root
    'project_docs': 'project-docs',  # Project documents subfolder
}

# Theme detection keywords (can be customized per project)
DEFAULT_THEME_MAP = {
    'Lunch & Learn': ['lunch and learn', 'presentation', 'training'],
    'Training': ['training', 'workshop', 'session'],
    'Executive Communications': ['executive', 'leadership', 'podcast summary'],
    'Discovery': ['discovery', 'questions', 'planning'],
    'Competitive Intelligence': ['competitive', 'competitor', 'analysis'],
    'AI Adoption': ['ai adoption', 'sprint', 'rollout'],
    'Framework Development': ['framework', 'methodology'],
    'Service Development': ['workflow build', 'offering', 'sprint'],
}

def get_latest_export_folder():
    """
    Find the most recent Claude.ai data export folder.

    Returns:
        Path to the data subfolder (data-YYYY-MM-DD-HH-MM-SS-batch-0000/)
        or None if not found.
    """
    if not DEFAULT_EXPORT_DIR.exists():
        return None

    # Find all export folders (match pattern: claude data export YYYYMMDD...)
    export_folders = [
        d for d in DEFAULT_EXPORT_DIR.iterdir()
        if d.is_dir() and d.name.startswith('claude data export')
    ]

    if not export_folders:
        return None

    # Sort by name (date embedded) and get most recent
    latest_export = sorted(export_folders, reverse=True)[0]

    # Find data subfolder inside
    data_folders = [
        d for d in latest_export.iterdir()
        if d.is_dir() and d.name.startswith('data-')
    ]

    if not data_folders:
        return None

    # Usually just one, but take first if multiple
    return data_folders[0]

def get_conversations_json_path():
    """
    Get path to conversations.json in latest export.

    Returns:
        Path to conversations.json or None if not found.
    """
    export_folder = get_latest_export_folder()
    if not export_folder:
        return None

    conversations_file = export_folder / 'conversations.json'
    return conversations_file if conversations_file.exists() else None

def get_projects_json_path():
    """
    Get path to projects.json in latest export.

    Returns:
        Path to projects.json or None if not found.
    """
    export_folder = get_latest_export_folder()
    if not export_folder:
        return None

    projects_file = export_folder / 'projects.json'
    return projects_file if projects_file.exists() else None
