"use client";

import { Dialog } from "@headlessui/react";
import { useState, useRef, useEffect } from "react";
import FileUploadCard from "@/app/(pages)/onboarding/_components/FileUpload/FileUploadCard";
import { FileUploadItem } from "@/app/(pages)/onboarding/_components/FileUpload/FileUploadItem";
import CheckIcon from "@/app/(pages)/onboarding/_components/FileUpload/icons/checkIcon";
import { UploadIcon } from "../../_Icons/UploadIcon";
import { UploadedFile } from "@/app/(pages)/onboarding/_components/FileUpload/types/type";
import { useUploadResume } from "@/app/_api/resume/hooks/useResumes";

type FileUploadModalProps = {
  open: boolean;
  onClose: () => void;
  onComplete?: () => void;
};

export default function FileUploadModal({
  open,
  onClose,
  onComplete,
}: FileUploadModalProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileProgress, setFileProgress] = useState<
    Record<
      string,
      { progress: number; status: "loading" | "success" | "error" }
    >
  >({});
  const [originalFilesMap, setOriginalFilesMap] = useState<
    Record<string, File>
  >({});
  const uploadResumeMutation = useUploadResume();

  // 모달이 열릴 때마다 상태 초기화
  useEffect(() => {
    if (open) {
      setUploadedFiles([]);
      setError(null);
      setIsSubmitting(false);
      setFileProgress({});
      setOriginalFilesMap({});
    }
  }, [open]);

  const processFileSequentially = async (files: File[]) => {
    const newOriginalFilesMap: Record<string, File> = {};
    const newUploadedFiles: UploadedFile[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      const uploaded: UploadedFile = {
        id: fileId,
        name: file.name,
        size: file.size,
        uploadedAt: new Date().toISOString(),
      };

      // 파일 ID와 원본 파일 매핑
      newOriginalFilesMap[fileId] = file;
      newUploadedFiles.push(uploaded);

      // 진행률 초기화
      setFileProgress((prev) => ({
        ...prev,
        [fileId]: { progress: 0, status: "loading" },
      }));
    }

    // 상태 업데이트
    setOriginalFilesMap(newOriginalFilesMap);
    setUploadedFiles(newUploadedFiles);

    // 시뮬레이션 애니메이션 (100%까지)
    for (const uploadedFile of newUploadedFiles) {
      await simulateFileUpload(uploadedFile.id);
    }
  };

  const simulateFileUpload = (fileId: string): Promise<void> => {
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 20;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setFileProgress((prev) => ({
            ...prev,
            [fileId]: { progress: 100, status: "success" },
          }));
          resolve();
        } else {
          setFileProgress((prev) => ({
            ...prev,
            [fileId]: { progress, status: "loading" },
          }));
        }
      }, 100);
    });
  };

  const handleFiles = (files: File[]) => {
    processFileSequentially(files);
  };

  const handleComplete = async () => {
    if (uploadedFiles.length === 0) {
      handleError("업로드할 파일이 없습니다.");
      return;
    }

    setIsSubmitting(true);

    try {
      // 현재 표시된 파일들만 실제 업로드 (삭제된 파일은 제외)
      for (const uploadedFile of uploadedFiles) {
        const file = originalFilesMap[uploadedFile.id];

        if (!file) {
          console.warn(
            `파일 ${uploadedFile.id}에 해당하는 원본 파일을 찾을 수 없습니다.`
          );
          continue;
        }

        try {
          // 실제 API 호출
          const response = await uploadResumeMutation.mutateAsync(file);

          if (response.success) {
            // 업로드 성공 - 상태는 그대로 유지 (이미 success로 표시됨)
          } else {
            throw new Error(response.message || "업로드에 실패했습니다.");
          }
        } catch (error) {
          // 개별 파일 업로드 실패
          setFileProgress((prev) => ({
            ...prev,
            [uploadedFile.id]: { progress: 0, status: "error" },
          }));
          throw error;
        }
      }

      // 모든 업로드 완료
      if (onComplete) {
        onComplete();
      } else {
        onClose();
      }
    } catch (error) {
      console.error("파일 업로드 실패:", error);
      handleError(
        error instanceof Error
          ? error.message
          : "파일 업로드 중 오류가 발생했습니다."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleError = (message: string) => {
    setError(message);
    // 3초 후 에러 메시지 자동 제거
    setTimeout(() => setError(null), 1500);
  };

  const handleMobileFileUpload = () => {
    fileInputRef.current?.click();
  };

  const validateFiles = (files: File[]) => {
    const maxSizeMB = 15;
    const allowedTypes = [".pdf", ".doc", ".docx", ".hwp", ".hwpx"];

    for (const file of files) {
      // 파일 크기 검증
      if (file.size > maxSizeMB * 1024 * 1024) {
        handleError(`파일은 최대 ${maxSizeMB}MB까지 업로드할 수 있어요.`);
        return false;
      }

      // 파일 형식 검증
      const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();
      if (!allowedTypes.includes(fileExtension)) {
        handleError(
          "허용되지 않는 파일 형식입니다. PDF, DOC, DOCX, HWP, HWPX 파일만 업로드 가능합니다."
        );
        return false;
      }
    }

    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      if (validateFiles(files)) {
        handleFiles(files);
      }
    }
    // input 초기화
    e.target.value = "";
  };

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50 ">
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel
          aria-labelledby="file-upload-title"
          className={`h-95 mx-auto w-full min-w-60 md:max-w-[600px] md:w-[600px] rounded-xl bg-white py-3 shadow-lg relative ${
            error ? "blur-xs" : ""
          }`}
        >
          <div className="flex flex-col md:flex-row items-center h-full">
            <div className="hidden w-50 md:block">
              <FileUploadCard
                onFiles={handleFiles}
                onError={handleError}
                multiple={true}
                accept=".pdf,.doc,.docx,.hwp,.hwpx"
                maxSizeMB={15}
                modal={true}
              />
            </div>

            <div className="md:border-l w-full md:border-neutral-200 px-4 flex-1 flex flex-col">
              <div className="flex justify-between items-center">
                <p className="font-semibold text-sm">업로드된 파일</p>
                <button
                  onClick={handleMobileFileUpload}
                  className="w-20 h-7 flex items-center justify-center gap-1 bg-violet-50 rounded-md md:hidden text-violet-500 text-[9.66px] font-semibold hover:bg-purple-200 transition-colors cursor-pointer"
                >
                  <UploadIcon className="text-violet-500"></UploadIcon>
                  파일업로드
                </button>
                <button
                  onClick={onClose}
                  aria-label="닫기"
                  className="hidden md:block rounded p-1 text-gray-500 hover:bg-gray-100"
                >
                  ✕
                </button>
              </div>
              <div className="md:h-54 mt-2.5 md:mt-1 border border-neutral-200 rounded-lg overflow-y-auto w-full md:w-[380px] h-full">
                {uploadedFiles.length === 0 ? (
                  <div className="flex justify-center items-center h-full">
                    <p className="text-stone-300 text-sm font-medium text-center">
                      아직 비어있네요. <br />
                      파일을 업로드하세요!
                    </p>
                  </div>
                ) : (
                  <div className="p-3 space-y-2">
                    {uploadedFiles.map((file) => (
                      <FileUploadItem
                        key={file.id}
                        file={file}
                        status={fileProgress[file.id]?.status || "loading"}
                        progress={fileProgress[file.id]?.progress || 0}
                        note={
                          file.size
                            ? `${(file.size / 1024 / 1024).toFixed(1)}MB`
                            : undefined
                        }
                        onRemove={(id) => {
                          setUploadedFiles((prev) =>
                            prev.filter((f) => f.id !== id)
                          );
                          setFileProgress((prev) => {
                            const newProgress = { ...prev };
                            delete newProgress[id];
                            return newProgress;
                          });
                          // 파일 맵에서도 해당 파일 제거
                          setOriginalFilesMap((prev) => {
                            const newMap = { ...prev };
                            delete newMap[id];
                            return newMap;
                          });
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center mt-2">
                <div className="mt-3 mb-4 flex flex-col gap-1">
                  <div className="flex items-start gap-2">
                    <CheckIcon />
                    <p className="text-[10px] font-medium text-zinc-400 md:text-xs md:text-stone-300">
                      파일 형식은 PDF, DOC, HWP, HWPX로 올려주세요
                    </p>
                  </div>

                  <div className="flex items-start gap-2">
                    <CheckIcon />
                    <p className="text-[10px] font-medium text-zinc-400 md:text-xs md:text-stone-300">
                      파일 최대 용량은 15mb까지입니다
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleComplete}
                  className={`hidden md:block ml-auto text-white text-sm font-semibold h-9 px-7 py-2 rounded-lg ${
                    uploadedFiles.length > 0 && !isSubmitting
                      ? "bg-violet-600 hover:bg-violet-700"
                      : "bg-neutral-400 cursor-not-allowed"
                  }`}
                  disabled={uploadedFiles.length === 0 || isSubmitting}
                >
                  {isSubmitting ? "제출 중" : "완료"}
                </button>
              </div>
              <div className="flex gap-2 mb-2">
                <button
                  onClick={onClose}
                  className="flex-1 md:hidden text-sm font-semibold h-9 px-7 py-2 bg-white rounded-lg border border-neutral-200 hover:bg-neutral-100 cursor-pointer "
                >
                  나가기
                </button>
                <button
                  onClick={handleComplete}
                  className={`cursor-pointer flex-1 md:hidden  text-white text-sm font-semibold h-9 px-7 py-2 rounded-lg ${
                    uploadedFiles.length > 0 && !isSubmitting
                      ? "bg-violet-600 hover:bg-violet-700"
                      : "bg-neutral-400 cursor-not-allowed"
                  }`}
                  disabled={uploadedFiles.length === 0 || isSubmitting}
                >
                  {isSubmitting ? "제출 중..." : "완료"}
                </button>
              </div>
            </div>
          </div>
        </Dialog.Panel>

        {/* 에러 메시지 오버레이 */}
        {error && (
          <div
            className="absolute inset-0 flex items-center justify-center z-10 cursor-pointer"
            onClick={() => {
              setError(null);
            }}
          >
            <div className="bg-red-500 text-white px-6 py-4 rounded-lg shadow-lg max-w-sm mx-4 text-center">
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}
      </div>

      {/* 숨겨진 파일 input (모바일용) */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".pdf,.doc,.docx,.hwp,.hwpx"
        onChange={handleFileChange}
        className="hidden"
      />
    </Dialog>
  );
}
