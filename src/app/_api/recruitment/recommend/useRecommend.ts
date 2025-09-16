"use client";

import { useQuery } from "@tanstack/react-query";
import {
  fetchAllRecommendedRecruitments,
  fetchRecommendedRecruitments,
} from "./recommend";
import type { RecommendResponse } from "@/app/_types/jobs";

export function useRecommendedRecruitments(
  page: number = 0,
  size: number = 9,
  options?: { enabled?: boolean }
) {
  return useQuery<RecommendResponse>({
    queryKey: ["recommendations", "paginated", { page, size }],
    queryFn: () => fetchRecommendedRecruitments(page, size),
    enabled: options?.enabled ?? true,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });
}

export function useAllRecommendedRecruitments(options?: { enabled?: boolean }) {
  return useQuery<RecommendResponse>({
    queryKey: ["recommendations", "all"],
    queryFn: () => fetchAllRecommendedRecruitments(),
    enabled: options?.enabled ?? true,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });
}
