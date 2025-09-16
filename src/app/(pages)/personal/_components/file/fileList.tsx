"use client";

import React, { useState } from "react";
import { EmptyFileIcon } from "../../_Icons/EmptyFileIcon";
import FileRender from "./fileRender";
import {
  useResumes,
  useDeleteResume,
} from "@/app/_api/resume/hooks/useResumes";

type FileListProps = {
  onFilesChange?: (hasFiles: boolean) => void;
};

export default function FileList({ onFilesChange }: FileListProps) {
  const [deletingFileId, setDeletingFileId] = useState<string | null>(null);

  // React Query hooks 사용
  const { data: resumeData } = useResumes();
  const deleteResumeMutation = useDeleteResume();

  const files = resumeData?.resumes || [];
  const isEmpty = files.length === 0;

  // 파일 목록이 변경될 때 부모에게 알림
  React.useEffect(() => {
    if (onFilesChange) {
      onFilesChange(files.length > 0);
    }
  }, [files.length, onFilesChange]);

  const handleDelete = async (id: string) => {
    try {
      setDeletingFileId(id);
      await deleteResumeMutation.mutateAsync(id);
      alert("삭제 완료!");
    } catch (error) {
      console.error("파일 삭제에 실패했습니다:", error);
      alert("파일 삭제에 실패했습니다.");
    } finally {
      setDeletingFileId(null);
    }
  };

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
                file={{
                  id: file.id,
                  name: file.fileName,
                  type: file.fileName.split(".").pop() || "",
                  size: file.size,
                  url: file.fileUrl,
                  uploadDate: file.uploadDate,
                }}
                index={idx}
                onDelete={handleDelete}
                isDeleting={deletingFileId === file.id}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
