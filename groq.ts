#!/usr/bin/env node
import { Groq } from 'groq-sdk';

const MODEL_PRESETS: { [key: string]: string } = {
  text: 'llama-3.3-70b-versatile',
  fast: 'llama-3.1-8b-instant',
  heavy: 'llama3-70b-8192',
  code: 'llama-3.3-70b-versatile',
  mixtral: 'mixtral-8x7b-32768',
  gemma: 'gemma-7b-it'
};

export async function runCli(
  args: string[],
  apiKey: string | undefined,
  logFn: (message: string) => void,
  errorFn: (message: string) => void,
  exitFn: (code: number) => never
): Promise<void> {
  if (args[0] === '--list') {
    logFn('Available presets:');
    logFn('  text    -> llama-3.3-70b-versatile');
    logFn('  fast    -> llama-3.1-8b-instant');
    logFn('  heavy   -> llama3-70b-8192');
    logFn('  code    -> llama-3.3-70b-versatile');
    logFn('  mixtral -> mixtral-8x7b-32768');
    logFn('  gemma   -> gemma-7b-it');
    exitFn(0);
  }

  const modelInput: string = args[0];
  const prompt: string = args.slice(1).join(' ');

  if (!modelInput || !prompt) {
    logFn('Usage: groq <preset|model> "prompt"   or   groq --list');
    exitFn(1);
  }

  if (!apiKey) {
    logFn('export GROQ_API_KEY="your_key"');
    exitFn(1);
  }

  let model: string = MODEL_PRESETS[modelInput] || modelInput;
  logFn('Model: ' + model);

  try {
    const groq = new Groq({ apiKey: apiKey });
    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: model,
      max_tokens: 2048
    });
    if (completion.choices[0].message.content !== null) {
      logFn(completion.choices[0].message.content);
    } else {
      errorFn('Error: Received null content from Groq API');
      exitFn(1);
    }
  } catch (error: any) {
    errorFn(`Error: ${error.message}`);
    exitFn(1);
  }
}

if (require.main === module) {
  // This block only runs when the script is executed directly
  (async () => {
    try {
      await runCli(
        process.argv.slice(2),
        process.env.GROQ_API_KEY,
        console.log,
        console.error,
        (code: number) => process.exit(code)
      );
    } catch (error: any) {
      console.error(`Unhandled error: ${error.message}`);
      process.exit(1);
    }
  })();
}