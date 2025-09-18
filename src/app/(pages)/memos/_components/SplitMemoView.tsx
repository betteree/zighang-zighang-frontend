"use client";

import { useRouter } from "next/navigation";
import { MemoGroup } from "../_types/memoTypes";
import MemoSection from "./MemoSection";
import AddMemoButton from "./AddMemoButton";
import { useCreateMemo } from "../../../_api/memos/useMemos";

interface SplitMemoViewProps {
  memoGroups?: MemoGroup[];
  leftSelectedMemo?: string | null;
  rightSelectedMemo?: string | null;
  onDeleteMemo?: (memoId: string) => void;
  isMobile?: boolean;
}

export default function SplitMemoView({
  memoGroups,
  leftSelectedMemo,
  rightSelectedMemo,
  onDeleteMemo,
}: SplitMemoViewProps) {
  const router = useRouter();
  const leftSelectedGroup = memoGroups?.find((group) =>
    group.memos.some((memo) => memo.id === leftSelectedMemo)
  );

  const rightSelectedGroup = memoGroups?.find((group) =>
    group.memos.some((memo) => memo.id === rightSelectedMemo)
  );

  // 왼쪽과 오른쪽 공고의 ID
  const leftRecruitmentId = leftSelectedGroup?.recruitment.id;
  const rightRecruitmentId = rightSelectedGroup?.recruitment.id;

  // 메모 생성 훅들
  const createLeftMemoMutation = useCreateMemo(leftRecruitmentId);
  const createRightMemoMutation = useCreateMemo(rightRecruitmentId);

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
              onClick={() =>
                handleRecruitmentNavigation(leftSelectedGroup.recruitment.id)
              }
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
                {leftSelectedGroup.memos
                  .slice()
                  .reverse()
                  .map((memo) => (
                    <MemoSection
                      key={memo.id}
                      memo={memo}
                      onDelete={onDeleteMemo}
                      recruitmentId={leftRecruitmentId}
                    />
                  ))}
              </div>
              <div className="mt-[6px]">
                <AddMemoButton
                  onAdd={() => {
                    if (leftRecruitmentId) {
                      createLeftMemoMutation.mutate({
                        title: "",
                        content: "",
                      });
                    }
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
              onClick={() =>
                handleRecruitmentNavigation(rightSelectedGroup.recruitment.id)
              }
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
                {rightSelectedGroup.memos
                  .slice()
                  .reverse()
                  .map((memo) => (
                    <MemoSection
                      key={memo.id}
                      memo={memo}
                      onDelete={onDeleteMemo}
                      recruitmentId={rightRecruitmentId}
                    />
                  ))}
              </div>
              <div className="mt-[6px]">
                <AddMemoButton
                  onAdd={() => {
                    if (rightRecruitmentId) {
                      createRightMemoMutation.mutate({
                        title: "",
                        content: "",
                      });
                    }
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
