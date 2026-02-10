# Web UI Test Checklist

## Installation Required

Before running tests, install the test dependencies:
```bash
npm install
```

This will install:
- `jest-environment-jsdom` - Browser environment for tests
- `@testing-library/dom` - DOM testing utilities
- `@testing-library/jest-dom` - Custom matchers

## Test Categories

### ✅ HTML Structure (15 tests)
- [x] Modal elements (input, button, error)
- [x] Sidebar elements (history, buttons, panels)
- [x] Chat area (header, messages, input)

### ✅ API Key Management (7 tests)
- [x] Validation (gsk_ prefix)
- [x] LocalStorage save/retrieve/remove
- [x] Display masking
- [x] Visibility toggle

### ✅ UI Interactions (9 tests)
- [x] Settings panel toggle
- [x] API info panel toggle
- [x] Sidebar collapse/expand
- [x] Modal show/hide
- [x] Error message display

### ✅ User Input (8 tests)
- [x] Message input text entry
- [x] Input clearing
- [x] Whitespace trimming
- [x] Empty validation
- [x] Keyboard shortcuts (Enter, Ctrl+Enter)

### ✅ Features (11 tests)
- [x] Confirmation dialogs
- [x] Chat title generation
- [x] Model select population
- [x] Event handling
- [x] Input event listeners

## Test Execution

```bash
# Run all Web UI tests
npm run test:web

# Run tests in watch mode (auto-rerun on file changes)
npm run test:watch

# Run with coverage report
npm run test:coverage

# Run all tests (CLI + Web)
npm run test:all
```

## Expected Output

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
      ...
    Chat Area Elements
      ✓ Sidebar toggle button exists
      ...

  Web UI - API Key Validation
    ✓ Valid API key starts with gsk_
    ✓ Invalid API key does not start with gsk_
    ...

Test Suites: 1 passed, 1 total
Tests:       50 passed, 50 total
```

## Coverage Report

When running `npm run test:coverage`, you'll see:

```
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------|---------|----------|---------|---------|-------------------
app.ts    |   XX.XX |    XX.XX |   XX.XX |   XX.XX | ...
```

## What's Tested

### Critical User Flows
1. **New User Setup**
   - Modal appears ✅
   - Enter API key ✅
   - Validation ✅
   - Save to localStorage ✅

2. **API Key Management**
   - View masked key ✅
   - Toggle visibility ✅
   - Clear with confirmation ✅

3. **Chat Interface**
   - Type message ✅
   - Send message (UI only) ✅
   - View history ✅
   - Select model ✅

4. **Settings & Info**
   - Toggle settings panel ✅
   - Toggle API info panel ✅
   - Toggle sidebar ✅

## What's NOT Tested Yet

These require integration/E2E tests:
- ⏳ Actual API calls to Groq
- ⏳ IndexedDB conversation storage
- ⏳ Message streaming
- ⏳ Markdown rendering output
- ⏳ File downloads
- ⏳ Real user workflows end-to-end

## Adding New Tests

When adding new features, add tests in `web/app.test.ts`:

```typescript
describe('My New Feature', () => {
  beforeEach(() => {
    // Setup
  });

  test('should do something', () => {
    // Arrange
    const element = document.getElementById('my-element');

    // Act
    element.click();

    // Assert
    expect(element).toHaveClass('active');
  });
});
```

## Troubleshooting

### "jest-environment-jsdom cannot be found"
Run: `npm install`

### "localStorage is not defined"
Check that `web/test-setup.ts` is loaded

### "Element not found"
Ensure HTML is created in `beforeEach` block

### Tests are slow
Use `test.only()` to run specific tests during development
