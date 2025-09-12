// 온보딩 데이터를 로컬 스토리지에 저장/조회하는 유틸 함수들

export interface OnboardingStorageData {
  interestedJobs: string[];
  interestedJobCategories: string[];
  careerYear: number;
  educationLevel: string;
  graduationStatus: string;
  preferredRegion: string;
  timestamp: number;
}

const ONBOARDING_STORAGE_KEY = 'onboarding_data';

// 온보딩 데이터를 로컬 스토리지에 저장
export function saveOnboardingData(data: Omit<OnboardingStorageData, 'timestamp'>): void {
  const storageData: OnboardingStorageData = {
    ...data,
    timestamp: Date.now(),
  };
  
  try {
    localStorage.setItem(ONBOARDING_STORAGE_KEY, JSON.stringify(storageData));
  } catch (error) {
    console.error('온보딩 데이터 저장 실패:', error);
  }
}

// 로컬 스토리지에서 온보딩 데이터 조회
export function getOnboardingData(): OnboardingStorageData | null {
  try {
    const data = localStorage.getItem(ONBOARDING_STORAGE_KEY);
    if (!data) return null;
    
    return JSON.parse(data) as OnboardingStorageData;
  } catch (error) {
    console.error('온보딩 데이터 조회 실패:', error);
    return null;
  }
}

// 온보딩 데이터 삭제
export function clearOnboardingData(): void {
  try {
    localStorage.removeItem(ONBOARDING_STORAGE_KEY);
  } catch (error) {
    console.error('온보딩 데이터 삭제 실패:', error);
  }
}

// 온보딩 데이터가 유효한지 확인 (24시간 이내)
export function isOnboardingDataValid(data: OnboardingStorageData): boolean {
  const now = Date.now();
  const dayInMs = 24 * 60 * 60 * 1000; // 24시간
  return (now - data.timestamp) < dayInMs;
}
