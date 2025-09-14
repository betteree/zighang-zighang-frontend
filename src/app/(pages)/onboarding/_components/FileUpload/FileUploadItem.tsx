"use client";

import React from "react";
import { FileIcon } from "./icons/fileIcon";
import { UploadedFileProps } from "./types/type";

export function FileUploadItem({
  file,
  status = "success",
  progress = 100,
  note,
  onRemove,
}: UploadedFileProps) {
  if (!file) {
    return (
      <div className="rounded-xl border border-dashed border-zinc-300 p-4 text-sm text-zinc-500">
        업로드할 파일을 추가해 주세요
      </div>
    );
  }

  const pct = Math.min(100, Math.max(0, progress));

  return (
    <div
      className="group h-20 w-full relative flex items-center gap-3 rounded-xl border border-white bg-white shadow-sm overflow-hidden min-w-0"
      aria-label={`${file.name} 업로드됨`}
    >
      {/* 체크무늬 배경 */}
      <div className="absolute -top-1 bottom-0 right-0 -left-2 rounded-xl bg-[linear-gradient(90deg,#f1f1f1_1px,transparent_1px),linear-gradient(#f1f1f1_1px,transparent_1px)] bg-[size:16px_16px]" />
      {/* 그라데이션 */}
      <div
        className={
          `absolute inset-0 rounded-xl bg-gradient-to-r to-white from-[0%] to-[70%] ` +
          (status === "loading"
            ? "from-gray-400/20"
            : status === "success"
            ? "from-violet-500/20"
            : "")
        }
      />
      <div
        className="absolute inset-0 rounded-xl
               bg-gradient-to-b from-transparent to-white
               from-[0%] to-[90%]"
      />
      <div className="relative flex flex-col w-full">
        <div className="flex w-full px-3 mb-1">
          <div
            className={
              status === "loading" ? "text-zinc-800" : "text-violet-500"
            }
          >
            <FileIcon />
          </div>

          <div className="min-w-0 flex-1 ml-1.5 overflow-hidden">
            <div className="flex items-center gap-2 min-w-0">
              <span className="font-semibold text-sm truncate block w-full">
                {file.name}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <p
                className={` text-xs font-medium ${
                  status === "error" ? "text-rose-600" : "text-neutral-500"
                }`}
              >
                {`${pct}%`}
              </p>
              <div className="w-0 h-1.5 outline-1 outline-offset-[-0.50px] outline-stone-300"></div>

              <p className="text-zinc-400 text-xs font-medium">{note}</p>
            </div>
          </div>
          {onRemove && (
            <div className="ml-2 flex shrink-0 items-center gap-1">
              <button
                type="button"
                aria-label="파일 삭제"
                className="rounded-md p-1 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
                onClick={() => onRemove(file.id)}
              >
                ✕
              </button>
            </div>
          )}
        </div>
        <div className="mt-2 h-[3px] w-full rounded bg-violet-200">
          <div
            className="h-[3px] rounded bg-violet-600 transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  );
}
