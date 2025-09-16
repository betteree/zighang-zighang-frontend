export interface Recruitment {
  id: string;
  title: string;
  endDate: string;
  deadlineType: string;
  companyName: string;
}

export interface Memo {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  content: string;
}

export interface MemoGroup {
  recruitment: Recruitment;
  memos: Memo[];
}

export interface MemoApiResponse {
  success: boolean;
  code: string | null;
  message: string | null;
  data: {
    memos: MemoGroup[];
  };
}
