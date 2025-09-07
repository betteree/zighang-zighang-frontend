"use client";

import { useMemo, useState } from "react";
import { EXPERIENCE_MIN, EXPERIENCE_MAX } from "@/app/_constants/filterOptions";

type Props = {
  min: number;
  max: number;
  onChange: (min: number, max: number) => void;
};

export default function FilterRange({ min, max, onChange }: Props) {
  const [active, setActive] = useState<"min" | "max" | null>(null);

  const clampMin = (v: number) => Math.min(Math.max(EXPERIENCE_MIN, v), max);
  const clampMax = (v: number) => Math.max(Math.min(EXPERIENCE_MAX, v), min);

  const leftPct = useMemo(
    () => ((min - EXPERIENCE_MIN) / (EXPERIENCE_MAX - EXPERIENCE_MIN)) * 100,
    [min]
  );
  const rightPct = useMemo(
    () =>
      (1 - (max - EXPERIENCE_MIN) / (EXPERIENCE_MAX - EXPERIENCE_MIN)) * 100,
    [max]
  );

  return (
    <div className="px-1">
      <div className="relative h-10 flex items-center">
        <div className="absolute left-0 right-0 h-[3px] bg-zinc-200 rounded" />
        <div
          className="absolute h-[3px] bg-violet-500 rounded"
          style={{ left: `${leftPct}%`, right: `${rightPct}%` }}
        />

        <input
          type="range"
          min={EXPERIENCE_MIN}
          max={EXPERIENCE_MAX}
          step={1}
          value={min}
          onChange={(e) => onChange(clampMin(+e.target.value), max)}
          onPointerDown={() => setActive("min")}
          onBlur={() => setActive((a) => (a === "min" ? null : a))}
          className={[
            "range-thumb absolute w-full appearance-none bg-transparent",
            active === "min" ? "z-20" : "z-10",
          ].join(" ")}
          aria-label="최소 경력"
        />

        <input
          type="range"
          min={EXPERIENCE_MIN}
          max={EXPERIENCE_MAX}
          step={1}
          value={max}
          onChange={(e) => onChange(min, clampMax(+e.target.value))}
          onPointerDown={() => setActive("max")}
          onBlur={() => setActive((a) => (a === "max" ? null : a))}
          className={[
            "range-thumb absolute w-full appearance-none bg-transparent",
            active === "max" ? "z-20" : "z-10",
          ].join(" ")}
          aria-label="최대 경력"
        />
      </div>

      <div className="mt-1 flex justify-between text-sm text-zinc-600">
        <span>{min === 0 ? "신입" : `${min}년`}</span>
        <span>{max === 10 ? "10년+" : `${max}년`}</span>
      </div>
    </div>
  );
}
