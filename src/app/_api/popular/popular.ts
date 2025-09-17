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

// 로컬스토리지의 jobCategories를 사용하여 인기 공고를 가져오는 함수
export async function fetchPopularRecruitments(): Promise<PopularRecruitmentResponse> {
  const token = getAccessToken();
  
  try {
    const stored = localStorage.getItem("userFilters");
    if (!stored) {
      return { success: true, data: [] };
    }
    
    const userFilters = JSON.parse(stored);
    const jobCategories = userFilters.jobCategories || [];
    
    if (jobCategories.length === 0) {
      return { success: true, data: [] };
    }
    
    // jobs 배열을 쿼리 파라미터로 변환
    const jobsParam = jobCategories.map(job => `jobs=${encodeURIComponent(job)}`).join('&');
    const url = `/api/recruitments/popular?${jobsParam}`;

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
  } catch (error) {
    console.error("로컬스토리지에서 인기 공고 조회 실패:", error);
    return { success: true, data: [] };
  }
}
