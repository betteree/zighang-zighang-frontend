"use client";

import React, { forwardRef, useMemo } from "react";
import Picker from "react-mobile-picker";

type ExperienceWheelProps = {
  selected: number;
  onChange: (value: number) => void;
  min?: number; // default: 0
  max?: number; // default: 10
  height?: number; // default: 160
  itemHeight?: number; // default: 40
  className?: string;
};

export const ExperienceWheel = forwardRef<HTMLDivElement, ExperienceWheelProps>(
  function ExperienceWheel(
    {
      selected,
      onChange,
      min = 0,
      max = 10,
      height = 160,
      itemHeight = 40,
      className,
    },
    ref
  ) {
    const options = useMemo(
      () => Array.from({ length: max - min + 1 }, (_, i) => i + min),
      [min, max]
    );

    const pickerValue = useMemo(
      () => ({ years: String(selected) }),
      [selected]
    );

    const handlePickerChange = (next: { years: string }) => {
      const value = Number(next?.years ?? selected);
      onChange(value);
    };

    const fadeHeight = 82;

    return (
      <div className={`relative ${className ?? ""}`} ref={ref}>
        {/* 위쪽 페이드 (강도 ↑) */}
        <div
          className="pointer-events-none absolute left-0 right-0 top-0 z-10"
          style={{
            height: fadeHeight,
            background:
              "linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.92) 35%, rgba(255,255,255,0) 80%)",
          }}
        />

        {/* 아래쪽 페이드 (강도 ↑) */}
        <div
          className="pointer-events-none absolute left-0 right-0 bottom-0 z-10"
          style={{
            height: fadeHeight,
            background:
              "linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0.92) 25%, rgba(255,255,255,0) 70%)",
          }}
        />

        <div className="w-[140px] rounded-[8px] bg-white relative z-0 text-Heading2-20sb">
          <Picker
            className="zh-picker-root"
            value={pickerValue}
            onChange={handlePickerChange}
            height={height}
            itemHeight={itemHeight}
            wheelMode="normal"
          >
            <Picker.Column name="years">
              {options.map((opt: number) => (
                <Picker.Item key={opt} value={String(opt)}>
                  {() => (
                    <div
                      className={`flex items-center justify-center select-none}`}
                      style={{ height: itemHeight }}
                    >
                      {opt === 0 ? "신입" : `${opt}년 이하`}
                    </div>
                  )}
                </Picker.Item>
              ))}
            </Picker.Column>
          </Picker>
        </div>
      </div>
    );
  }
);
