import SingleMemoView from "./SingleMemoView";
import SplitMemoView from "./SplitMemoView";
import { MemoGroup } from "../_types/memoTypes";

interface MemoContentViewProps {
  viewMode: "single" | "split";
  selectedMemo?: string | null;
  memoGroups?: MemoGroup[];
  leftSelectedMemo?: string | null;
  rightSelectedMemo?: string | null;
  onDeleteMemo?: (memoId: string) => void;
  onMemoSelect?: (memoId: string) => void;
  isMobile?: boolean;
}

export default function MemoContentView({
  viewMode,
  selectedMemo,
  memoGroups,
  leftSelectedMemo,
  rightSelectedMemo,
  onDeleteMemo,
  onMemoSelect,
  isMobile = false,
}: MemoContentViewProps) {
  return (
    <div className="h-full w-full">
      {viewMode === "single" ? (
        <SingleMemoView
          selectedMemo={selectedMemo}
          memoGroups={memoGroups}
          onDeleteMemo={onDeleteMemo}
          onMemoSelect={onMemoSelect}
          isMobile={isMobile}
        />
      ) : (
        <SplitMemoView
          memoGroups={memoGroups}
          leftSelectedMemo={leftSelectedMemo}
          rightSelectedMemo={rightSelectedMemo}
          onDeleteMemo={onDeleteMemo}
          isMobile={isMobile}
        />
      )}
    </div>
  );
}
