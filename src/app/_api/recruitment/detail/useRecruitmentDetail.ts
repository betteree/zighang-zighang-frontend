"use client";

import { useQuery } from "@tanstack/react-query";
import {
  fetchRecruitmentDetail,
  type GetRecruitmentDetailResponse,
} from "./recruitmentDetail";

export function useRecruitmentDetail(recruitmentId: string) {
  return useQuery({
    queryKey: ["recruitment", recruitmentId],
    queryFn: () => fetchRecruitmentDetail(recruitmentId),
    enabled: !!recruitmentId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

export type { GetRecruitmentDetailResponse };
