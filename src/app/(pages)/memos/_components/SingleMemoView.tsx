import Link from "next/link";
import { MemoGroup } from "../_types/memoTypes";
import MemoSection from "./MemoSection";
import AddMemoButton from "./AddMemoButton";
import { useCreateMemo } from "../../../_api/memos/useMemos";

interface SingleMemoViewProps {
  selectedMemo?: string | null;
  memoGroups?: MemoGroup[];
  onDeleteMemo?: (memoId: string) => void;
  onMemoSelect?: (memoId: string) => void;
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
    <div className="h-full flex flex-col">
      {/* 공고 제목과 공고 바로가기 - 고정 헤더 */}
      <div className="p-6 pb-4 flex justify-between items-center flex-shrink-0">
        <h2 className="text-Heading3-18sb">{selectedRecruitment.title}</h2>
        <Link
          className="text-Button3-14sb rounded-[8px] px-[14px] py-[6px] bg-white border border-[#E1E1E4]"
          href={`/recruitment/${selectedRecruitment.id}`}
        >
          공고 바로가기
        </Link>
      </div>

      {/* 스크롤 가능한 메모 섹션들 */}
      <div className="flex-1 overflow-y-auto px-6 max-h-[450px]">
        <div className="space-y-[6px]">
          {selectedGroup?.memos.slice().reverse().map((memo) => (
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
                createMemoMutation.mutate({
                  title: "",
                  content: ""
                }, {
                  onSuccess: (response) => {
                    // 새로 생성된 메모를 선택
                    if (response?.memo?.id && onMemoSelect) {
                      onMemoSelect(response.memo.id);
                    }
                  }
                });
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
