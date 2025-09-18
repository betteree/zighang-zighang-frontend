// 직군 매핑 함수
export function mapJobGroup(직군: string): string {
  const jobGroupMap: Record<string, string> = {
    "IT ⋅ 개발": "IT_개발",
    "IT·개발": "IT_개발",
    "AI · 데이터": "AI_데이터",
    "AI·데이터": "AI_데이터",
    게임: "게임",
    디자인: "디자인",
    "기획 · 전략": "기획_전략",
    "기획·전략": "기획_전략",
    "마케팅 · 광고": "마케팅_광고",
    "마케팅·광고": "마케팅_광고",
    "상품기획 · MD": "상품기획_MD",
    "상품기획·MD": "상품기획_MD",
    영업: "영업",
    무역: "무역_물류",
    "무역·물류": "무역_물류",
    운송: "운송_배송",
    "운송·배송": "운송_배송",
    법률: "법률_법무",
    "HR · 총무": "HR_총무",
    "HR·총무": "HR_총무",
    "회계 · 재무 · 세무": "회계_재무_세무",
    "회계·재무·세무": "회계_재무_세무",
    "증권 · 운용": "증권_운용",
    "증권·운용": "증권_운용",
    "은행 · 카드 · 보험": "은행_카드_보험",
    "은행·카드·보험": "은행_카드_보험",
    엔지니어링: "엔지니어링_RND",
    "엔지니어링·연구·R&D": "엔지니어링_RND",
    건설: "건설_건축",
    "건설·건축": "건설_건축",
    "생산 · 기능직": "생산_기능직",
    "생산·기능직": "생산_기능직",
    "생산·기능": "생산_기능직",
    "의료 · 보건": "의료_보건",
    "의료·보건": "의료_보건",
    "공공 · 복지": "공공_복지",
    "공공·복지": "공공_복지",
    교육: "교육",
    "미디어 · 엔터": "미디어_엔터",
    "미디어·엔터": "미디어_엔터",
    "고객상담 · TM": "고객상담_TM",
    "고객상담·TM": "고객상담_TM",
    서비스: "서비스",
    식음료: "식음료",
    "출판·공간": "출판_공간",
    "회계·세무·재무": "회계_재무_세무",
    "은행·보험·카드·캐피탈": "은행_카드_보험",
    "물류 (실무·운영 측면)": "무역_물류",
    "법률, 법무": "법률_법무",
  };
  return jobGroupMap[직군] || 직군;
}

// 학력 매핑 함수
export function mapEducationLevel(학력: string): string {
  const educationMap: Record<string, string> = {
    초등학교: "초등학교",
    중학교: "중학교",
    고등학교: "고등학교",
    "대학교(2,3년)": "대학교_2_3년",
    "대학교(4년)": "대학교_4년",
    "대학원(석사)": "대학원_석사",
    "대학원(박사)": "대학원_박사",
  };
  return educationMap[학력] || 학력;
}

// 졸업상태 매핑 함수
export function mapGraduationStatus(졸업상태: string): string {
  const graduationMap: Record<string, string> = {
    "재학 중": "재학중",
    "휴학 중": "휴학중",
    졸업유예: "졸업유예",
    졸업: "졸업",
  };
  return graduationMap[졸업상태] || 졸업상태;
}

// 온보딩 데이터를 API 파라미터 형식으로 변환하는 함수
export function mapOnboardingToApiParams(onboardingData: {
  직군: string[];
  직무: string[] | null;
  경력: number;
  학력: string;
  졸업상태: string;
  지역: string[] | null;
}) {
  return {
    jobCategories: onboardingData.직군.map(mapJobGroup),
    jobs: onboardingData.직무,
    minExperience: onboardingData.경력,
    maxExperience: onboardingData.경력,
    educations: [mapEducationLevel(onboardingData.학력)],
    locations: onboardingData.지역,
  };
}

// 로컬 스토리지에 필터 데이터 저장하는 함수
export function saveOnboardingFiltersToStorage(onboardingData: {
  직군: string[];
  직무: string[] | null;
  경력: number;
  학력: string;
  졸업상태: string;
  지역: string[] | null;
}) {
  try {
    const apiParams = mapOnboardingToApiParams(onboardingData);
    localStorage.setItem("userFilters", JSON.stringify(apiParams));
    console.log(
      "온보딩 필터 데이터가 로컬 스토리지에 저장되었습니다:",
      apiParams
    );
  } catch (error) {
    console.error("로컬 스토리지 저장 실패:", error);
  }
}

// 로컬 스토리지에서 필터 데이터 불러오는 함수
export function loadOnboardingFiltersFromStorage() {
  try {
    const stored = localStorage.getItem("userFilters");
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error("로컬 스토리지 불러오기 실패:", error);
    return null;
  }
}

// API 파라미터를 온보딩 데이터 형식으로 역변환하는 함수
export function mapApiParamsToOnboarding(apiParams: {
  jobCategories?: string[];
  jobs?: string[];
  minExperience?: number;
  maxExperience?: number;
  educations?: string[];
  locations?: string[];
}) {
  // 직군 역매핑
  const jobGroupReverseMap: Record<string, string> = {
    IT_개발: "IT ⋅ 개발",
    AI_데이터: "AI · 데이터",
    게임: "게임",
    디자인: "디자인",
    기획_전략: "기획 · 전략",
    마케팅_광고: "마케팅 · 광고",
    상품기획_MD: "상품기획 · MD",
    영업: "영업",
    무역_물류: "무역",
    운송_배송: "운송",
    법률_법무: "법률",
    HR_총무: "HR · 총무",
    회계_재무_세무: "회계 · 재무 · 세무",
    증권_운용: "증권 · 운용",
    은행_카드_보험: "은행 · 카드 · 보험",
    엔지니어링_RND: "엔지니어링",
    건설_건축: "건설",
    생산_기능직: "생산 · 기능직",
    의료_보건: "의료 · 보건",
    공공_복지: "공공 · 복지",
    교육: "교육",
    미디어_엔터: "미디어 · 엔터",
    고객상담_TM: "고객상담 · TM",
    서비스: "서비스",
    식음료: "식음료",
  };

  // 학력 역매핑
  const educationReverseMap: Record<string, string> = {
    초등학교: "초등학교",
    중학교: "중학교",
    고등학교: "고등학교",
    대학교_2_3년: "대학교(2,3년)",
    대학교_4년: "대학교(4년)",
    대학원_석사: "대학원(석사)",
    대학원_박사: "대학원(박사)",
  };

  return {
    직군:
      apiParams.jobCategories?.map(
        (category) => jobGroupReverseMap[category] || category
      ) || [],
    직무: apiParams.jobs || [],
    경력: apiParams.minExperience || 0,
    학력: apiParams.educations?.[0]
      ? educationReverseMap[apiParams.educations[0]] || apiParams.educations[0]
      : "",
    졸업상태: "졸업", // 기본값
    지역: apiParams.locations ?? null,
  };
}
