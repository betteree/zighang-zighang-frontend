"use client";

import { MouseEvent } from "react";
import Icon from "../Icons/Icon";
type BookmarkProps = {
  active: boolean;
  disabled?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};

export default function Bookmark({ active, disabled, onClick }: BookmarkProps) {
  return (
    <div
      className={`flex h-1/2 items-center justify-center
        ${active ? "bg-purple-50" : ""}`}
      style={{ borderTopRightRadius: "20px" }}
    >
      <button
        type="button"
        aria-pressed={active}
        aria-label={active ? "북마크 해제" : "북마크"}
        className="flex h-9 w-9 items-center justify-center p-1 md:h-12 md:w-12 disabled:opacity-60"
        onClick={onClick}
        disabled={disabled}
      >
        <Icon
          variant="bookmark"
          className={`transition-transform w-5 h-5 md:w-7 md:h-7 ${
            active ? "text-purple-800" : "text-gray-200"
          }`}
        />
      </button>
    </div>
  );
}
