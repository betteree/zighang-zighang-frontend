"use client";

import { useEffect, useState, useRef } from "react";
import { StepContainer } from "../../_components";
import FileUploadCard from "../../_components/FileUpload/FileUploadCard";
import FileUploadList from "../../_components/FileUpload/FileUploadList";
import {
  UploadStatus,
  UploadedFile,
} from "../../_components/FileUpload/types/type";
import { useProgressSimulation } from "@/app/_hooks/useProgressSimulation";

type ApiOnboardingPayload = {
  interestedJobs: string[];
  interestedJobCategories: string[];
  careerYear: number;
  educationLevel: string;
  graduationStatus: string;
  preferredRegion: string;
};

type UploadStepProps = {
  onNext: (
    file: File | null,
    apiPayload: ApiOnboardingPayload
  ) => Promise<void>;
  apiPayload: ApiOnboardingPayload;
  isLoading?: boolean;
};

export function UploadStep({
  onNext,
  apiPayload,
  isLoading = false,
}: UploadStepProps) {
  const [file, setFile] = useState<UploadedFile | undefined>(undefined);
  const [actualFile, setActualFile] = useState<File | null>(null);
  const { progress, status, startSimulation, setError, cleanup } =
    useProgressSimulation({
      increment: 30,
      interval: 200,
    });
  const [isSkipLoading, setIsSkipLoading] = useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const timerRef = useRef<number | null>(null);

  const handleFiles = (files: File[]) => {
    const f = files[0];
    if (!f) return;

    const uploaded: UploadedFile = {
      id: crypto.randomUUID(),
      name: f.name,
      size: f.size,
      uploadedAt: new Date().toISOString(),
      // 업로드 후 서버가 URL 주면 여기에 set
    };

    setFile(uploaded);
    setActualFile(f);

    // 진행률 시뮬레이션 시작
    startSimulation();
  };

  const handleError = () => {
    setError();
  };

  const handleRemove = (id: string) => {
    if (file?.id !== id) return;
    setFile(undefined);
    setActualFile(null);
  };

  const handleSubmit = async () => {
    setIsSubmitLoading(true);
    try {
      await onNext(actualFile, apiPayload);
    } finally {
      setIsSubmitLoading(false);
    }
  };

  const handleSkip = async () => {
    setIsSkipLoading(true);
    try {
      await onNext(null, apiPayload);
    } finally {
      setIsSkipLoading(false);
    }
  };

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  return (
    <StepContainer>
      <div className="flex flex-col h-full justify-between items-center py-7.5">
        <div className="px-3.5 py-1.5 bg-violet-50 rounded-lg inline-flex justify-center items-center gap-2.5">
          <p className="justify-start text-violet-500 text-sm font-semibold">
            기본 정보 입력이 완료됐어요!
          </p>
        </div>

        <div className="mt-3 mb-3 text-black text-lg font-semibold">
          자기소개서 혹은 이력서를 등록하면 더욱 핏한 공고를 받을 확률이
          높아져요!
        </div>

        <div className="flex flex-col gap-1.5">
          {/* 업로드 카드: 이벤트만 올려줌 */}

          <FileUploadCard
            onFiles={handleFiles}
            onError={handleError}
            multiple={false} // 단일 파일
            accept=".pdf,.doc,.hwp,.hwpx"
            maxSizeMB={15}
            hasFile={!!file}
          />

          {/* 업로드 리스트: 현재 상태 표시 */}

          <FileUploadList
            file={file}
            status={status}
            progress={progress}
            note={
              status === "loading"
                ? "3seconds lefts"
                : status === "success"
                ? "Success"
                : "Error"
            }
            onRemove={handleRemove}
          />
        </div>

        <div className="flex gap-2 h-full items-end mt-1">
          <button
            disabled={isSkipLoading}
            onClick={handleSkip}
            className={`flex-1 min-w-[150px] rounded-lg py-2 font-semibold border border-neutral-300 transition-all duration-200 ${
              isSkipLoading
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "hover:bg-gray-50"
            }`}
          >
            {isSkipLoading ? "넘어가는 중..." : "넘어가기"}
          </button>

          <button
            disabled={!file || isSubmitLoading}
            onClick={handleSubmit}
            className={`flex-1 min-w-[150px] rounded-lg py-2 font-semibold transition-all duration-200 ${
              file && !isSubmitLoading
                ? "bg-violet-500 text-white"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            {isSubmitLoading ? "등록 중..." : "이력서 등록하기"}
          </button>
        </div>
      </div>
    </StepContainer>
  );
}
