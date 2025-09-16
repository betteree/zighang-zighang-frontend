"use client";

import { useRouter } from "next/navigation";
import { MemoGroup } from "../_types/memoTypes";
import MemoSection from "./MemoSection";
import AddMemoButton from "./AddMemoButton";

interface SplitMemoViewProps {
  memoGroups?: MemoGroup[];
  leftSelectedMemo?: string | null;
  rightSelectedMemo?: string | null;
  onLeftMemoChange?: (memoId: string | null) => void;
  onRightMemoChange?: (memoId: string | null) => void;
}

export default function SplitMemoView({
  memoGroups,
  leftSelectedMemo,
  rightSelectedMemo,
  onLeftMemoChange,
  onRightMemoChange,
}: SplitMemoViewProps) {
  const router = useRouter();
  // 왼쪽 선택된 메모가 속한 공고 그룹 찾기
  const leftSelectedGroup = memoGroups?.find((group) =>
    group.memos.some((memo) => memo.id === leftSelectedMemo)
  );

  // 오른쪽 선택된 메모가 속한 공고 그룹 찾기
  const rightSelectedGroup = memoGroups?.find((group) =>
    group.memos.some((memo) => memo.id === rightSelectedMemo)
  );

  const handleRecruitmentNavigation = (recruitmentId: string) => {
    router.push(`/recruitment/${recruitmentId}`);
  };

  return (
    <div className="h-full flex">
      {/* 왼쪽 메모 뷰 */}
      <div className="flex-1 flex flex-col border-r border-[#E1E1E4]">
        {/* 왼쪽 헤더 */}
        <div className="p-6 pb-4 flex justify-between items-center flex-shrink-0">
          <h2 className="text-Heading3-18sb">
            {leftSelectedGroup?.recruitment.title || ""}
          </h2>
          {leftSelectedGroup && (
            <button
              className="text-Button3-14sb rounded-[8px] px-[14px] py-[6px] bg-white border border-[#E1E1E4] cursor-pointer"
              onClick={() => handleRecruitmentNavigation(leftSelectedGroup.recruitment.id)}
            >
              공고 바로가기
            </button>
          )}
        </div>

        {/* 왼쪽 메모 섹션들 */}
        <div className="flex-1 overflow-y-auto px-6 max-h-[450px]">
          {leftSelectedGroup ? (
            <>
              <div className="space-y-[6px]">
                {leftSelectedGroup.memos.map((memo) => (
                  <MemoSection
                    key={memo.id}
                    memo={memo}
                    onDelete={(memoId) => {
                      console.log("Delete left memo:", memoId);
                    }}
                  />
                ))}
              </div>
              <div className="mt-[6px]">
                <AddMemoButton
                  onAdd={() => {
                    console.log("Add new memo to left");
                  }}
                />
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <p className="text-Heading3-18sb text-[#919193] mb-2">
                  {rightSelectedMemo ? (
                    <>
                      다른 메모장을 클릭하면 <br />
                      같이 확인할 수 있어요!
                    </>
                  ) : (
                    <>
                      공고를 클릭해서 <br />
                      작성한 메모를 확인해보세요!
                    </>
                  )}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 오른쪽 메모 뷰 */}
      <div className="flex-1 flex flex-col">
        {/* 오른쪽 헤더 */}
        <div className="p-6 pb-4 flex justify-between items-center flex-shrink-0">
          <h2 className="text-Heading3-18sb">
            {rightSelectedGroup?.recruitment.title || ""}
          </h2>
          {rightSelectedGroup && (
            <button
              className="text-Button3-14sb rounded-[8px] px-[14px] py-[6px] bg-white border border-[#E1E1E4] cursor-pointer"
              onClick={() => handleRecruitmentNavigation(rightSelectedGroup.recruitment.id)}
            >
              공고 바로가기
            </button>
          )}
        </div>

        {/* 오른쪽 메모 섹션들 */}
        <div className="flex-1 overflow-y-auto px-6 max-h-[450px]">
          {rightSelectedGroup ? (
            <>
              <div className="space-y-[6px]">
                {rightSelectedGroup.memos.map((memo) => (
                  <MemoSection
                    key={memo.id}
                    memo={memo}
                    onDelete={(memoId) => {
                      console.log("Delete right memo:", memoId);
                    }}
                  />
                ))}
              </div>
              <div className="mt-[6px]">
                <AddMemoButton
                  onAdd={() => {
                    console.log("Add new memo to right");
                  }}
                />
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <p className="text-Heading3-18sb text-[#919193] mb-2">
                  {leftSelectedMemo ? (
                    <>
                      다른 메모장을 클릭하면 <br />
                      같이 확인할 수 있어요!
                    </>
                  ) : (
                    <>
                      공고를 클릭해서 <br />
                      작성한 메모를 확인해보세요!
                    </>
                  )}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
