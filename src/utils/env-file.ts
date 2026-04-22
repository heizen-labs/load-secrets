import type { SecretsMap } from '../types';

function needsQuotes(value: string): boolean {
  return /\s|#|"|'|=|\\n|\\r/.test(value);
}

function escapeEnvValue(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/"/g, '\\"');
}

export function toEnvFileContent(secrets: SecretsMap): string {
  const lines = Object.entries(secrets).map(([key, value]) => {
    if (!needsQuotes(value)) {
      return `${key}=${value}`;
    }

    return `${key}="${escapeEnvValue(value)}"`;
  });

  return `${lines.join('\n')}\n`;
}
