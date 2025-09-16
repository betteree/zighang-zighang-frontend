"use client";

import React, { useMemo, useState, useCallback } from "react";
import {
  StepContainer,
  StepHeader,
  StepActions,
  ActionButton,
} from "../../_components";
import Dropdown from "../../_components/Dropdown/Dropdown";
import { SchoolChip } from "../../_components/Chip/SchoolChip";
import { GraduationChip } from "../../_components/Chip/GraduationChip";

export function EducationStep({
  onNext,
  onBack,
  initialSchool,
  initialGraduation,
}: {
  onNext: (학력: string, 졸업상태: string) => void;
  onBack: () => void;
  initialSchool?: string;
  initialGraduation?: string;
}) {
  const SCHOOL_OPTIONS = useMemo(
    () => [
      "초등학교",
      "중학교",
      "고등학교",
      "대학교(2,3년)",
      "대학교(4년)",
      "대학원(석사)",
      "대학원(박사)",
    ],
    []
  );
  const GRADUATION_OPTIONS = useMemo(
    () => ["재학 중", "휴학 중", "졸업유예", "졸업"],
    []
  );

  const [school, setSchool] = useState<string | null>(initialSchool || null);
  const [graduation, setGraduation] = useState<string | null>(
    initialGraduation || null
  );

  const isValid = useMemo(() => !!school && !!graduation, [school, graduation]);

  const handleSubmit = useCallback(() => {
    if (!isValid || !school || !graduation) return;
    onNext(school, graduation);
  }, [isValid, school, graduation, onNext]);

  return (
    <StepContainer>
      <StepHeader
        title="최종학력이 어떻게 되세요?"
        stepNumber={3}
        totalSteps={4}
        onBack={onBack}
      />

      <div className="text-Heading2-20sb md:hidden items-center justify-center gap-[6px] text-black p-7 pb-0 ">
        <span className="flex">
          <p className="text-violet-500">최종학력</p>이
        </span>
        어떻게 되세요?
      </div>

      <div className="w-full flex flex-col items-center md:h-[calc(500px-55px)]">
        <div className="mt-[58px] flex items-start gap-[16px]">
          {/* 좌측 아이콘 + 진행선 */}
          <div className="flex flex-col items-center gap-[16px]">
            <SchoolChip width={44} height={44} className="my-[1px]" />

            <GraduationChip
              isSelected={!!graduation}
              width={44}
              height={44}
              className="my-[1px]"
            />
          </div>

          {/* 우측 드롭다운 영역 */}
          <div className="flex flex-col gap-[16px]">
            <Dropdown
              placeholder="최종학교를 선택해주세요."
              options={SCHOOL_OPTIONS}
              value={school}
              onChange={setSchool}
            />
            <Dropdown
              placeholder="졸업구분을 선택해주세요"
              options={GRADUATION_OPTIONS}
              value={graduation}
              onChange={setGraduation}
              disabled={!school}
            />
          </div>
        </div>

        <StepActions className="w-full md:w-auto md:h-full md:items-end md:pb-[30px]">
          <ActionButton
            onClick={handleSubmit}
            state={isValid ? "abled" : "disabled"}
          >
            다음
          </ActionButton>
        </StepActions>
      </div>
    </StepContainer>
  );
}
