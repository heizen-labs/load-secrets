import * as core from '@actions/core';
import type { ActionInputs } from '../types';

export function getActionInputs(): ActionInputs {
  const projectId = core.getInput('project-id', { required: true }).trim();
  const environment = core.getInput('environment', { required: true }).trim();
  const apiKey = core.getInput('api-key', { required: true }).trim();
  const outputPath = core.getInput('output-path').trim() || undefined;
  const baseUrl = core.getInput('base-url').trim() || undefined;
  const overrideExisting = core.getBooleanInput('override-existing', {
    required: false,
  });

  return {
    projectId,
    environment,
    apiKey,
    outputPath,
    baseUrl,
    overrideExisting,
  };
}
