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

      <div className="fixed bottom-11 -right-5 z-[49]  px-4 md:hidden">
        <button onClick={handleTopButtonClick}>
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
                bookmarkState ? "text-zighang-1000" : "text-gray-200"
              }`}
            />
          </button>
          <button
            onClick={handleShareClick}
            className="whitespace-nowrap text-sm font-medium focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 hover:bg-zinc-100 active:bg-zinc-200 transition-colors flex h-12 flex-1 items-center justify-center gap-2.5 rounded-lg bg-[#F7F1FB] px-4 py-3"
          >
            <div className="bg-gradient-to-b from-[#7951ff] to-[#7951ff] bg-clip-text text-base font-semibold text-transparent">
              {isCopied ? "복사됨!" : "공유하기"}
            </div>
          </button>
          <button
            onClick={handleApplyClick}
            disabled={isLogging}
            className="whitespace-nowrap rounded-lg text-sm font-medium focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 bg-zighang-1000 text-white hover:bg-primary/90 transition-colors hover:cursor-pointer px-4 py-2 flex h-12 flex-1 items-center justify-center"
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
      width="76"
      height="90"
      viewBox="0 0 76 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_dddd_4351_46808)">
        <rect x="6" y="2.42285" width="60" height="60" rx="30" fill="white" />
        <rect
          x="6.5"
          y="2.92285"
          width="59"
          height="59"
          rx="29.5"
          stroke="#E1E1E4"
        />
        <rect
          x="25.0907"
          y="19.0682"
          width="19.9841"
          height="24.7045"
          rx="2.206"
          stroke="#5E5E5F"
          strokeWidth="2.04458"
        />
        <path
          d="M51.3478 26.7487C50.9639 26.3336 50.4314 26.0874 49.8665 26.0637C49.3017 26.0401 48.7504 26.2409 48.3332 26.6224L39.5674 34.6843C39.5128 34.7329 39.47 34.7934 39.4422 34.8611L37.7661 38.5716C37.7243 38.6674 37.7108 38.7732 37.7274 38.8765C37.7439 38.9797 37.7898 39.076 37.8595 39.1539C37.9297 39.2322 38.0218 39.2876 38.1239 39.3129C38.2259 39.3382 38.3332 39.3322 38.4319 39.2957L42.2794 37.9467C42.3474 37.9209 42.4105 37.8837 42.466 37.8367L51.2211 29.7744C51.4282 29.5841 51.5958 29.3549 51.7142 29.0998C51.8327 28.8447 51.8998 28.5688 51.9115 28.2878C51.9233 28.0068 51.8796 27.7262 51.7828 27.4621C51.6861 27.198 51.5383 26.9556 51.3478 26.7487Z"
          fill="#5E5E5F"
        />
        <path
          d="M30.1641 25.5781H39.8489"
          stroke="#5E5E5F"
          strokeWidth="2.15219"
        />
        <path
          d="M30.1641 29.8828H39.8489"
          stroke="#5E5E5F"
          strokeWidth="2.15219"
        />
      </g>
      <defs>
        <filter
          id="filter0_dddd_4351_46808"
          x="0"
          y="0.422852"
          width="76"
          height="89"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="1.5" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.121569 0 0 0 0 0.121569 0 0 0 0 0.121569 0 0 0 0.08 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_4351_46808"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="5" />
          <feGaussianBlur stdDeviation="2.5" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.121569 0 0 0 0 0.121569 0 0 0 0 0.121569 0 0 0 0.07 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_dropShadow_4351_46808"
            result="effect2_dropShadow_4351_46808"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="1" dy="11" />
          <feGaussianBlur stdDeviation="3" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.121569 0 0 0 0 0.121569 0 0 0 0 0.121569 0 0 0 0.04 0"
          />
          <feBlend
            mode="normal"
            in2="effect2_dropShadow_4351_46808"
            result="effect3_dropShadow_4351_46808"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="2" dy="19" />
          <feGaussianBlur stdDeviation="4" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.121569 0 0 0 0 0.121569 0 0 0 0 0.121569 0 0 0 0.01 0"
          />
          <feBlend
            mode="normal"
            in2="effect3_dropShadow_4351_46808"
            result="effect4_dropShadow_4351_46808"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect4_dropShadow_4351_46808"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
