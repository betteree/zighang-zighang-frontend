"use client";

import { useEffect, useState } from "react";

const ACCESS_TOKEN_KEY = "zh_access_token";

export function useAuthState() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    try {
      const token = localStorage.getItem(ACCESS_TOKEN_KEY);
      setIsLoggedIn(Boolean(token));
    } catch {}

    const onStorage = (e: StorageEvent) => {
      if (e.key === ACCESS_TOKEN_KEY) {
        setIsLoggedIn(Boolean(e.newValue));
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return { isLoggedIn };
}
