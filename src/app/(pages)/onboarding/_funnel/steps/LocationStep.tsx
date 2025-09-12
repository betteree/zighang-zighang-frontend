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
}: {
  onBack: () => void;
  onSubmit: (지역: string | null) => void;
}) {
  const [region, setRegion] = useState<RegionValue | null>(null);
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
        stepNumber={5}
        totalSteps={5}
        onBack={onBack}
      />
      <div className="flex items-center justify-center mt-6">
        <OnboardingMap
          geographies={SIDO_GEO}
          value={region}
          onSelect={handleSelect}
        ></OnboardingMap>
        <div className="flex flex-col gap-2">
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
