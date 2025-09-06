import React from "react";
import { ProgressIndicator } from "./ProgressIndicator";
import { ArrowLeft } from "@/app/_components/Icons";

interface StepHeaderProps {
  title: string;
  subTitle?: string;
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
      <button onClick={onBack} className="text-Button1-18sb flex items-center">
        <ArrowLeft className="text-black mr-[2px]" />
        이전
      </button>

      <h1 className="text-Heading3-18sb flex items-center justify-center gap-[6px] text-black">
        {title}{" "}
        <span className="text-Subheading4-12m text-[#767678]">{subTitle}</span>
      </h1>
      <ProgressIndicator stepNumber={stepNumber} totalSteps={totalSteps} />
    </div>
  );
}
