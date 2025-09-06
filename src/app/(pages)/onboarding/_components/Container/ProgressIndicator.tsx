import React from "react";

interface ProgressIndicatorProps {
  stepNumber: number;
  totalSteps: number;
}

export function ProgressIndicator({
  stepNumber,
  totalSteps,
}: ProgressIndicatorProps) {
  return (
    <div className="flex items-center gap-[6px]">
      {Array.from({ length: totalSteps }, (_, i) => (
        <div
          key={i}
          className={`flex items-center justify-center ${
            i === stepNumber - 1
              ? "w-[18px] h-[18px] bg-[#7951FF] rounded-full"
              : "w-2 h-2 bg-[#C5C5C8] rounded-full"
          }`}
        >
          {i === stepNumber - 1 && (
            <span className="text-Button3-14sb text-white">{i + 1}</span>
          )}
        </div>
      ))}
    </div>
  );
}
