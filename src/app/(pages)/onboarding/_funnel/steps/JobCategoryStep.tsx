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
  initialSelected = [],
}: {
  onNext: (직군: string[]) => void;
  onSkip: () => void;
  initialSelected?: string[];
}) {
  const [selectedCategories, setSelectedCategories] =
    React.useState<string[]>(initialSelected);

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

      <p className="text-Heading2-20sb md:hidden items-center justify-center gap-[6px] text-black p-7 pb-0">
        <span className="flex">
          원하는 <p className="text-violet-500">직군</p>을 선택해주세요.
        </span>
        <span className="text-Subheading3-14m text-[#767678] inline-flex items-center gap-1">
          (최대 3개 선택)
        </span>
      </p>

      <div className="w-full px-6 md:w-[613px] md:px-0 mt-5.5 md:mt-[80px] mx-auto pb-20 md:pb-0 grid grid-cols-3 md:flex md:flex-wrap gap-2 mb-[110px] md:[&>*:nth-child(1)]:ml-3 md:[&>*:nth-child(20)]:ml-3">
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
