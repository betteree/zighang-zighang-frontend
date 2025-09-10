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

        <div className="w-full h-full absolute inset-0 flex flex-col items-center desktop:pt-[62px] tablet:pt-[42px]">
          <p className="desktop:text-Heading3-18sb tablet:text-Heading4-16sb mobile:text-Heading5-14sb mb-1 text-[#5E5E5F]">
            직행, 뻔한 채용공고 사이트 아니에요.
          </p>
          <h2 className="desktop:text-Heading1-24sb mobile:text-Heading2-20sb text-black desktop:mb-[255px] tablet:mb-[238px]">
            오직 당신 ‘키워드’의 맞춤형 공고를 빠르게 찾아드려요!
          </h2>

          <label className="flex items-center gap-2 text-[#363636] desktop:text-[16px] tablet:text-Body1-14r desktop:mb-6 tablet:mb-4">
            <input
              type="checkbox"
              className="w-5 h-5"
              checked={applyRecent}
              onChange={(e) => setApplyRecent(e.target.checked)}
            />
            최근 설정한 필터 적용
          </label>
          <div className="desktop:mb-[30px] tablet:mb-[24px]">
            <ActionButton onClick={() => onNext(applyRecent)} state="abled">
              시작하기
            </ActionButton>
          </div>
        </div>
      </div>
    </StepContainer>
  );
}
