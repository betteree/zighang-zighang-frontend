"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchPopularRecruitments } from "./popular";

// 로컬스토리지의 jobCategories를 사용하는 훅
export function usePopularRecruitments() {
  return useQuery({
    queryKey: ["recruitments:popular", "from-storage"],
    queryFn: fetchPopularRecruitments,
    staleTime: 60_000, // 1분
    gcTime: 5 * 60_000, // 5분
  });
}
