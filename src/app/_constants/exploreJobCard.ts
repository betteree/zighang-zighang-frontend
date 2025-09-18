export const EXPLORE_JOBS = [
  {
    key: "problem-solving",
    category: "문제를 해결하고\n답을 찾는 활동",
    iconKey: "ProblemSolvingIcon",
    jobs: ["IT·개발", "AI·데이터", "엔지니어링·연구·R&D", "건설·건축"],
  },
  {
    key: "communicate-persuade",
    category: "사람들과 소통하고\n설득하는 활동",
    iconKey: "CommunicatePersuadeIcon",
    jobs: ["영업", "무역·물류", "고객상담·TM", "서비스"],
  },
  {
    key: "creative-content",
    category: "새로운 아이디어와\n콘텐츠를 만드는 활동",
    iconKey: "CreativeContentIcon",
    jobs: [
      "게임",
      "디자인",
      "기획·전략",
      "마케팅·광고",
      "출판·공간",
      "상품기획·MD",
      "미디어·엔터",
    ],
  },
  {
    key: "data-analysis",
    category: "숫자와 데이터를 분석해\n의미를 찾는 활동",
    iconKey: "DataAnalysisIcon",
    jobs: ["회계·세무·재무", "증권·운용", "은행·보험·카드·캐피탈"],
  },
  {
    key: "people-org-growth",
    category: "사람과 조직을\n성장 및 관리하는 활동",
    iconKey: "PeopleOrgGrowthIcon",
    jobs: ["HR·총무", "교육", "공공·복지"],
  },
  {
    key: "field-execution",
    category: "현장에서 실행하는 활동\n\n",
    iconKey: "FieldExecutionIcon",
    jobs: ["생산·기능", "운송·배송", "물류 (실무·운영 측면)", "식음료"],
  },
  {
    key: "care-health",
    category: "사람을 직접 케어하고\n건강을 지키는 활동",
    iconKey: "CareHealthIcon",
    jobs: ["의료·보건"],
  },
  {
    key: "law-compliance",
    category: "규칙과 원칙을 해석하고\n지키는 활동",
    iconKey: "LawComplianceIcon",
    jobs: ["법률, 법무"],
  },
] as const;

// 타입은 데이터에서 파생
export type ExploreJobItem = (typeof EXPLORE_JOBS)[number];
export type ExploreJobKey = ExploreJobItem["key"];
export type ExploreJobIconKey = ExploreJobItem["iconKey"];
