# Testing Documentation

## Overview

This project has comprehensive unit tests for both the CLI and Web UI components.

## Test Infrastructure

### CLI Tests
- **Config:** `jest.config.ts`
- **Environment:** Node.js
- **File:** `groq.test.ts`
- **Run:** `npm test`

### Web UI Tests
- **Config:** `jest.config.web.ts`
- **Environment:** jsdom (browser simulation)
- **File:** `web/app.test.ts`
- **Run:** `npm run test:web`

## Test Commands

```bash
# Run CLI tests only
npm test

# Run Web UI tests only
npm run test:web

# Run all tests (CLI + Web UI)
npm run test:all

# Run Web UI tests in watch mode
npm run test:watch

# Run Web UI tests with coverage report
npm run test:coverage
```

## Web UI Test Coverage

### 1. HTML Structure Tests (15 tests)
Validates that all required DOM elements exist:

#### Modal Elements
- ✅ API key modal exists
- ✅ API key input has correct attributes (type="password", placeholder)
- ✅ Save button exists
- ✅ Error message element exists

#### Sidebar Elements
- ✅ Sidebar container exists
- ✅ New chat button exists
- ✅ Chat history list exists
- ✅ API info toggle button exists
- ✅ Settings toggle button exists
- ✅ Clear API key button exists with danger styling

#### Chat Area Elements
- ✅ Sidebar toggle button exists
- ✅ Chat title displays correctly
- ✅ Model select dropdown exists
- ✅ Download button exists
- ✅ Message input textarea exists with placeholder
- ✅ Send button exists
- ✅ Messages container exists

### 2. API Key Validation Tests (4 tests)
Ensures proper API key validation:
- ✅ Valid API key starts with "gsk_"
- ✅ Invalid API key rejection
- ✅ Empty API key rejection
- ✅ Whitespace trimming

### 3. LocalStorage Operations Tests (4 tests)
Tests browser storage functionality:
- ✅ Store API key in localStorage
- ✅ Retrieve API key from localStorage
- ✅ Remove API key from localStorage
- ✅ Store sidebar state

### 4. Panel Toggle Behavior Tests (4 tests)
Tests expandable panel functionality:
- ✅ Settings panel starts collapsed
- ✅ API info panel starts collapsed
- ✅ Settings panel toggle works
- ✅ API info panel toggle works

### 5. Sidebar Toggle Tests (3 tests)
Tests sidebar show/hide functionality:
- ✅ Sidebar collapse
- ✅ Sidebar expand
- ✅ Overlay visibility toggle

### 6. Model Configuration Tests (1 test)
Tests dynamic model selection:
- ✅ Model select populated from shared config

### 7. Message Input Tests (4 tests)
Tests message input functionality:
- ✅ Input accepts text
- ✅ Input can be cleared
- ✅ Whitespace trimming
- ✅ Empty message validation

### 8. API Key Display Masking Tests (3 tests)
Tests API key security features:
- ✅ Long API key masking (gsk_...cdef)
- ✅ Short API key default mask
- ✅ No key placeholder

### 9. Confirm Dialog Tests (2 tests)
Tests user confirmation flows:
- ✅ Confirmation dialog shows
- ✅ User can cancel

### 10. Keyboard Shortcuts Tests (2 tests)
Tests keyboard interactions:
- ✅ Enter key detection
- ✅ Ctrl+Enter combination

### 11. Chat Title Generation Tests (2 tests)
Tests automatic title creation:
- ✅ Long message truncation (30 chars + "...")
- ✅ Short message preservation

### 12. Modal Visibility Tests (2 tests)
Tests modal show/hide:
- ✅ Modal can be shown
- ✅ Modal can be hidden

### 13. Error Message Display Tests (2 tests)
Tests error UI:
- ✅ Error message can be shown
- ✅ Error message can be hidden

### 14. Input Events Tests (2 tests)
Tests event handling:
- ✅ Input event clears errors
- ✅ Keydown event capture

## Total Test Count

- **CLI Tests:** 6 tests
- **Web UI Tests:** 50 tests
- **Total:** 56 tests

## Test Coverage Goals

### Current Coverage
- ✅ HTML structure validation
- ✅ API key validation and storage
- ✅ UI interactions (toggles, clicks)
- ✅ Keyboard shortcuts
- ✅ LocalStorage operations
- ✅ Error handling UI

### Future Coverage (TODO)
- ⏳ IndexedDB operations
- ⏳ API calls to Groq
- ⏳ Message rendering
- ⏳ Markdown parsing
- ⏳ Chat history management
- ⏳ File download functionality
- ⏳ Streaming responses
- ⏳ Model selection integration

## Mocked Browser APIs

The test setup (`web/test-setup.ts`) mocks the following browser APIs:
- `localStorage` - Key-value storage
- `indexedDB` - Database operations
- `fetch` - HTTP requests
- `window.scrollTo` - Scroll behavior
- `window.alert` - Alert dialogs
- `window.confirm` - Confirmation dialogs
- `TextEncoder/TextDecoder` - Text encoding

## Running Tests in CI/CD

Tests are designed to run in CI/CD environments. Example GitHub Actions workflow:

```yaml
- name: Install dependencies
  run: npm ci

- name: Run CLI tests
  run: npm test

- name: Run Web UI tests
  run: npm run test:web

- name: Generate coverage report
  run: npm run test:coverage
```

## Writing New Tests

### For HTML Structure
```typescript
test('element exists', () => {
  const element = document.getElementById('my-element');
  expect(element).toBeInTheDocument();
});
```

### For Interactions
```typescript
test('button click works', () => {
  const button = document.getElementById('my-btn');
  button.click();
  // Assert expected behavior
});
```

### For LocalStorage
```typescript
test('stores data', () => {
  localStorage.setItem('key', 'value');
  expect(localStorage.getItem('key')).toBe('value');
});
```

## Test File Structure

```
simple-groq-cli/
├── groq.test.ts              # CLI tests
├── jest.config.ts            # CLI test config
├── jest.config.web.ts        # Web UI test config
└── web/
    ├── app.test.ts           # Web UI tests
    ├── test-setup.ts         # Test environment setup
    └── __mocks__/
        └── styleMock.ts      # CSS import mock
```

## Troubleshooting

### Tests fail with "TextEncoder is not defined"
The `test-setup.ts` file should polyfill this. Ensure it's loaded via `setupFilesAfterEnv`.

### Tests can't find DOM elements
Check that `testEnvironment: 'jsdom'` is set in `jest.config.web.ts`.

### localStorage is undefined
Ensure `test-setup.ts` is properly mocking localStorage.

## Best Practices

1. ✅ Each test should be independent
2. ✅ Use descriptive test names
3. ✅ Clean up after each test with `beforeEach`
4. ✅ Mock external dependencies (API calls, IndexedDB)
5. ✅ Test user interactions, not implementation details
6. ✅ Aim for high coverage on critical paths
7. ✅ Keep tests fast and focused
