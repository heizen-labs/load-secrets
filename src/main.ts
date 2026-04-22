import * as core from '@actions/core';
import { getActionInputs } from './config/inputs';
import { loadAndApplySecrets } from './services/load-secrets';

async function run(): Promise<void> {
  try {
    const inputs = getActionInputs();

    core.info(
      `Loading secrets for project '${inputs.projectId}' in '${inputs.environment}' environment.`
    );

    const result = await loadAndApplySecrets(inputs);

    if (inputs.outputPath) {
      core.info(`Wrote ${result.totalCount} secrets to ${inputs.outputPath}.`);
      core.setOutput('output-path', inputs.outputPath);
    } else {
      core.info(
        `Loaded ${result.totalCount} secrets into workflow environment.`
      );
    }

    core.setOutput('secret-count', String(result.totalCount));
    core.setOutput('exported-count', String(result.exportedCount));
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    core.setFailed(message);
  }
}

void run();
