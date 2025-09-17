import React from "react";

interface JobCategoryItemProps {
  name: string;
  isSelected: boolean;
  onClick: () => void;
}

export function JobCategoryItem({
  name,
  isSelected,
  onClick,
}: JobCategoryItemProps) {
  return (
    <button
      onClick={onClick}
      className={` cursor-pointer py-[9px] px-[8px] md:px-[18px] rounded-lg border-[1px] text-Heading5-14sb transition-all tracking-tight w-full md:w-auto ${
        isSelected
          ? "border-purple-500 bg-purple-50 text-[#7951FF]"
          : "border-[#EDEDED] bg-white text-gray-700"
      }`}
    >
      {name}
    </button>
  );
}
