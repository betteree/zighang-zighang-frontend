"use client";

import * as React from "react";
import ResultHeader from "./ResultHeader";
import { useFilterDialog } from "@/app/(pages)/[category]/_hooks/useFilterDialog";
import { useMemo } from "react";
import { mapFiltersToParams } from "@/app/_utils/mapFiltersToParams";
import { useRecruitments } from "@/app/_api/recruitment/useRecruitments";

type ResultHeaderConnectorProps = {
  total?: number;
  showTodayBadge?: boolean;
  className?: string;
};

export default function ResultHeaderConnector({
  showTodayBadge = true,
  className = "",
}: ResultHeaderConnectorProps) {
  const { filters } = useFilterDialog();
  const params = useMemo(() => mapFiltersToParams(filters), [filters]);
  const { data } = useRecruitments({ ...params, page: 0, size: 1 });

  const total = data?.data?.page?.totalElements ?? 0;

  return (
    <ResultHeader
      total={total}
      showTodayBadge={showTodayBadge}
      className={className}
    />
  );
}
