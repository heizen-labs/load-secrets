import axios, { type AxiosInstance } from 'axios';
import { SecretsClientError } from '../errors/secrets-client-error';
import type {
  GetSecretsResponse,
  SecretsClientOptions,
  SecretsMap,
} from '../types';
import { readAxiosErrorMessage } from '../utils/read-axios-error-message';

export class SecretsClient {
  static readonly DEFAULT_BASE_URL = 'https://api.studio.heizen.work';

  private readonly projectId: string;
  private readonly environment: string;
  private readonly apiKey: string;
  private readonly http: AxiosInstance;

  constructor(options: SecretsClientOptions) {
    this.projectId = options.projectId.trim();
    this.environment = options.environment.trim();
    this.apiKey = options.apiKey.trim();

    const baseUrl = (options.baseUrl ?? SecretsClient.DEFAULT_BASE_URL).trim();

    if (!this.projectId) {
      throw new SecretsClientError("'projectId' is required.");
    }

    if (!this.environment) {
      throw new SecretsClientError("'environment' is required.");
    }

    if (!this.apiKey) {
      throw new SecretsClientError("'apiKey' is required.");
    }

    if (!baseUrl) {
      throw new SecretsClientError("'baseUrl' cannot be empty.");
    }

    this.http = axios.create({
      baseURL: baseUrl,
      timeout: 30000,
      headers: {
        'User-Agent': 'heizen-labs/load-secrets',
      },
    });
  }

  async getSecrets(): Promise<SecretsMap> {
    const endpoint = this.buildEndpointPath();

    try {
      const response = await this.http.get<GetSecretsResponse>(endpoint, {
        headers: {
          'x-api-key': this.apiKey,
        },
      });

      return response.data.secrets ?? {};
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const details = readAxiosErrorMessage(error);

        throw new SecretsClientError(
          `Secrets request failed${status ? ` with status ${status}` : ''}${details ? `: ${details}` : ''}`,
          {
            status,
            cause: error,
          }
        );
      }

      throw new SecretsClientError('Failed to call secrets endpoint.', {
        cause: error,
      });
    }
  }

  private buildEndpointPath(): string {
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
