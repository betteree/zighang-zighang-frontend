"use client";

import NotePad from "./Note/NotePad";
import NotePadLarge from "./Note/NotePadLarge";
import { useBookmark } from "@/app/_api/bookmark/useBookmark";
import { useRecruitmentDetail } from "@/app/_api/recruitment/detail/useRecruitmentDetail";
import { logApplication } from "@/app/_api/recruitment/detail/applicationLog";
import Icon from "@/app/(pages)/[category]/_components/Icons/Icon";
import { Job } from "@/app/_types/jobs";
import { useState } from "react";
import { useNotes } from "@/app/(pages)/recruitment/[slug]/_hooks/useNotes";
import { useAuthState } from "@/app/_api/auth/useAuthState";

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

  const { isLoggedIn } = useAuthState();
  const notesHook = useNotes(slug);
  const [isLogging, setIsLogging] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isLargeOpen, setIsLargeOpen] = useState(false);

  const handleShareClick = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // 2초 후 원래 텍스트로 복원
    } catch (err) {
      console.error("링크 복사에 실패했습니다:", err);
    }
  };

  const handleTopButtonClick = () => {
    setIsLargeOpen(!isLargeOpen);
  };

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
          <NotePad
            recruitmentId={slug}
            isLargeOpen={isLargeOpen}
            onToggleLarge={() => setIsLargeOpen(!isLargeOpen)}
          />
        </div>
      </div>

      {/* 모바일용 NotePadLarge - 노트 버튼 클릭 시 표시 */}
      {isLargeOpen && (
        <NotePadLarge
          isOpen={isLargeOpen}
          onToggle={() => setIsLargeOpen(false)}
          isLoggedIn={isLoggedIn}
          notesHook={notesHook}
        />
      )}

      <div className="fixed bottom-20 right-0 z-[49]  px-4 md:hidden">
        <button
          onClick={handleTopButtonClick}
          className="w-full bg-white border border-[#EDEDED] rounded-full px-3 py-3 shadow-lg hover:bg-zinc-50 transition-colors"
        >
          <NoteIcon />
        </button>
      </div>

      {/* 하단 액션바 */}
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
          <button
            onClick={handleShareClick}
            className="whitespace-nowrap text-sm font-medium focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 hover:bg-zinc-100 active:bg-zinc-200 transition-colors flex h-12 flex-1 items-center justify-center gap-2.5 rounded-lg bg-[#F7F1FB] px-4 py-3"
          >
            <div className="bg-gradient-to-b from-[#6F00B6] to-[#6F00B6] bg-clip-text text-base font-semibold text-transparent">
              {isCopied ? "복사됨!" : "공유하기"}
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

// 노트 아이콘 컴포넌트
function NoteIcon() {
  return (
    <svg
      width="28"
      height="27"
      viewBox="0 0 28 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="1.09065"
        y="1.06819"
        width="19.9841"
        height="24.7045"
        rx="2.206"
        stroke="#5E5E5F"
        strokeWidth="2.04458"
      />
      <path
        d="M27.3478 8.74868C26.9639 8.33364 26.4314 8.0874 25.8665 8.06374C25.3017 8.04008 24.7504 8.24092 24.3332 8.6224L15.5674 16.6843C15.5128 16.7329 15.47 16.7934 15.4422 16.8611L13.7661 20.5716C13.7243 20.6674 13.7108 20.7732 13.7274 20.8765C13.7439 20.9797 13.7898 21.076 13.8595 21.1539C13.9297 21.2322 14.0218 21.2876 14.1239 21.3129C14.2259 21.3382 14.3332 21.3322 14.4319 21.2957L18.2794 19.9467C18.3474 19.9209 18.4105 19.8837 18.466 19.8367L27.2211 11.7744C27.4282 11.5841 27.5958 11.3549 27.7142 11.0998C27.8327 10.8447 27.8998 10.5688 27.9115 10.2878C27.9233 10.0068 27.8796 9.72622 27.7828 9.46213C27.6861 9.19804 27.5383 8.9556 27.3478 8.74868Z"
        fill="#5E5E5F"
      />
      <path
        d="M6.16406 7.57812H15.8489"
        stroke="#5E5E5F"
        strokeWidth="2.15219"
      />
      <path
        d="M6.16406 11.8828H15.8489"
        stroke="#5E5E5F"
        strokeWidth="2.15219"
      />
    </svg>
  );
}
