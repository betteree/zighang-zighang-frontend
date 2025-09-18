"use client";

import { useQuery } from "@tanstack/react-query";
import {
  fetchPopularRecruitments,
  fetchCategoryPopularRecruitments,
} from "./popular";

// 로컬스토리지의 jobCategories를 사용하는 훅
export function usePopularRecruitments() {
  return useQuery({
    queryKey: ["recruitments:popular", "from-storage"],
    queryFn: fetchPopularRecruitments,
    staleTime: 60_000, // 1분
    gcTime: 5 * 60_000, // 5분
  });
}

// 카테고리별 인기 공고를 가져오는 훅
export function useCategoryPopularRecruitments(categorySlug: string) {
  return useQuery({
    queryKey: ["recruitments:popular", "category", categorySlug],
    queryFn: () => fetchCategoryPopularRecruitments(categorySlug),
    staleTime: 60_000, // 1분
    gcTime: 5 * 60_000, // 5분
  });
}
