import * as core from '@actions/core';
import { promises as fs } from 'node:fs';
import { dirname } from 'node:path';
import { SecretsClient } from '../clients/secrets-client';
import type { ActionInputs, SecretsMap } from '../types';
import { toEnvFileContent } from '../utils/env-file';

function exportToWorkflowEnv(
  secrets: SecretsMap,
  overrideExisting: boolean
): number {
  let exportedCount = 0;

  for (const [key, value] of Object.entries(secrets)) {
    core.setSecret(value);

    if (!overrideExisting && process.env[key] !== undefined) {
      continue;
    }

    core.exportVariable(key, value);
    exportedCount += 1;
  }

  return exportedCount;
}

async function writeEnvFile(
  outputPath: string,
  secrets: SecretsMap
): Promise<void> {
  await fs.mkdir(dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, toEnvFileContent(secrets), 'utf8');
}

export async function loadAndApplySecrets(inputs: ActionInputs): Promise<{
  totalCount: number;
  exportedCount: number;
  wroteFile: boolean;
}> {
  const client = new SecretsClient({
    projectId: inputs.projectId,
    environment: inputs.environment,
    apiKey: inputs.apiKey,
    baseUrl: inputs.baseUrl,
  });

  const secrets = await client.getSecrets();
  const totalCount = Object.keys(secrets).length;

  const exportedCount = exportToWorkflowEnv(secrets, inputs.overrideExisting);

  if (inputs.outputPath) {
    await writeEnvFile(inputs.outputPath, secrets);
  }

  return {
    totalCount,
    exportedCount,
    wroteFile: Boolean(inputs.outputPath),
  };
}
