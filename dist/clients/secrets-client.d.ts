import type { SecretsClientOptions, SecretsMap } from '../types';
export declare class SecretsClient {
    static readonly DEFAULT_BASE_URL = "https://api.studio.heizen.work";
    private readonly projectId;
    private readonly environment;
    private readonly apiKey;
    private readonly http;
    constructor(options: SecretsClientOptions);
    getSecrets(): Promise<SecretsMap>;
    private buildEndpointPath;
}
//# sourceMappingURL=secrets-client.d.ts.map