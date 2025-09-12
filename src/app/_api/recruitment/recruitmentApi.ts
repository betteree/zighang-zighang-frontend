// 공고 목록 조회 API

export interface RecruitmentFilters {
  jobs?: string[];
  jobCategories?: string[];
  employmentTypes?: string[];
  educations?: string[];
  minExperience?: number;
  maxExperience?: number;
  locations?: string[];
  deadlineTypes?: string[];
  page?: number;
  size?: number;
}

export interface RecruitmentItem {
  id: string;
  title: string;
  company: string;
  location: string;
  employmentType: string;
  experience: string;
  education: string;
  deadline: string;
  salary?: string;
  tags?: string[];
  description?: string;
  companyLogo?: string;
}

export interface RecruitmentPageData {
  content: RecruitmentItem[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
}

export interface ApiResponse<T> {
  success: boolean;
  code: string | null;
  message: string | null;
  data: T;
}

export type RecruitmentListResponse = ApiResponse<RecruitmentPageData>;

// 공고 목록 조회
export async function fetchRecruitments(filters: RecruitmentFilters = {}): Promise<RecruitmentListResponse> {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';
  
  // 쿼리 파라미터 구성
  const params = new URLSearchParams();
  
  // 배열 파라미터들 처리
  if (filters.jobs?.length) {
    filters.jobs.forEach(job => params.append('jobs', job));
  }
  if (filters.jobCategories?.length) {
    filters.jobCategories.forEach(category => params.append('jobCategories', category));
  }
  if (filters.employmentTypes?.length) {
    filters.employmentTypes.forEach(type => params.append('employmentTypes', type));
  }
  if (filters.educations?.length) {
    filters.educations.forEach(education => params.append('educations', education));
  }
  if (filters.locations?.length) {
    filters.locations.forEach(location => params.append('locations', location));
  }
  if (filters.deadlineTypes?.length) {
    filters.deadlineTypes.forEach(type => params.append('deadlineTypes', type));
  }
  
  // 단일 값 파라미터들
  if (filters.minExperience !== undefined) {
    params.append('minExperience', filters.minExperience.toString());
  }
  if (filters.maxExperience !== undefined) {
    params.append('maxExperience', filters.maxExperience.toString());
  }
  if (filters.page !== undefined) {
    params.append('page', filters.page.toString());
  }
  if (filters.size !== undefined) {
    params.append('size', filters.size.toString());
  }
  
  const url = `${API_BASE}/recruitments?${params.toString()}`;
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'omit',
  });
  
  if (!response.ok) {
    throw new Error(`공고 목록 조회 실패: ${response.status}`);
  }
  
  return response.json();
}
