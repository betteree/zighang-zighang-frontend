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
  onLeftMemoChange?: (memoId: string | null) => void;
  onRightMemoChange?: (memoId: string | null) => void;
}

export default function MemoView({ 
  selectedMemo, 
  memoGroups, 
  viewMode = "single", 
  onViewChange,
  leftSelectedMemo,
  rightSelectedMemo,
  onLeftMemoChange,
  onRightMemoChange
}: MemoViewProps) {
  const [selectedView, setSelectedView] = useState<"single" | "split">(viewMode);

  const handleViewChange = (mode: "single" | "split") => {
    setSelectedView(mode);
    onViewChange?.(mode);
  };

  return (
    <div className="w-2/3 flex flex-col border border-[#E1E1E4] rounded-r-[8px] h-[600px]">
      <MemoViewHeader
        selectedView={selectedView}
        onViewChange={handleViewChange}
      />

      <div className="flex-1 bg-[#F1F1F5] rounded-br-[8px]">
        <MemoContentView 
          viewMode={selectedView} 
          selectedMemo={selectedMemo} 
          memoGroups={memoGroups}
          leftSelectedMemo={leftSelectedMemo}
          rightSelectedMemo={rightSelectedMemo}
          onLeftMemoChange={onLeftMemoChange}
          onRightMemoChange={onRightMemoChange}
        />
      </div>
    </div>
  );
}
