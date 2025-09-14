// API 파라미터를 필터 상태로 변환하는 매핑 함수들

// 직군 역매핑 (API 파라미터 → 필터 형태)
export const jobGroupReverseMap: Record<string, string> = {
  IT_개발: "IT·개발",
  AI_데이터: "AI·데이터",
  게임: "게임",
  디자인: "디자인",
  기획_전략: "기획·전략",
  마케팅_광고: "마케팅·광고",
  상품기획_MD: "상품기획·MD",
  영업: "영업",
  무역_물류: "무역·물류",
  운송_배송: "운송·배송",
  법률_법무: "법률·법무",
  HR_총무: "HR·총무",
  회계_재무_세무: "회계·세무·재무",
  증권_운용: "증권·운용",
  은행_카드_보험: "은행·보험·카드·캐피탈",
  엔지니어링_RND: "엔지니어링·R&D",
  건설_건축: "건설·건축",
  생산_기능직: "생산·기능",
  의료_보건: "의료·보건",
  공공_복지: "공공·복지",
  교육: "교육",
  미디어_엔터: "미디어·엔터",
  고객상담_TM: "고객상담·TM",
  서비스: "서비스",
  식음료: "식음료",
};

// 직무 역매핑 (API 파라미터 → 필터 형태)
export const jobReverseMap: Record<string, string> = {
  // 상품기획·MD 직무들
  상품기획: "상품기획",
  온라인_MD: "온라인MD",
  식품_MD: "식품MD",
  패션_MD: "패션MD",
  뷰티_MD: "뷰티MD",
  영업_MD: "영업MD",
  리테일_MD: "리테일MD",
  기타상품기획_MD: "기타상품기획·MD",

  // IT·개발 직무들 (주요한 것들만)
  서버_백엔드: "서버·백엔드",
  프론트엔드: "프론트엔드",
  웹풀스택: "웹풀스택",
  안드로이드: "안드로이드",
  iOS: "iOS",
  DBA: "DBA",
  DevOps_SRE: "DevOps·SRE",
  소프트웨어_엔지니어: "소프트웨어 엔지니어",
  QA_테스트: "QA·테스트",

  // AI·데이터 직무들
  데이터_분석가: "데이터 분석가",
  데이터_사이언티스트: "데이터 사이언티스트",
  데이터_엔지니어: "데이터 엔지니어",
  머신러닝_엔지니어: "머신러닝 엔지니어",
  생성형AI: "생성형AI",

  // 기획·전략 직무들
  PM_PO: "PM·PO",
  서비스_상품기획: "서비스·상품기획",
  사업_전략기획: "사업·전략기획",
  컨설팅: "컨설팅",

  // 마케팅·광고 직무들
  마케팅기획_전략: "마케팅기획·전략",
  퍼포먼스_마케팅: "퍼포먼스 마케팅",
  콘텐츠마케팅: "콘텐츠마케팅",
  SNS마케팅: "SNS마케팅",
  브랜드_마케팅: "브랜드 마케팅",

  // 영업 직무들
  B2C영업: "B2C영업",
  B2B영업: "B2B영업",
  영업관리_지원: "영업관리·지원",
  일반영업: "일반영업",

  // HR·총무 직무들
  인사기획: "인사기획",
  평가_보상: "평가·보상",
  HRD_조직문화: "HRD·조직문화",
  리크루터_헤드헌터: "리크루터·헤드헌터",

  // 회계·세무·재무 직무들
  회계: "회계",
  재무: "재무",
  세무: "세무",

  // 디자인 직무들
  UI_UX_프로덕트: "UI·UX·프로덕트",
  웹디자인: "웹디자인",
  그래픽_시각: "그래픽·시각",
  브랜딩_BI_BX: "브랜딩·BI/BX",

  // 기타 필요한 직무들 추가 가능
};

// 학력 역매핑 (필터용)
export const educationReverseMap: Record<string, string> = {
  초등학교: "학력 무관",
  중학교: "학력 무관",
  고등학교: "고졸",
  대학교_2_3년: "초대졸",
  대학교_4년: "학사",
  대학원_석사: "석사",
  대학원_박사: "박사",
};

// 필터 상태를 API 파라미터로 변환하는 정방향 매핑들
export const jobGroupMap: Record<string, string> = Object.fromEntries(
  Object.entries(jobGroupReverseMap).map(([key, value]) => [value, key])
);

export const jobMap: Record<string, string> = Object.fromEntries(
  Object.entries(jobReverseMap).map(([key, value]) => [value, key])
);

export const educationMap: Record<string, string> = Object.fromEntries(
  Object.entries(educationReverseMap).map(([key, value]) => [value, key])
);

// 필터 상태를 API 파라미터로 변환하는 함수
export function mapFilterStateToApiParams(filterState: {
  jobGroup: string;
  jobRoles: string[];
  experience: { min: number; max: number };
  educations: string[];
  regions: string[];
}): {
  jobCategories: string[];
  jobs: string[];
  minExperience: number;
  maxExperience: number;
  educations: string[];
  locations: string[];
} {
  return {
    jobCategories:
      filterState.jobGroup === "전체"
        ? []
        : [jobGroupMap[filterState.jobGroup] || filterState.jobGroup],
    jobs: (filterState.jobRoles || [])
      .filter((role) => role !== "전체")
      .map((role) => jobMap[role] || role),
    minExperience: filterState.experience?.min || 0,
    maxExperience: filterState.experience?.max || 0,
    educations: (filterState.educations || [])
      .filter((edu) => edu !== "전체")
      .map((edu) => educationMap[edu] || edu),
    locations: (filterState.regions || []).filter((loc) => loc !== "전체"),
  };
}
