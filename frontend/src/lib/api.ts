type Json = any;

const BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "") || ""; // если не задано — будет относительный "/api/.."

async function request<T = Json>(
  path: string,
  options: RequestInit = {},
  token?: string
): Promise<T> {
  const url = path.startsWith("http") ? path : `${BASE}${path}`;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> | undefined),
  };

  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(url, { ...options, headers });

  // пытаемся разобрать json, даже если ошибка
  const text = await res.text();
  const data = text ? (() => { try { return JSON.parse(text); } catch { return text; } })() : null;

  if (!res.ok) {
    const msg =
      (data && typeof data === "object" && ("detail" in data) && (data as any).detail) ||
      (typeof data === "string" ? data : res.statusText) ||
      `HTTP ${res.status}`;
    throw new Error(msg);
  }

  return data as T;
}

export function apiGet<T = Json>(path: string, token?: string) {
  return request<T>(path, { method: "GET" }, token);
}

export function apiPost<T = Json>(path: string, body?: any, token?: string) {
  return request<T>(
    path,
    { method: "POST", body: body === undefined ? undefined : JSON.stringify(body) },
    token
  );
}

export function apiPatch<T = Json>(path: string, body?: any, token?: string) {
  return request<T>(
    path,
    { method: "PATCH", body: body === undefined ? undefined : JSON.stringify(body) },
    token
  );
}
