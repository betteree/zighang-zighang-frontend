// 직군 매핑 함수 (양방향)
export function mapJobGroup(직군: string, reverse?: boolean): string {
  const jobGroupMap: Record<string, string> = {
    "IT ⋅ 개발": "IT_개발",
    "AI · 데이터": "AI_데이터",
    게임: "게임",
    디자인: "디자인",
    "기획 · 전략": "기획_전략",
    "마케팅 · 광고": "마케팅_광고",
    "상품기획 · MD": "상품기획_MD",
    영업: "영업",
    무역: "무역_물류",
    운송: "운송_배송",
    법률: "법률_법무",
    "HR · 총무": "HR_총무",
    "회계 · 재무 · 세무": "회계_재무_세무",
    "증권 · 운용": "증권_운용",
    "은행 · 카드 · 보험": "은행_카드_보험",
    엔지니어링: "엔지니어링_RND",
    건설: "건설_건축",
    "생산 · 기능직": "생산_기능직",
    "의료 · 보건": "의료_보건",
    "공공 · 복지": "공공_복지",
    교육: "교육",
    "미디어 · 엔터": "미디어_엔터",
    "고객상담 · TM": "고객상담_TM",
    서비스: "서비스",
    식음료: "식음료",
  };

  if (reverse) {
    // 역변환: API 값 → UI 값
    const reverseMap = Object.fromEntries(
      Object.entries(jobGroupMap).map(([ui, api]) => [api, ui])
    );
    return reverseMap[직군] || 직군;
  }
  
  // 정변환: UI 값 → API 값
  return jobGroupMap[직군] || 직군;
}

// 학력 매핑 함수 (양방향)
export function mapEducationLevel(학력: string, reverse?: boolean): string {
  const educationMap: Record<string, string> = {
    초등학교: "초등학교",
    중학교: "중학교",
    고등학교: "고등학교",
    "대학교(2,3년)": "대학교_2_3년",
    "대학교(4년)": "대학교_4년",
    "대학원(석사)": "대학원_석사",
    "대학원(박사)": "대학원_박사",
  };

  if (reverse) {
    // 역변환: API 값 → UI 값
    const reverseMap = Object.fromEntries(
      Object.entries(educationMap).map(([ui, api]) => [api, ui])
    );
    return reverseMap[학력] || 학력;
  }
  
  // 정변환: UI 값 → API 값
  return educationMap[학력] || 학력;
}

// 직무 매핑 함수
export function mapJobCategory(직무: string): string {
  const jobCategoryMap: Record<string, string> = {
    매장운영_관리_식음료: "매장운영_관리",
  };
  return jobCategoryMap[직무] || 직무;
}

// 졸업상태 매핑 함수 (양방향)
export function mapGraduationStatus(졸업상태: string, reverse?: boolean): string {
  const graduationMap: Record<string, string> = {
    "재학 중": "재학중",
    "휴학 중": "휴학중",
    졸업유예: "졸업유예",
    졸업: "졸업",
  };

  if (reverse) {
    // 역변환: API 값 → UI 값
    const reverseMap = Object.fromEntries(
      Object.entries(graduationMap).map(([ui, api]) => [api, ui])
    );
    return reverseMap[졸업상태] || 졸업상태;
  }
  
  // 정변환: UI 값 → API 값
  return graduationMap[졸업상태] || 졸업상태;
}

// 역변환 전용 함수들
export function reverseMapJobGroup(직군: string): string {
  return mapJobGroup(직군, true);
}

export function reverseMapEducationLevel(학력: string): string {
  return mapEducationLevel(학력, true);
}

export function reverseMapGraduationStatus(졸업상태: string): string {
  return mapGraduationStatus(졸업상태, true);
}
