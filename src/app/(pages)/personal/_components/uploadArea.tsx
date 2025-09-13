"use client";

import { UploadIcon } from "../_Icons/UploadIcon";
import { useState } from "react";
import FileList from "./file/fileList";
import FileUploadModal from "./file/fileUploadModal";

type FileRow = {
  id: string;
  name: string;
  uploadedAt: string;
};

type UploadAreaProps = {
  onFilesChange?: (files: FileRow[]) => void;
  initialFiles?: FileRow[];
};

export const mockFiles: FileRow[] = [
  {
    id: "1",
    name: "이력서_김민수.pdf",
    uploadedAt: "2025-09-10",
  },
  {
    id: "2",
    name: "자기소개서_김민수.docx",
    uploadedAt: "2025-09-11",
  },
  {
    id: "3",
    name: "포트폴리오_프로젝트.pdf",
    uploadedAt: "2025-09-12",
  },
];

export default function UploadArea({
  onFilesChange,
  initialFiles = [],
}: UploadAreaProps) {
  const [showTooltip, setShowTooltip] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const handleUpload = () => {
    setOpenModal(true);
  };

  const handleDelete = () => {
    console.log(1);
  };
  return (
    <div className="space-y-3 mt-16 md:mt-23 mb-24 md:mb-38">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-black text-xl font-semibold">업로드한 파일</p>
          <p className="text-zinc-800 text-sm font-medium">
            최적 공고를 위해 민수님이 업로드하신 자기소개서/이력서 내역이에요
          </p>
        </div>

        <div className="relative inline-block">
          <button
            type="button"
            onClick={handleUpload}
            className="hidden md:inline-flex gap-2 px-3 h-9 bg-violet-500 rounded-lg justify-center items-center z-10"
          >
            <UploadIcon className="text-white" />
            <p className="text-white text-sm font-semibold">파일 업로드</p>
          </button>

          {showTooltip && (
            <div
              className="hidden md:block absolute left-1/2 top-full -translate-x-1/2 mt-2
                         w-max bg-black text-white text-xs rounded-md px-3 py-2 shadow-lg
                         z-50 pointer-events-auto"
              role="tooltip"
            >
              <div className="flex items-start gap-2">
                <p>
                  자기소개서/이력서를 <br />
                  업로드 해주세요!
                </p>
                <button
                  type="button"
                  aria-label="말풍선 닫기"
                  className="text-white/80 hover:text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowTooltip(false);
                  }}
                >
                  ✕
                </button>
              </div>
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-black rotate-45" />
            </div>
          )}
        </div>
      </div>

      <FileList onDelete={handleDelete} />
      <button
        type="button"
        onClick={handleUpload}
        className="md:hidden w-full h-10 bg-violet-500 rounded-lg inline-flex justify-center items-center gap-2"
      >
        <UploadIcon className="text-white" />
        <p className="text-white text-sm font-semibold">파일 업로드</p>
      </button>
      <FileUploadModal open={openModal} onClose={() => setOpenModal(false)} />
    </div>
  );
}
