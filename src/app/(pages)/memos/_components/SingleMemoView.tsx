import Link from "next/link";
import { MemoGroup } from "../_types/memoTypes";
import MemoSection from "./MemoSection";
import AddMemoButton from "./AddMemoButton";
import { useCreateMemo } from "../../../_api/memos/useMemos";
import { ChevronRightIcon } from "../_Icons/ChevronRightIcon";

interface SingleMemoViewProps {
  selectedMemo?: string | null;
  memoGroups?: MemoGroup[];
  onDeleteMemo?: (memoId: string) => void;
  onMemoSelect?: (memoId: string) => void;
  isMobile?: boolean;
}

export default function SingleMemoView({
  selectedMemo,
  memoGroups,
  onDeleteMemo,
  onMemoSelect,
}: SingleMemoViewProps) {
  // 선택된 메모가 속한 공고 그룹 찾기
  const selectedGroup = memoGroups?.find((group) =>
    group.memos.some((memo) => memo.id === selectedMemo)
  );
  const recruitmentId = selectedGroup?.recruitment.id;

  const createMemoMutation = useCreateMemo(recruitmentId);

  if (!selectedMemo) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-Heading3-18sb text-[#919193] mb-2">
            공고를 클릭해서 <br />
            작성한 메모를 확인해보세요!
          </p>
        </div>
      </div>
    );
  }

  const selectedMemoData = selectedGroup?.memos.find(
    (memo) => memo.id === selectedMemo
  );
  const selectedRecruitment = selectedGroup?.recruitment;

  if (!selectedMemoData || !selectedRecruitment) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-Heading3-18sb text-[#919193] mb-2">
            메모를 찾을 수 없습니다.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="gap-1 mx-2 md:hidden flex-col md:flex-row md:p-6 pb-4 flex justify-between  flex-shrink-0">
        <div className="flex">
          <h2 className="md:hidden text-Heading3-18sb truncate">
            {selectedRecruitment.title}
          </h2>
          <Link
            className="md:hidden cursor-pointer"
            href={`/recruitment/${selectedRecruitment.id}`}
          >
            <ChevronRightIcon />
          </Link>
        </div>
        <p className="text-Body1-14r text-neutral-700">
          {selectedRecruitment.companyName}
        </p>
      </div>

      <div className="h-[450px] md:h-full flex flex-col rounded-lg md:rounded-none bg-[#f1f1f5] md:bg-transparent">
        {/* 공고 제목과 공고 바로가기 - 고정 헤더 */}
        <div className="md:p-6 md:pb-4 flex justify-between items-center flex-shrink-0">
          <h2 className="hidden md:block text-Heading3-18sb">
            {selectedRecruitment.title}
          </h2>
          <Link
            className="hidden md:block text-Button3-14sb rounded-[8px] px-[14px] py-[6px] bg-white border border-[#E1E1E4]"
            href={`/recruitment/${selectedRecruitment.id}`}
          >
            공고 바로가기
          </Link>
        </div>

        {/* 스크롤 가능한 메모 섹션들 */}
        <div className="flex-1 overflow-y-auto p-2 md:px-6 md:max-h-[450px]">
          <div className="space-y-[6px]">
            {selectedGroup?.memos
              .slice()
              .reverse()
              .map((memo) => (
                <MemoSection
                  key={memo.id}
                  memo={memo}
                  onDelete={onDeleteMemo}
                  recruitmentId={recruitmentId}
                />
              ))}
          </div>

          {/* 메모 추가 버튼 - 맨 아래에 위치 */}
          <div className="mt-[6px]">
            <AddMemoButton
              onAdd={() => {
                if (recruitmentId) {
                  createMemoMutation.mutate(
                    {
                      title: "",
                      content: "",
                    },
                    {
                      onSuccess: (response) => {
                        // 새로 생성된 메모를 선택
                        if (response?.memo?.id && onMemoSelect) {
                          onMemoSelect(response.memo.id);
                        }
                      },
                    }
                  );
                }
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
