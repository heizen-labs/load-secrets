import type { AxiosError } from 'axios';

type UnknownData = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownData {
  return typeof value === 'object' && value !== null;
}

function extractStringField(
  data: UnknownData,
  key: string
): string | undefined {
  const raw = data[key];
  return typeof raw === 'string' && raw.trim() ? raw : undefined;
}

export function readAxiosErrorMessage(error: AxiosError): string | undefined {
  const { data } = error.response ?? {};

  if (typeof data === 'string' && data.trim()) {
    return data;
  }

  if (isRecord(data)) {
    return (
      extractStringField(data, 'message') ??
      extractStringField(data, 'error') ??
      extractStringField(data, 'detail')
    );
  }

  return undefined;
}
