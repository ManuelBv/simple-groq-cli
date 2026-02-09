# Simple Groq CLI

A simple command-line interface for the Groq API.

## Installation

To make the `groq` command work from any folder, you need to globally link this repository. Here are the steps:

1.  **Clone the repository (if you haven't already):**
    If you are moving this project to a new machine, you will need to clone it first.

2.  **Navigate to the project directory:**

    ```bash
    cd simple-groq-cli
    ```

3.  **Install dependencies:**

    ```bash
    npm install
    ```

4.  **Build the TypeScript code:**

    ```bash
    npm run build
    ```

    This command compiles the TypeScript files (`.ts`) into JavaScript files (`.js`) in the `dist` directory.

5.  **Link the package globally:**
    ```bash
    npm link
    ```

### How `npm link` works

The `npm link` command creates a symbolic link (a shortcut) from a global directory that is part of your system's `PATH` to the local project directory where you ran the command.

This means that when you type `groq` in your terminal, your system will find the symbolic link, which points to the compiled `dist/groq.js` file in this project, and execute it. This is how you can run the command from any folder on your system.

## Web Version (Bring Your Own Key)

A web-based version of this tool is available, allowing you to use Groq models directly from your browser without installing anything.

**Core Features:**
- **Bring Your Own Key (BYOK):** Your API key is stored locally in your browser and never sent to any intermediate server
- **Direct Connection:** Connects directly to Groq's API from your browser
- **Chat History:** Saves conversations locally using IndexedDB
- **Markdown Support:** Renders responses with proper formatting, code blocks, and syntax highlighting
- **Model Selection:** Switch between multiple Groq models (Llama 3.3, 3.1, Qwen 3, Llama 4)

**UI Enhancements:**
- **Collapsible Sidebar:** History panel with hamburger menu (default: closed)
- **Settings Panel:** Manage your API key with show/hide toggle
- **Message Timestamps:** All messages display when they were sent (24-hour format)
- **Think Tag Support:** Special styling for `<think>` reasoning blocks from Groq API
- **Enhanced Export:** Download conversations as markdown with timestamps and model info
- **Keyboard Shortcuts:** Ctrl+Enter to send messages, Enter for new lines
- **Mobile Responsive:** Sidebar overlay design optimized for mobile devices
- **Debug Console:** Built-in error logging for troubleshooting API issues

**[👉 Click here to use the Web Version](https://ManuelBv.github.io/simple-groq-cli/)**

## Usage

Before using the CLI, make sure you have your Groq API key set as an environment variable. The method for setting environment variables depends on your operating system and shell.

### Environment Setup

**For Linux/macOS (Bash/Zsh):**

```bash
export GROQ_API_KEY="your_api_key_here"
```

_(Note: For persistent storage, add this line to your shell's profile file, e.g., `~/.bashrc`, `~/.zshrc`, or `~/.profile`.)_

**For Windows PowerShell:**

```powershell
$env:GROQ_API_KEY="your_api_key_here"
```

_(Note: This command sets the variable for the current session only. To make it permanent, add this line to your PowerShell profile script by running `notepad $PROFILE` and saving the file.)_

**Important:** Replace `"your_api_key_here"` with your actual Groq API key.

Then, you can use the `groq` command as follows:

- **To run a prompt:**

  ```bash
  groq <preset|model> "Your prompt"
  ```

  For example: `groq fast "Write a short poem about AI."`

- **To list available model presets:**
  ```bash
  groq --list
  ```

### Running from source (development)

During development, you might want to run the TypeScript code directly without building it first. You can do this using `ts-node`:

```bash
ts-node groq.ts <preset|model> "Your prompt"
```

### Running Tests

To run the unit tests:

```bash
npm test
```

### Presets

| Preset   | Model                                       |
| -------- | ------------------------------------------- |
| `text`   | `llama-3.3-70b-versatile`                   |
| `fast`   | `llama-3.1-8b-instant`                      |
| `heavy`  | `llama-3.3-70b-versatile`                   |
| `code`   | `llama-3.3-70b-versatile`                   |
| `qwen`   | `qwen/qwen3-32b`                            |
| `llama4` | `meta-llama/llama-4-scout-17b-16e-instruct` |
