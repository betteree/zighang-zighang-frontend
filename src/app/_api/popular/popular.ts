import { Job } from "@/app/_types/jobs";
import { mapJobGroup } from "@/app/(pages)/onboarding/_utils/mapping";
import client from "@/app/_api/client";

export interface PopularRecruitmentResponse {
  success: boolean;
  data: Job[];
}

// 로컬스토리지의 jobCategories를 사용하여 인기 공고를 가져오는 함수
// 카테고리별 인기 공고를 가져오는 함수
export async function fetchCategoryPopularRecruitments(
  categorySlug: string,
): Promise<PopularRecruitmentResponse> {
  try {
    const categoryParam = encodeURIComponent(categorySlug);
    const url = `/api/recruitments/popular?jobs=${categoryParam}`;

    const res = await client.get<PopularRecruitmentResponse>(url);
    return res.data;
  } catch (error) {
    console.error("카테고리별 인기 공고 조회 실패:", error);
    return { success: true, data: [] };
  }
}

export async function fetchPopularRecruitments(): Promise<PopularRecruitmentResponse> {
  try {
    if (typeof window === "undefined") return { success: true, data: [] };

    const stored = localStorage.getItem("userFilters");
    if (!stored) {
      return { success: true, data: [] };
    }

    const userFilters = JSON.parse(stored);
    const jobCategories = userFilters.jobCategories || [];

    if (jobCategories.length === 0) {
      return { success: true, data: [] };
    }

    // jobs 배열을 API 형식으로 매핑한 후 쿼리 파라미터로 변환
    const mappedJobs = jobCategories.map(mapJobGroup);
    const jobsParam = mappedJobs
      .map((job: string) => `jobs=${encodeURIComponent(job)}`)
      .join("&");
    const url = `/api/recruitments/popular?${jobsParam}`;

    const res = await client.get<PopularRecruitmentResponse>(url);
    return res.data;
  } catch (error) {
    console.error("로컬스토리지에서 인기 공고 조회 실패:", error);
    return { success: true, data: [] };
  }
}
