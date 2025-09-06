"use client";

import { type FallbackProps } from "react-error-boundary";

export function LoadingFallback() {
  return <div className="p-4 text-center">Loading…</div>;
}

export function ErrorFallback({ error }: FallbackProps) {
  return <div className="p-4 text-center text-red-600">{error.message}</div>;
}
