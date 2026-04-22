import type { SecretsClientErrorOptions } from '../types';
export declare class SecretsClientError extends Error {
    readonly status?: number;
    readonly cause?: unknown;
    constructor(message: string, options?: SecretsClientErrorOptions);
}
//# sourceMappingURL=secrets-client-error.d.ts.map