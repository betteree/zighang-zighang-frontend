"use client";

import { useEffect, useRef } from "react";
import { RegionButton } from "./RegionButton";
import { REGION_OPTIONS, type RegionValue } from "../../_types/regionTypes";

export const REGION_VALUES = Object.values(REGION_OPTIONS) as RegionValue[];

export default function RegionButtonList({
  value,
  onChange,
}: {
  value: RegionValue | null;
  onChange: (next: RegionValue) => void;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Record<RegionValue, HTMLButtonElement | null>>(
    {} as Record<RegionValue, HTMLButtonElement | null>
  );

  useEffect(() => {
    if (!value) return;
    const el = itemRefs.current[value];
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
      className="w-48 h-80 overflow-y-auto scrollbar-hide overflow-hidden rounded-2xl border border-zinc-200 bg-white flex flex-col"
      role="listbox"
      aria-label="지역 선택"
    >
      {REGION_VALUES.map((label) => (
        <RegionButton
          key={label}
          ref={(node) => {
            itemRefs.current[label] = node;
          }}
          label={label}
          active={value === label}
          onClick={() => onChange(label)}
        />
      ))}
    </div>
  );
}
