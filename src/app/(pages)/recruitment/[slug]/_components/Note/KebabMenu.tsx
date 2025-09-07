"use client";
import HoverIcon from "../Icons/HoverIcon";
import { useState } from "react";
import { type Note } from "@/app/(pages)/recruitment/[slug]/_hooks/useNotes";
import DeleteMemo from "./DeleteMemo";

export type KebabMenuProps = {
  type: string;
  note: Note | null;
  onToggle: () => void;
  onDelete: (id: number) => void;
};

export default function KebabMenu({
  type,
  note,
  onToggle,
  onDelete,
}: KebabMenuProps) {
  const [open, setOpen] = useState(false);
  const [delConfirm, setDelConfirm] = useState(false);

  return (
    <>
      <div className="relative">
        <button
          onClick={() => setOpen((v) => !v)}
          type="button"
          className="group inline-flex h-6 w-6 items-center justify-center disabled:opacity-50"
          title="더보기"
        >
          <HoverIcon
            variant="more"
            className="text-gray-400 group-hover:text-black"
          />
        </button>

        {open && (
          <div className="w-24 bg-white border border-neutral-200 rounded-lg absolute top-full right-0 mt-2 z-10 flex flex-col">
            {type == "large" ? (
              <button
                onClick={onToggle}
                className="text-xs font-medium px-3 py-2.5 hover:bg-neutral-100 flex gap-0.5 border-b border-b-neutral-200"
              >
                <HoverIcon
                  variant="minimize"
                  className="transition-transform text-black"
                />
                접어보기
              </button>
            ) : (
              <button
                onClick={onToggle}
                className="text-xs font-medium px-3 py-2.5 hover:bg-neutral-100 flex gap-0.5 border-b border-b-neutral-200"
              >
                <HoverIcon
                  variant="maximize"
                  className="transition-transform text-black"
                />
                펼쳐보기
              </button>
            )}

            <button
              onClick={() => setDelConfirm(true)}
              className="text-xs font-medium px-3 py-2.5 hover:bg-neutral-100 flex gap-0.5"
            >
              <HoverIcon
                variant="trash"
                className="transition-transform text-black"
              />
              삭제하기
            </button>
          </div>
        )}
      </div>
      {delConfirm && note && (
        <DeleteMemo
          title={note.title}
          isOpen={() => setDelConfirm(false)}
          onDelete={() => onDelete(note.id)}
        ></DeleteMemo>
      )}
    </>
  );
}
