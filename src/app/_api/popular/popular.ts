import { Job } from "@/app/_types/jobs";

export interface PopularRecruitmentResponse {
  success: boolean;
  data: Job[];
}

function getAccessToken(): string | null {
  try {
    return localStorage.getItem("zh_access_token");
  } catch {
    return null;
  }
}

export async function fetchPopularRecruitments(
  job: string
): Promise<PopularRecruitmentResponse> {
  const token = getAccessToken();
  const url = `/api/recruitments/popular?job=${encodeURIComponent(job)}`;

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
