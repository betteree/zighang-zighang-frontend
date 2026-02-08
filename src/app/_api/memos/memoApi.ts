import {
  CreateMemoRequest,
  UpdateMemoRequest,
  MemoListResponse,
  MemoResponse,
  Memo,
} from "@/app/_types/memos";
import { MemoGroup } from "../../../app/(pages)/memos/_types/memoTypes";
import client from "@/app/_api/client";

const API_BASE = "/api/memos";

import { ApiResponse } from "@/app/(pages)/recruitment/[slug]/_types/types";

export async function fetchMemos(
  recruitmentId?: string,
): Promise<MemoListResponse> {
  const url = recruitmentId
    ? `${API_BASE}?recruitmentId=${encodeURIComponent(recruitmentId)}`
    : API_BASE;

  const res = await client.get<ApiResponse<{ memos: Memo[] }>>(url);

  return { memos: res.data.data?.memos ?? [] };
}

export async function createMemo(
  data: CreateMemoRequest,
  recruitmentId?: string,
): Promise<MemoResponse | void> {
  const url = recruitmentId
    ? `${API_BASE}?recruitmentId=${encodeURIComponent(recruitmentId)}`
    : API_BASE;

  const res = await client.post(url, data);

  const json = res.data;
  const memo = json?.data?.memo ?? json?.memo ?? json;
  return { memo };
}

export async function updateMemo(
  memoId: string,
  data: UpdateMemoRequest,
): Promise<MemoResponse | void> {
  const res = await client.put(`${API_BASE}/${memoId}`, data);

  const json = res.data;
  const memo = json?.data?.memo ?? json?.memo ?? json;
  return { memo };
}

export async function deleteMemo(memoId: string): Promise<void> {
  await client.delete(`${API_BASE}/${memoId}`);
}

// 공고별 메모 일괄 삭제
export async function bulkDeleteMemos(recruitmentIds: string[]): Promise<void> {
  await client.delete(`${API_BASE}/bulk`, {
    data: {
      recruitments: recruitmentIds,
    },
  });
}

// 전체 메모 목록 조회 (공고별 그룹)
export async function fetchAllMemos(): Promise<MemoGroup[]> {
  const res = await client.get<ApiResponse<{ memos: MemoGroup[] }>>(
    `${API_BASE}/all`,
  );
  return res.data.data?.memos ?? [];
}
