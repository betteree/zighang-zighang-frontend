import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchMemos, createMemo, updateMemo, deleteMemo } from "./memoApi";
import type {
  CreateMemoRequest,
  UpdateMemoRequest,
  MemoListResponse,
  MemoResponse,
} from "@/app/_types/memos";

export function useMemos(recruitmentId?: string) {
  return useQuery<MemoListResponse>({
    queryKey: ["memos", { recruitmentId }],
    queryFn: () => fetchMemos(recruitmentId),
    staleTime: 30_000,
    gcTime: 5 * 60_000,
  });
}

export function useCreateMemo(recruitmentId?: string) {
  const qc = useQueryClient();
  return useMutation<MemoResponse | void, Error, CreateMemoRequest>({
    mutationFn: (data) => createMemo(data, recruitmentId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["memos", { recruitmentId }] });
    },
  });
}

export function useUpdateMemo(recruitmentId?: string) {
  const qc = useQueryClient();
  return useMutation<
    MemoResponse | void,
    Error,
    { memoId: string; data: UpdateMemoRequest }
  >({
    mutationFn: ({ memoId, data }) => updateMemo(memoId, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["memos", { recruitmentId }] });
    },
  });
}

export function useDeleteMemo(recruitmentId?: string) {
  const qc = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: deleteMemo,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["memos", { recruitmentId }] });
    },
  });
}
