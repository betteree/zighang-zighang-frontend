"use client";

import { useEffect, useState } from "react";
import HoverIcon from "../Icons/HoverIcon";

type NoteItemProps = {
  id: string;
  title: string;
  onClick?: () => void;
  editMode?: boolean; // 필요 시 읽기 전용 제어에 사용
  onToggleEdit?: () => void;
  onOpenDetail?: (id: string) => void;
  onTitleChange?: (id: string, next: string) => void; // 디바운스 저장 (useNotes)
  onTitleBlur?: (id: string, title: string) => void; // 즉시 저장 (flush)
};

export default function NoteItem({
  id,
  title,
  onClick,
  onToggleEdit,
  onOpenDetail,
  onTitleChange,
}: NoteItemProps) {
  const [localTitle, setLocalTitle] = useState(title);

  // 부모 title 변경 시 동기화
  useEffect(() => {
    setLocalTitle(title);
  }, [title]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const isKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(input);
    const limit = isKorean ? 10 : 16;
    const next = input.length > limit ? input.slice(0, limit) : input;
    setLocalTitle(next);
    onTitleChange?.(id, next);
  };

  const goDetail = () => {
    if (id != null && onOpenDetail) {
      onOpenDetail(id);
      return;
    }
    if (onClick) onClick();
    else onToggleEdit?.();
  };

  return (
    <div className="self-stretch inline-flex flex-col items-start">
      <div
        className="self-stretch h-11 pl-3.5 pr-2.5 py-2.5 bg-white
                   rounded-lg outline outline-1 outline-offset-[-1px]
                   outline-zinc-200 inline-flex justify-between items-center"
      >
        <input
          type="text"
          value={localTitle}
          className="w-full min-w-0 truncate text-sm outline-none"
          onChange={handleChange}
          placeholder="제목을 입력해주세요"
        />
        <button
          onClick={goDetail}
          className="group relative inline-block h-6 w-6 cursor-pointer"
        >
          <HoverIcon
            variant="right"
            className="transition-transform text-gray-400 group-hover:text-black"
          />
        </button>
      </div>
    </div>
  );
}
