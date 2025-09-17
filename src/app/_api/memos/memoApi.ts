import {
  CreateMemoRequest,
  UpdateMemoRequest,
  MemoListResponse,
  MemoResponse,
} from "@/app/_types/memos";
import { MemoGroup } from "../../../app/(pages)/memos/_types/memoTypes";

const API_BASE = "/api/memos";
// 토근 가져오기
function getAccessToken(): string | null {
  try {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("zh_access_token");
  } catch {
    return null;
  }
}

export async function fetchMemos(
  recruitmentId?: string
): Promise<MemoListResponse> {
  const token = getAccessToken();
  const url = recruitmentId
    ? `${API_BASE}?recruitmentId=${encodeURIComponent(recruitmentId)}`
    : API_BASE;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const json = await res.json();
  return { memos: json?.data?.memos ?? [] };
}

export async function createMemo(
  data: CreateMemoRequest,
  recruitmentId?: string
): Promise<MemoResponse | void> {
  const token = getAccessToken();
  const url = recruitmentId
    ? `${API_BASE}?recruitmentId=${encodeURIComponent(recruitmentId)}`
    : API_BASE;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const ct = res.headers.get("content-type");
  if (ct && ct.includes("application/json")) {
    const json = await res.json();
    const memo = json?.data?.memo ?? json?.memo ?? json;
    return { memo };
  }
}

export async function updateMemo(
  memoId: string,
  data: UpdateMemoRequest
): Promise<MemoResponse | void> {
  const token = getAccessToken();
  const res = await fetch(`${API_BASE}/${memoId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const ct = res.headers.get("content-type");
  if (ct && ct.includes("application/json")) {
    const json = await res.json();
    const memo = json?.data?.memo ?? json?.memo ?? json;
    return { memo };
  }
}

export async function deleteMemo(memoId: string): Promise<void> {
  const token = getAccessToken();
  const res = await fetch(`${API_BASE}/${memoId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
}

// 공고별 메모 일괄 삭제
export async function bulkDeleteMemos(recruitmentIds: string[]): Promise<void> {
  const token = getAccessToken();
  const res = await fetch(`${API_BASE}/bulk`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({
      recruitments: recruitmentIds,
    }),
    cache: "no-store",
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}`);
}

// 전체 메모 목록 조회 (공고별 그룹)
export async function fetchAllMemos(): Promise<MemoGroup[]> {
  const token = getAccessToken();
  const res = await fetch(`${API_BASE}/all`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const json = await res.json();
  return json?.data?.memos ?? [];
}
