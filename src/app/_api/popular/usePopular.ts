"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchPopularRecruitments } from "./popular";

export function usePopularRecruitments(job: string) {
  return useQuery({
    queryKey: ["recruitments:popular", job],
    queryFn: () => fetchPopularRecruitments(job),
    enabled: !!job,
    staleTime: 60_000, // 1분
    gcTime: 5 * 60_000, // 5분
  });
}
