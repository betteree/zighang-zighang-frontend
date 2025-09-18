import * as React from "react";
import type { ExploreJobKey } from "@/app/_constants/exploreJobCard";
import type { IconType } from "@/app/_utils/exploreJobs";

export interface ExploreJobCardProps {
  jobKey: ExploreJobKey; // React의 key 예약어 충돌 방지
  category: string;
  Icon: IconType;
  selected?: boolean;
  className?: string;
  onSelect?: (key: ExploreJobKey, next: boolean) => void;
}

export default function ExploreJobCard({
  jobKey,
  category,
  Icon,
  selected = false,
  className,
  onSelect,
}: ExploreJobCardProps) {
  const handleClick = () => onSelect?.(jobKey, !selected);

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={selected}
      className={[
        "group w-[168px] h-[234px] md:h-[228px] text-left rounded-2xl border",
        "border-gray-200 bg-white",
        "p-4 md:p-2 cursor-pointer",
        "shadow-[0_0_12px_rgba(0,0,0,0.08)]",
        "transition-all duration-300",
        selected
          ? " shadow-[0_0_12px_rgba(216,180,254,0.9)]"
          : "hover:shadow-[0_0_12px_rgba(216,180,254,0.6)]",
        className || "",
      ].join(" ")}
    >
      <div className="flex items-center gap-4 flex-col">
        <Icon className="w-13 h-13 shrink-0" />
        <div className="min-w-0">
          <p className=" whitespace-pre-line  truncate text-center text-Heading5-14sb">
            {category}
          </p>
        </div>
      </div>
    </button>
  );
}
