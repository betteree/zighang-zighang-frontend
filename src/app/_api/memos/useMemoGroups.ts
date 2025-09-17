import { useQuery } from "@tanstack/react-query";
import { fetchAllMemos } from "./memoApi";
import { MemoGroup } from "../../../app/(pages)/memos/_types/memoTypes";

export function useMemoGroups() {
  return useQuery<MemoGroup[], Error>({
    queryKey: ["memoGroups"],
    queryFn: fetchAllMemos,
    staleTime: 5 * 60 * 1000, // 5분
    retry: 1,
  });
}
