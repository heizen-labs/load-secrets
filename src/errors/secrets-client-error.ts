import type { SecretsClientErrorOptions } from '../types';

export class SecretsClientError extends Error {
  readonly status?: number;
  readonly cause?: unknown;

  constructor(message: string, options?: SecretsClientErrorOptions) {
    super(message);
    this.name = 'SecretsClientError';
    this.status = options?.status;
    this.cause = options?.cause;
  }
}
