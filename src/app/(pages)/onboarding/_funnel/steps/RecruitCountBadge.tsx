"use client";

import React from "react";
import { SparkleIcon } from "../../_components/Icons/SparkleIcon";
import { onboardingJobCategories } from "@/app/_constants/onboardingJobCategories";
import { useRecruitments } from "@/app/_api/recruitment/useRecruitments";

type Props = {
  years: number;
  jobs: string[];
  className?: string;
};

export function RecruitCountBadge({ years, jobs, className = "" }: Props) {
  // 디바운스 유틸
  const useDebounced = <T,>(value: T, delay = 200) => {
    const [debounced, setDebounced] = React.useState<T>(value);
    React.useEffect(() => {
      const t = window.setTimeout(() => setDebounced(value), delay);
      return () => window.clearTimeout(t);
    }, [value, delay]);
    return debounced;
  };

  const GROUP_NAME_TO_API: Record<string, string> = React.useMemo(
    () => ({
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
    }),
    []
  );

  const jobToGroupCode: Map<string, string> = React.useMemo(() => {
    const map = new Map<string, string>();
    onboardingJobCategories.forEach((cat) => {
      const apiCode = GROUP_NAME_TO_API[cat.name];
      if (!apiCode) return;
      cat.jobs.forEach((jobKey) => map.set(jobKey, apiCode));
    });
    return map;
  }, [GROUP_NAME_TO_API]);

  const apiJobs = React.useMemo(
    () =>
      Array.from(
        new Set(
          (jobs ?? [])
            .map((j) => jobToGroupCode.get(j))
            .filter((v): v is string => Boolean(v))
        )
      ),
    [jobs, jobToGroupCode]
  );

  const debouncedYears = useDebounced(years, 200);
  const debouncedJobs = useDebounced(apiJobs, 200);

  const query = useRecruitments({
    minExperience: 0,
    maxExperience: debouncedYears > 0 ? debouncedYears : 0,
    jobs: debouncedJobs.length > 0 ? debouncedJobs : undefined,
    page: 0,
    size: 1,
  });

  return (
    <div
      className={` z-100 flex items-center gap-1 absolute bottom-0 mt-2 px-4 py-2 rounded-[10px] bg-white border border-[#E5D8FF] shadow-[0_4px_12px_rgba(121,81,255,0.15)] text-Heading5-14sb ${className}`}
    >
      <SparkleIcon />
      <span className="hidden md:inline">
        {years === 0 ? "신입은" : `경력 ${years}년 이하는`} 직행에서
        <span className="ml-1">
          <span className="text-[#9F55CE]">
            {query.isFetching
              ? "…"
              : `${query.data?.data?.page?.totalElements ?? 0}개 공고`}
          </span>
          <span className="text-black">를</span>
        </span>
        보유하고 있어요!
      </span>
      <span className="md:hidden">
        {years === 0 ? "신입은" : `경력 ${years}년 이하는`} 직행에서
        <br />
        <span className="text-[#9F55CE]">
          {query.isFetching
            ? "…"
            : `${query.data?.data?.page?.totalElements ?? 0}개 공고`}
        </span>
        <span className="text-black">를</span> 보유하고 있어요!
      </span>
    </div>
  );
}
