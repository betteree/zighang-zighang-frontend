import client from "@/app/_api/client";

import {
  ApiResponse,
  Recruitment,
} from "@/app/(pages)/recruitment/[slug]/_types/types";

export type GetRecruitmentDetailResponse = ApiResponse<Recruitment>;

const API_BASE = "/api/recruitments";

export async function fetchRecruitmentDetail(
  recruitmentId: string,
): Promise<GetRecruitmentDetailResponse> {
  const url = `${API_BASE}/${recruitmentId}`;
  const res = await client.get<GetRecruitmentDetailResponse>(url);
  return res.data;
}
