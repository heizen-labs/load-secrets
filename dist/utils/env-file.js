"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toEnvFileContent = toEnvFileContent;
function needsQuotes(value) {
    return /\s|#|"|'|=|\\n|\\r/.test(value);
}
function escapeEnvValue(value) {
    return value
        .replace(/\\/g, '\\\\')
        .replace(/\n/g, '\\n')
        .replace(/"/g, '\\"');
}
function toEnvFileContent(secrets) {
    const lines = Object.entries(secrets).map(([key, value]) => {
        if (!needsQuotes(value)) {
            return `${key}=${value}`;
        }
        return `${key}="${escapeEnvValue(value)}"`;
    });
    return `${lines.join('\n')}\n`;
}
//# sourceMappingURL=env-file.js.map