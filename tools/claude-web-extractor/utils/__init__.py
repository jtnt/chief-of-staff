"""
Utility modules for Claude.ai conversation extraction.
"""

from .validation import (
    is_valid_uuid,
    validate_uuids,
    load_uuids_from_file,
    check_conversations_exist,
    validate_output_directory,
    validate_json_file,
)

from .markdown import (
    slugify,
    format_timestamp,
    extract_message_text,
    get_conversation_themes,
    get_attachments,
    create_markdown_file,
    create_project_info_file,
)

from .project import (
    load_projects_json,
    find_project_by_id,
    find_project_by_name,
    extract_project_documents,
    get_project_info,
    list_all_projects,
    search_projects,
)

from .search import (
    search_conversations,
    load_search_results,
    save_search_results,
    update_match_confirmation,
    calculate_generic_term_penalty,
    score_conversation,
)

__all__ = [
    # validation
    'is_valid_uuid',
    'validate_uuids',
    'load_uuids_from_file',
    'check_conversations_exist',
    'validate_output_directory',
    'validate_json_file',
    # markdown
    'slugify',
    'format_timestamp',
    'extract_message_text',
    'get_conversation_themes',
    'get_attachments',
    'create_markdown_file',
    'create_project_info_file',
    # project
    'load_projects_json',
    'find_project_by_id',
    'find_project_by_name',
    'extract_project_documents',
    'get_project_info',
    'list_all_projects',
    'search_projects',
    # search
    'search_conversations',
    'load_search_results',
    'save_search_results',
    'update_match_confirmation',
    'calculate_generic_term_penalty',
    'score_conversation',
]
