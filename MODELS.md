# Model Configuration

This project uses a shared model configuration file (`models.ts`) to keep the CLI and Web UI in sync.

## Available Models

| Model ID | Display Name | Description |
|----------|--------------|-------------|
| `llama-3.3-70b-versatile` | Llama 3.3 70B | Versatile |
| `llama-3.1-8b-instant` | Llama 3.1 8B | Instant |
| `qwen/qwen3-32b` | Qwen 3 32B | - |
| `meta-llama/llama-4-scout-17b-16e-instruct` | Llama 4 Scout | Preview |
| `meta-llama/llama-4-maverick-17b-128e-instruct` | Llama 4 Maverick | Preview |

## CLI Presets

| Preset | Maps to Model |
|--------|---------------|
| `text` | llama-3.3-70b-versatile |
| `fast` | llama-3.1-8b-instant |
| `heavy` | llama-3.3-70b-versatile |
| `code` | llama-3.3-70b-versatile |
| `qwen` | qwen/qwen3-32b |
| `llama4scout` | meta-llama/llama-4-scout-17b-16e-instruct |
| `llama4maverick` | meta-llama/llama-4-maverick-17b-128e-instruct |

## Adding New Models

To add a new model, edit `models.ts`:

1. Add the model to the `MODELS` array
2. Optionally add a CLI preset in `MODEL_PRESETS`
3. Rebuild: `npm run build` and `npm run build:web`

Both the CLI and Web UI will automatically use the updated configuration.

## Default Model

The default model is `llama-3.3-70b-versatile`.
