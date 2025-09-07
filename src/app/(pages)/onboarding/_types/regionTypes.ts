export const REGION_OPTIONS = {
  전체: "전체",
  서울: "서울",
  경기: "경기",
  인천: "인천",
  부산: "부산",
  대구: "대구",
  광주: "광주",
  대전: "대전",
  울산: "울산",
  세종: "세종",
  강원: "강원",
  경남: "경남",
  경북: "경북",
  전남: "전남",
  전북: "전북",
  충남: "충남",
  충북: "충북",
  제주: "제주",
  해외: "해외",
} as const;

export type RegionMap = typeof REGION_OPTIONS;
export type RegionValue = keyof RegionMap;

export const REGION_VALUES: RegionValue[] = Object.keys(
  REGION_OPTIONS
) as RegionValue[];
