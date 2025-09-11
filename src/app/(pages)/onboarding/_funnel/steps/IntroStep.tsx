"use client";

import Image from "next/image";
import React from "react";
import { StepContainer } from "../../_components/Container/StepContainer";
import { ActionButton } from "../../_components/Button/ActionButton";

export function IntroStep({
  onNext,
}: {
  onNext: (applyRecentFilter: boolean) => void;
}) {
  const [applyRecent, setApplyRecent] = React.useState(false);
  return (
    <StepContainer>
      <div className="relative w-full h-full rounded-[16px]">
        <Image
          src="/Onboardingbackground.png"
          alt="background"
          fill
          className="object-cover rounded-[16px]"
          priority
        />

        <div className="w-full h-full absolute inset-0 flex flex-col items-center pt-[62px]">
          <p className="text-Heading3-18sb mb-1 text-[#5E5E5F]">
            직행, 뻔한 채용공고 사이트 아니에요.
          </p>
          <h2 className="text-Heading1-24sb text-black mb-[255px]">
            오직 당신 &apos;키워드&apos;의 맞춤형 공고를 빠르게 찾아드려요!
          </h2>

          <label className="flex items-center gap-2 text-[#363636] text-[16px] mb-6">
            <input
              type="checkbox"
              className="w-5 h-5"
              checked={applyRecent}
              onChange={(e) => setApplyRecent(e.target.checked)}
            />
            최근 설정한 필터 적용
          </label>
          <div className="mb-[30px]">
            <ActionButton onClick={() => onNext(applyRecent)} state="abled">
              시작하기
            </ActionButton>
          </div>
        </div>
      </div>
    </StepContainer>
  );
}
