import React from "react";
import { ProgressIndicator } from "./ProgressIndicator";
import { ArrowLeft } from "@/app/_components/Icons";

interface StepHeaderProps {
  title: string;
  subTitle?: React.ReactNode;
  stepNumber: number;
  totalSteps: number;
  onBack?: () => void;
}

export function StepHeader({
  title,
  subTitle,
  stepNumber,
  totalSteps,
  onBack,
}: StepHeaderProps) {
  return (
    <div className="w-full flex items-center justify-between border-b border-gray-200 pl-[16px] pr-[19px] pt-[14px] pb-[15px]">
      <button
        type="button"
        onClick={onBack}
        className="text-Button1-18sb flex items-center cursor-pointer"
        aria-label="이전"
      >
        <ArrowLeft className="text-black mr-[2px]" />
        <span className="sr-only md:not-sr-only md:inline">이전</span>
      </button>

      <h1 className="text-Heading3-18sb sr-only md:not-sr-only md:flex items-center justify-center gap-[6px] text-black">
        {title}{" "}
        {subTitle != null && (
          <span className="text-Subheading4-12m text-[#767678] inline-flex items-center gap-1">
            {subTitle}
          </span>
        )}
      </h1>
      <ProgressIndicator stepNumber={stepNumber} totalSteps={totalSteps} />
    </div>
  );
}
