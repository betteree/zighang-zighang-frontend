import React from "react";

interface JobCategoryItemProps {
  name: string;
  isSelected: boolean;
  onClick: () => void;
}

export function JobCategoryItem({ name, isSelected, onClick }: JobCategoryItemProps) {
  return (
    <button
      onClick={onClick}
      className={`py-[9px] px-[18px] rounded-lg border-[1px] text-Badge1-14m transition-all tracking-tight ${
        isSelected
          ? "border-purple-500 bg-purple-50 text-[#7951FF]"
          : "border-[#EDEDED] bg-white text-gray-700"
      }`}
    >
      {name}
    </button>
  );
}
