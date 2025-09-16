"use client";

import NotePad from "./Note/NotePad";
import { useBookmark } from "@/app/_api/bookmark/useBookmark";
import { useRecruitmentDetail } from "@/app/_api/recruitment/detail/useRecruitmentDetail";
import { logApplication } from "@/app/_api/recruitment/detail/applicationLog";
import Icon from "@/app/(pages)/[category]/_components/Icons/Icon";
import { Job } from "@/app/_types/jobs";
import { useState } from "react";

interface SidebarActionsProps {
  slug: string;
  job: Job;
}

export default function SidebarActions({ slug, job }: SidebarActionsProps) {
  const { data: recruitmentData } = useRecruitmentDetail(slug);
  const isBookmarked = recruitmentData?.data?.isBookmarked ?? false;
  const {
    isBookmarked: bookmarkState,
    toggle,
    isPending,
  } = useBookmark(slug, isBookmarked);

  const [isLogging, setIsLogging] = useState(false);

  const handleApplyClick = async () => {
    if (isLogging) return;
    setIsLogging(true);
    // 사용자 제스처 내에서 즉시 새 탭 오픈 (팝업 차단 방지)
    window.open(job.href, "_blank", "noopener,noreferrer");
    try {
      await logApplication(slug);
    } catch (error) {
      console.error("지원 로깅 실패:", error);
    } finally {
      setIsLogging(false);
    }
  };

  return (
    <>
      {/* 데스크톱 사이드바 */}
      <div className="relative z-40 flex-col md:flex">
        <div className="sticky top-16 flex w-full flex-col gap-2 py-9">
          <NotePad recruitmentId={slug}></NotePad>
        </div>
      </div>

      {/* 모바일 하단 액션 바 */}
      <div className="fixed bottom-0 left-0 z-[50] w-full border-t border-t-line bg-white shadow-lg md:hidden">
        <div className="flex items-center justify-between gap-2 px-4 py-3">
          <button
            onClick={toggle}
            disabled={isPending}
            className={`inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 bg-white hover:bg-zinc-100 active:bg-zinc-200 transition-colors h-12 min-w-12 p-2 border border-[#EDEDED] ${
              bookmarkState ? "bg-[#F7F1FB]" : "bg-[#FAFAFA]"
            }`}
          >
            <Icon
              variant="bookmark"
              className={`transition-transform w-7 h-7 ${
                bookmarkState ? "text-purple-800" : "text-gray-200"
              }`}
            />
          </button>
          <button className="whitespace-nowrap text-sm font-medium focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 hover:bg-zinc-100 active:bg-zinc-200 transition-colors flex h-12 flex-1 items-center justify-center gap-2.5 rounded-lg bg-[#F7F1FB] px-4 py-3">
            <div className="bg-gradient-to-b from-[#6F00B6] to-[#6F00B6] bg-clip-text text-base font-semibold text-transparent">
              메모장
            </div>
          </button>
          <button
            onClick={handleApplyClick}
            disabled={isLogging}
            className="whitespace-nowrap rounded-lg text-sm font-medium focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 bg-primary text-white hover:bg-primary/90 transition-colors hover:cursor-pointer px-4 py-2 flex h-12 flex-1 items-center justify-center"
          >
            <span className="text-base">지원하기</span>
          </button>
        </div>
      </div>
    </>
  );
}
