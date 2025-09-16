"use client";
import { useState, useCallback, useMemo } from "react";
import { RegionValue } from "../../_types/regionTypes";
import React from "react";
import {
  StepContainer,
  StepHeader,
  StepActions,
  ActionButton,
} from "../../_components";
import { OnboardingMap } from "../../_components/Map/OnboardingMap";
import RegionButtonList from "../../_components/RegionButton/RegionButtonList";
import { SIDO_GEO } from "../../_types/onBoradingMap";

export function LocationStep({
  onBack,
  onSubmit,
  initialRegion,
}: {
  onBack: () => void;
  onSubmit: (지역: string | null) => void;
  initialRegion?: string;
}) {
  const [region, setRegion] = useState<RegionValue | null>(
    (initialRegion as RegionValue) || null
  );
  const isValid = useMemo(() => !!region, [region]);

  const handleSelect = useCallback(
    (next: Exclude<RegionValue, "전체" | "해외">) => {
      setRegion(next);
    },
    []
  );
  const handleChange = useCallback((next: RegionValue) => {
    setRegion(next);
  }, []);

  const handleSubmit = useCallback(() => {
    if (!region) return;

    if (region === "전체") {
      onSubmit(null);
    } else if (region === "해외") {
      onSubmit("해외");
    } else {
      onSubmit(region); // 나머지 지역
    }
  }, [region, onSubmit]);

  return (
    <StepContainer>
      <StepHeader
        title="원하는 근무 지역이 어떻게 되세요?"
        stepNumber={4}
        totalSteps={4}
        onBack={onBack}
      />

      <p className="text-Heading2-20sb md:hidden items-center justify-center gap-[6px] text-black p-7 pb-0">
        <span className="flex">
          원하는
          <p className="text-violet-500 ml-[6px]">근무 지역</p>이
        </span>
        어떻게 되세요?
      </p>

      <div className="flex flex-col md:flex-row items-center justify-center mt-6">
        <OnboardingMap
          geographies={SIDO_GEO}
          value={region}
          onSelect={handleSelect}
        ></OnboardingMap>
        <div className="flex flex-col gap-2 ">
          <RegionButtonList
            value={region}
            onChange={(next) => handleChange(next)}
          ></RegionButtonList>
          <StepActions>
            <ActionButton
              onClick={handleSubmit}
              state={isValid ? "abled" : "disabled"}
            >
              다음
            </ActionButton>
          </StepActions>
        </div>
      </div>
    </StepContainer>
  );
}
