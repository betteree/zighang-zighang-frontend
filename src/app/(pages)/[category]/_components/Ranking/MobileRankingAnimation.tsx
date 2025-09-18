"use client";

import { useEffect, useState } from "react";
import { useAuthState } from "@/app/_api/auth/useAuthState";
import { Job } from "@/app/_types/jobs";
import { useRouter } from "next/navigation";
import { TriangleUpIcon } from "./Ranking";

interface MobileRankingAnimationProps {
  slug: string;
  data?: Job[];
  isLoading: boolean;
  error: Error | null;
  getRankingTitle: () => string;
}

export function MobileRankingAnimation({
  data,
  isLoading,
  error,
  getRankingTitle,
}: MobileRankingAnimationProps) {
  const { isLoggedIn } = useAuthState();
  const router = useRouter();
  const [currentStep] = useState(0);
  const [currentRankingIndex, setCurrentRankingIndex] = useState(-1);

  // 애니메이션 단계별 실행 (무한 루프)
  useEffect(() => {
    if (isLoading || error || !data?.length || !isLoggedIn) return;
    const len = Math.min(3, data.length);
    let i = -1; // -1이면 헤더(카테고리/타임스탬프) 노출
    const id = setInterval(() => {
      i = i + 1;
      if (i >= len) i = -1;
      setCurrentRankingIndex(i);
    }, 2000);
    return () => clearInterval(id);
  }, [isLoading, error, isLoggedIn, data?.length]);

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="flex w-full border px-5 py-7 border-neutral-200 rounded-lg items-center gap-3 md:hidden">
        <div className="flex-1 flex justify-start">
          <div className="text-neutral-400 text-sm">
            데이터를 불러오는 중입니다...
          </div>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div className="flex w-full border px-2 py-3 border-neutral-200 rounded-lg items-center gap-3 md:hidden">
        <div className="w-32">
          <h3 className="text-purple-800 text-sm font-semibold">
            {getRankingTitle()}
          </h3>
          <p className="text-neutral-400 text-[10px] font-medium">오류 발생</p>
        </div>
        <div className="flex-1 flex justify-start">
          <div className="text-red-500 text-sm">
            데이터를 불러올 수 없습니다.
          </div>
        </div>
      </div>
    );
  }

  // 데이터가 없을 때
  if (!data?.length) {
    return (
      <div className="flex w-full border px-2 py-1 border-neutral-200 rounded-lg items-center gap-3 md:hidden">
        <div className="w-32">
          <h3 className="text-purple-800 text-sm font-semibold">
            {getRankingTitle()}
          </h3>
          <p className="text-neutral-400 text-[10px] font-medium">
            {new Date().toLocaleString("ko-KR")}
          </p>
        </div>
        <div className="flex-1 flex justify-start">
          <div className="text-neutral-400 text-sm">인기 공고가 없습니다.</div>
        </div>
      </div>
    );
  }

  const topItems = data.slice(0, 3);

  return (
    <div
      className={`flex w-full items-center gap-3 md:hidden rounded-lg ${
        !isLoggedIn ? "bg-gray-100" : "border px-4 py-1 border-neutral-200 "
      }`}
    >
      <div className="flex-1 flex items-center justify-center py-2">
        {!isLoggedIn ? (
          // 로그인하지 않은 경우 - 로그인 유도 메시지만 표시
          <div
            className="px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors"
            onClick={() => router.push("/join")}
          >
            <span className="text-black text-Subheading3-14m flex ">
              <RankingIcon />

              <span className="ml-2">로그인하면</span>
              <span className="ml-1 text-violet-500">인기 공고</span>
              <span>를 확인할 수 있어요</span>

              <ArrowIcon />
            </span>
          </div>
        ) : (
          // 로그인한 경우 - 랭킹 애니메이션 표시
          <div className="flex justify-start w-full h-16">
            {/* 카테고리 제목 - 랭킹이 시작되면 사라짐 */}
            {currentStep === 0 && currentRankingIndex < 0 && (
              <div className="flex flex-col items-start justify-center animate-slide-up">
                <h3 className="text-purple-800 text-sm font-semibold">
                  {getRankingTitle()}
                </h3>
                <p className="text-neutral-400 text-[10px] font-medium">
                  {new Date().toLocaleString("ko-KR")}
                </p>
              </div>
            )}

            {/* 랭킹들 - Swiper처럼 하나씩만 표시 */}
            {currentRankingIndex >= 0 && topItems[currentRankingIndex] && (
              <div
                key={topItems[currentRankingIndex].id}
                className="flex gap-2 items-center justify-start w-full animate-slide-up cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition-colors"
                onClick={() =>
                  router.push(
                    `/recruitment/${topItems[currentRankingIndex].id}`
                  )
                }
              >
                <p className="text-purple-800 text-sm font-medium">
                  {currentRankingIndex + 1}
                </p>
                <div className="flex flex-col w-full">
                  <p className="text-zinc-800 text-Subheading3-14m truncate max-w-[168px]">
                    {topItems[currentRankingIndex].title}
                  </p>
                  <p className="text-zinc-600 text-[10px]">
                    {topItems[currentRankingIndex].companyName || "회사명 없음"}
                  </p>
                </div>
                <div className="flex items-center pb-4">
                  <TriangleUpIcon />
                  <p className="text-red-500 text-xs font-medium">
                    {topItems[currentRankingIndex].views}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// 랭킹 아이콘 컴포넌트
function RankingIcon() {
  return (
    <svg
      width="16"
      height="14"
      viewBox="0 0 19 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.1623 15.4285H1.62844C1.3513 15.4285 1.12195 15.213 1.1047 14.9364L0.554622 6.11357C0.529925 5.71744 0.936937 5.43835 1.29755 5.60413L5.36678 7.47483C5.62525 7.59365 5.93132 7.4849 6.05686 7.22964L9.14546 0.949663C9.33701 0.560185 9.89165 0.558389 10.0857 0.946618L13.2199 7.21634C13.35 7.4766 13.667 7.58132 13.9265 7.44976L17.4726 5.65218C17.8346 5.4687 18.2589 5.74788 18.2336 6.15288L17.686 14.9364C17.6688 15.213 17.4394 15.4285 17.1623 15.4285Z"
        fill="url(#paint0_linear_3314_32428)"
      />
      <rect
        x="0.5"
        y="13.9429"
        width="18"
        height="2.05713"
        rx="1"
        fill="#FFC803"
      />
      <defs>
        <linearGradient
          id="paint0_linear_3314_32428"
          x1="9.49346"
          y1="5.14684"
          x2="9.07274"
          y2="13.8946"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFCC00" />
          <stop offset="1" stopColor="#FF9D00" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// 화살표 아이콘 컴포넌트
function ArrowIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.0001 5.59221C7.6751 5.91721 7.6751 6.44221 8.0001 6.76721L11.2334 10.0005L8.0001 13.2339C7.6751 13.5589 7.6751 14.0839 8.0001 14.4089C8.3251 14.7339 8.8501 14.7339 9.1751 14.4089L13.0001 10.5839C13.3251 10.2589 13.3251 9.73388 13.0001 9.40888L9.1751 5.58388C8.85843 5.26721 8.3251 5.26721 8.0001 5.59221Z"
        fill="#AAAAAD"
      />
    </svg>
  );
}
