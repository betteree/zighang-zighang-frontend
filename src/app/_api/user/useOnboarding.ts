"use client";

import { useMutation } from "@tanstack/react-query";
import type { OnboardingApiResponse } from "@/app/(pages)/onboarding/_types/context";

type OnboardingPayload = {
  interestedJobs: string[];
  interestedJobCategories: string[];
  careerYear: number;
  educationLevel: string;
  graduationStatus: string;
  preferredRegion: string;
};

async function submitOnboarding(
  payload: OnboardingPayload,
  file?: File | null
): Promise<OnboardingApiResponse> {
  const token = localStorage.getItem("zh_access_token");
  if (!token) {
    throw new Error("토큰이 없습니다");
  }

  const formData = new FormData();
  
  // request 필드에 JSON 데이터 추가
  formData.append("request", JSON.stringify(payload));
  
  // resumeFile 필드에 파일 추가 (파일이 있는 경우)
  if (file) {
    formData.append("resumeFile", file);
  }

  const response = await fetch("/api/users/filter", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Failed to submit onboarding: ${response.status}`);
  }

  return response.json();
}

export function useSubmitOnboarding() {
  return useMutation({
    mutationFn: ({ payload, file }: { payload: OnboardingPayload; file?: File | null }) =>
      submitOnboarding(payload, file),
    onSuccess: (data) => {
      console.log("온보딩 제출 성공:", data);
    },
    onError: (error) => {
      console.error("온보딩 제출 실패:", error);
    },
  });
}
