"use client";

import { useEffect, useRef } from "react";
import { RegionButton } from "./RegionButton";
import { REGION_OPTIONS, type RegionValue } from "../../_types/regionTypes";

export const REGION_VALUES = Object.values(REGION_OPTIONS) as RegionValue[];

export default function RegionButtonList({
  value,
  onChange,
}: {
  value: RegionValue[];
  onChange: (next: RegionValue) => void;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Record<RegionValue, HTMLButtonElement | null>>(
    {} as Record<RegionValue, HTMLButtonElement | null>
  );

  useEffect(() => {
    if (value.length === 0) return;
    // 가장 최근에 선택된 항목으로 스크롤
    const lastSelected = value[value.length - 1];
    const el = itemRefs.current[lastSelected];
    if (el && containerRef.current) {
      el.scrollIntoView({
        block: "center",
        inline: "nearest",
        behavior: "smooth",
      });
    }
  }, [value]);

  return (
    <div
      ref={containerRef}
      className="w-full md:w-48 h-80 mb-20 md:mb-0 overflow-y-auto scrollbar-hide overflow-hidden rounded-2xl border border-zinc-200 bg-white flex flex-col relative"
      role="listbox"
      aria-label="지역 선택"
    >
      {/* 모바일에서만 표시되는 고정 제목 */}
      <div className="sticky top-0 bg-white z-10 px-4 py-2 border-b border-zinc-200 md:hidden">
        <div className="w-9 h-0 border  border-zinc-200 mx-auto mb-1"></div>
        <h3 className="text-Heading5-14sb text-gray-700 text-center">
          지역리스트
        </h3>
      </div>

      {REGION_VALUES.map((label) => (
        <RegionButton
          key={label}
          ref={(node) => {
            itemRefs.current[label] = node;
          }}
          label={label}
          active={value.includes(label)}
          onClick={() => onChange(label)}
        />
      ))}
    </div>
  );
}
