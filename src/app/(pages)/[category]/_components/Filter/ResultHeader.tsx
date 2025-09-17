"use client";

import * as React from "react";
import Image from "next/image";

type SortKey = "views" | "latest";

type Props = {
  total?: number;
  showTodayBadge?: boolean;
  className?: string;
};

export default function ResultHeader({ total, className = "" }: Props) {
  const [onlyHiring, setOnlyHiring] = React.useState(false);
  const [sortKey, setSortKey] = React.useState<SortKey>("views");

  const sortLabel = sortKey === "views" ? "조회수 높은 순" : "최신순";

  return (
    <div
      className={`flex w-full justify-between px-4 pt-0 md:px-0 md:pt-6 ${className}`}
    >
      <div className="flex items-center gap-2 md:gap-3">
        <div className="flex items-baseline text-sm md:text-base">
          <span className="flex items-baseline">
            <span>총</span>
            <span className="ml-2 font-semibold text-[#7a52ff]">
              {total ?? 0}
            </span>
            <span className="ml-1">개</span>
          </span>
        </div>

        <div className="h-4 w-px border border-[#d4d4d8] md:mx-3" />

        <label className="flex items-center gap-2 text-sm text-gray-700">
          <span>채용중인 기업만</span>
          <button
            type="button"
            role="switch"
            aria-checked={onlyHiring}
            onClick={() => setOnlyHiring((v) => !v)}
            className={[
              "relative inline-flex h-5 w-9 items-center rounded-full transition-colors cursor-pointer",
              onlyHiring ? "bg-[#7a52ff]" : "bg-gray-300",
            ].join(" ")}
          >
            <span
              className={[
                "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                onlyHiring ? "translate-x-4" : "translate-x-1",
              ].join(" ")}
            />
          </button>
        </label>
      </div>

      <div className="flex items-center text-gray-700">
        <button
          type="button"
          onClick={() =>
            setSortKey((k) => (k === "views" ? "latest" : "views"))
          }
          className="cursor-pointer ds-mobile-listoption ml-auto flex items-center gap-1 rounded-lg py-3 text-sm font-bold text-[#7D7D7D] focus:outline-none active:bg-zinc-100 md:gap-2"
        >
          <Image
            src="https://zighang.com/icon/sort.svg"
            alt="정렬 아이콘"
            width={16}
            height={16}
            className="h-5 w-5"
          />
          <span className="mx-1">{sortLabel}</span>
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            height="16"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fill="none" d="M0 0h24v24H0V0z" />
            <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
