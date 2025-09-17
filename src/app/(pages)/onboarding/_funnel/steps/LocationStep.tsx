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
  initialRegion = [],
}: {
  onBack: () => void;
  onSubmit: (지역: string[] | null) => void;
  initialRegion?: string[];
}) {
  const [regions, setRegions] = useState<RegionValue[]>(() => {
    if (!initialRegion) return [];
    return initialRegion as RegionValue[];
  });
  const isValid = useMemo(() => regions.length > 0, [regions]);

  const handleSelect = useCallback(
    (next: Exclude<RegionValue, "전체" | "해외">) => {
      setRegions((prev) => {
        if (prev.includes(next)) {
          // 이미 선택된 지역이면 제거
          return prev.filter((region) => region !== next);
        } else {
          // 선택되지 않은 지역이면 기존 선택에 추가
          return [...prev, next];
        }
      });
    },
    []
  );
  const handleChange = useCallback((next: RegionValue) => {
    console.log("handleChange next:", next);
    setRegions((prev) => {
      if (next === "전체") {
        return ["전체"];
      } else if (next === "해외") {
        if (prev.includes("해외")) {
          return prev.filter((region) => region !== "해외");
        } else {
          return ["해외"];
        }
      } else {
        if (prev.includes(next)) {
          return prev.filter((region) => region !== next);
        } else {
          return [
            ...prev.filter((region) => region !== "전체" && region !== "해외"),
            next,
          ];
        }
      }
    });
  }, []);

  const handleSubmit = useCallback(() => {
    if (regions.length === 0) return;

    if (regions.includes("전체")) {
      onSubmit(null);
    } else {
      const uniq = Array.from(new Set(regions));
      onSubmit(uniq);
    }
  }, [regions, onSubmit]);

  return (
    <StepContainer>
      <StepHeader
        title="원하는 근무 지역이 어떻게 되세요?"
        stepNumber={4}
        totalSteps={4}
        onBack={onBack}
      />

      <div className="text-Heading2-20sb md:hidden items-center justify-center gap-[6px] text-black p-7 pb-0">
        <span className="flex">
          원하는
          <p className="text-violet-500 ml-[6px]">근무 지역</p>이
        </span>
        어떻게 되세요?
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center mt-6">
        <OnboardingMap
          geographies={SIDO_GEO}
          value={regions}
          onSelect={handleSelect}
        ></OnboardingMap>
        <div className="flex flex-col gap-2 ">
          <RegionButtonList
            value={regions}
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
