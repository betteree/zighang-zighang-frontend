export interface Memo {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateMemoRequest {
  title: string;
  content: string | null;
}

export interface UpdateMemoRequest {
  title: string;
  content: string;
}

export interface MemoListResponse {
  memos: Memo[];
}

export interface MemoResponse {
  memo: Memo;
}
