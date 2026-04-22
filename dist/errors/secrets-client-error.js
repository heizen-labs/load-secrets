"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecretsClientError = void 0;
class SecretsClientError extends Error {
    constructor(message, options) {
        super(message);
        this.name = 'SecretsClientError';
        this.status = options?.status;
        this.cause = options?.cause;
    }
}
exports.SecretsClientError = SecretsClientError;
//# sourceMappingURL=secrets-client-error.js.map