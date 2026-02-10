# Testing Troubleshooting Guide

## Running Tests in Termux

If you encounter permission errors when running tests, try these solutions:

### Quick Fix - Use the Helper Script

```bash
chmod +x run-tests.sh
./run-tests.sh
```

### Manual Test Execution

#### Option 1: Run tests separately
```bash
# Run CLI tests (should always work)
npx jest --config jest.config.ts

# Run Web UI tests
npx jest --config jest.config.web.ts
```

#### Option 2: Direct Jest execution
```bash
# From project root
./node_modules/.bin/jest --config jest.config.ts
./node_modules/.bin/jest --config jest.config.web.ts
```

#### Option 3: Using npm scripts
```bash
npm test           # CLI tests only
npm run test:web   # Web UI tests only
```

### Common Issues

#### 1. "EACCES: permission denied, mkdir"

This is usually a temp directory permission issue. Try:

```bash
# Set custom temp directory
export TMPDIR=$HOME/.tmp
mkdir -p $TMPDIR

# Then run tests
npm test
npm run test:web
```

#### 2. "jest-environment-jsdom cannot be found"

Install dependencies:
```bash
npm install
```

#### 3. "document is not defined"

This means web tests are running in node environment. Verify:
```bash
# Check jest configs
cat jest.config.ts | grep testEnvironment     # Should be 'node'
cat jest.config.web.ts | grep testEnvironment # Should be 'jsdom'

# Check exclusions
cat jest.config.ts | grep testPathIgnorePatterns  # Should include '/web/'
```

#### 4. Tests won't run at all

Clear cache and try again:
```bash
npx jest --clearCache
npm test
```

### Verify Test Configuration

Run this diagnostic:

```bash
echo "=== Test Configuration Check ==="
echo ""
echo "CLI Config (jest.config.ts):"
cat jest.config.ts
echo ""
echo "Web Config (jest.config.web.ts):"
cat jest.config.web.ts
echo ""
echo "Test files found:"
find . -name "*.test.ts" -not -path "./node_modules/*"
```

### Expected Test Results

#### CLI Tests (6 tests)
```
PASS  ./groq.test.ts
  runCli
    ✓ should print available presets with --list and exit with code 0
    ✓ should print usage if no model or prompt is provided
    ✓ should print an error if GROQ_API_KEY is not set
    ✓ should call Groq API with preset model and prompt
    ✓ should call Groq API with custom model and prompt
    ✓ should handle API errors and exit with code 1

Test Suites: 1 passed, 1 total
Tests:       6 passed, 6 total
```

#### Web UI Tests (50 tests)
```
PASS  web/app.test.ts
  Web UI - HTML Structure
    Modal Elements
      ✓ API key modal exists
      ✓ API key input exists with correct attributes
      ✓ Save API key button exists
      ✓ Error message element exists
    Sidebar Elements
      ✓ Sidebar exists
      ✓ New chat button exists
      ✓ Chat history list exists
      ✓ API info toggle button exists
      ✓ Settings toggle button exists
      ✓ Clear API key button exists
    Chat Area Elements
      ✓ Sidebar toggle button exists
      ✓ Current chat title exists
      ✓ Model select dropdown exists
      ✓ Download chat button exists
      ✓ Message input textarea exists
      ✓ Send button exists
      ✓ Messages container exists
  Web UI - API Key Validation
    ✓ Valid API key starts with gsk_
    ✓ Invalid API key does not start with gsk_
    ✓ Empty API key is invalid
    ✓ API key with whitespace should be trimmed
  Web UI - LocalStorage Operations
    ✓ Can store API key in localStorage
    ✓ Can retrieve API key from localStorage
    ✓ Can remove API key from localStorage
    ✓ Can store sidebar state
  Web UI - Panel Toggle Behavior
    ✓ Settings panel starts collapsed
    ✓ API info panel starts collapsed
    ✓ Clicking settings button should toggle panel
    ✓ Clicking API info button should toggle panel
  Web UI - Sidebar Toggle
    ✓ Sidebar can be collapsed
    ✓ Sidebar can be expanded
    ✓ Overlay visibility can be toggled
  Web UI - Model Configuration
    ✓ Model select should be populated dynamically
  Web UI - Message Input
    ✓ Message input accepts text
    ✓ Message input can be cleared
    ✓ Trimming whitespace from message
    ✓ Empty message after trim should be invalid
  Web UI - API Key Display Masking
    ✓ Long API key should be masked
    ✓ Short API key should show default mask
    ✓ No API key should show placeholder
  Web UI - Confirm Dialog
    ✓ Clear API key should show confirmation
    ✓ User can cancel clear API key
  Web UI - Keyboard Shortcuts
    ✓ Enter key code is correct
    ✓ Ctrl+Enter combination
  Web UI - Chat Title Generation
    ✓ Long message should be truncated for title
    ✓ Short message should not be truncated
  Web UI - Modal Visibility
    ✓ Modal can be shown
    ✓ Modal can be hidden
  Web UI - Error Message Display
    ✓ Error message can be shown
    ✓ Error message can be hidden
  Web UI - Input Events
    ✓ Input event clears error on typing
    ✓ Keydown event can be captured

Test Suites: 1 passed, 1 total
Tests:       50 passed, 50 total
```

### Alternative: Run Tests Without npm

If npm commands are problematic, run Jest directly:

```bash
# Install dependencies first
node node_modules/npm/bin/npm-cli.js install

# Run tests directly
node node_modules/jest/bin/jest.js --config jest.config.ts
node node_modules/jest/bin/jest.js --config jest.config.web.ts
```

### Termux-Specific Issues

#### Storage permissions
```bash
termux-setup-storage
```

#### Node.js version
```bash
node --version  # Should be v18 or higher
npm --version   # Should be v9 or higher
```

#### Update packages
```bash
pkg update && pkg upgrade
pkg install nodejs
```

### Still Having Issues?

1. Check Node.js is installed: `which node`
2. Check npm is installed: `which npm`
3. Verify you're in project directory: `pwd`
4. Check package.json exists: `ls -la package.json`
5. Verify node_modules exists: `ls -la node_modules/jest`

### Success Criteria

When tests pass, you should see:

```
✅ All 56 tests passed (6 CLI + 50 Web UI)
✅ 0 failures
✅ No errors or warnings
```

### Getting Help

If tests still fail:

1. Share the full error output
2. Check Node.js version: `node --version`
3. Check npm version: `npm --version`
4. Check Jest is installed: `ls node_modules/.bin/jest`
5. Try reinstalling: `rm -rf node_modules && npm install`
