"use client";

import Image from "next/image";
import React from "react";
import { StepContainer } from "../../_components/Container/StepContainer";
import { ActionButton } from "../../_components/Button/ActionButton";
import { StepActions } from "../../_components";

export function IntroStep({
  onNext,
}: {
  onNext: (applyRecentFilter: boolean) => void;
}) {
  const [applyRecent, setApplyRecent] = React.useState(false);
  return (
    <StepContainer>
      <div className="relative w-full h-screen md:h-full md:rounded-[16px] bg-gradient-to-b from-violet-100 to-white overflow-hidden">
        {/* 모바일 배경 이미지 */}
        <Image
          src="/MobileOnboardingbackground.svg"
          alt="background"
          fill
          className="md:hidden"
          priority
        />
        {/* 데스크톱 배경 이미지 */}
        <Image
          src="/Onboardingbackground.svg"
          alt="background"
          fill
          className="object-cover hidden md:block md:rounded-[16px]"
          priority
        />

        <div className="w-full h-full absolute inset-0 flex flex-col items-center pt-[62px]">
          <p className="text-Heading5-14sb md:text-Heading3-18sb mb-1 text-[#5E5E5F]">
            직행, 뻔한 채용공고 사이트 아니에요.
          </p>
          <h2 className="text-Heading2-20sb text-center max-w-58 md:max-w-none md:text-Heading1-24sb text-black mb-[255px]">
            오직 당신 &apos;키워드&apos;의 맞춤형 공고를 빠르게 찾아드려요!
          </h2>

          <StepActions showBorder={false} className="w-full">
            <div className="flex flex-col items-center justify-center w-full md:w-auto">
              <label className="flex items-center justify-center gap-2 text-[#363636] text-[16px] mb-2 md:mb-6">
                <input
                  type="checkbox"
                  className="w-4 h-5 md:w-5 md:h-5 accent-violet-600 cursor-pointer"
                  style={{
                    accentColor: "#7951FF",
                  }}
                  checked={applyRecent}
                  onChange={(e) => setApplyRecent(e.target.checked)}
                />
                최근 설정한 필터 적용
              </label>
              <ActionButton onClick={() => onNext(applyRecent)} state="abled">
                시작하기
              </ActionButton>
            </div>
          </StepActions>
        </div>
      </div>
    </StepContainer>
  );
}
