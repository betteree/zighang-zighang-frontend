const API_BASE = "/api/resumes/keywords";

function getAccessToken(): string | null {
  try {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("zh_access_token");
  } catch {
    return null;
  }
}

export interface KeywordResponse {
  success: boolean;
  code: string | null;
  message: string | null;
  data: {
    keywords: string[];
  };
}

export async function fetchKeywords(): Promise<string[]> {
  const token = getAccessToken();
  const url = API_BASE;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const json: KeywordResponse = await res.json();
  return json?.data?.keywords ?? [];
}
