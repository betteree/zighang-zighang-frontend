import React, { useState, useMemo, ComponentType } from "react";
import { onboardingJobCategories } from "@/app/_constants/onboardingJobCategories";
import * as JobChips from "../../_components/Chip";
import { getChipMainColor } from "@/app/_constants/chipColors";
import {
  StepContainer,
  StepHeader,
  StepActions,
  SecondaryButton,
  ActionButton,
} from "../../_components";
import { SelectedJobGroupChips } from "./SelectedJobGroupChips";
import { JobCategoryItem } from "./JobCategoryItem";

export function JobStep({
  jobGroup,
  onNext,
  onBack,
  initialSelected = [],
}: {
  jobGroup: string[];
  onNext: (직무: string[]) => void;
  onBack: () => void;
  initialSelected?: string[];
}) {
  type JobChipProps = {
    isSelected?: boolean;
    width?: number;
    height?: number;
    className?: string;
    backgroundless?: boolean;
  };

  // 내부 퍼널: 직군을 순차적으로 돌며 직무를 선택
  const [groupIndex, setGroupIndex] = useState(0);
  const currentGroup = jobGroup?.[groupIndex];
  const currentGroupLabel = currentGroup ?? "미정";

  // 직군별 선택값을 저장 (초기값 설정)
  const [selectedJobsByGroup, setSelectedJobsByGroup] = useState<
    Record<string, string[]>
  >(() => {
    // 초기값이 있으면 첫 번째 직군에 할당
    if (initialSelected.length > 0 && jobGroup.length > 0) {
      return { [jobGroup[0]]: initialSelected };
    }
    return {};
  });
  const currentSelectedJobs =
    (currentGroup && selectedJobsByGroup[currentGroup]) ?? [];
  const isLastGroup = groupIndex >= (jobGroup?.length ?? 0) - 1;

  const availableJobs = useMemo(() => {
    const found = onboardingJobCategories.find(
      (cat) => cat.name === currentGroup
    );
    return found?.jobs ?? [];
  }, [currentGroup]);

  const currentCategory = useMemo(
    () => onboardingJobCategories.find((cat) => cat.name === currentGroup),
    [currentGroup]
  );
  const CurrentChip = (
    currentCategory
      ? (
          JobChips as unknown as Record<
            string,
            ComponentType<JobChipProps> | null | undefined
          >
        )[currentCategory.chip]
      : null
  ) as ComponentType<JobChipProps> | null | undefined;

  const currentTextColor = currentCategory
    ? getChipMainColor(currentCategory.chip)
    : "#7951FF";

  const toDisplay = (jobKey: string) => {
    const display = jobKey.replace(/_/g, " · ").replace(/^·\s*/, "");
    return display;
  };

  const toggleJob = (jobKey: string) => {
    if (!currentGroup) return;
    setSelectedJobsByGroup((prev) => {
      const prevForGroup = prev[currentGroup] ?? [];
      const nextForGroup = prevForGroup.includes(jobKey)
        ? prevForGroup.filter((j) => j !== jobKey)
        : [...prevForGroup, jobKey];
      return { ...prev, [currentGroup]: nextForGroup };
    });
  };

  const finalizeSelection = () => {
    const aggregated = Array.from(
      new Set(Object.values(selectedJobsByGroup).flat())
    );
    if (aggregated.length === 0) {
      onNext([]);
    } else {
      onNext(aggregated);
    }
  };

  const goNextGroup = () => {
    if (isLastGroup) {
      finalizeSelection();
      return;
    }
    setGroupIndex((idx) => idx + 1);
  };

  const handleBack = () => {
    if (groupIndex > 0) {
      setGroupIndex((idx) => idx - 1);
    } else {
      onBack();
    }
  };

  return (
    <StepContainer>
      <StepHeader
        title="세부 직무를 선택할 시간이에요!"
        subTitle="(중복 선택 가능)"
        stepNumber={1}
        totalSteps={4}
        onBack={handleBack}
      />

      <div className="w-full flex flex-col md:items-center h-[calc(500px-55px)] mt-[32px]">
        <div className=" mb-[1px] hidden md:block">
          <SelectedJobGroupChips
            selectedJobGroups={jobGroup}
            active={currentGroup}
          />
        </div>

        <h3 className="text-Heading2-20sb text-center mb-[15px] flex items-center gap-1 hidden md:flex">
          {CurrentChip ? (
            <CurrentChip isSelected backgroundless width={24} height={24} />
          ) : null}
          <span style={{ color: currentTextColor }}>{currentGroupLabel}</span>
          직군에서 어떤 직무에 관심 있으세요?
        </h3>
        <div className="mb-[15px] md:hidden px-6">
          <h3 className="text-Heading2-20sb ">
            <span style={{ color: currentTextColor }}>{currentGroupLabel}</span>
            직군에서
            <br />
            어떤 직무에 관심 있으세요?
          </h3>
          <span className="text-neutral-500 text-sm font-medium">
            (중복 선택 가능)
          </span>
        </div>

        <div className="w-full px-6 grid grid-cols-3 md:w-[662px] md:px-0 mx-auto pb-20 md:pb-0 md:flex md:flex-wrap gap-2 justify-center">
          {availableJobs.map((job) => (
            <JobCategoryItem
              key={job}
              onClick={() => toggleJob(job)}
              isSelected={currentSelectedJobs.includes(job)}
              name={toDisplay(job)}
            />
          ))}
        </div>

        <StepActions className="w-full md:h-full md:flex md:items-end md:pb-[60px] ">
          <SecondaryButton onClick={goNextGroup}>여기 없어요</SecondaryButton>
          <ActionButton
            onClick={goNextGroup}
            state={currentSelectedJobs.length === 0 ? "disabled" : "abled"}
          >
            {isLastGroup ? "완료" : "다음"}
          </ActionButton>
        </StepActions>
      </div>
    </StepContainer>
  );
}
