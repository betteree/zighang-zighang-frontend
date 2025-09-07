// utils/exploreJobs.tsx
import * as React from "react";
import {
  EXPLORE_JOBS,
  type ExploreJobItem,
  type ExploreJobKey,
  type ExploreJobIconKey,
} from "@/app/_constants/exploreJobCard";

import { ProblemSolvingIcon } from "@/app/(pages)/onboarding/_exploreChip/ProblemSolvingIcon";
import { CommunicatePersuadeIcon } from "@/app/(pages)/onboarding/_exploreChip/CommunicatePersuadeIcon";
import { CreativeContentIcon } from "@/app/(pages)/onboarding/_exploreChip/CreativeContentIcon";
import { DataAnalysisIcon } from "@/app/(pages)/onboarding/_exploreChip/DataAnalysisIcon";
import { PeopleOrgGrowthIcon } from "@/app/(pages)/onboarding/_exploreChip/PeopleOrgGrowthIcon";
import { FieldExecutionIcon } from "@/app/(pages)/onboarding/_exploreChip/FieldExecutionIcon";
import { CareHealthIcon } from "@/app/(pages)/onboarding/_exploreChip/CareHealthIcon";
import { LawComplianceIcon } from "@/app/(pages)/onboarding/_exploreChip/LawComplianceIcon";

export type IconType = React.ComponentType<
  React.SVGProps<SVGSVGElement> & { isSelected?: boolean }
>;

// 아이콘 매핑
export const ICON_MAP = {
  ProblemSolvingIcon,
  CommunicatePersuadeIcon,
  CreativeContentIcon,
  DataAnalysisIcon,
  PeopleOrgGrowthIcon,
  FieldExecutionIcon,
  CareHealthIcon,
  LawComplianceIcon,
} satisfies Record<ExploreJobIconKey, IconType>;

// 아이콘이 주입된 확장 데이터
export type ExploreJobWithIcon = ExploreJobItem & { Icon: IconType };

export const EXPLORE_JOBS_WITH_ICON: ExploreJobWithIcon[] = EXPLORE_JOBS.map(
  (item) => ({ ...item, Icon: ICON_MAP[item.iconKey] })
);

// key → 항목 빠른 조회
export const EXPLORE_JOB_BY_KEY: Record<ExploreJobKey, ExploreJobWithIcon> =
  Object.fromEntries(EXPLORE_JOBS_WITH_ICON.map((i) => [i.key, i])) as Record<
    ExploreJobKey,
    ExploreJobWithIcon
  >;

// 헬퍼
export const getJobByKey = (key: ExploreJobKey) => EXPLORE_JOB_BY_KEY[key];
export const getIconByKey = (iconKey: ExploreJobIconKey) => ICON_MAP[iconKey];
