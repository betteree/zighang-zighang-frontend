"use client";

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  fetchRecruitmentsClient,
  type FetchParams,
} from "@/app/_api/recruitment/list";

export function useRecruitments(params: FetchParams = {}) {
  return useQuery({
    queryKey: ["recruitments:single", params],
    queryFn: () => fetchRecruitmentsClient(params),
    staleTime: 60_000,
    gcTime: 5 * 60_000,
  });
}

export function useInfiniteRecruitments(
  params: Omit<FetchParams, "page" | "size"> = {}
) {
  return useInfiniteQuery({
    queryKey: ["recruitments:infinite", params],
    queryFn: ({ pageParam }) =>
      fetchRecruitmentsClient({ page: pageParam ?? 0, size: 20, ...params }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const current = lastPage.data.page.page;
      const totalPage = lastPage.data.page.totalPage;
      const hasNext = current + 1 < totalPage;
      return hasNext ? current + 1 : undefined;
    },
    staleTime: 60_000,
    gcTime: 5 * 60_000,
  });
}
