import type { RecommendResponse } from "@/app/_types/jobs";
import client from "@/app/_api/client";

export async function fetchRecommendedRecruitments(
  page: number = 0,
  size: number = 9,
): Promise<RecommendResponse> {
  const url = `/api/users/recommend?page=${page}&size=${size}`;

  const res = await client.get<RecommendResponse>(url);
  return res.data;
}

// 모든 추천 공고를 한 번에 가져오는 함수
export async function fetchAllRecommendedRecruitments(): Promise<RecommendResponse> {
  // 큰 사이즈로 설정하여 모든 데이터를 한 번에 가져옴
  const url = `/api/users/recommend?page=0&size=100`;

  const res = await client.get<RecommendResponse>(url);
  return res.data;
}
