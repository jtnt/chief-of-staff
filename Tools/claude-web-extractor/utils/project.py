"""
Project document extraction utilities for Claude.ai data exports.
"""

import json
from pathlib import Path
from typing import Dict, List, Optional, Tuple


def load_projects_json(projects_file: Path) -> List[Dict]:
    """
    Load projects from projects.json file.

    Args:
        projects_file: Path to projects.json

    Returns:
        List of project dicts

    Raises:
        FileNotFoundError: If file doesn't exist
        ValueError: If file is not valid JSON
    """
    if not projects_file.exists():
        raise FileNotFoundError(f"Projects file not found: {projects_file}")

    try:
        with open(projects_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
    except json.JSONDecodeError as e:
        raise ValueError(f"Invalid JSON in {projects_file}: {e}") from e

    # Handle both list and single object
    if isinstance(data, list):
        return data
    else:
        return [data]


def find_project_by_id(projects: List[Dict], project_id: str) -> Optional[Dict]:
    """
    Find project by UUID in projects list.

    Args:
        projects: List of project dicts
        project_id: Project UUID to find

    Returns:
        Project dict or None if not found
    """
    for project in projects:
        if project.get('uuid') == project_id:
            return project
    return None


def find_project_by_name(projects: List[Dict], project_name: str) -> List[Dict]:
    """
    Find projects by name (case-insensitive, partial match).

    Args:
        projects: List of project dicts
        project_name: Project name to search for

    Returns:
        List of matching project dicts
    """
    search_name = project_name.lower()
    matches = []

    for project in projects:
        name = project.get('name', '').lower()
        if search_name in name:
            matches.append(project)

    return matches


def extract_project_documents(
    project: Dict,
    output_dir: Path
) -> Tuple[List[str], int]:
    """
    Extract documents from project to output directory.

    Args:
        project: Project dict from projects.json
        output_dir: Directory to save documents (project-docs/ subfolder)

    Returns:
        Tuple of (extracted_filenames, total_bytes)
    """
    docs = project.get('docs', [])

    if not docs:
        return [], 0

    # Create project-docs subdirectory
    docs_dir = output_dir / 'project-docs'
    docs_dir.mkdir(parents=True, exist_ok=True)

    extracted_files = []
    total_bytes = 0

    for doc in docs:
        # Get document metadata
        file_name = doc.get('file_name', 'unknown.md')
        content = doc.get('content', '')

        # Write document to file
        doc_path = docs_dir / file_name
        doc_path.write_text(content, encoding='utf-8')

        extracted_files.append(file_name)
        total_bytes += len(content.encode('utf-8'))

    return extracted_files, total_bytes


def get_project_info(project: Dict) -> Dict:
    """
    Extract key information from project dict.

    Args:
        project: Project dict from projects.json

    Returns:
        Dict with key project information
    """
    return {
        'uuid': project.get('uuid'),
        'name': project.get('name'),
        'description': project.get('description'),
        'is_private': project.get('is_private'),
        'is_starter_project': project.get('is_starter_project'),
        'prompt_template': project.get('prompt_template'),
        'created_at': project.get('created_at'),
        'updated_at': project.get('updated_at'),
        'creator': project.get('creator'),
        'document_count': len(project.get('docs', [])),
    }


def list_all_projects(projects_file: Path) -> List[Dict]:
    """
    List all projects with basic info.

    Args:
        projects_file: Path to projects.json

    Returns:
        List of project info dicts
    """
    projects = load_projects_json(projects_file)
    return [get_project_info(project) for project in projects]


def search_projects(
    projects_file: Path,
    name_query: str = None,
    has_documents: bool = None,
    is_private: bool = None
) -> List[Dict]:
    """
    Search projects with filters.

    Args:
        projects_file: Path to projects.json
        name_query: Search by name (case-insensitive, partial match)
        has_documents: Filter by whether project has uploaded documents
        is_private: Filter by privacy setting

    Returns:
        List of matching project info dicts
    """
    projects = load_projects_json(projects_file)
    results = []

    for project in projects:
        # Apply filters
        if name_query:
            if name_query.lower() not in project.get('name', '').lower():
                continue

        if has_documents is not None:
            doc_count = len(project.get('docs', []))
            if has_documents and doc_count == 0:
                continue
            if not has_documents and doc_count > 0:
                continue

        if is_private is not None:
            if project.get('is_private') != is_private:
                continue

        results.append(get_project_info(project))

    return results
