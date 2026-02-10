# Claude CLI Context: Simple Groq CLI

This repository contains a simple command-line interface (CLI) tool and web interface designed to interact with the Groq API. It is built using Node.js, TypeScript, and the `groq-sdk`.

## Purpose

The primary purpose of this project is to provide easy ways for users to leverage Groq's powerful language models:

### CLI Tool
- Generate text based on prompts from your terminal
- Ask questions and receive AI-generated answers
- Experiment with different Groq models via command-line

### Web Interface (GitHub Pages)
- **Live at**: https://ManuelBv.github.io/simple-groq-cli/
- Bring Your Own Key (BYOK) - API key stored locally in browser
- Full conversation history with IndexedDB storage
- Collapsible sidebar with chat history (default: closed)
- Settings panel for API key management
- Message timestamps (24-hour format)
- Support for `<think>` tag parsing from Groq API
- Model switching mid-conversation with tracking
- Enhanced markdown export (timestamps, GMT offset, model info)
- Keyboard shortcuts (Ctrl+Enter to send)
- Responsive mobile design (sidebar overlay)
- GitHub repo link in sidebar

## Recent Updates (Feb 2026)

### Web UI v2 Enhancements
- **Database Schema v2**: Messages now store timestamps and model info
- **Collapsible Sidebar**: Hamburger menu (☰/✕) with smooth transitions
- **Settings Panel**: API key display with show/hide toggle
- **Message Timestamps**: All messages show when they were sent
- **Think Tag Styling**: `<think>` blocks from Groq API are visually distinct
- **Enhanced Export**: Markdown downloads include timestamps and model names
- **Keyboard Shortcuts**: Ctrl+Enter to send messages
- **Mobile Optimized**: Sidebar overlays on mobile devices

## Development Workflow

### Testing Requirements (CRITICAL)

**Before committing ANY changes to the repository:**

1. **Run All Tests**
   ```bash
   npm run test:all
   ```
   This runs both CLI tests (6 tests) and Web UI tests (50 tests)

2. **Verify All Tests Pass**
   - CLI tests must pass: `groq.test.ts`
   - Web UI tests must pass: `web/app.test.ts`
   - Zero failures allowed before commit

3. **Test Commands Available**
   ```bash
   npm test           # Run CLI tests only
   npm run test:web   # Run Web UI tests only
   npm run test:all   # Run ALL tests (required before commit)
   npm run test:watch # Watch mode for development
   npm run test:coverage # Generate coverage report
   ```

4. **Test Coverage**
   - **Total:** 56 tests (6 CLI + 50 Web UI)
   - **CLI:** API calls, presets, error handling
   - **Web UI:** HTML structure, API key management, UI interactions, keyboard shortcuts

5. **What Gets Tested**
   - ✅ API key validation (gsk_ prefix requirement)
   - ✅ LocalStorage operations
   - ✅ Settings/API info panel toggles
   - ✅ Sidebar collapse/expand
   - ✅ Modal visibility
   - ✅ Keyboard shortcuts (Enter, Ctrl+Enter)
   - ✅ Error message display
   - ✅ Chat title generation
   - ✅ Model configuration from shared config
   - ✅ Input validation and sanitization

6. **If Tests Fail**
   - ❌ DO NOT commit
   - Fix the failing tests or code
   - Re-run `npm run test:all`
   - Only commit when all tests pass

### Building

```bash
npm run build       # Build CLI TypeScript
npm run build:web   # Build Web UI for production (docs/)
```

## Expectations

This tool is intended to be a straightforward utility for quick API interactions. The CLI is configured to work with your Groq API key as an environment variable. The web interface stores your API key locally in the browser. For detailed setup instructions, please refer to the main `README.md` file.## Core Behavioral Rules (All Contexts)

### Intellectual Honesty
- Disagree when facts contradict my statements; prioritize truth over agreement
- Be skeptical about all data received; verify before accepting
- Double-check conclusions with a skeptical frame before presenting
- When data does not exist, explicitly state: "I couldn't find data on [X]"
- Respond with highest-probability answers (temperature=0 mindset)

### Communication Style
- Be concise and direct; no filler or hedging language
- No apologies; thank instead and ensure the error isn't repeated
- Be factual; avoid speculation without labeling it as such

### Research Protocol
- Prioritize primary sources over summaries
- For technical concepts: search for recent papers/implementations before answering
- Prioritize papers from last 12-24 months unless historical context required
- **When NOT to search**: well-established concepts, mathematical proofs, core CS theory

### Quantitative Rigor
Show working for any quantitative conclusions:
```
Given: [Input data/assumptions]
Calculation:
├── Step 1: [calculation]
├── Step 2: [calculation]
└── Step N: [calculation]
Result: [Conclusion]
```

### CTFCV Framework
Before responding to complex queries, list assumptions about:
- **C**ontext: What's the broader situation?
- **T**ask: What exactly am I being asked to do?
- **F**ormat: What output structure is expected?
- **C**onstraints: What limitations apply?
- **V**erification: How will success be measured?

Then ask clarifying questions if ambiguity exists.

### Session Management
- On chat start: Review initial prompt and suggest improvements
- Track token usage throughout session

## Session Archival Protocol

### User Command
When the user requests to "store this session" or "save this conversation", follow this protocol to create a comprehensive session archive file.

### Archive File Naming
Format: `[YYYY-MM-DD]-CLAUDE-[subject].md`

Example: `2026-02-01-CLAUDE-claude-convo-extractor-github-setup.md`

### Required Content Structure

Generate a complete session archive file with the following sections:

#### 1. Header Metadata
- Date (YYYY-MM-DD)
- Session Subject (descriptive title)
- Duration estimate
- Status (Completed/In Progress)
- Completeness indicator (100% - All conversation + technical details)

#### 2. Conversation Flow Section
For each user message, include:
- **User Request**: Exact user message text in blockquote format
- **Claude Response**: Summary of what Claude responded
- **Actions Taken**: Bullet list of what was executed
- **Sample Results**: Key outputs or file changes

#### 3. Technical Execution Details Section
For each major action/file modification, include:
- **File Path**: Absolute path to the file
- **File Details**: Total lines, language, type
- **Original Content**: Code/text before changes (in code blocks)
- **New Content**: Code/text after changes (in code blocks)
- **Changes Made**: Bullet list of modifications
- **Status**: ✅/❌ indicator

#### 4. Tool Calls & Outputs Section
For each bash/tool command executed:
- **Command**: Exact command with proper formatting
- **Output**: Complete command output
- **Exit Code**: Success/failure indicator
- **Impact**: What changed as a result

#### 5. Git History Section (if applicable)
- Commit hashes
- Commit messages
- Files changed
- Insertions/deletions
- Push status and results

#### 6. Summary & Metrics Section
Include:
- Table of all actions performed with status
- File statistics (paths, lines, actions)
- Total counts (files modified, created, renamed)
- Timeline breakdown by phase
- Key achievements checklist

#### 7. Code Review Notes (if applicable)
- Security considerations
- Performance impacts
- Testing coverage
- Breaking changes

#### 8. Complete File Listing (if applicable)
For bulk operations (file renames, creations):
- Complete numbered list of all files
- Before/after names for renames
- Status for each file

#### 9. Timeline Section
Table with columns:
- Step/Phase
- Action description
- Duration
- Status

### Quality Standards

**Completeness**: ✅ Must include ALL conversation details and technical execution
- No summarization that omits details
- Full code diffs for every edit
- Complete command outputs
- All user questions and Claude responses

**Accuracy**: ✅ All information must be factual
- Exact file paths (not approximations)
- Actual code snippets (not paraphrased)
- Real command outputs (not examples)
- Correct timestamps and dates
- Actual line numbers and file lengths

**Organization**: ✅ Logical, easy-to-navigate structure
- Clear section headings
- Numbered or bulleted lists
- Code blocks with syntax highlighting
- Tables for metrics and comparisons
- Proper markdown formatting

**Comprehensiveness**: ✅ Nothing important is left out
- Every file edited is documented
- Every command executed is shown
- Every user interaction is captured
- Full before/after for all changes
- All git operations logged

### Minimum Sections Required
1. ✅ Conversation flow with all user messages
2. ✅ Detailed technical execution for each major action
3. ✅ Complete code/content changes with diffs
4. ✅ All command outputs and results
5. ✅ Git history (if applicable)
6. ✅ Summary metrics and timeline
7. ✅ Complete status indicators

### Trigger Phrases
Create session archive when user says:
- "save this conversation"
- "store this session"
- "archive this conversation"
- "save this to conversations"
- "create a session file"
- "store this in [folder]"

### Special Instructions
- **Timestamps**: Include session date (today's date in YYYY-MM-DD format)
- **Tool Calls**: Show every bash command, read operation, edit operation
- **Outputs**: Capture actual tool outputs, not summaries
- **Code Context**: Show surrounding code and file context when possible
- **Security**: Highlight any security considerations or patterns
- **Completeness Check**: Verify every action in conversation is documented

---
