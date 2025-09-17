// 퍼널 단계별 컨텍스트 타입 정의 (단계 진행에 따라 필수 값 증가)
type 직군입력 = {
  직군?: string[];
  직무?: string[];
  경력?: number;
  학력?: string;
  지역?: string[] | null;
  최근필터적용?: boolean;
};

type 직무입력 = {
  직군: string[];
  직무?: string[];
  경력?: number;
  학력?: string;
  지역?: string[] | null;
  최근필터적용?: boolean;
};

type 경력입력 = {
  직군: string[];
  직무?: string[];
  경력?: number;
  학력?: string;
  졸업상태?: string;
  지역?: string[] | null;
  최근필터적용?: boolean;
};

type 학력입력 = {
  직군: string[];
  직무?: string[];
  경력?: number;
  학력?: string;
  졸업상태?: string;
  지역?: string[] | null;
  최근필터적용?: boolean;
};

type 지역입력 = {
  직군: string[];
  직무?: string[];
  경력?: number;
  학력?: string;
  졸업상태?: string;
  지역?: string[] | null;
  최근필터적용?: boolean;
};

type 파일업로드 = {
  직군: string[];
  직무?: string[];
  경력?: number;
  학력?: string;
  졸업상태?: string;
  지역?: string[] | null;
  최근필터적용?: boolean;
};

// API 응답 타입 정의
export type RecruitmentItem = {
  id: string;
  experience: string;
  logo: string;
  title: string;
  company: string;
  location: string;
};

export type UserData = {
  id: string;
  email: string;
  name: string;
  interestedJobs: string[];
  interestedJobCategories: string[];
  careerYear: number;
  educationLevel: string;
  preferredRegions: string[] | null;
};

export type OnboardingApiResponse = {
  success: boolean;
  code: string | null;
  message: string | null;
  data: UserData;
};

type 완료 = {
  recruitments?: RecruitmentItem[];
  userData?: UserData;
};

type 모르겠어요 = {
  직군?: string[];
};

export type {
  직군입력,
  직무입력,
  경력입력,
  학력입력,
  지역입력,
  파일업로드,
  완료,
  모르겠어요,
};
