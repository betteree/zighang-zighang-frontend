"use client";

import { Suspense, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export const dynamic = "force-dynamic";

const ACCESS_TOKEN_KEY = "zh_access_token";
const REFRESH_TOKEN_KEY = "zh_refresh_token";

function CallbackInner() {
  const router = useRouter();
  const params = useSearchParams();

  const checkUserOnboardingStatus = useCallback(async () => {
    try {
      const token = localStorage.getItem(ACCESS_TOKEN_KEY);
      if (!token) {
        router.replace("/onboarding");
        return;
      }

      const response = await fetch("/api/users/me", {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch user: ${response.status}`);
      }

      const result = await response.json();
      const user = result.data;

      // 사용자 이름만 로컬 스토리지에 저장
      if (user.name) {
        localStorage.setItem("user_name", user.name);
      }

      // 온보딩이 필요한지 체크
      const needsOnboarding =
        user.interestedJobs.length === 0 ||
        user.interestedJobCategories.length === 0 ||
        user.careerYear === 0 ||
        user.educationLevel === null ||
        user.preferredRegions.length === 0;

      const next = needsOnboarding ? "/onboarding" : "/";
      router.replace(next);
    } catch (error) {
      console.error("사용자 정보 조회 실패:", error);
      // 에러 시 기본적으로 온보딩으로 보냄
      router.replace("/onboarding");
    }
  }, [router]);

  useEffect(() => {
    if (!params) return;
    const accessToken = params.get("accessToken");
    const refreshToken = params.get("refreshToken");

    try {
      if (accessToken) localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
      if (refreshToken) localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    } catch {}

    if (accessToken) {
      checkUserOnboardingStatus();
    } else {
      router.replace("/");
    }
  }, [params, router, checkUserOnboardingStatus]);

  return null;
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={null}>
      <CallbackInner />
    </Suspense>
  );
}
