import { marked } from 'marked';
import DOMPurify from 'dompurify';

// --- Types ---
interface Message {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

interface Conversation {
    id: string;
    title: string;
    messages: Message[];
    updatedAt: number;
}

// --- Constants ---
const DB_NAME = 'GroqChatDB';
const DB_VERSION = 1;
const STORE_NAME = 'conversations';
const API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL = 'llama-3.3-70b-versatile'; // Default model

// --- State ---
let db: IDBDatabase;
let currentChatId: string | null = null;
let apiKey: string | null = localStorage.getItem('groq_api_key') ? localStorage.getItem('groq_api_key')!.trim() : null;

// --- DOM Elements ---
const modal = document.getElementById('api-key-modal') as HTMLDivElement;
const apiKeyInput = document.getElementById('api-key-input') as HTMLInputElement;
const saveKeyBtn = document.getElementById('save-api-key-btn') as HTMLButtonElement;
const apiKeyError = document.getElementById('api-key-error') as HTMLParagraphElement;
const clearKeyBtn = document.getElementById('clear-key-btn') as HTMLButtonElement;

const chatHistoryList = document.getElementById('chat-history-list') as HTMLDivElement;
const newChatBtn = document.getElementById('new-chat-btn') as HTMLButtonElement;
const messagesContainer = document.getElementById('messages-container') as HTMLDivElement;
const messageInput = document.getElementById('message-input') as HTMLTextAreaElement;
const sendBtn = document.getElementById('send-btn') as HTMLButtonElement;
const currentChatTitle = document.getElementById('current-chat-title') as HTMLHeadingElement;
const downloadBtn = document.getElementById('download-chat-btn') as HTMLButtonElement;
const modelSelect = document.getElementById('model-select') as HTMLSelectElement;

// --- Debug Elements ---
const debugLog = document.getElementById('debug-log') as HTMLDivElement;
const debugContent = document.getElementById('debug-content') as HTMLPreElement;
const clearDebugBtn = document.getElementById('clear-debug-btn') as HTMLButtonElement;
const copyDebugBtn = document.getElementById('copy-debug-btn') as HTMLButtonElement;

// --- Debug Logic ---
function logError(error: any, context: string = '') {
    debugLog.style.display = 'block';
    const timestamp = new Date().toISOString();
    
    // Create masked key for debugging
    let maskedKey = 'None';
    if (apiKey) {
        if (apiKey.length > 10) {
            maskedKey = `${apiKey.substring(0, 4)}...${apiKey.substring(apiKey.length - 4)}`;
        } else {
            maskedKey = '*** (Too short)';
        }
    }

    let message = `[${timestamp}] Key: ${maskedKey}\nError ${context ? `in ${context}` : ''}:\n`;
    
    if (error instanceof Error) {
        message += `${error.name}: ${error.message}\n`;
        if (error.stack) {
            message += `Stack:\n${error.stack}\n`;
        }
    } else {
        message += JSON.stringify(error, null, 2);
    }
    
    debugContent.textContent += message + '\n-------------------\n';
    debugLog.scrollTop = debugLog.scrollHeight;
}

clearDebugBtn.onclick = () => {
    debugContent.textContent = '';
    debugLog.style.display = 'none';
};

copyDebugBtn.onclick = async () => {
    try {
        await navigator.clipboard.writeText(debugContent.textContent || '');
        const originalText = copyDebugBtn.textContent;
        copyDebugBtn.textContent = 'Copied!';
        setTimeout(() => copyDebugBtn.textContent = originalText, 2000);
    } catch (err) {
        console.error('Failed to copy', err);
        alert('Failed to copy to clipboard');
    }
};

// --- Database Init ---
function initDB(): Promise<void> {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
            db = request.result;
            resolve();
        };

        request.onupgradeneeded = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
                store.createIndex('updatedAt', 'updatedAt', { unique: false });
            }
        };
    });
}

// --- DB Operations ---
function saveConversation(conversation: Conversation): Promise<void> {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.put(conversation);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
}

function getConversation(id: string): Promise<Conversation> {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.get(id);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

function getAllConversations(): Promise<Conversation[]> {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const index = store.index('updatedAt');
        const request = index.openCursor(null, 'prev'); // Sort by newest first
        const results: Conversation[] = [];

        request.onsuccess = (event) => {
            const cursor = (event.target as IDBRequest).result;
            if (cursor) {
                results.push(cursor.value);
                cursor.continue();
            } else {
                resolve(results);
            }
        };
        request.onerror = () => reject(request.error);
    });
}

// --- UI Logic ---

function showModal() {
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
}

function hideModal() {
    modal.classList.add('hidden');
    modal.style.display = 'none';
}

function checkApiKey() {
    if (!apiKey) {
        showModal();
    } else {
        hideModal();
    }
}

async function renderHistory() {
    const conversations = await getAllConversations();
    chatHistoryList.innerHTML = '';
    conversations.forEach(conv => {
        const div = document.createElement('div');
        div.className = `history-item ${conv.id === currentChatId ? 'active' : ''}`;
        div.textContent = conv.title || 'New Chat';
        div.onclick = () => loadChat(conv.id);
        chatHistoryList.appendChild(div);
    });
}

function renderMessage(msg: Message) {
    const div = document.createElement('div');
    div.className = `message ${msg.role}`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    // Parse Markdown and Sanitize
    const rawHtml = marked.parse(msg.content) as string;
    const cleanHtml = DOMPurify.sanitize(rawHtml);
    
    contentDiv.innerHTML = cleanHtml;
    div.appendChild(contentDiv);
    messagesContainer.appendChild(div);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

async function loadChat(id: string) {
    currentChatId = id;
    const chat = await getConversation(id);
    currentChatTitle.textContent = chat.title;
    messagesContainer.innerHTML = '';
    chat.messages.forEach(renderMessage);
    renderHistory(); // To update active state
}

async function createNewChat() {
    const id = Date.now().toString();
    const newChat: Conversation = {
        id,
        title: 'New Chat',
        messages: [],
        updatedAt: Date.now()
    };
    await saveConversation(newChat);
    await loadChat(id);
}

async function updateChat(id: string, messages: Message[], title?: string) {
    const chat = await getConversation(id);
    chat.messages = messages;
    chat.updatedAt = Date.now();
    if (title) chat.title = title;
    await saveConversation(chat);
    if (id === currentChatId) renderHistory(); // Update title in list if changed
}

// --- API Interaction ---

async function callGroqAPI(messages: Message[]): Promise<Response> {
    if (!apiKey) throw new Error("No API Key");

    const payload = {
        messages: messages,
        model: modelSelect.value,
        stream: true
    };

    return fetch(API_URL, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(payload)
    });
}

// --- Event Listeners ---

saveKeyBtn.onclick = () => {
    const key = apiKeyInput.value.trim();
    if (key.startsWith('gsk_')) {
        localStorage.setItem('groq_api_key', key);
        apiKey = key;
        hideModal();
    } else {
        apiKeyError.style.display = 'block';
    }
};

clearKeyBtn.onclick = () => {
    localStorage.removeItem('groq_api_key');
    apiKey = null;
    location.reload();
};

newChatBtn.onclick = createNewChat;

sendBtn.onclick = async () => {
    const content = messageInput.value.trim();
    if (!content || !currentChatId) return;

    messageInput.value = '';
    
    // User Message
    const userMsg: Message = { role: 'user', content };
    renderMessage(userMsg);
    
    const chat = await getConversation(currentChatId);
    const updatedMessages = [...chat.messages, userMsg];
    await updateChat(currentChatId, updatedMessages); // Save user message

    // Assistant Placeholder
    const assistantMsg: Message = { role: 'assistant', content: '' };
    const msgDiv = document.createElement('div');
    msgDiv.className = 'message assistant';
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    msgDiv.appendChild(contentDiv);
    messagesContainer.appendChild(msgDiv);
    
    // Generate Title if it's the first message
    if (updatedMessages.length === 1) {
        const title = content.substring(0, 30) + (content.length > 30 ? '...' : '');
        updateChat(currentChatId, updatedMessages, title);
    }

    try {
        const response = await callGroqAPI(updatedMessages);
        
        if (!response.ok) {
            const errorText = await response.text();
            let errorData;
            try {
                errorData = JSON.parse(errorText);
            } catch(e) {
                errorData = errorText;
            }
            console.error('API Error Response:', errorData);
            logError(errorData, `API Call (Status: ${response.status})`);
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        let fullResponse = '';

        if (reader) {
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                
                const chunk = decoder.decode(value);
                const lines = chunk.split('\n');
                
                for (const line of lines) {
                    if (line.startsWith('data: ') && line !== 'data: [DONE]') {
                        try {
                            const data = JSON.parse(line.slice(6));
                            const delta = data.choices[0]?.delta?.content || '';
                            fullResponse += delta;
                            
                            // Real-time render (sanitized)
                            contentDiv.innerHTML = DOMPurify.sanitize(marked.parse(fullResponse) as string);
                            messagesContainer.scrollTop = messagesContainer.scrollHeight;
                        } catch (e) {
                            console.error('Error parsing chunk', e);
                            logError(e, 'Parsing Chunk');
                        }
                    }
                }
            }
        }
        
        // Save final response
        assistantMsg.content = fullResponse;
        updatedMessages.push(assistantMsg);
        await updateChat(currentChatId, updatedMessages);

    } catch (error) {
        console.error(error);
        logError(error, 'API Call');
        contentDiv.innerHTML = `<span style="color:red">Error. See debug log below.</span>`;
    }
};

downloadBtn.onclick = async () => {
    if (!currentChatId) return;
    const chat = await getConversation(currentChatId);
    let mdContent = `# ${chat.title}\n\n`;
    
    chat.messages.forEach(msg => {
        mdContent += `**${msg.role.toUpperCase()}:**\n${msg.content}\n\n---\n\n`;
    });

    const blob = new Blob([mdContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${chat.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.md`;
    a.click();
    URL.revokeObjectURL(url);
};

// --- Boot ---
(async () => {
    await initDB();
    checkApiKey();
    await renderHistory();
    
    const chats = await getAllConversations();
    if (chats.length > 0) {
        loadChat(chats[0].id);
    } else {
        createNewChat();
    }
})();
