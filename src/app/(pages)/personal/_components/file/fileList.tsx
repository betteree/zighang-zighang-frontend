"use client";

import { EmptyFileIcon } from "../../_Icons/EmptyFileIcon";
import FileRender from "./fileRender";

type FileRow = {
  id: string;
  name: string;
  type: string;
  size: number;
  url?: string;
  uploadDate?: string;
};

type FileListProps = {
  files?: FileRow[]; // ❗ 옵셔널로 변경
  onDelete: (id: string) => void;
};

export default function FileList({ files = [], onDelete }: FileListProps) {
  const isEmpty = files.length === 0;

  return (
    <div className="w-full">
      <div className="">
        <div className="grid grid-cols-12 items-center text-zinc-600 text-xs md:text-sizc-800 md:text-sm font-medium p-3 md:px-7 md:py-2.5 bg-gray-100">
          <div className="col-span-2">번호</div>
          <div className="col-span-7">파일명</div>
          <div className="hidden md:block col-span-2">업로드일</div>
          <div className="col-span-3 md:col-span-1 text-right">삭제</div>
        </div>

        {isEmpty ? (
          <div className="flex flex-col justify-center items-center text-zinc-400 h-62 md:h-64 border-b border-neutral-200">
            <EmptyFileIcon className="w-50 h-30 text-red-500" />
            <p className="text-center">
              아직 비어 있네요. <br />
              파일을 올려 시작해보세요.
            </p>
          </div>
        ) : (
          <ul className="divide-y">
            {files.map((file, idx) => (
              <FileRender
                key={file.id}
                file={file}
                index={idx}
                onDelete={onDelete}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
