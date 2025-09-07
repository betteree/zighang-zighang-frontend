"use client";

import { useQuery } from "@tanstack/react-query";
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
