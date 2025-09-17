import { useState, useRef, useCallback } from "react";
import { Memo } from "../_types/memoTypes";
import HoverIcon from "@/app/(pages)/recruitment/[slug]/_components/Icons/HoverIcon";
import DeleteMemo from "../../recruitment/[slug]/_components/Note/DeleteMemo";
import { useUpdateMemo } from "../../../_api/memos/useMemos";

interface MemoSectionProps {
  memo: Memo;
  onDelete?: (memoId: string) => void;
  recruitmentId?: string;
}

export default function MemoSection({
  memo,
  onDelete,
  recruitmentId,
}: MemoSectionProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [title, setTitle] = useState(memo.title);
  const [content, setContent] = useState(memo.content);

  const updateMemoMutation = useUpdateMemo(recruitmentId);
  
  // 디바운스를 위한 ref
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setIsDeleteModalOpen(false);
    onDelete?.(memo.id);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  // 디바운스된 저장 함수
  const debouncedSave = useCallback((newTitle: string, newContent: string) => {
    // 이전 타이머가 있으면 취소
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    
    // 새로운 타이머 설정
    debounceTimeoutRef.current = setTimeout(() => {
      updateMemoMutation.mutate({
        memoId: memo.id,
        data: {
          title: newTitle,
          content: newContent,
        },
      });
    }, 500);
  }, [memo.id, updateMemoMutation]);

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    debouncedSave(newTitle, content);
  };

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    debouncedSave(title, newContent);
  };

  return (
    <div className=" bg-white rounded-lg px-5 py-4 border border-[#E1E1E4]">
      <div className="flex justify-between items-center mb-[10px]">
        <input
          type="text"
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          className="text-Heading4-16sb border-none outline-none flex-1 mr-2 bg-transparent"
          placeholder="제목을 입력하세요"
        />

        <button
          className="text-gray-400 hover:text-gray-600 cursor-pointer"
          onClick={handleDeleteClick}
        >
          <HoverIcon variant="trash" className="text-[#919193]" />
        </button>
      </div>

      <textarea
        value={content}
        onChange={(e) => {
          handleContentChange(e.target.value);
          e.target.style.height = "auto";
          e.target.style.height = e.target.scrollHeight + "px";
        }}
        className="text-Badge1-14m w-full h-auto border-none outline-none resize-none bg-transparent min-h-[40px] overflow-hidden"
        placeholder="본문을 입력해주세요"
      />

      {isDeleteModalOpen && (
        <DeleteMemo
          title={memo.title}
          isOpen={handleCancelDelete}
          onDelete={handleConfirmDelete}
        />
      )}
    </div>
  );
}
