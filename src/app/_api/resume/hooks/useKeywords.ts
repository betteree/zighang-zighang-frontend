"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchKeywords } from "../keyword/keywordApi";

// Query Keys
export const keywordKeys = {
  all: ["keywords"] as const,
  lists: () => [...keywordKeys.all, "list"] as const,
};

// 키워드 목록 조회
export function useKeywords() {
  return useQuery({
    queryKey: keywordKeys.lists(),
    queryFn: fetchKeywords,
    staleTime: 10 * 60 * 1000, // 10분 (키워드는 자주 변경되지 않음)
    gcTime: 30 * 60 * 1000, // 30분
  });
}
