"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadAndApplySecrets = loadAndApplySecrets;
const core = __importStar(require("@actions/core"));
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
const secrets_client_1 = require("../clients/secrets-client");
const env_file_1 = require("../utils/env-file");
function exportToWorkflowEnv(secrets, overrideExisting) {
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
async function writeEnvFile(outputPath, secrets) {
    await node_fs_1.promises.mkdir((0, node_path_1.dirname)(outputPath), { recursive: true });
    await node_fs_1.promises.writeFile(outputPath, (0, env_file_1.toEnvFileContent)(secrets), 'utf8');
}
async function loadAndApplySecrets(inputs) {
    const client = new secrets_client_1.SecretsClient({
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
//# sourceMappingURL=load-secrets.js.map