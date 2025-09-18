"use client";

import Image from "next/image";
import { Job } from "@/app/_types/jobs";
import { useBookmark } from "@/app/_api/bookmark/useBookmark";
import { useRecruitmentDetail } from "@/app/_api/recruitment/detail/useRecruitmentDetail";
import { logApplication } from "@/app/_api/recruitment/detail/applicationLog";
import Icon from "@/app/(pages)/[category]/_components/Icons/Icon";
import ShareIcon from "./Icons/ShareIcon";
import { useState } from "react";

interface RecruitmentHeaderProps {
  job: Job;
  slug: string;
}

export default function RecruitmentHeader({
  job,
  slug,
}: RecruitmentHeaderProps) {
  const { data: recruitmentData } = useRecruitmentDetail(slug);
  const isBookmarked = recruitmentData?.data?.isBookmarked ?? false;
  const {
    isBookmarked: bookmarkState,
    toggle,
    isPending,
  } = useBookmark(slug, isBookmarked);

  const [isLogging, setIsLogging] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

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

  const handleShareClick = async () => {
    try {
      const currentUrl = window.location.href;
      await navigator.clipboard.writeText(currentUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error("링크 복사 실패:", error);
      // fallback: 사용자에게 URL 표시
      alert(`링크를 복사하세요: ${window.location.href}`);
    }
  };
  return (
    <div className="flex w-full items-start gap-5">
      <section className="relative flex aspect-[1/1] flex-shrink-0 items-center justify-center rounded-xl md:rounded-2xl w-16 md:w-[100px] overflow-hidden bg-gray-100">
        {job.companyImageUrl ? (
          <Image
            src={job.companyImageUrl}
            alt={`${job.company} 로고`}
            width={100}
            height={100}
            className="w-full h-full object-cover border-1 rounded-2xl border-[rgba(0,0,0,0.1)]"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#4ec06c]">
            <span className="font-bold text-white text-[9px] md:text-xs whitespace-pre-line text-center leading-[12px] md:leading-[18px] p-1">
              {job.company.length > 10
                ? job.company.substring(0, 10) + ".."
                : job.company}
            </span>
          </div>
        )}
      </section>
      <div className="flex w-full flex-col gap-2 md:gap-0">
        <div className="flex justify-between">
          <h1 className="break-all text-xl font-semibold text-black md:gap-5 md:text-[26px]">
            {job.title}
          </h1>
          <div className="gap-2 hidden md:flex">
            <button
              onClick={toggle}
              disabled={isPending}
              className={`cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 bg-white hover:bg-zinc-100 active:bg-zinc-200 transition-colors h-12 min-w-12 p-2 border border-[#EDEDED] ${
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
              onClick={handleApplyClick}
              disabled={isLogging}
              className="relative whitespace-nowrap rounded-lg text-sm font-medium focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 bg-zighang-1000 text-white hover:bg-primary/90 transition-colors hover:cursor-pointer px-18 py-2 flex h-12 flex-1 items-center justify-center"
            >
              <span className="pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2 z-10 px-3 py-0.5 rounded-full border border-zighang-1000 bg-white text-zighang-1000 text-[12px] font-semibold leading-none shadow-sm">
                {job.deadlineType}
              </span>
              <span className="text-lg">지원하기</span>
            </button>
          </div>
        </div>
        <span className="w-fit text-sm font-medium text-[#5E5E5E] md:text-lg">
          {job.company}
        </span>
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-1 rounded-[8px] bg-[#6F6F6F]/10 px-2 py-1.5 text-xs font-bold text-[#6F6F6F] md:gap-2">
              <Image
                alt="조회수 아이콘"
                loading="lazy"
                width={19}
                height={12}
                className="h-[9px] w-[15px] md:h-[12px] md:w-[19px]"
                src="https://zighang.com/icon/eye.svg"
              />
              <div>{job.views}</div>
            </div>
            <button
              onClick={handleShareClick}
              className="hidden md:flex cursor-pointer items-center gap-1 rounded-[8px] px-2 py-1.5 text-xs font-bold text-neutral-700 text-Heading5-14sb md:gap-1 hover:bg-gray-100 transition-colors"
            >
              <ShareIcon width={16} height={16} />
              {isCopied ? "복사됨!" : "공유하기"}
            </button>
          </div>
          <button
            className="group flex cursor-pointer items-center gap-1 border-none bg-transparent p-0 text-xs font-medium leading-[17px] text-[#71717A] underline transition-colors duration-200 hover:text-[#6F00B6] md:text-sm"
            type="button"
            aria-haspopup="dialog"
            aria-expanded="false"
            aria-controls="radix-:Rbh2aqfnnjr9kq:"
            data-state="closed"
          >
            <Image
              alt="오류 제보 아이콘"
              loading="lazy"
              width={14}
              height={14}
              className="block transition-all duration-200 group-hover:hidden md:h-5 md:w-5"
              src="https://zighang.com/icon/report_problem.svg"
            />
            <Image
              alt="오류 제보 아이콘"
              loading="lazy"
              width={14}
              height={14}
              className="hidden transition-all duration-200 group-hover:block md:h-5 md:w-5"
              src="https://zighang.com/icon/report_problem_purple.svg"
            />
            오류 제보하기
          </button>
        </div>
      </div>
    </div>
  );
}
