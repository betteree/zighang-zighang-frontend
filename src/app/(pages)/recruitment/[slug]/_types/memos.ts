export type Recruitment = {
  id: string;
  title: string;
  recruitmentUrl: string;
  imageUrl: string;
  locations: string[];
  minExperience: number;
  maxExperience: number;
  educations: string[];
  startDate: string;
  endDate: string;
  deadlineType: string;
  employmentTypes: string[];
  jobs: string[];
  jobCategories: string[];
  companyName: string;
  companyImageUrl: string;
  companySize: string;
};

export type Memo = {
  id: string;
  createdAt: string;
  updatedAt: string;
  recruitment: Recruitment | null;
  title: string;
  content: string;
};

export type MemoListResponse = {
  memos: Memo[];
};

export type MemoResponse = {
  memo: Memo;
};

export type CreateMemoRequest = {
  title: string;
  content: string | null;
};

export type UpdateMemoRequest = {
  title: string;
  content: string;
};
