"""
Markdown generation utilities for Claude.ai conversation extraction.
"""

import json
import re
from pathlib import Path
from datetime import datetime
from typing import Dict, List, Any


def slugify(text: str) -> str:
    """
    Convert text to URL-friendly slug.

    Args:
        text: Text to slugify

    Returns:
        Slugified text (lowercase, hyphens, alphanumeric)
    """
    text = text.lower()
    text = re.sub(r'[^a-z0-9]+', '-', text)
    text = re.sub(r'-+', '-', text)
    return text.strip('-')


def format_timestamp(iso_timestamp: str) -> str:
    """
    Convert ISO timestamp to readable format.

    Args:
        iso_timestamp: ISO 8601 timestamp string

    Returns:
        Formatted timestamp (YYYY-MM-DD HH:MM:SS)
    """
    try:
        dt = datetime.fromisoformat(iso_timestamp.replace('Z', '+00:00'))
        return dt.strftime('%Y-%m-%d %H:%M:%S')
    except:
        return iso_timestamp


def extract_message_text(content: List[Dict]) -> str:
    """
    Extract text from message content array.

    Args:
        content: Message content array from conversation JSON

    Returns:
        Extracted text content
    """
    text_parts = []
    for item in content:
        if item.get('type') == 'text':
            text_parts.append(item.get('text', ''))
    return '\n\n'.join(text_parts).strip()


def get_conversation_themes(
    title: str,
    messages: List[Dict],
    theme_map: Dict[str, List[str]] = None
) -> List[str]:
    """
    Infer themes from conversation title and content.

    Args:
        title: Conversation title
        messages: List of message dicts
        theme_map: Dict mapping theme names to keyword lists

    Returns:
        List of theme names
    """
    from config import DEFAULT_THEME_MAP

    if theme_map is None:
        theme_map = DEFAULT_THEME_MAP

    themes = []

    # Check title and first few messages
    search_text = title.lower()
    for msg in messages[:5]:
        search_text += ' ' + extract_message_text(msg.get('content', [])).lower()

    for theme, keywords in theme_map.items():
        if any(keyword in search_text for keyword in keywords):
            themes.append(theme)

    return themes if themes else ['General']


def get_attachments(messages: List[Dict]) -> List[str]:
    """
    Extract list of attachments from messages.

    Args:
        messages: List of message dicts

    Returns:
        List of attachment strings (formatted for markdown)
    """
    attachments = []
    for msg in messages:
        for content_item in msg.get('content', []):
            if content_item.get('type') == 'document':
                doc_info = content_item.get('document', {})
                file_name = doc_info.get('extracted_content', {}).get('file_name', 'Unknown file')
                attachments.append(f"- {file_name}")
    return attachments


def create_markdown_file(
    conversation: Dict,
    output_dir: Path,
    themes_override: List[str] = None
) -> str:
    """
    Convert conversation JSON to markdown file.

    Args:
        conversation: Conversation dict from JSON
        output_dir: Directory to save markdown file
        themes_override: Optional list of themes to override auto-detection

    Returns:
        Filename of created markdown file
    """
    uuid = conversation.get('uuid', 'unknown')
    title = conversation.get('name', 'Untitled Conversation')
    created_at = conversation.get('created_at', '')
    updated_at = conversation.get('updated_at', '')
    summary = conversation.get('summary', '')

    # Get messages - handle different possible structures
    chat_messages = conversation.get('chat_messages', [])
    if isinstance(chat_messages, dict):
        # Sometimes chat_messages is an object with message IDs as keys
        messages = list(chat_messages.values())
    else:
        messages = chat_messages

    message_count = len(messages)

    # Sort messages by created_at timestamp
    try:
        messages.sort(key=lambda x: x.get('created_at', ''))
    except:
        pass

    # Get themes
    themes = themes_override or get_conversation_themes(title, messages)

    # Create filename: YYYY-MM-DD_title-slug.md
    try:
        created_date = datetime.fromisoformat(created_at.replace('Z', '+00:00'))
        date_prefix = created_date.strftime('%Y-%m-%d')
    except:
        date_prefix = 'unknown-date'

    filename = f"{date_prefix}_{slugify(title)}.md"

    # Build markdown content
    md_lines = []

    # Front matter
    md_lines.append('---')
    md_lines.append(f'title: "{title}"')
    md_lines.append(f'uuid: {uuid}')
    md_lines.append(f'created_at: {created_at}')
    md_lines.append(f'updated_at: {updated_at}')
    md_lines.append(f'message_count: {message_count}')
    md_lines.append(f'themes: {json.dumps(themes)}')
    md_lines.append('---')
    md_lines.append('')

    # Title
    md_lines.append(f'# {title}')
    md_lines.append('')

    # Summary
    if summary:
        md_lines.append(f'**Summary:** {summary}')
        md_lines.append('')

    md_lines.append('---')
    md_lines.append('')

    # Messages
    md_lines.append('## Messages')
    md_lines.append('')

    for msg in messages:
        sender = msg.get('sender', 'Unknown')
        timestamp = format_timestamp(msg.get('created_at', ''))
        content = extract_message_text(msg.get('content', []))

        md_lines.append(f'### {sender} ({timestamp})')
        md_lines.append('')
        md_lines.append(content)
        md_lines.append('')

    # Attachments
    attachments = get_attachments(messages)
    if attachments:
        md_lines.append('---')
        md_lines.append('')
        md_lines.append('## Attachments & Files')
        md_lines.append('')
        md_lines.extend(attachments)
        md_lines.append('')

    # Write file
    output_path = output_dir / filename
    output_path.write_text('\n'.join(md_lines), encoding='utf-8')

    return filename


def create_project_info_file(
    project: Dict,
    output_dir: Path,
    extracted_conversations: List[Dict],
    extracted_documents: List[str]
) -> Path:
    """
    Create project-info.md with project metadata.

    Args:
        project: Project dict from projects.json
        output_dir: Directory to save file
        extracted_conversations: List of extracted conversation dicts
        extracted_documents: List of extracted document filenames

    Returns:
        Path to created project-info.md file
    """
    md_lines = []

    # Title
    project_name = project.get('name', 'Unknown Project')
    md_lines.append(f'# {project_name}')
    md_lines.append('')

    # Metadata
    md_lines.append('## Project Information')
    md_lines.append('')
    md_lines.append(f"**UUID:** `{project.get('uuid', 'unknown')}`")
    md_lines.append(f"**Created:** {format_timestamp(project.get('created_at', ''))}")
    md_lines.append(f"**Updated:** {format_timestamp(project.get('updated_at', ''))}")
    md_lines.append(f"**Private:** {project.get('is_private', False)}")
    md_lines.append('')

    # Description
    description = project.get('description', '')
    if description:
        md_lines.append('## Description')
        md_lines.append('')
        md_lines.append(description)
        md_lines.append('')

    # Prompt template
    prompt_template = project.get('prompt_template', '')
    if prompt_template:
        md_lines.append('## Prompt Template')
        md_lines.append('')
        md_lines.append('```')
        md_lines.append(prompt_template)
        md_lines.append('```')
        md_lines.append('')

    # Uploaded documents
    if extracted_documents:
        md_lines.append('## Uploaded Documents')
        md_lines.append('')
        for doc in sorted(extracted_documents):
            md_lines.append(f'- [{doc}](project-docs/{doc})')
        md_lines.append('')

    # Extracted conversations
    if extracted_conversations:
        md_lines.append('## Extracted Conversations')
        md_lines.append('')
        md_lines.append(f'**Total:** {len(extracted_conversations)} conversations')
        md_lines.append('')

        # Group by date
        by_date = {}
        for conv in extracted_conversations:
            try:
                created_at = conv.get('created_at', '')
                date = datetime.fromisoformat(created_at.replace('Z', '+00:00')).strftime('%Y-%m-%d')
            except:
                date = 'unknown-date'

            if date not in by_date:
                by_date[date] = []
            by_date[date].append(conv)

        # Sort by date
        for date in sorted(by_date.keys(), reverse=True):
            md_lines.append(f'### {date}')
            md_lines.append('')
            for conv in by_date[date]:
                filename = conv.get('filename', '')
                title = conv.get('title', 'Untitled')
                msg_count = conv.get('message_count', 0)
                md_lines.append(f'- [{title}]({filename}) - {msg_count} messages')
            md_lines.append('')

    # Extraction info
    md_lines.append('---')
    md_lines.append('')
    md_lines.append(f'*Extracted: {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}*')

    # Write file
    output_path = output_dir / 'project-info.md'
    output_path.write_text('\n'.join(md_lines), encoding='utf-8')

    return output_path
