"use client";

import * as React from "react";
import {
  StepContainer,
  StepHeader,
  StepActions,
  ActionButton,
} from "../../_components";
import ExploreJobCarousel from "../../_components/ExploreJobCard/ExploreJobCarousel";
import type { ExploreJobKey } from "@/app/_constants/exploreJobCard";
import { EXPLORE_JOB_BY_KEY } from "@/app/_utils/exploreJobs";
import { ExplorePreview } from "../../_components/ExploreJobCard/ExplorePreview";

export function ExploreJobStep({
  onNext,
  onBack,
}: {
  onNext: (직군: string[]) => void;
  onBack: () => void;
}) {
  const [selectedKey, setSelectedKey] = React.useState<ExploreJobKey | null>(
    null
  );
  const [showPreview, setShowPreview] = React.useState(false);

  const canNext = !!selectedKey;
  const nextState: "abled" | "disabled" = canNext ? "abled" : "disabled";

  const handleNext = () => {
    if (!selectedKey) return;
    if (!showPreview) {
      setShowPreview(true);
      return;
    }
    const 직군 = [...EXPLORE_JOB_BY_KEY[selectedKey].jobs];
    onNext(직군);
  };

  const handleBack = () => {
    if (showPreview) {
      setShowPreview(false);
    } else {
      onBack();
    }
  };

  return (
    <StepContainer>
      <StepHeader
        title="성향에 맞는 카드를 선택해주세요"
        stepNumber={1}
        totalSteps={4}
        onBack={handleBack}
      />

      {!showPreview && (
        <div className="text-Heading2-20sb md:hidden items-center justify-center gap-[6px] text-black p-7 pb-0">
          <span className="flex">
            <p className="text-violet-500">성향에 맞는 카드</p>를
          </span>
          선택해주세요
        </div>
      )}

      <div className="h-full flex flex-col items-center mt-20">
        <div className="w-full">
          {!showPreview ? (
            <ExploreJobCarousel
              value={selectedKey}
              onChange={setSelectedKey}
              className="overflow-visible"
            />
          ) : (
            selectedKey && <ExplorePreview selectedKey={selectedKey} />
          )}
        </div>

        <StepActions className="mt-auto md:mb-40">
          <ActionButton onClick={handleNext} state={nextState}>
            다음
          </ActionButton>
        </StepActions>
      </div>
    </StepContainer>
  );
}
