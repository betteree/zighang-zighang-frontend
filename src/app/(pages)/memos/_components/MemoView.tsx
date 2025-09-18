"use client";

import { useState } from "react";
import MemoViewHeader from "./MemoViewHeader";
import MemoContentView from "./MemoContentView";
import { MemoGroup } from "../_types/memoTypes";

interface MemoViewProps {
  selectedMemo?: string | null;
  memoGroups?: MemoGroup[];
  viewMode?: "single" | "split";
  onViewChange?: (mode: "single" | "split") => void;
  leftSelectedMemo?: string | null;
  rightSelectedMemo?: string | null;
  onDeleteMemo?: (memoId: string) => void;
  onMemoSelect?: (memoId: string) => void;
  isMobile?: boolean;
}

export default function MemoView({
  selectedMemo,
  memoGroups,
  viewMode = "single",
  onViewChange,
  leftSelectedMemo,
  rightSelectedMemo,
  onDeleteMemo,
  onMemoSelect,
  isMobile = false,
}: MemoViewProps) {
  const [selectedView, setSelectedView] = useState<"single" | "split">(
    viewMode
  );

  const handleViewChange = (mode: "single" | "split") => {
    setSelectedView(mode);
    onViewChange?.(mode);
  };

  return (
    <div
      className={`${isMobile ? "w-full" : "w-2/3"} flex flex-col border ${
        isMobile
          ? " border-none"
          : "border-l-0 border-[#E1E1E4] rounded-r-[8px]"
      } h-[600px]`}
    >
      {!isMobile && (
        <MemoViewHeader
          selectedView={selectedView}
          onViewChange={handleViewChange}
        />
      )}

      <div
        className={`flex-1  ${
          isMobile ? "rounded-[8px]" : "rounded-br-[8px] bg-[#F1F1F5]"
        }`}
      >
        <MemoContentView
          viewMode={selectedView}
          selectedMemo={selectedMemo}
          memoGroups={memoGroups}
          leftSelectedMemo={leftSelectedMemo}
          rightSelectedMemo={rightSelectedMemo}
          onDeleteMemo={onDeleteMemo}
          onMemoSelect={onMemoSelect}
          isMobile={isMobile}
        />
      </div>
    </div>
  );
}
