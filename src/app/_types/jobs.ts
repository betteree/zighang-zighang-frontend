export interface Job {
  id: string;
  href: string;
  company: string;
  companyImageUrl: string | null;
  title: string;
  location: string;
  experience: string;
  contractType: string;
  education: string;
  imageUrl: string;
  views: number;
  deadlineType: string;
  hot?: boolean;
  bookmarked?: boolean;
  jobGroup?: string;
  companyName?: string;
  locations?: string[];
  minExperience?: number;
}

// 추천 채용공고 API 응답 타입
export interface RecommendedRecruitment {
  id: string;
  title: string;
  description: string;
  recruitmentUrl: string;
  imageUrl: string;
  locations: string[];
  minExperience: number;
  maxExperience: number;
  educations: string[];
  employmentTypes: string[];
  jobs: string[];
  jobCategories: string[];
  companyName: string;
  companyDescription: string;
  companyImageUrl: string | null;
  isBookmarked: boolean;
  reason: string;
}

export interface RecommendResponse {
  success: boolean;
  code: string | null;
  message: string | null;
  data: RecommendedRecruitment[];
}
