import { useState } from "react";
import { Memo } from "../_types/memoTypes";
import HoverIcon from "@/app/(pages)/recruitment/[slug]/_components/Icons/HoverIcon";
import DeleteMemo from "../../recruitment/[slug]/_components/Note/DeleteMemo";

interface MemoSectionProps {
  memo: Memo;
  onDelete?: (memoId: string) => void;
}

export default function MemoSection({ memo, onDelete }: MemoSectionProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    onDelete?.(memo.id);
    setIsDeleteModalOpen(false);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <div className=" bg-white rounded-lg px-5 py-4 border border-[#E1E1E4]">
      <div className="flex justify-between items-center mb-[10px]">
        <h3 className="text-Heading4-16sb">{memo.title}</h3>
        <button
          className="text-gray-400 hover:text-gray-600 cursor-pointer"
          onClick={handleDeleteClick}
        >
          <HoverIcon variant="trash" className="text-[#919193]" />
        </button>
      </div>

      <div className="text-Badge1-14m whitespace-pre-wrap">{memo.content}</div>
      
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
