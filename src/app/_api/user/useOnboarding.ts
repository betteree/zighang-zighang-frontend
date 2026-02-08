"use client";

import { useMutation } from "@tanstack/react-query";
import client from "@/app/_api/client";
import type { OnboardingApiResponse } from "@/app/(pages)/onboarding/_types/context";

type OnboardingPayload = {
  interestedJobs: string[];
  interestedJobCategories: string[];
  careerYear: number;
  educationLevel: string;
  graduationStatus: string;
  preferredRegions: string[] | null;
};

async function submitOnboarding(
  payload: OnboardingPayload,
  file?: File | null,
): Promise<OnboardingApiResponse> {
  // 브라우저 내장 FormData 사용
  const formData = new FormData();

  // request 필드에 JSON 데이터 추가 (Blob으로 감싸서)
  const jsonBlob = new Blob([JSON.stringify(payload)], {
    type: "application/json",
  });
  formData.append("request", jsonBlob);

  // resumeFile 필드에 파일 추가 (파일이 있는 경우)
  if (file) {
    formData.append("resumeFile", file);
  }

  const response = await client.post("/api/users/filter", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}

export function useSubmitOnboarding() {
  return useMutation({
    mutationFn: ({
      payload,
      file,
    }: {
      payload: OnboardingPayload;
      file?: File | null;
    }) => submitOnboarding(payload, file),
    onSuccess: (data) => {
      console.log("온보딩 제출 성공:", data);
    },
    onError: (error) => {
      console.error("온보딩 제출 실패:", error);
    },
  });
}
