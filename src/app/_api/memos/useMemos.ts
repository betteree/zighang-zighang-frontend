import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchMemos, createMemo, updateMemo, deleteMemo, bulkDeleteMemos } from "./memoApi";
import { MemoGroup } from "../../../app/(pages)/memos/_types/memoTypes";

// 메모 목록 조회
export function useMemos(recruitmentId?: string) {
  return useQuery({
    queryKey: ["memos", { recruitmentId }],
    queryFn: () => fetchMemos(recruitmentId),
    staleTime: 5 * 60 * 1000, // 5분
    retry: 1,
  });
}

// 메모 생성
export function useCreateMemo(recruitmentId?: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { title: string; content: string }) =>
      createMemo(data, recruitmentId),
    onSuccess: () => {
      // 특정 공고의 메모 캐시 무효화
      if (recruitmentId) {
        queryClient.invalidateQueries({ queryKey: ["memos", { recruitmentId }] });
      }
      // 전체 메모 목록 캐시 무효화 (MemoBoard에서 사용)
      queryClient.invalidateQueries({ queryKey: ["memoGroups"] });
    },
  });
}

// 메모 수정
export function useUpdateMemo(recruitmentId?: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      memoId,
      data,
    }: {
      memoId: string;
      data: { title: string; content: string };
    }) => updateMemo(memoId, data),
    onSuccess: () => {
      // 특정 공고의 메모 캐시 무효화
      if (recruitmentId) {
        queryClient.invalidateQueries({ queryKey: ["memos", { recruitmentId }] });
      }
      // 전체 메모 목록 캐시 무효화 (MemoBoard에서 사용)
      queryClient.invalidateQueries({ queryKey: ["memoGroups"] });
    },
  });
}

// 메모 삭제
export function useDeleteMemo(recruitmentId?: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (memoId: string) => deleteMemo(memoId),
    onSuccess: (_, memoId) => {
      // 특정 공고의 메모 캐시 무효화
      if (recruitmentId) {
        queryClient.invalidateQueries({
          queryKey: ["memos", { recruitmentId }],
        });
      } else {
        // recruitmentId가 없으면 삭제된 메모가 속한 공고의 캐시를 찾아서 무효화
        const memoGroups = queryClient.getQueryData<MemoGroup[]>(["memoGroups"]);
        if (memoGroups && Array.isArray(memoGroups)) {
          const memoGroup = memoGroups.find((group: MemoGroup) => 
            group.memos.some((memo) => memo.id === memoId)
          );
          if (memoGroup) {
            queryClient.invalidateQueries({
              queryKey: ["memos", { recruitmentId: memoGroup.recruitment.id }],
            });
          }
        }
      }

      // 전체 메모 목록 캐시를 무효화하지 않고, 캐시를 업데이트
      const memoGroups = queryClient.getQueryData<MemoGroup[]>(["memoGroups"]);
      if (memoGroups && Array.isArray(memoGroups)) {
        const updatedMemoGroups = memoGroups.map((group: MemoGroup) => ({
          ...group,
          memos: group.memos.filter((memo) => memo.id !== memoId)
        })).filter((group: MemoGroup) => group.memos.length > 0);
        
        queryClient.setQueryData(["memoGroups"], updatedMemoGroups);
      }
    },
  });
}

// 공고별 메모 일괄 삭제
export function useBulkDeleteMemos() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (recruitmentIds: string[]) => bulkDeleteMemos(recruitmentIds),
    onSuccess: (_, recruitmentIds) => {
      // 삭제된 공고들의 메모 캐시 무효화
      recruitmentIds.forEach(recruitmentId => {
        queryClient.invalidateQueries({
          queryKey: ["memos", { recruitmentId }],
        });
      });

      // 전체 메모 목록 캐시 업데이트
      const memoGroups = queryClient.getQueryData<MemoGroup[]>(["memoGroups"]);
      if (memoGroups && Array.isArray(memoGroups)) {
        const updatedMemoGroups = memoGroups.filter((group: MemoGroup) => 
          !recruitmentIds.includes(group.recruitment.id)
        );
        queryClient.setQueryData(["memoGroups"], updatedMemoGroups);
      }
    },
  });
}
