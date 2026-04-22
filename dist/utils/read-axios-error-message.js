"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readAxiosErrorMessage = readAxiosErrorMessage;
function isRecord(value) {
    return typeof value === 'object' && value !== null;
}
function extractStringField(data, key) {
    const raw = data[key];
    return typeof raw === 'string' && raw.trim() ? raw : undefined;
}
function readAxiosErrorMessage(error) {
    const { data } = error.response ?? {};
    if (typeof data === 'string' && data.trim()) {
        return data;
    }
    if (isRecord(data)) {
        return (extractStringField(data, 'message') ??
            extractStringField(data, 'error') ??
            extractStringField(data, 'detail'));
    }
    return undefined;
}
//# sourceMappingURL=read-axios-error-message.js.map