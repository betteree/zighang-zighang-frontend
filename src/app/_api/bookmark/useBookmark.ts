"use client";

import { useCallback, useState } from "react";
import { addBookmark, removeBookmark } from "./client";

export function useBookmark(recruitmentId: string | number, initial: boolean) {
  const [isBookmarked, setIsBookmarked] = useState<boolean>(!!initial);
  const [isPending, setIsPending] = useState<boolean>(false);

  const mutate = useCallback(
    async (next: boolean) => {
      if (isPending) return;
      setIsBookmarked(next); // 낙관적 업데이트
      setIsPending(true);
      try {
        if (next) {
          await addBookmark(recruitmentId);
        } else {
          await removeBookmark(recruitmentId);
        }
      } catch (e) {
        setIsBookmarked(!next);
        throw e;
      } finally {
        setIsPending(false);
      }
    },
    [recruitmentId, isPending]
  );

  const toggle = useCallback(() => {
    void mutate(!isBookmarked).catch(() => {});
  }, [mutate, isBookmarked]);

  return { isBookmarked, mutate, isPending, toggle };
}
