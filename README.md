# Simple Groq CLI

A simple command-line interface for the Groq API, now powered by TypeScript.

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

## Usage

Before using the CLI, make sure you have your Groq API key set as an environment variable. The method for setting environment variables depends on your operating system and shell.

### Environment Setup

**For Linux/macOS (Bash/Zsh):**
```bash
export GROQ_API_KEY="your_api_key_here"
```
*(Note: For persistent storage, add this line to your shell's profile file, e.g., `~/.bashrc`, `~/.zshrc`, or `~/.profile`.)*

**For Windows PowerShell:**
```powershell
$env:GROQ_API_KEY="your_api_key_here"
```
*(Note: This command sets the variable for the current session only. To make it permanent, add this line to your PowerShell profile script by running `notepad $PROFILE` and saving the file.)*

**Important:** Replace `"your_api_key_here"` with your actual Groq API key.

Then, you can use the `groq` command as follows:

*   **To run a prompt:**
    ```bash
    groq <preset|model> "Your prompt"
    ```
    For example: `groq fast "Write a short poem about AI."`

*   **To list available model presets:**
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

| Preset  | Model                       |
| ------- | --------------------------- |
| `text`    | `llama-3.3-70b-versatile`   |
| `fast`    | `llama-3.1-8b-instant`      |
| `heavy`   | `llama3-70b-8192`           |
| `code`    | `llama-3.3-70b-versatile`   |
| `mixtral` | `mixtral-8x7b-32768`        |
| `gemma`   | `gemma-7b-it`               |
