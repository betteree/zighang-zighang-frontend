// 온보딩 데이터 체크 및 활용 유틸 함수들

import { getOnboardingData, isOnboardingDataValid, OnboardingStorageData } from './storage';

// 온보딩 완료 여부 체크
export function checkOnboardingCompleted(): boolean {
  const data = getOnboardingData();
  return data !== null && isOnboardingDataValid(data);
}

// 온보딩 데이터 가져오기 (유효한 경우만)
export function getValidOnboardingData(): OnboardingStorageData | null {
  const data = getOnboardingData();
  if (!data || !isOnboardingDataValid(data)) {
    return null;
  }
  return data;
}

// 온보딩 데이터를 공고 필터로 변환
export function convertToRecruitmentFilters(data: OnboardingStorageData) {
  return {
    jobs: data.interestedJobs,
    jobCategories: data.interestedJobCategories,
    minExperience: Math.max(0, data.careerYear - 1),
    maxExperience: data.careerYear + 2,
    educations: [data.educationLevel],
    locations: [data.preferredRegion],
    page: 0,
    size: 20,
  };
}

// 온보딩 데이터 요약 정보 생성
export function getOnboardingSummary(data: OnboardingStorageData) {
  return {
    jobGroups: data.interestedJobs.join(', '),
    jobCategories: data.interestedJobCategories.slice(0, 3).join(', ') + 
      (data.interestedJobCategories.length > 3 ? ' 외' : ''),
    careerYear: data.careerYear,
    education: data.educationLevel,
    region: data.preferredRegion,
  };
}

// 온보딩 데이터가 있는지 확인하고 요약 정보 반환
export function getOnboardingInfo() {
  const data = getValidOnboardingData();
  if (!data) {
    return null;
  }
  
  return {
    isCompleted: true,
    data,
    summary: getOnboardingSummary(data),
    filters: convertToRecruitmentFilters(data),
  };
}
