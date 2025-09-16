"use client";

import { useEffect, useState } from "react";
import {
  StepContainer,
  StepActions,
  SecondaryButton,
  ActionButton,
} from "../../_components";
import FileUploadCard from "../../_components/FileUpload/FileUploadCard";
import FileUploadList from "../../_components/FileUpload/FileUploadList";
import { UploadedFile } from "../../_components/FileUpload/types/type";
import { useProgressSimulation } from "@/app/_hooks/useProgressSimulation";
import { ArrowLeft } from "@/app/_components/Icons";
import { ApiOnboardingPayload } from "../OnboardingFunnel";

type UploadStepProps = {
  onNext: (
    file: File | null,
    apiPayload: ApiOnboardingPayload
  ) => Promise<void>;
  apiPayload: ApiOnboardingPayload;
  isLoading?: boolean;
  onBack: () => void;
};

export function UploadStep({ onNext, apiPayload, onBack }: UploadStepProps) {
  const [file, setFile] = useState<UploadedFile | undefined>(undefined);
  const [actualFile, setActualFile] = useState<File | null>(null);
  const { progress, status, startSimulation, setError, cleanup } =
    useProgressSimulation({
      increment: 30,
      interval: 200,
    });
  const [isSkipLoading, setIsSkipLoading] = useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

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
    <>
      <div className="md:hidden w-full flex items-center justify-between md:border-b md:border-gray-200 pl-[16px] pr-[19px] pt-[14px] pb-[15px]">
        <button
          onClick={onBack}
          className="text-Button1-18sb flex items-center"
        >
          <ArrowLeft className="text-black mr-[2px]" />
        </button>
      </div>
      <StepContainer>
        <div className="flex flex-col h-full justify-between items-center py-7.5">
          <div className="px-3.5 py-1.5 bg-violet-50 rounded-lg inline-flex justify-center items-center gap-2.5">
            <p className="justify-start text-violet-500 text-sm font-semibold">
              기본 정보 입력이 완료됐어요!
            </p>
          </div>

          <div className="text-center mt-3 mb-3 w-70 md:w-auto text-black text-lg font-semibold">
            자기소개서 혹은 이력서를 등록하면 <p className="md:hidden"></p>더욱
            핏한 공고를 받을 확률이 높아져요!
          </div>

          <div className="flex flex-col gap-1.5 mx-5 md:mx-0">
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

          <div className="h-full flex items-end mt-1 pb-20 md:pb-0">
            <StepActions>
              <SecondaryButton onClick={handleSkip} disabled={isSkipLoading}>
                {isSkipLoading ? "넘어가는 중..." : "넘어가기"}
              </SecondaryButton>
              <ActionButton
                onClick={handleSubmit}
                state={file && !isSubmitLoading ? "abled" : "disabled"}
              >
                {isSubmitLoading ? "등록 중..." : "이력서 등록하기"}
              </ActionButton>
            </StepActions>
          </div>
        </div>
      </StepContainer>
    </>
  );
}
