import type { RecommendResponse } from "@/app/_types/jobs";

function getAccessToken(): string | null {
  try {
    return localStorage.getItem("zh_access_token");
  } catch {
    return null;
  }
}

export async function fetchRecommendedRecruitments(
  page: number = 0,
  size: number = 9
): Promise<RecommendResponse> {
  const token = getAccessToken();
  const url = `/api/users/recommend?page=${page}&size=${size}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  }

  return res.json();
}

// 모든 추천 공고를 한 번에 가져오는 함수
export async function fetchAllRecommendedRecruitments(): Promise<RecommendResponse> {
  const token = getAccessToken();
  // 큰 사이즈로 설정하여 모든 데이터를 한 번에 가져옴
  const url = `/api/users/recommend?page=0&size=100`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  }

  return res.json();
}
