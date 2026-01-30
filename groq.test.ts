import { Groq } from 'groq-sdk';
import { runCli } from './groq'; // Import the refactored runCli function

jest.mock('groq-sdk', () => {
  const mockCreateFn = jest.fn().mockResolvedValue({
    choices: [{ message: { content: 'Mocked response' } }],
  });

  return {
    Groq: jest.fn().mockImplementation(() => {
      return {
        chat: {
          completions: {
            create: mockCreateFn,
          },
        },
      };
    }),
    __mockCreateFn: mockCreateFn,
  };
});

describe('runCli', () => {
  let mockLog: jest.Mock;
  let mockError: jest.Mock;
  let mockExit: jest.Mock<never, [number]>;
  let mockCreate: jest.Mock; // Added missing declaration

  beforeEach(() => {
    mockLog = jest.fn();
    mockError = jest.fn();
    mockExit = jest.fn((code: number) => {
      throw new Error(`Process.exit called with code ${code}`);
    });

    // Get the mockCreate from the *latest* Groq mock instance
    const { __mockCreateFn } = require('groq-sdk');
    mockCreate = __mockCreateFn;
    mockCreate.mockClear(); // Clear calls from previous tests
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks for a clean slate in each test
  });

  it('should print available presets with --list and exit with code 0', async () => {
    await expect(
      runCli(['--list'], undefined, mockLog, mockError, mockExit)
    ).rejects.toThrow('Process.exit called with code 0');
    expect(mockLog).toHaveBeenCalledWith('Available presets:');
    expect(mockLog).toHaveBeenCalledWith('  text    -> llama-3.3-70b-versatile');
    expect(mockExit).toHaveBeenCalledWith(0);
  });

  it('should print usage if no model or prompt is provided and exit with code 1', async () => {
    await expect(
      runCli([], undefined, mockLog, mockError, mockExit)
    ).rejects.toThrow('Process.exit called with code 1');
    expect(mockLog).toHaveBeenCalledWith('Usage: groq <preset|model> "prompt"   or   groq --list');
    expect(mockExit).toHaveBeenCalledWith(1);
  });

  it('should print an error if GROQ_API_KEY is not set and exit with code 1', async () => {
    await expect(
      runCli(['fast', 'test prompt'], undefined, mockLog, mockError, mockExit)
    ).rejects.toThrow('Process.exit called with code 1');
    expect(mockLog).toHaveBeenCalledWith('export GROQ_API_KEY="your_key"');
    expect(mockExit).toHaveBeenCalledWith(1);
  });

  it('should call Groq API with preset model and prompt', async () => {
    await runCli(['fast', 'test prompt'], 'test-key', mockLog, mockError, mockExit);
    expect(mockCreate).toHaveBeenCalledWith({
      messages: [{ role: 'user', content: 'test prompt' }],
      model: 'llama-3.1-8b-instant',
      max_tokens: 2048,
    });
    expect(mockLog).toHaveBeenCalledWith('Model: llama-3.1-8b-instant');
    expect(mockLog).toHaveBeenCalledWith('Mocked response');
    expect(mockExit).not.toHaveBeenCalled();
  });

  it('should call Groq API with custom model and prompt', async () => {
    await runCli(['custom-model', 'test prompt'], 'test-key', mockLog, mockError, mockExit);
    expect(mockCreate).toHaveBeenCalledWith({
      messages: [{ role: 'user', content: 'test prompt' }],
      model: 'custom-model',
      max_tokens: 2048,
    });
    expect(mockLog).toHaveBeenCalledWith('Model: custom-model');
    expect(mockLog).toHaveBeenCalledWith('Mocked response');
    expect(mockExit).not.toHaveBeenCalled();
  });

  it('should handle API errors and exit with code 1', async () => {
    mockCreate.mockRejectedValueOnce(new Error('API Error'));
    await expect(
      runCli(['fast', 'error prompt'], 'test-key', mockLog, mockError, mockExit)
    ).rejects.toThrow('Process.exit called with code 1');
    expect(mockError).toHaveBeenCalledWith('Error: API Error');
    expect(mockExit).toHaveBeenCalledWith(1);
  });
});