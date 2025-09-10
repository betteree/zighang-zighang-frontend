"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export const dynamic = "force-dynamic";

const ACCESS_TOKEN_KEY = "zh_access_token";
const REFRESH_TOKEN_KEY = "zh_refresh_token";

function CallbackInner() {
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    if (!params) return;
    const accessToken = params.get("accessToken");
    const refreshToken = params.get("refreshToken");
    const loginSuccess = params.get("loginSuccess");
    try {
      if (accessToken) localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
      if (refreshToken) localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    } catch {}
    const next = loginSuccess === "true" ? "/onboarding" : "/";
    router.replace(next);
  }, [params, router]);

  return null;
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={null}>
      <CallbackInner />
    </Suspense>
  );
}

