"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecretsClient = void 0;
const axios_1 = __importDefault(require("axios"));
const secrets_client_error_1 = require("../errors/secrets-client-error");
const read_axios_error_message_1 = require("../utils/read-axios-error-message");
class SecretsClient {
    constructor(options) {
        this.projectId = options.projectId.trim();
        this.environment = options.environment.trim();
        this.apiKey = options.apiKey.trim();
        const baseUrl = (options.baseUrl ?? SecretsClient.DEFAULT_BASE_URL).trim();
        if (!this.projectId) {
            throw new secrets_client_error_1.SecretsClientError("'projectId' is required.");
        }
        if (!this.environment) {
            throw new secrets_client_error_1.SecretsClientError("'environment' is required.");
        }
        if (!this.apiKey) {
            throw new secrets_client_error_1.SecretsClientError("'apiKey' is required.");
        }
        if (!baseUrl) {
            throw new secrets_client_error_1.SecretsClientError("'baseUrl' cannot be empty.");
        }
        this.http = axios_1.default.create({
            baseURL: baseUrl,
            timeout: 30000,
            headers: {
                'User-Agent': 'heizen-labs/load-secrets',
            },
        });
    }
    async getSecrets() {
        const endpoint = this.buildEndpointPath();
        try {
            const response = await this.http.get(endpoint, {
                headers: {
                    'x-api-key': this.apiKey,
                },
            });
            return response.data.secrets ?? {};
        }
        catch (error) {
            if (axios_1.default.isAxiosError(error)) {
                const status = error.response?.status;
                const details = (0, read_axios_error_message_1.readAxiosErrorMessage)(error);
                throw new secrets_client_error_1.SecretsClientError(`Secrets request failed${status ? ` with status ${status}` : ''}${details ? `: ${details}` : ''}`, {
                    status,
                    cause: error,
                });
            }
            throw new secrets_client_error_1.SecretsClientError('Failed to call secrets endpoint.', {
                cause: error,
            });
        }
    }
    buildEndpointPath() {
        return [
            'secrets',
            'projects',
            encodeURIComponent(this.projectId),
            'environments',
            encodeURIComponent(this.environment),
            'key-value',
        ].join('/');
    }
}
exports.SecretsClient = SecretsClient;
SecretsClient.DEFAULT_BASE_URL = 'https://api.studio.heizen.work';
//# sourceMappingURL=secrets-client.js.map