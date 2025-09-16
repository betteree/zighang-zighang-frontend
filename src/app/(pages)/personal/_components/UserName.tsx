"use client";

import { useEffect, useState } from "react";

interface UserNameProps {
  fallback?: string;
  showFirstLetterOnly?: boolean;
}

export default function UserName({
  fallback = "민수",
  showFirstLetterOnly = false,
}: UserNameProps) {
  const [displayName, setDisplayName] = useState(fallback);

  useEffect(() => {
    // 로컬 스토리지에서 사용자 이름 가져오기
    const storedName = localStorage.getItem("user_name");
    if (storedName) {
      setDisplayName(storedName);
    }
  }, []);

  const finalName = showFirstLetterOnly ? displayName.slice(1) : displayName;

  return finalName;
}
