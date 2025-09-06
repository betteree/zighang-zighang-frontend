"use client";

import { useState, useEffect } from "react";
import OnboardingFunnel from "./_funnel/OnboardingFunnel";

export default function Page() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return <OnboardingFunnel />;
}
