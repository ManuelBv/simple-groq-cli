/**
 * Shared model configuration for both CLI and Web UI
 */

export interface ModelInfo {
  id: string;
  name: string;
  description?: string;
}

// Available models
export const MODELS: ModelInfo[] = [
  {
    id: 'llama-3.3-70b-versatile',
    name: 'Llama 3.3 70B',
    description: 'Versatile'
  },
  {
    id: 'llama-3.1-8b-instant',
    name: 'Llama 3.1 8B',
    description: 'Instant'
  },
  {
    id: 'qwen/qwen3-32b',
    name: 'Qwen 3 32B',
    description: ''
  },
  {
    id: 'meta-llama/llama-4-scout-17b-16e-instruct',
    name: 'Llama 4 Scout',
    description: 'Preview'
  },
  {
    id: 'meta-llama/llama-4-maverick-17b-128e-instruct',
    name: 'Llama 4 Maverick',
    description: 'Preview'
  }
];

// CLI presets mapping to model IDs
export const MODEL_PRESETS: { [key: string]: string } = {
  text: 'llama-3.3-70b-versatile',
  fast: 'llama-3.1-8b-instant',
  heavy: 'llama-3.3-70b-versatile',
  code: 'llama-3.3-70b-versatile',
  qwen: 'qwen/qwen3-32b',
  llama4scout: 'meta-llama/llama-4-scout-17b-16e-instruct',
  llama4maverick: 'meta-llama/llama-4-maverick-17b-128e-instruct'
};

// Default model
export const DEFAULT_MODEL = 'llama-3.3-70b-versatile';
