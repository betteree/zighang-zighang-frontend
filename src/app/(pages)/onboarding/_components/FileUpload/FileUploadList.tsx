"use client";

import React from "react";
import { FileUploadItem } from "./FileUploadItem";
import { UploadedFileProps } from "./types/type";
import CheckIcon from "./icons/checkIcon";

export default function FileUploadList(props: UploadedFileProps) {
  const { file, onRemove } = props;

  return !file ? (
    <div className="flex flex-col gap-1 mt-2.5 mb-4">
      <div className="flex gap-1">
        <CheckIcon></CheckIcon>
        <p className="text-xs font-medium text-zinc-400">
          파일 형식은 PDF, DOC, HWP, HWPX로 올려주세요
        </p>
      </div>

      <div className="flex gap-1">
        <CheckIcon></CheckIcon>
        <p className="text-xs font-medium text-zinc-400">
          온보딩에서는 1개의 파일만 업로드 가능합니다. (추후 &apos;내 맞춤
          공고&apos; 페이지에서 관리할 수 있습니다.)
        </p>
      </div>
    </div>
  ) : (
    <FileUploadItem key={file.id} file={file} onRemove={onRemove} {...props} />
  );
}
