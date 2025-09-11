"use client";

const ACCESS_TOKEN_KEY = "zh_access_token";
const API_BASE = "/api/bookmarks";

function getAccessToken(): string | null {
  try {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  } catch {
    return null;
  }
}

export async function apiFetch(url: string, init: RequestInit) {
  const token = getAccessToken();
  const headers: HeadersInit = {
    Accept: "application/json",
    ...(init.headers as Record<string, string>),
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(url, {
    ...init,
    headers,
    credentials: "include",
    cache: "no-store",
  });
  if (!res.ok) {
    if (res.status === 401) throw new Error("UNAUTHORIZED");
    throw new Error(`HTTP ${res.status}`);
  }
  return res;
}

export async function addBookmark(recruitmentId: string | number) {
  const url = `${API_BASE}/${encodeURIComponent(String(recruitmentId))}`;
  await apiFetch(url, { method: "POST" });
}

export async function removeBookmark(recruitmentId: string | number) {
  const url = `${API_BASE}/${encodeURIComponent(String(recruitmentId))}`;
  await apiFetch(url, { method: "DELETE" });
}
