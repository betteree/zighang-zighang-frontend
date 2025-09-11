"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { apiFetch } from "./client";
import type { GetRecruitmentsResponse } from "@/app/(pages)/recruitment/[slug]/_types/types";

const API_BASE = "/api/bookmarks";

/** 북마크 목록 (페이지네이션) */
export async function fetchBookmarksClient({
  page = 0,
  size = 20,
}: { page?: number; size?: number } = {}): Promise<GetRecruitmentsResponse> {
  const qs = new URLSearchParams({ page: String(page), size: String(size) });
  const res = await apiFetch(`${API_BASE}?${qs.toString()}`, { method: "GET" });

  return res.json();
}

/** 북마크 무한 쿼리 훅 */
export function useInfiniteBookmarks(
  params: { size?: number } = {},
  options?: { enabled?: boolean }
) {
  return useInfiniteQuery({
    queryKey: ["bookmarks:infinite", params],
    queryFn: ({ pageParam }) =>
      fetchBookmarksClient({ page: pageParam ?? 0, size: params.size ?? 20 }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const current = lastPage?.data?.page?.page ?? 0;
      const totalPage = lastPage?.data?.page?.totalPage ?? 0;
      const hasNext = current + 1 < totalPage;
      return hasNext ? current + 1 : undefined;
    },
    staleTime: 60_000,
    gcTime: 5 * 60_000,
    enabled: options?.enabled ?? true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
  });
}
