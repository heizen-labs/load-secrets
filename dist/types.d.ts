export interface ActionInputs {
    projectId: string;
    environment: string;
    apiKey: string;
    outputPath?: string;
    baseUrl?: string;
    overrideExisting: boolean;
}
export interface SecretsMap {
    [key: string]: string;
}
export interface GetSecretsResponse {
    secrets: SecretsMap;
}
export interface SecretsClientOptions {
    projectId: string;
    environment: string;
    apiKey: string;
    baseUrl?: string;
}
export interface SecretsClientErrorOptions {
    status?: number;
    cause?: unknown;
}
//# sourceMappingURL=types.d.ts.map