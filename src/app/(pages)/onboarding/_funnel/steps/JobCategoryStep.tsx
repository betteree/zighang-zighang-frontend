import React from "react";
import {
  StepContainer,
  StepHeader,
  StepActions,
  SecondaryButton,
  ActionButton,
} from "../../_components";
import { onboardingJobCategories } from "@/app/_constants/onboardingJobCategories";
import { JobCategoryItem } from "./JobCategoryItem";

export function JobCategoryStep({
  onNext,
  onSkip,
}: {
  onNext: (직군: string[]) => void;
  onSkip: () => void;
}) {
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(
    []
  );

  const handleCategoryClick = (category: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category);
      } else if (prev.length < 3) {
        return [...prev, category];
      }
      return prev;
    });
  };

  const handleNext = () => {
    if (selectedCategories.length > 0) {
      onNext(selectedCategories);
    }
  };

  return (
    <StepContainer>
      <StepHeader
        title="원하는 직군을 선택해주세요."
        subTitle="(최대 3개 선택)"
        stepNumber={1}
        totalSteps={4}
      />

      <div className="w-[613px] mt-[80px] mx-auto flex flex-wrap gap-x-2 gap-y-3 mb-[98px] [&>*:nth-child(1)]:ml-3 [&>*:nth-child(20)]:ml-3">
        {onboardingJobCategories.map((category) => (
          <JobCategoryItem
            key={category.name}
            name={category.name}
            isSelected={selectedCategories.includes(category.name)}
            onClick={() => handleCategoryClick(category.name)}
          />
        ))}
      </div>

      <StepActions>
        <SecondaryButton onClick={onSkip}>잘 모르겠어요</SecondaryButton>
        <ActionButton
          onClick={handleNext}
          state={selectedCategories.length === 0 ? "disabled" : "abled"}
        >
          다음
        </ActionButton>
      </StepActions>
    </StepContainer>
  );
}
