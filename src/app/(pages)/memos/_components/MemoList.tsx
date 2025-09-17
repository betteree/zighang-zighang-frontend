import { useState } from "react";
import { MemoGroup } from "../_types/memoTypes";
import { calculateDDay } from "../_utils/dateUtils";
import DeleteMemo from "../../recruitment/[slug]/_components/Note/DeleteMemo";

interface MemoListProps {
  memoGroups: MemoGroup[];
  selectedMemoId?: string | null;
  onMemoSelect: (memoId: string) => void;
  viewMode?: "single" | "split";
  leftSelectedMemo?: string | null;
  rightSelectedMemo?: string | null;
  onBulkDeleteRecruitments?: (recruitmentIds: string[]) => void;
}

export default function MemoList({
  memoGroups,
  selectedMemoId,
  onMemoSelect,
  viewMode = "single",
  leftSelectedMemo,
  rightSelectedMemo,
  onBulkDeleteRecruitments,
}: MemoListProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedRecruitmentsForDelete, setSelectedRecruitmentsForDelete] = useState<
    Set<string>
  >(new Set());
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleEditClick = () => {
    setIsEditMode(true);
    setSelectedRecruitmentsForDelete(new Set());
  };

  const handleCompleteClick = () => {
    setIsEditMode(false);
    setSelectedRecruitmentsForDelete(new Set());
  };

  const handleDeleteClick = () => {
    if (selectedRecruitmentsForDelete.size > 0) {
      setIsDeleteModalOpen(true);
    }
  };


  const handleRecruitmentSelectForDelete = (recruitmentId: string) => {
    const newSelected = new Set(selectedRecruitmentsForDelete);
    if (newSelected.has(recruitmentId)) {
      newSelected.delete(recruitmentId);
    } else {
      newSelected.add(recruitmentId);
    }
    setSelectedRecruitmentsForDelete(newSelected);
  };


  const handleConfirmDelete = () => {
    if (selectedRecruitmentsForDelete.size > 0 && onBulkDeleteRecruitments) {
      onBulkDeleteRecruitments(Array.from(selectedRecruitmentsForDelete));
      setIsDeleteModalOpen(false);
      setIsEditMode(false);
      setSelectedRecruitmentsForDelete(new Set());
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  const getSelectedMemoTitle = () => {
    if (selectedRecruitmentsForDelete.size > 0) {
      return `${selectedRecruitmentsForDelete.size}개 공고의 모든 메모`;
    }
    return "선택된 메모";
  };

  return (
    <div className="w-1/3 flex flex-col border border-[#E1E1E4] rounded-l-[8px] h-[600px]">
      <div className="h-[58px] flex justify-between px-4 py-[14px] text-Heading3-18sb border-b border-[#E1E1E4] flex-shrink-0">
        <div>메모장</div>
        {isEditMode ? (
          <div className="flex gap-2">
            <button
              onClick={handleDeleteClick}
              disabled={selectedRecruitmentsForDelete.size === 0}
              className="text-Button3-14sb text-[#303030] border border-[#E1E1E4] rounded-[8px] px-[14px] py-1 bg-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              삭제
            </button>
            <button
              onClick={handleCompleteClick}
              className="text-Button3-14sb text-white rounded-[8px] px-[14px] py-1 bg-[#303030] cursor-pointer"
            >
              완료
            </button>
          </div>
        ) : (
          <button
            onClick={handleEditClick}
            className="text-Button3-14sb text-[#303030] border border-[#E1E1E4] rounded-[8px] px-[14px] py-1 cursor-pointer"
          >
            편집
          </button>
        )}
      </div>
      <div className="flex-1 overflow-y-auto">
        {memoGroups.map((group) => {
          const dDate = calculateDDay(group.recruitment.endDate);
          const isExpired = dDate.startsWith("D+");
          const firstMemoId = group.memos[0]?.id;

          // 선택 상태 확인
          const isSelected =
            viewMode === "single"
              ? selectedMemoId === firstMemoId
              : leftSelectedMemo === firstMemoId ||
                rightSelectedMemo === firstMemoId;

          const isRecruitmentSelectedForDelete = selectedRecruitmentsForDelete.has(
            group.recruitment.id
          );

          return (
            <div
              key={group.recruitment.id}
              className={`h-[98px] px-4 pt-[14px] pb-[18px] border-b border-[#E1E1E4] cursor-pointer transition-colors ${
                isSelected ? "bg-[#F7F1FB]" : "hover:bg-gray-50"
              }`}
              onClick={() => {
                if (!isEditMode) {
                  onMemoSelect(firstMemoId || "");
                }
              }}
            >
              <div className="relative">
                {isEditMode && (
                  <div 
                    className="absolute right-0 top-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRecruitmentSelectForDelete(group.recruitment.id);
                    }}
                  >
                    <div
                      className={`w-5 h-5 border rounded-[4px] flex items-center justify-center ${
                        isRecruitmentSelectedForDelete
                          ? "bg-black border-black"
                          : "bg-white border-2 border-[#E1E1E4]"
                      }`}
                    >
                      {isRecruitmentSelectedForDelete && (
                        <svg
                          width="12"
                          height="9"
                          viewBox="0 0 12 9"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 4.5L4.5 8L11 1"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                )}
                <div
                  className={`text-Badge3-10m px-2 py-[6px] rounded-[4px] inline-block mb-[6px] ${
                    isExpired
                      ? "text-black bg-[#F1F1F5]"
                      : "text-[#FF5151] bg-[#FF5151]/10"
                  }`}
                >
                  {dDate}
                </div>
                <div className="text-Heading5-14sb mb-[2px]">
                  {group.recruitment.title}
                </div>
                <div className="text-Body1-14r text-[#5E5E5F]">
                  {group.recruitment.companyName}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {isDeleteModalOpen && (
        <DeleteMemo
          title={getSelectedMemoTitle()}
          isOpen={handleCancelDelete}
          onDelete={handleConfirmDelete}
        />
      )}
    </div>
  );
}
