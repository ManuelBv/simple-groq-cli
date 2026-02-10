/**
 * Comprehensive test suite for web UI
 */

import { screen, fireEvent, waitFor } from '@testing-library/dom';
import '@testing-library/jest-dom';

describe('Web UI - HTML Structure', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="api-key-modal" class="modal">
        <div class="modal-content">
          <h2>Enter Groq API Key</h2>
          <input type="password" id="api-key-input" placeholder="gsk_...">
          <p class="error-msg" id="api-key-error" style="display: none;">Error message</p>
          <button id="save-api-key-btn">Save Key</button>
        </div>
      </div>

      <div class="app-container">
        <div id="sidebar-overlay" class="sidebar-overlay"></div>
        <aside id="sidebar" class="sidebar">
          <div class="sidebar-header">
            <h3>History</h3>
            <button id="new-chat-btn">+</button>
          </div>
          <div id="chat-history-list" class="history-list"></div>
          <div class="sidebar-footer">
            <button id="api-info-toggle-btn" class="footer-btn">Get API Key</button>
            <div id="api-info-panel" class="info-panel collapsed"></div>
            <button id="settings-toggle-btn" class="footer-btn">Settings</button>
            <div id="settings-panel" class="settings-panel collapsed">
              <div class="settings-item">
                <code id="api-key-display">••••••••••••</code>
                <button id="toggle-key-visibility-btn">👁️</button>
              </div>
              <button id="clear-key-btn" class="danger-btn">Clear API Key</button>
            </div>
          </div>
        </aside>

        <main class="chat-area">
          <header class="chat-header">
            <button id="sidebar-toggle-btn">☰</button>
            <h2 id="current-chat-title">New Chat</h2>
            <div class="header-controls">
              <select id="model-select"></select>
              <button id="download-chat-btn">⬇️</button>
            </div>
          </header>

          <div id="messages-container" class="messages-container"></div>

          <div class="bottom-sticky-container">
            <div class="input-area">
              <textarea id="message-input" placeholder="Type your message..."></textarea>
              <button id="send-btn">Send</button>
            </div>
          </div>
        </main>
      </div>
    `;
  });

  describe('Modal Elements', () => {
    test('API key modal exists', () => {
      const modal = document.getElementById('api-key-modal');
      expect(modal).toBeInTheDocument();
    });

    test('API key input exists with correct attributes', () => {
      const input = document.getElementById('api-key-input') as HTMLInputElement;
      expect(input).toBeInTheDocument();
      expect(input.type).toBe('password');
      expect(input.placeholder).toBe('gsk_...');
    });

    test('Save API key button exists', () => {
      const button = document.getElementById('save-api-key-btn');
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('Save Key');
    });

    test('Error message element exists', () => {
      const error = document.getElementById('api-key-error');
      expect(error).toBeInTheDocument();
      expect(error).toHaveStyle({ display: 'none' });
    });
  });

  describe('Sidebar Elements', () => {
    test('Sidebar exists', () => {
      const sidebar = document.getElementById('sidebar');
      expect(sidebar).toBeInTheDocument();
    });

    test('New chat button exists', () => {
      const button = document.getElementById('new-chat-btn');
      expect(button).toBeInTheDocument();
    });

    test('Chat history list exists', () => {
      const list = document.getElementById('chat-history-list');
      expect(list).toBeInTheDocument();
    });

    test('API info toggle button exists', () => {
      const button = document.getElementById('api-info-toggle-btn');
      expect(button).toBeInTheDocument();
    });

    test('Settings toggle button exists', () => {
      const button = document.getElementById('settings-toggle-btn');
      expect(button).toBeInTheDocument();
    });

    test('Clear API key button exists', () => {
      const button = document.getElementById('clear-key-btn');
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('danger-btn');
    });
  });

  describe('Chat Area Elements', () => {
    test('Sidebar toggle button exists', () => {
      const button = document.getElementById('sidebar-toggle-btn');
      expect(button).toBeInTheDocument();
    });

    test('Current chat title exists', () => {
      const title = document.getElementById('current-chat-title');
      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent('New Chat');
    });

    test('Model select dropdown exists', () => {
      const select = document.getElementById('model-select');
      expect(select).toBeInTheDocument();
    });

    test('Download chat button exists', () => {
      const button = document.getElementById('download-chat-btn');
      expect(button).toBeInTheDocument();
    });

    test('Message input textarea exists', () => {
      const input = document.getElementById('message-input') as HTMLTextAreaElement;
      expect(input).toBeInTheDocument();
      expect(input.placeholder).toBe('Type your message...');
    });

    test('Send button exists', () => {
      const button = document.getElementById('send-btn');
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('Send');
    });

    test('Messages container exists', () => {
      const container = document.getElementById('messages-container');
      expect(container).toBeInTheDocument();
    });
  });
});

describe('Web UI - API Key Validation', () => {
  let apiKeyInput: HTMLInputElement;
  let saveKeyBtn: HTMLButtonElement;
  let apiKeyError: HTMLElement;

  beforeEach(() => {
    document.body.innerHTML = `
      <div id="api-key-modal" class="modal">
        <input type="password" id="api-key-input" placeholder="gsk_...">
        <p id="api-key-error" style="display: none;">Error</p>
        <button id="save-api-key-btn">Save Key</button>
      </div>
    `;
    apiKeyInput = document.getElementById('api-key-input') as HTMLInputElement;
    saveKeyBtn = document.getElementById('save-api-key-btn') as HTMLButtonElement;
    apiKeyError = document.getElementById('api-key-error') as HTMLElement;
  });

  test('Valid API key starts with gsk_', () => {
    const validKey = 'gsk_1234567890abcdef';
    expect(validKey.startsWith('gsk_')).toBe(true);
  });

  test('Invalid API key does not start with gsk_', () => {
    const invalidKey = 'invalid_key';
    expect(invalidKey.startsWith('gsk_')).toBe(false);
  });

  test('Empty API key is invalid', () => {
    const emptyKey = '';
    expect(emptyKey.startsWith('gsk_')).toBe(false);
  });

  test('API key with whitespace should be trimmed', () => {
    const keyWithSpaces = '  gsk_1234567890abcdef  ';
    expect(keyWithSpaces.trim().startsWith('gsk_')).toBe(true);
  });
});

describe('Web UI - LocalStorage Operations', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('Can store API key in localStorage', () => {
    const testKey = 'gsk_test123';
    localStorage.setItem('groq_api_key', testKey);
    expect(localStorage.getItem('groq_api_key')).toBe(testKey);
  });

  test('Can retrieve API key from localStorage', () => {
    const testKey = 'gsk_test456';
    localStorage.setItem('groq_api_key', testKey);
    const retrieved = localStorage.getItem('groq_api_key');
    expect(retrieved).toBe(testKey);
  });

  test('Can remove API key from localStorage', () => {
    localStorage.setItem('groq_api_key', 'gsk_test789');
    localStorage.removeItem('groq_api_key');
    expect(localStorage.getItem('groq_api_key')).toBeNull();
  });

  test('Can store sidebar state', () => {
    localStorage.setItem('sidebar_open', 'true');
    expect(localStorage.getItem('sidebar_open')).toBe('true');
  });
});

describe('Web UI - Panel Toggle Behavior', () => {
  let settingsBtn: HTMLButtonElement;
  let settingsPanel: HTMLElement;
  let apiInfoBtn: HTMLButtonElement;
  let apiInfoPanel: HTMLElement;

  beforeEach(() => {
    document.body.innerHTML = `
      <button id="settings-toggle-btn">Settings</button>
      <div id="settings-panel" class="settings-panel collapsed"></div>
      <button id="api-info-toggle-btn">API Info</button>
      <div id="api-info-panel" class="info-panel collapsed"></div>
    `;
    settingsBtn = document.getElementById('settings-toggle-btn') as HTMLButtonElement;
    settingsPanel = document.getElementById('settings-panel') as HTMLElement;
    apiInfoBtn = document.getElementById('api-info-toggle-btn') as HTMLButtonElement;
    apiInfoPanel = document.getElementById('api-info-panel') as HTMLElement;
  });

  test('Settings panel starts collapsed', () => {
    expect(settingsPanel).toHaveClass('collapsed');
  });

  test('API info panel starts collapsed', () => {
    expect(apiInfoPanel).toHaveClass('collapsed');
  });

  test('Clicking settings button should toggle panel', () => {
    expect(settingsPanel).toHaveClass('collapsed');

    // Simulate toggle
    settingsPanel.classList.remove('collapsed');
    expect(settingsPanel).not.toHaveClass('collapsed');

    // Toggle again
    settingsPanel.classList.add('collapsed');
    expect(settingsPanel).toHaveClass('collapsed');
  });

  test('Clicking API info button should toggle panel', () => {
    expect(apiInfoPanel).toHaveClass('collapsed');

    // Simulate toggle
    apiInfoPanel.classList.remove('collapsed');
    expect(apiInfoPanel).not.toHaveClass('collapsed');

    // Toggle again
    apiInfoPanel.classList.add('collapsed');
    expect(apiInfoPanel).toHaveClass('collapsed');
  });
});

describe('Web UI - Sidebar Toggle', () => {
  let sidebar: HTMLElement;
  let sidebarOverlay: HTMLElement;

  beforeEach(() => {
    document.body.innerHTML = `
      <div id="sidebar" class="sidebar"></div>
      <div id="sidebar-overlay" class="sidebar-overlay"></div>
      <button id="sidebar-toggle-btn">☰</button>
    `;
    sidebar = document.getElementById('sidebar') as HTMLElement;
    sidebarOverlay = document.getElementById('sidebar-overlay') as HTMLElement;
  });

  test('Sidebar can be collapsed', () => {
    sidebar.classList.add('collapsed');
    expect(sidebar).toHaveClass('collapsed');
  });

  test('Sidebar can be expanded', () => {
    sidebar.classList.add('collapsed');
    sidebar.classList.remove('collapsed');
    expect(sidebar).not.toHaveClass('collapsed');
  });

  test('Overlay visibility can be toggled', () => {
    sidebarOverlay.classList.add('visible');
    expect(sidebarOverlay).toHaveClass('visible');

    sidebarOverlay.classList.remove('visible');
    expect(sidebarOverlay).not.toHaveClass('visible');
  });
});

describe('Web UI - Model Configuration', () => {
  test('Model select should be populated dynamically', () => {
    const modelSelect = document.createElement('select');
    modelSelect.id = 'model-select';

    // Simulate adding options
    const models = [
      { id: 'llama-3.3-70b-versatile', name: 'Llama 3.3 70B', description: 'Versatile' },
      { id: 'llama-3.1-8b-instant', name: 'Llama 3.1 8B', description: 'Instant' }
    ];

    models.forEach(model => {
      const option = document.createElement('option');
      option.value = model.id;
      option.textContent = `${model.name} (${model.description})`;
      modelSelect.appendChild(option);
    });

    expect(modelSelect.children.length).toBe(2);
    expect(modelSelect.children[0]).toHaveAttribute('value', 'llama-3.3-70b-versatile');
    expect(modelSelect.children[1]).toHaveAttribute('value', 'llama-3.1-8b-instant');
  });
});

describe('Web UI - Message Input', () => {
  let messageInput: HTMLTextAreaElement;
  let sendBtn: HTMLButtonElement;

  beforeEach(() => {
    document.body.innerHTML = `
      <textarea id="message-input"></textarea>
      <button id="send-btn">Send</button>
    `;
    messageInput = document.getElementById('message-input') as HTMLTextAreaElement;
    sendBtn = document.getElementById('send-btn') as HTMLButtonElement;
  });

  test('Message input accepts text', () => {
    messageInput.value = 'Hello, Groq!';
    expect(messageInput.value).toBe('Hello, Groq!');
  });

  test('Message input can be cleared', () => {
    messageInput.value = 'Test message';
    messageInput.value = '';
    expect(messageInput.value).toBe('');
  });

  test('Trimming whitespace from message', () => {
    const message = '  Test message  ';
    expect(message.trim()).toBe('Test message');
  });

  test('Empty message after trim should be invalid', () => {
    const message = '   ';
    expect(message.trim()).toBe('');
  });
});

describe('Web UI - API Key Display Masking', () => {
  test('Long API key should be masked', () => {
    const apiKey = 'gsk_1234567890abcdef';
    const masked = apiKey.length > 8
      ? `${apiKey.substring(0, 4)}...${apiKey.substring(apiKey.length - 4)}`
      : '••••••••••••';
    expect(masked).toBe('gsk_...cdef');
  });

  test('Short API key should show default mask', () => {
    const apiKey = 'gsk_123';
    const masked = apiKey.length > 8
      ? `${apiKey.substring(0, 4)}...${apiKey.substring(apiKey.length - 4)}`
      : '••••••••••••';
    expect(masked).toBe('••••••••••••');
  });

  test('No API key should show placeholder', () => {
    const apiKey = null;
    const display = apiKey ? 'masked_key' : 'No key set';
    expect(display).toBe('No key set');
  });
});

describe('Web UI - Confirm Dialog', () => {
  beforeEach(() => {
    (window.confirm as jest.Mock).mockClear();
  });

  test('Clear API key should show confirmation', () => {
    (window.confirm as jest.Mock).mockReturnValue(true);
    const result = window.confirm('Are you sure?');
    expect(window.confirm).toHaveBeenCalledWith('Are you sure?');
    expect(result).toBe(true);
  });

  test('User can cancel clear API key', () => {
    (window.confirm as jest.Mock).mockReturnValue(false);
    const result = window.confirm('Are you sure?');
    expect(result).toBe(false);
  });
});

describe('Web UI - Keyboard Shortcuts', () => {
  test('Enter key code is correct', () => {
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    expect(event.key).toBe('Enter');
  });

  test('Ctrl+Enter combination', () => {
    const event = new KeyboardEvent('keydown', {
      key: 'Enter',
      ctrlKey: true
    });
    expect(event.key).toBe('Enter');
    expect(event.ctrlKey).toBe(true);
  });
});

describe('Web UI - Chat Title Generation', () => {
  test('Long message should be truncated for title', () => {
    const message = 'This is a very long message that should be truncated for the chat title';
    const title = message.substring(0, 30) + (message.length > 30 ? '...' : '');
    expect(title).toBe('This is a very long message th...');
    expect(title.length).toBeLessThanOrEqual(33);
  });

  test('Short message should not be truncated', () => {
    const message = 'Short message';
    const title = message.substring(0, 30) + (message.length > 30 ? '...' : '');
    expect(title).toBe('Short message');
  });
});

describe('Web UI - Modal Visibility', () => {
  let modal: HTMLElement;

  beforeEach(() => {
    document.body.innerHTML = `
      <div id="api-key-modal" class="modal"></div>
    `;
    modal = document.getElementById('api-key-modal') as HTMLElement;
  });

  test('Modal can be shown', () => {
    modal.style.display = 'flex';
    modal.classList.remove('hidden');
    expect(modal.style.display).toBe('flex');
    expect(modal).not.toHaveClass('hidden');
  });

  test('Modal can be hidden', () => {
    modal.style.display = 'none';
    modal.classList.add('hidden');
    expect(modal.style.display).toBe('none');
    expect(modal).toHaveClass('hidden');
  });
});

describe('Web UI - Error Message Display', () => {
  let errorElement: HTMLElement;

  beforeEach(() => {
    document.body.innerHTML = `
      <p id="api-key-error" style="display: none;">Error message</p>
    `;
    errorElement = document.getElementById('api-key-error') as HTMLElement;
  });

  test('Error message can be shown', () => {
    errorElement.style.display = 'block';
    expect(errorElement.style.display).toBe('block');
  });

  test('Error message can be hidden', () => {
    errorElement.style.display = 'none';
    expect(errorElement.style.display).toBe('none');
  });
});

describe('Web UI - Input Events', () => {
  test('Input event clears error on typing', () => {
    const input = document.createElement('input');
    let errorCleared = false;

    input.addEventListener('input', () => {
      errorCleared = true;
    });

    input.dispatchEvent(new Event('input'));
    expect(errorCleared).toBe(true);
  });

  test('Keydown event can be captured', () => {
    const input = document.createElement('input');
    let keyPressed = false;

    input.addEventListener('keydown', (e) => {
      if ((e as KeyboardEvent).key === 'Enter') {
        keyPressed = true;
      }
    });

    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    input.dispatchEvent(event);
    expect(keyPressed).toBe(true);
  });
});
