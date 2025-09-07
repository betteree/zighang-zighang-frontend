import React from "react";
import dynamic from "next/dynamic";
import { onboardingJobCategories } from "@/app/_constants/onboardingJobCategories";

const LoadingChip = () => (
  <div className="w-[28px] h-[28px] rounded-full bg-gray-200 animate-pulse" />
);

const chipMap = {
  DesignChip: dynamic(
    () => import("../../_jobChip/DesignChip").then((m) => m.DesignChip),
    { loading: () => <LoadingChip />, ssr: false }
  ),
  GameChip: dynamic(
    () => import("../../_jobChip/GameChip").then((m) => m.GameChip),
    { loading: () => <LoadingChip />, ssr: false }
  ),
  AiChip: dynamic(() => import("../../_jobChip/AiChip").then((m) => m.AiChip), {
    loading: () => <LoadingChip />,
    ssr: false,
  }),
  ITChip: dynamic(() => import("../../_jobChip/ITChip").then((m) => m.ITChip), {
    loading: () => <LoadingChip />,
    ssr: false,
  }),
  StrategyChip: dynamic(
    () => import("../../_jobChip/StrategyChip").then((m) => m.StrategyChip),
    { loading: () => <LoadingChip />, ssr: false }
  ),
  ServiceChip: dynamic(
    () => import("../../_jobChip/ServiceChip").then((m) => m.ServiceChip),
    { loading: () => <LoadingChip />, ssr: false }
  ),
  EduChip: dynamic(
    () => import("../../_jobChip/EduChip").then((m) => m.EduChip),
    { loading: () => <LoadingChip />, ssr: false }
  ),
  TMChip: dynamic(() => import("../../_jobChip/TMChip").then((m) => m.TMChip), {
    loading: () => <LoadingChip />,
    ssr: false,
  }),
  MediaChip: dynamic(
    () => import("../../_jobChip/MediaChip").then((m) => m.MediaChip),
    { loading: () => <LoadingChip />, ssr: false }
  ),
  MedicalChip: dynamic(
    () => import("../../_jobChip/MedicalChip").then((m) => m.MedicalChip),
    { loading: () => <LoadingChip />, ssr: false }
  ),
  FoodChip: dynamic(
    () => import("../../_jobChip/FoodChip").then((m) => m.FoodChip),
    { loading: () => <LoadingChip />, ssr: false }
  ),
  WelfareChip: dynamic(
    () => import("../../_jobChip/WelfareChip").then((m) => m.WelfareChip),
    { loading: () => <LoadingChip />, ssr: false }
  ),
  MarketingChip: dynamic(
    () => import("../../_jobChip/MarketingChip").then((m) => m.MarketingChip),
    { loading: () => <LoadingChip />, ssr: false }
  ),
  ProductChip: dynamic(
    () => import("../../_jobChip/ProductChip").then((m) => m.ProductChip),
    { loading: () => <LoadingChip />, ssr: false }
  ),
  SalesChip: dynamic(
    () => import("../../_jobChip/SalesChip").then((m) => m.SalesChip),
    { loading: () => <LoadingChip />, ssr: false }
  ),
  BankingChip: dynamic(
    () => import("../../_jobChip/BankingChip").then((m) => m.BankingChip),
    { loading: () => <LoadingChip />, ssr: false }
  ),
  ConstructionChip: dynamic(
    () =>
      import("../../_jobChip/ConstructionChip").then((m) => m.ConstructionChip),
    { loading: () => <LoadingChip />, ssr: false }
  ),
  FinanceChip: dynamic(
    () => import("../../_jobChip/FinanceChip").then((m) => m.FinanceChip),
    { loading: () => <LoadingChip />, ssr: false }
  ),
  HRChip: dynamic(() => import("../../_jobChip/HRChip").then((m) => m.HRChip), {
    loading: () => <LoadingChip />,
    ssr: false,
  }),
  LegalChip: dynamic(
    () => import("../../_jobChip/LegalChip").then((m) => m.LegalChip),
    { loading: () => <LoadingChip />, ssr: false }
  ),
  LogisticsChip: dynamic(
    () => import("../../_jobChip/LogisticsChip").then((m) => m.LogisticsChip),
    { loading: () => <LoadingChip />, ssr: false }
  ),
  ManufacturingChip: dynamic(
    () =>
      import("../../_jobChip/ManufacturingChip").then(
        (m) => m.ManufacturingChip
      ),
    { loading: () => <LoadingChip />, ssr: false }
  ),
  RNDChip: dynamic(
    () => import("../../_jobChip/RNDChip").then((m) => m.RNDChip),
    { loading: () => <LoadingChip />, ssr: false }
  ),
  SecuritiesChip: dynamic(
    () => import("../../_jobChip/SecuritiesChip").then((m) => m.SecuritiesChip),
    { loading: () => <LoadingChip />, ssr: false }
  ),
  TradeChip: dynamic(
    () => import("../../_jobChip/TradeChip").then((m) => m.TradeChip),
    { loading: () => <LoadingChip />, ssr: false }
  ),
} as const;

function SelectedJobGroupChipsComponent({
  selectedJobGroups,
  active,
}: {
  selectedJobGroups: string[];
  active?: string;
}) {
  const chips = selectedJobGroups
    .map((name) => onboardingJobCategories.find((c) => c.name === name))
    .filter((c): c is NonNullable<typeof c> => Boolean(c))
    .map((c) => ({
      key: c.name,
      Chip: chipMap[c.chip as keyof typeof chipMap],
    }))
    .filter((x) => Boolean(x.Chip));

  if (chips.length === 0) return null;

  return (
    <div className="flex items-center mb-6">
      {chips.map(({ key, Chip }, index) => {
        const isLast = index === chips.length - 1;
        const content = (
          <>
            <Chip isSelected={active === key} />
            {!isLast && <div className="w-[6px] h-[2px] bg-[#AAAAAD]"></div>}
          </>
        );
        return (
          <div key={key} className="flex items-center">
            {content}
          </div>
        );
      })}
    </div>
  );
}

export const SelectedJobGroupChips = React.memo(SelectedJobGroupChipsComponent);
