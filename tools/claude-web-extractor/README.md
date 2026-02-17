# Claude.ai Conversation Extraction Tool

A flexible toolset for extracting, searching, and organizing conversations from Claude.ai data exports into searchable markdown files.

**Version:** 1.0
**Created:** January 2026

---

## Overview

This tool solves a fundamental limitation of Claude.ai data exports: **there is no mapping between projects and conversations** in the export data. The export provides `conversations.json` and `projects.json`, but conversations don't reference which project they belong to, and projects don't list their conversations.

This means you have two options:
1. **Manual identification** - Copy UUIDs from the Claude.ai web interface (slow, not scalable)
2. **Smart search with confirmation** - Use this tool to search and confirm matches (10x faster)

---

## Key Features

- **Three workflow options**: Direct UUID input, keyword search, or interactive guided mode
- **Memory-efficient streaming**: Handles 100MB+ JSON files without loading everything into memory
- **Confidence scoring**: Ranks conversation matches by relevance using multiple signals
- **Interactive review**: Preview conversations before confirming extraction
- **Project document extraction**: Extracts uploaded documents from projects
- **Reproducible process**: Saves confirmed UUIDs for future re-extraction
- **Multiple input methods**: Command line, files, or interactive prompts

---

## Installation

### Requirements

- Python 3.7+
- pip (Python package manager)

### Setup

```bash
# Navigate to tool directory
cd "/Users/jtnt/Documents/Projects/Chief of Staff/Tools/claude-web-extractor"

# Install dependencies
pip3 install -r requirements.txt

# Verify installation
python3 find_conversations.py --help
```

### Dependencies

- `ijson` - Streaming JSON parser for memory efficiency
- `tqdm` - Progress bars for long operations
- Standard library: `json`, `pathlib`, `datetime`, `argparse`, `re`, `typing`

---

## Quick Start

### Option A: Direct UUID Input (Fastest)

When you already have conversation UUIDs from the web interface:

```bash
python3 extract_conversations.py \
  --uuids "uuid1" "uuid2" "uuid3" \
  --output-dir "/path/to/output"
```

Or from a file:
```bash
python3 extract_conversations.py \
  --uuids-file confirmed_uuids.txt \
  --output-dir "/path/to/output"
```

### Option B: Keyword Search (Discovery)

When you need to find conversations for a project:

```bash
# Step 1: Search
python3 find_conversations.py \
  --project-name "SalesIntel" \
  --keywords "manoj ramnani" "lunch and learn at salesintel" "sko presentation" \
  --date-after "2025-11-01" \
  --date-before "2026-01-31" \
  --output-dir "/path/to/output"

# Step 2: Review (interactive)
python3 review_candidates.py \
  --candidates "/path/to/output/candidates.json"

# Step 3: Extract confirmed conversations
python3 extract_conversations.py \
  --uuids-file "/path/to/output/confirmed_uuids.txt" \
  --output-dir "/path/to/output"
```

### Option C: Interactive Mode (Guided)

For a guided experience with prompts:

```bash
python3 find_conversations.py --interactive
```

---

## Understanding the Export Limitation

### What's Missing in Claude.ai Exports

After exhaustive analysis of all export files:

**conversations.json** (143MB, 453 conversations)
- Contains: `uuid`, `name`, `summary`, `created_at`, `updated_at`, `chat_messages`
- **Missing**: No `project_id` or project reference anywhere

**projects.json** (2.1MB, 49 projects)
- Contains: `uuid`, `name`, `description`, `docs`, `created_at`, `updated_at`
- **Missing**: No `conversations` array or list of conversation UUIDs

**Verified**: Searched for project UUIDs in conversations.json - NOT FOUND
**Verified**: Searched for conversation UUIDs in projects.json - NOT FOUND

This is an architectural limitation of the export format, not a bug or missing field.

### Why This Matters

**You cannot achieve 100% automated accuracy** when extracting project conversations. The export data doesn't contain the information needed to definitively link conversations to projects.

**What you CAN do:**
- Use keyword search to find 80-95% of conversations automatically
- Review and confirm matches manually (still 10x faster than copying UUIDs)
- Save confirmed lists for reproducible extraction from future exports

---

## Keyword Selection Strategy

The quality of search results depends heavily on keyword selection.

### GOOD Keywords (Project-Specific)

Use keywords unique to this specific project:

- **Proper names**: "manoj ramnani" "mike levy" "john smith"
- **Specific events**: "december 3 presentation" "lunch and learn" "quarterly review"
- **Unique phrases**: "salesintel lunch and learn" (not just "salesintel")
- **Project deliverables**: "taco framework" "run of show" "account intelligence brief"
- **Client-specific terms**: "sko" "sdr training" "competitive intel"

### BAD Keywords (Too Generic)

Avoid keywords that appear across many projects:

- **Company names alone**: "salesintel" "razzo" (appears in many conversations)
- **Common terms**: "AI" "training" "presentation" "client" "work"
- **Your own name**: "nicholas" (appears in most conversations)
- **Generic roles**: "CEO" "manager" "team"

### Strategy

1. **Start specific**: Use 3-5 highly specific keywords
2. **Review quality**: Check first few results to gauge accuracy
3. **Adjust as needed**:
   - Too many false positives → Add more specific keywords or increase confidence threshold
   - Missing conversations → Lower confidence threshold or add broader keywords

### Example: SalesIntel Project

**Good search**:
```bash
--keywords "manoj ramnani" "mike levy" "salesintel lunch and learn" \
          "sko presentation" "december 3" "taco framework"
```

**Bad search** (too generic):
```bash
--keywords "salesintel" "razzo" "AI training" "presentation"
```

The bad search will produce many false positives because these terms appear across multiple projects.

---

## Confidence Scoring

### How It Works

Each conversation is scored based on keyword matches in different locations:

| Location | Phrase Match | Single Word | Notes |
|----------|--------------|-------------|-------|
| Title | 0.4 points | 0.2 points | Highest weight |
| Summary | 0.3 points | 0.15 points | Second priority |
| Content (first 10 messages) | 0.1 per match | Max 0.3 total | Lower weight |

**Bonuses:**
- Multiple different keywords matched: +0.1 per additional keyword
- Date within specified range: Required (score = 0 if outside)

**Penalties:**
- Generic terms (appearing in >20% of conversations): 0.5x to 1.0x multiplier

### Adjusting Thresholds

Default minimum confidence: **0.5**

- **Higher threshold (0.7-0.9)**: Fewer results, more precise, may miss some conversations
- **Lower threshold (0.3-0.5)**: More results, more false positives, requires more review
- **Very low (0.1-0.3)**: Catches almost everything, significant manual review needed

Adjust based on your needs and keyword quality.

---

## Tools Reference

### 1. find_conversations.py

**Purpose:** Search for conversations using keywords and filters

**Usage:**
```bash
python3 find_conversations.py [options]
```

**Key Options:**
- `--interactive` - Guided mode with prompts
- `--project-name NAME` - Project name (for reference)
- `--keywords K1 K2 K3` - Keywords to search
- `--date-after DATE` - Filter: created after date
- `--date-before DATE` - Filter: created before date
- `--min-confidence N` - Minimum confidence (0.0-1.0)
- `--exclude-uuids FILE` - UUIDs to exclude
- `--output-dir DIR` - Where to save candidates.json

**Output:** `candidates.json` with ranked conversation matches

**Examples:**
```bash
# Interactive mode
python3 find_conversations.py --interactive

# Command line with good keywords
python3 find_conversations.py \
  --keywords "manoj ramnani" "salesintel lunch and learn" \
  --date-after "2025-11-01" \
  --min-confidence 0.6

# Exclude already-extracted conversations
python3 find_conversations.py \
  --keywords "project alpha" \
  --exclude-uuids previous_uuids.txt
```

### 2. review_candidates.py

**Purpose:** Interactively review and confirm search results

**Usage:**
```bash
python3 review_candidates.py --candidates candidates.json
```

**Key Options:**
- `--candidates FILE` - Path to candidates.json (required)
- `--output-file FILE` - Where to save confirmed UUIDs
- `--resume` - Resume previous session

**Interactive Commands:**
- `y / yes` - Confirm this conversation
- `n / no` - Reject this conversation
- `skip` - Skip for now (decide later)
- `add-manual` - Manually enter a UUID to add
- `quit` - Save progress and exit

**Output:** `confirmed_uuids.txt` with approved conversation UUIDs

**Features:**
- Shows conversation preview (title, date, summary, first message)
- Displays confidence score and match reasons
- Saves progress after each decision
- Can resume interrupted sessions

**Example:**
```bash
# Initial review
python3 review_candidates.py --candidates ./output/candidates.json

# Resume after interruption
python3 review_candidates.py --candidates ./output/candidates.json --resume
```

### 3. extract_conversations.py

**Purpose:** Extract conversations to markdown files

**Usage:**
```bash
python3 extract_conversations.py [options]
```

**Key Options:**
- `--uuids UUID1 UUID2` - Direct UUID list
- `--uuids-file FILE` - File with UUIDs (one per line)
- `--output-dir DIR` - Output directory (required)
- `--project-id UUID` - Project UUID for documents
- `--conversations-file FILE` - Path to conversations.json
- `--projects-file FILE` - Path to projects.json
- `--data-export DIR` - Data export folder path
- `--no-streaming` - Load full file (faster for small files)

**Output:**
- Individual conversation markdown files
- `project-docs/` folder with uploaded documents (if project-id provided)
- `project-info.md` with project metadata

**Examples:**
```bash
# Direct UUIDs
python3 extract_conversations.py \
  --uuids "abc-123" "def-456" \
  --output-dir ./output

# From confirmed file
python3 extract_conversations.py \
  --uuids-file confirmed_uuids.txt \
  --output-dir ./output

# With project documents
python3 extract_conversations.py \
  --uuids-file confirmed_uuids.txt \
  --project-id "019b2735-40ef-77c5-9853-a829c7ebc819" \
  --output-dir ./output
```

---

## Output Format

### Conversation Files

**Filename:** `YYYY-MM-DD_conversation-title-slug.md`

**Structure:**
```markdown
---
title: "Conversation Title"
uuid: abc-123-def-456
created_at: 2025-12-16T13:11:37Z
updated_at: 2025-12-16T14:30:12Z
message_count: 36
themes: ["Theme 1", "Theme 2"]
---

# Conversation Title

**Summary:** [Auto-generated summary]

---

## Messages

### human (2025-12-16 13:11:37)

[Message content...]

### assistant (2025-12-16 13:12:45)

[Response content...]

---

## Attachments & Files

- document1.pdf
- document2.md
```

### Project Info File

**Filename:** `project-info.md`

**Contains:**
- Project metadata (name, UUID, dates)
- Description and prompt template
- List of uploaded documents (with links)
- List of extracted conversations (grouped by date)
- Extraction timestamp

### Output Directory Structure

```
output-directory/
├── project-info.md                     # Project metadata
├── project-docs/                       # Uploaded documents
│   ├── document1.md
│   └── document2.pdf
├── 2025-11-07_conversation-1.md        # Conversations
├── 2025-11-25_conversation-2.md
├── ...
├── candidates.json                     # Search results (if search used)
└── confirmed_uuids.txt                 # Confirmed UUIDs
```

---

## Configuration

### Default Export Location

Edit `config.py` to change default export location:

```python
DEFAULT_EXPORT_DIR = Path.home() / "Documents/AI/Data Exports"
```

The tool auto-detects the most recent export in this folder.

### Confidence Thresholds

Edit `config.py` to adjust scoring weights:

```python
CONFIDENCE_THRESHOLDS = {
    'title_phrase_match': 0.4,
    'title_word_match': 0.2,
    'summary_phrase_match': 0.3,
    'summary_word_match': 0.15,
    'content_match': 0.1,
    'content_match_cap': 0.3,
    'minimum_confidence': 0.5,
}
```

### Theme Detection

Customize theme keywords in `config.py`:

```python
DEFAULT_THEME_MAP = {
    'Your Theme': ['keyword1', 'keyword2'],
    'Another Theme': ['keyword3', 'keyword4'],
}
```

---

## Future Export Strategy

### Re-Extracting from New Exports

When you get a new Claude.ai export, you have options:

**1. Use saved confirmed UUIDs** (fastest):
```bash
python3 extract_conversations.py \
  --uuids-file "/path/to/project/confirmed_uuids.txt" \
  --data-export "/path/to/new-export" \
  --output-dir "/path/to/project/Claude.ai Chats"
```

The tool will:
- Report any missing conversations (not in new export)
- Extract all conversations in the saved list

**2. Find only NEW conversations**:
```bash
python3 find_conversations.py \
  --keywords "project keywords" \
  --date-after "2026-01-20" \
  --exclude-uuids "/path/to/project/confirmed_uuids.txt"
```

Then review and add new UUIDs to the confirmed list.

### Maintaining Confirmed Lists

- Store `confirmed_uuids.txt` in each project's output folder
- Version control it (git tracks discovery history)
- Can manually edit to add/remove conversations

---

## Troubleshooting

### "Conversation not found in export"

**Cause:** UUID doesn't exist in conversations.json

**Solutions:**
- Verify UUID is correct (check for typos)
- Ensure conversation is within export date range (last 90 days)
- Re-export data if conversation should be included

### "Memory error with large file"

**Cause:** Streaming parser not being used

**Solutions:**
- Ensure `ijson` is installed: `pip3 install ijson`
- Don't use `--no-streaming` flag
- Increase available memory if needed

### "Search finds too many false positives"

**Cause:** Keywords too generic

**Solutions:**
- Use more specific keywords (proper names, unique phrases)
- Increase confidence threshold: `--min-confidence 0.7`
- Add more keywords to narrow results

### "Search missing conversations"

**Cause:** Keywords too specific or confidence threshold too high

**Solutions:**
- Lower confidence threshold: `--min-confidence 0.3`
- Add broader keywords
- Try different keyword combinations
- Check date range includes all conversations

### "Generic term penalty reducing good matches"

**Cause:** Common term appearing across many conversations

**Solutions:**
- Replace generic keywords with specific ones
- Skip penalty calculation: `--no-penalties`
- Adjust `GENERIC_TERM_THRESHOLD` in config.py

---

## Performance Considerations

### Memory Usage

**Problem:** conversations.json can be 100-200MB with 400+ conversations

**Solution:**
- Streaming parser processes one conversation at a time
- Memory footprint stays constant regardless of file size
- Typical usage: <100MB RAM even for 200MB files

### Processing Time

**Typical performance** (M1 Mac):
- Search 450 conversations: ~30-60 seconds
- Extract 15 conversations: ~5-10 seconds
- Review 20 candidates: ~2-5 minutes (human time)

**Factors affecting speed:**
- File size (more conversations = longer search)
- Number of keywords (more keywords = slightly slower)
- Streaming vs full-load (streaming slightly slower but memory-safe)
- Disk speed (SSD vs HDD)

### Progress Tracking

All tools show progress:
- Search: Progress bar showing conversations processed
- Extract: Per-conversation status updates
- Review: Current position in list

Can be interrupted (Ctrl+C) and resumed without losing progress.

---

## Best Practices

### Keyword Selection

1. **Research first**: Review conversations in web interface to identify unique terms
2. **Start specific**: Use proper names and unique phrases
3. **Test with small set**: Run search, review top 10 results to gauge quality
4. **Iterate**: Adjust keywords and thresholds based on results

### Search Strategy

1. **Use date ranges**: Narrow by project timeline (faster, more accurate)
2. **Exclude known UUIDs**: Skip already-extracted conversations
3. **Save search results**: Keep candidates.json for reproducibility
4. **Document keyword choices**: Add comment in confirmed_uuids.txt explaining search strategy

### Review Workflow

1. **Review in batches**: Do 10-20 at a time, take breaks
2. **Save progress frequently**: Tool auto-saves after each decision
3. **Add manual UUIDs**: If you know a conversation belongs, add it manually
4. **Skip uncertain ones**: Better to skip and come back than guess wrong

### Extraction

1. **Verify UUIDs first**: Run with `--uuids-file` to check all exist
2. **Include project documents**: Use `--project-id` to get complete context
3. **Version control output**: Git tracks conversation library evolution
4. **Create synthesis docs**: Don't just extract - synthesize insights across conversations

---

## Examples

### Example 1: SalesIntel Project

```bash
# Step 1: Search with good specific keywords
python3 find_conversations.py \
  --project-name "SalesIntel" \
  --keywords "manoj ramnani" "mike levy" "salesintel lunch and learn" \
            "sko presentation" "december 3" "taco framework" \
  --date-after "2025-11-01" \
  --date-before "2026-01-31" \
  --min-confidence 0.5 \
  --output-dir "/Users/jtnt/Documents/Projects/Clients/SalesIntel/Claude.ai Chats"

# Step 2: Review results
python3 review_candidates.py \
  --candidates "/Users/jtnt/Documents/Projects/Clients/SalesIntel/Claude.ai Chats/candidates.json"

# Step 3: Extract confirmed + project documents
python3 extract_conversations.py \
  --uuids-file "/Users/jtnt/Documents/Projects/Clients/SalesIntel/Claude.ai Chats/confirmed_uuids.txt" \
  --project-id "019b2735-40ef-77c5-9853-a829c7ebc819" \
  --output-dir "/Users/jtnt/Documents/Projects/Clients/SalesIntel/Claude.ai Chats"
```

### Example 2: Finding New Conversations

When you already have some conversations extracted and want to find new ones:

```bash
python3 find_conversations.py \
  --keywords "your project keywords" \
  --date-after "2026-01-20" \
  --exclude-uuids "/path/to/project/confirmed_uuids.txt" \
  --output-dir "/path/to/project"
```

### Example 3: Quick Direct Extraction

When you already know the UUIDs (from web interface):

```bash
python3 extract_conversations.py \
  --uuids "c7579b6e-484d-4154-94fc-18c190d3f50f" \
          "d85a037c-4d53-4b06-abb6-c33a9655a6b9" \
  --output-dir "./output"
```

---

## Technical Details

### Architecture

```
claude-web-extractor/
├── README.md                    # This file
├── requirements.txt             # Dependencies
├── config.py                    # Configuration settings
├── find_conversations.py        # Search tool (CLI)
├── review_candidates.py         # Review tool (CLI)
├── extract_conversations.py     # Extraction tool (CLI)
└── utils/                       # Shared utilities
    ├── __init__.py
    ├── validation.py            # UUID validation, file checks
    ├── markdown.py              # Markdown generation
    ├── project.py               # Project document extraction
    └── search.py                # Search and scoring logic
```

### Design Principles

1. **Standalone CLI tools**: Run from terminal, not within Claude sessions
2. **Memory efficiency**: Stream large files, don't load entirely
3. **Incremental progress**: Save after each operation
4. **Resumable**: Can interrupt and continue without losing work
5. **Reproducible**: Save search parameters and results
6. **Flexible input**: Multiple ways to provide data (CLI, files, interactive)

### Dependencies

- **ijson**: Streaming JSON parser (handles 100MB+ files)
- **tqdm**: Progress bars for user feedback
- **Standard library**: No other external dependencies

---

## Limitations & Realistic Expectations

### What We CANNOT Do

- **Achieve 100% automated accuracy**: No project-conversation mapping exists in export data
- **Guarantee finding ALL conversations**: Some conversations may not match any keywords
- **Avoid all false positives**: Generic keywords will match across projects
- **Read minds**: Can't know which conversations "feel" right without human judgment

### What We CAN Do

- **Find 80-95% automatically**: With good keyword selection
- **Make process 10x faster**: From copying UUIDs to reviewing candidates
- **Provide transparency**: Show match reasons and confidence scores
- **Save confirmed lists**: Reproducible extraction from future exports
- **Handle large exports**: Memory-efficient streaming for 200MB+ files

### Bottom Line

This tool makes the discovery process significantly faster and more systematic, but doesn't eliminate the need for human judgment. That's a fundamental limitation of the export format, not our implementation.

---

## Support & Feedback

This is a personal tool developed for extracting Claude.ai conversations. For issues or questions:

1. Check this README first
2. Review examples and troubleshooting sections
3. Examine `config.py` for customization options
4. Read the plan document for design rationale

---

## Version History

**1.0** (January 2026)
- Initial release
- Three-tool workflow (find, review, extract)
- Streaming JSON support for large files
- Confidence scoring with generic term penalties
- Project document extraction
- Interactive modes

---

## Credits

- Inspired by SalesIntel conversation extraction (15 conversations, 470 messages)
- Built to solve the project-conversation mapping limitation in Claude.ai exports
- Designed for reproducible extraction across future exports

---

*Last updated: January 2026*
