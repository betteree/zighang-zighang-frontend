"use client";

const ACCESS_TOKEN_KEY = "zh_access_token";

const API_BASE = "/api/recruitments/{recruitmentId}/applications/log";

function getAccessToken(): string | null {
  try {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  } catch {
    return null;
  }
}

export async function logApplication(recruitmentId: string): Promise<void> {
  const token = getAccessToken();
  const url = API_BASE.replace(
    "{recruitmentId}",
    encodeURIComponent(recruitmentId)
  );

  const response = await fetch(url, {
    method: "POST",
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    cache: "no-store",
    keepalive: true,
  });

  if (!response.ok) {
    throw new Error(`지원 로깅 실패: ${response.status}`);
  }
}
