"use client";

import { useState } from "react";
import { useDownloadResume } from "@/app/_api/resume/hooks/useResumes";

interface FileRenderProps {
  file: {
    id: string;
    name: string;
    type: string;
    size: number;
    url?: string;
    uploadDate?: string;
  };
  index: number;
  onDelete: (id: string) => void;
  isDeleting?: boolean;
}

export default function FileRender({
  file,
  index,
  onDelete,
  isDeleting = false,
}: FileRenderProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const downloadResumeMutation = useDownloadResume();

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    onDelete(file.id);
    setShowDeleteModal(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };
  return (
    <div className="grid grid-cols-12 items-center p-3 md:px-7 md:py-2.5 bg-white border-b border-gray-200 hover:bg-gray-50 transition-colors">
      {/* 번호 */}
      <div className="col-span-2">
        <p className="text-sm font-medium text-gray-500 text-start">
          {(index + 1).toString().padStart(2, "0")}
        </p>
      </div>

      {/* 파일명 */}
      <div className="col-span-7">
        <button
          onClick={() => {
            downloadResumeMutation.mutate(file.id);
          }}
          disabled={downloadResumeMutation.isPending}
          className="text-sm font-medium text-gray-900 hover:text-zighang-1000 hover:border-b hover:border-zighang-1000 transition-colors cursor-pointer text-left inline-block disabled:opacity-50 disabled:cursor-not-allowed truncate max-w-full"
          title={file.name}
        >
          {downloadResumeMutation.isPending
            ? "다운로드 중..."
            : file.name.length > 30
            ? file.name.slice(0, 30) + "…"
            : file.name}
        </button>
        <p className="md:hidden text-body2-12r text-neutral-500 text-xs">
          {file.uploadDate}
        </p>
      </div>

      {/* 업로드일 */}
      <div className="hidden md:block col-span-2">
        {file.uploadDate && (
          <p className="text-xs text-gray-500">{file.uploadDate}</p>
        )}
      </div>

      {/* 삭제 버튼 */}
      <div className="col-span-3 md:col-span-1 text-right ">
        <button
          onClick={handleDeleteClick}
          className="cursor-pointer p-1 text-gray-400 hover:text-red-500 transition-colors"
          title="파일 삭제"
        >
          <DeleteIcon />
        </button>
      </div>

      {/* 삭제 확인 모달 */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg px-10 py-8 w-full md:w-[600px] mx-4 ">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                파일 삭제하시겠습니까?
              </h3>
              <p className="text-sm text-gray-600 mb-6 md:mb-7">
                &lsquo;
                {file.name.length > 20
                  ? file.name.slice(0, 20) + "…"
                  : file.name}
                &rsquo; 파일이 영구적으로 삭제됩니다.
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={handleCancelDelete}
                  className="cursor-pointer px-4 py-2 flex-1 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={handleConfirmDelete}
                  disabled={isDeleting}
                  className="cursor-pointer px-4 py-2 flex-1 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isDeleting ? "삭제 중..." : "삭제"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DeleteIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.125 6.875H5.65278H17.875"
        stroke="#919193"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.5 6.875V17.7375C16.5 18.1386 16.3344 18.5234 16.0397 18.807C15.745 19.0906 15.3453 19.25 14.9286 19.25H7.07143C6.65466 19.25 6.25496 19.0906 5.96026 18.807C5.66556 18.5234 5.5 18.1386 5.5 17.7375V6.875M7.85714 6.875V4.2625C7.85714 3.86136 8.0227 3.47665 8.3174 3.193C8.6121 2.90935 9.0118 2.75 9.42857 2.75H12.5714C12.9882 2.75 13.3879 2.90935 13.6826 3.193C13.9773 3.47665 14.1429 3.86136 14.1429 4.2625V6.875"
        stroke="#919193"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.625 11V15.125"
        stroke="#919193"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.375 11V15.125"
        stroke="#919193"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
