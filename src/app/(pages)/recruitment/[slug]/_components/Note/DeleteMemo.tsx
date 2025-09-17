"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type DeleteMemoProps = {
  title: string;
  isOpen: () => void;
  onDelete: () => void;
};

export default function DeleteMemo({
  title,
  isOpen,
  onDelete,
}: DeleteMemoProps) {
  const [mounted, setMounted] = useState(false);
  const cancelBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) cancelBtnRef.current?.focus();
  }, [mounted]);

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-memo-title"
      aria-describedby="delete-memo-desc"
      onKeyDown={(e) => e.key === "Escape" && isOpen()}
    >
      <div className="absolute inset-0 bg-black/40" onClick={isOpen} />

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] max-w-[92vw] p-10 bg-white rounded-xl  outline-offset-[-1px] outline-zinc-200 inline-flex flex-col justify-start items-center gap-10">
        <div className="w-96 h-12 flex flex-col justify-start items-center gap-1">
          <div
            id="delete-memo-title"
            className="self-stretch text-center justify-start text-gray-900 text-lg font-bold font-['Pretendard'] leading-7"
          >
            메모를 삭제하시겠습니까?
          </div>
          <div
            id="delete-memo-desc"
            className="self-stretch text-center justify-start text-gray-600 text-sm font-normal font-['Pretendard'] leading-tight"
          >
            ‘
            {title === ""
              ? "제목을 입력해주세요..."
              : title.length > 13
              ? title.slice(0, 13) + "…"
              : title}
            ’ 메모가 영구적으로 삭제됩니다
          </div>
        </div>
        <div className="w-full md:w-96 flex flex-col justify-start items-start gap-3">
          <div className="self-stretch inline-flex justify-center items-start gap-3">
            <button
              type="button"
              onClick={isOpen}
              ref={cancelBtnRef}
              className="cursor-pointer w-28 px-6 py-2 rounded-lg outline-offset-[-1px] outline outline-neutral-500 flex justify-center items-center gap-2 overflow-hidden text-neutral-500 text-base font-bold"
            >
              취소
            </button>

            <button
              type="button"
              onClick={onDelete}
              className="cursor-pointer flex-1 px-4 py-2 bg-red-600 rounded-lg flex justify-center items-center gap-2 overflow-hidden text-white text-base font-bold"
            >
              삭제하기
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
