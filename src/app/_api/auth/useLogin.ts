"use client";

import { useMutation } from "@tanstack/react-query";

type Provider = "kakao" | "naver" | "google";

function buildAuthorizeUrl(provider: Provider): string {
  const isBrowser = typeof window !== "undefined";
  const devRedirectOrigin = "http://localhost:3000";
  const prodRedirectOrigin = process.env.NEXT_PUBLIC_REDIRECT_ORIGIN;

  const currentOrigin = isBrowser ? window.location.origin : "";
  const isDev = isBrowser
    ? currentOrigin.includes("localhost:3000")
    : process.env.NODE_ENV !== "production";

  const redirectOrigin = isDev
    ? devRedirectOrigin
    : prodRedirectOrigin || currentOrigin;

  const base = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

  // 서버가 /auth/callback 을 추가로 붙이는 정책이므로 여기서는 루트로 전달
  const redirectParam = encodeURIComponent(`${redirectOrigin}/`);
  const path = `/oauth2/authorization/${provider}?redirect_uri=${redirectParam}`;

  if (
    base &&
    (base.startsWith("http://") ||
      base.startsWith("https://") ||
      base.startsWith("/"))
  ) {
    return `${base}${path}`;
  }
  return path;
}

export function useLogin() {
  return useMutation<{ ok: true }, Error, { provider: Provider }>({
    mutationFn: async ({ provider }) => {
      const url = buildAuthorizeUrl(provider);
      if (typeof window !== "undefined") {
        window.location.href = url;
      }
      return { ok: true };
    },
  });
}


