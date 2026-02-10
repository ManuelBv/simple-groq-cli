# Simple Groq CLI

A simple command-line interface and web application for interacting with the Groq API.

## 📋 Project Overview

This project provides two ways to interact with Groq's powerful language models:

1. **CLI Tool** - Command-line interface for terminal use
2. **Web Interface** - Browser-based chat UI (no installation required)

Both tools allow you to:
- Use multiple Groq models (Llama 3.3, 3.1, Qwen 3, Llama 4)
- Generate AI responses from prompts
- Bring Your Own API Key (BYOK)
- Work with streaming responses

**Technology Stack:**
- TypeScript
- Node.js
- Groq SDK
- Vite (Web UI)
- Jest (Testing)

---

## 🖥️ CLI Tool

### Installation

To make the `groq` command work from any folder:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ManuelBv/simple-groq-cli.git
   cd simple-groq-cli
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Build the TypeScript code:**
   ```bash
   npm run build
   ```

4. **Link the package globally:**
   ```bash
   npm link
   ```

#### How `npm link` works

The `npm link` command creates a symbolic link from a global directory in your system's `PATH` to the local project directory. When you type `groq` in your terminal, your system finds the symbolic link pointing to `dist/groq.js` and executes it.

### Environment Setup

Set your Groq API key as an environment variable:

**Linux/macOS (Bash/Zsh):**
```bash
export GROQ_API_KEY="your_api_key_here"
```

For persistent storage, add this line to `~/.bashrc`, `~/.zshrc`, or `~/.profile`.

**Windows PowerShell:**
```powershell
$env:GROQ_API_KEY="your_api_key_here"
```

For permanent storage, add to your PowerShell profile: `notepad $PROFILE`

### Usage

**Run a prompt:**
```bash
groq <preset|model> "Your prompt"
```

Example:
```bash
groq fast "Write a short poem about AI."
```

**List available presets:**
```bash
groq --list
```

### Available Presets

| Preset | Model | Description |
|--------|-------|-------------|
| `text` | `llama-3.3-70b-versatile` | General purpose |
| `fast` | `llama-3.1-8b-instant` | Quick responses |
| `heavy` | `llama-3.3-70b-versatile` | Complex tasks |
| `code` | `llama-3.3-70b-versatile` | Code generation |
| `qwen` | `qwen/qwen3-32b` | Qwen model |
| `llama4scout` | `meta-llama/llama-4-scout-17b-16e-instruct` | Llama 4 Scout |
| `llama4maverick` | `meta-llama/llama-4-maverick-17b-128e-instruct` | Llama 4 Maverick |

You can also use any Groq model ID directly instead of presets.

---

## 🌐 Web Interface

**[👉 Click here to use the Web Version](https://ManuelBv.github.io/simple-groq-cli/)**

### Features

**Core Functionality:**
- ✅ **Bring Your Own Key (BYOK)** - API key stored locally in browser (localStorage)
- ✅ **Direct Connection** - Connects directly to Groq's API (no proxy servers)
- ✅ **Chat History** - Conversations saved locally using IndexedDB
- ✅ **Markdown Support** - Renders responses with code blocks and syntax highlighting
- ✅ **Model Selection** - Switch between multiple Groq models mid-conversation
- ✅ **Message Timestamps** - All messages display send time (24-hour format)

**User Interface:**
- ✅ **Collapsible Sidebar** - History panel with hamburger menu (☰)
- ✅ **Settings Panel** - Manage API key with show/hide toggle
- ✅ **API Info Panel** - Instructions to get your Groq API key
- ✅ **Think Tag Support** - Special styling for `<think>` reasoning blocks
- ✅ **Enhanced Export** - Download conversations as markdown with timestamps and model info
- ✅ **Keyboard Shortcuts** - Ctrl+Enter to send, Enter for new lines
- ✅ **Mobile Responsive** - Optimized sidebar overlay for mobile devices
- ✅ **Debug Console** - Built-in error logging for troubleshooting

**Security:**
- 🔒 API key stored locally (never sent to intermediate servers)
- 🔒 Direct API communication with Groq
- 🔒 No data collection or tracking
- 🔒 Clear API key with confirmation dialog

### Getting Your API Key

1. Visit [groq.com](https://groq.com/)
2. Sign up for a free account
3. Navigate to [API Keys](https://console.groq.com/keys)
4. Create a new API key
5. Copy and paste into the web interface

---

## 🛠️ Development

### Project Structure

```
simple-groq-cli/
├── groq.ts              # CLI source code
├── groq.test.ts         # CLI tests
├── models.ts            # Shared model configuration
├── web/                 # Web UI source code
│   ├── app.ts          # Main application logic
│   ├── app.test.ts     # Web UI tests
│   ├── index.html      # HTML structure
│   ├── style.css       # Styling
│   └── test-setup.ts   # Test configuration
├── docs/               # Built web UI (GitHub Pages)
├── dist/               # Compiled CLI code
└── TESTING.md          # Testing documentation
```

### Building

**Build CLI:**
```bash
npm run build
```

**Build Web UI:**
```bash
npm run build:web
```

**Development Server (Web UI):**
```bash
npm run dev:web
```

### Testing

**Run all tests (56 tests total):**
```bash
npm run test:all
```

**Run CLI tests only (6 tests):**
```bash
npm test
```

**Run Web UI tests only (50 tests):**
```bash
npm run test:web
```

**Watch mode (for development):**
```bash
npm run test:watch
```

**Coverage report:**
```bash
npm run test:coverage
```

**Alternative test runners:**
```bash
./run-tests.sh        # Standard helper script
./test-directly.sh    # Bypasses npm (for permission issues)
```

See [TESTING.md](TESTING.md) for detailed testing documentation.

### Running from Source

During development, run TypeScript directly:

```bash
ts-node groq.ts <preset|model> "Your prompt"
```

### Adding New Models

All models are configured in `models.ts`. To add a new model:

1. Add to the `MODELS` array
2. Optionally add a CLI preset in `MODEL_PRESETS`
3. Rebuild: `npm run build && npm run build:web`

Both CLI and Web UI will automatically use the new model.

See [MODELS.md](MODELS.md) for model configuration details.

### Documentation

- **[TESTING.md](TESTING.md)** - Comprehensive testing guide
- **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - Fix common test issues
- **[MODELS.md](MODELS.md)** - Model configuration reference
- **[CLAUDE.MD](CLAUDE.MD)** - Development workflow and requirements

---

## 📝 License

ISC

## 🤝 Contributing

Contributions are welcome! Please ensure all tests pass before submitting:

```bash
npm run test:all
```

---

## 📦 NPM Scripts Reference

| Command | Description |
|---------|-------------|
| `npm run build` | Compile CLI TypeScript to JavaScript |
| `npm run build:web` | Build Web UI for production |
| `npm run dev:web` | Start Web UI development server |
| `npm test` | Run CLI tests |
| `npm run test:web` | Run Web UI tests |
| `npm run test:all` | Run all tests (required before commit) |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Generate coverage report |

---

**Made with ❤️ using Groq's powerful language models**
