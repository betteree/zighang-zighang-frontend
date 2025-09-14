"use client";

import Image from "next/image";
import { useState } from "react";
import { useBookmark } from "@/app/_api/bookmark/useBookmark";

interface RecruitmentCardProps {
  item: {
    id: string | number;
    logo: string;
    company: string;
    title: string;
    bookmarked?: boolean;
  };
}

export default function RecruitmentCard({ item }: RecruitmentCardProps) {
  const { id, logo, company, title, bookmarked } = item;
  const { isBookmarked, mutate, isPending } = useBookmark(id, !!bookmarked);
  const [activeTab, setActiveTab] = useState<"job" | "reason">("job");

  const handleBookmarkClick = async () => {
    const next = !isBookmarked;
    try {
      await mutate(next);
    } catch (err) {
      alert(`북마크 처리에 실패했습니다.\n${err}`);
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg px-3.5 py-3 w-60 h-34 hover:[box-shadow:0_8px_25px_rgba(0,0,0,0.1)] transition-shadow duration-200 cursor-pointer">
      <div className="flex gap-1 items-cente mb-3.5">
        <button
          onClick={() => setActiveTab("job")}
          className={`cursor-pointer text-xs font-medium px-2.5 py-1 rounded-[20px] border inline-flex justify-start items-center gap-0.5 ${
            activeTab === "job"
              ? "text-violet-500 bg-white border-purple-200"
              : "text-neutral-400 bg-white border-zinc-200"
          }`}
        >
          {activeTab === "job" && (
            <svg
              width="4"
              height="5"
              viewBox="0 0 4 5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="2" cy="2.5" r="2" fill="#7951FF" />
            </svg>
          )}
          공고
        </button>
        <button
          onClick={() => setActiveTab("reason")}
          className={`cursor-pointer text-xs font-medium px-2.5 py-1 rounded-[20px] border inline-flex justify-start items-center gap-0.5 ${
            activeTab === "reason"
              ? "text-violet-500 bg-white border-purple-200"
              : "text-neutral-400 bg-white border-zinc-200"
          }`}
        >
          {activeTab === "reason" && (
            <svg
              width="4"
              height="5"
              viewBox="0 0 4 5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="2" cy="2.5" r="2" fill="#7951FF" />
            </svg>
          )}
          추천이유
        </button>
        <button
          onClick={handleBookmarkClick}
          disabled={isPending}
          className="cursor-pointer ml-auto disabled:opacity-50"
        >
          <Image
            alt={isBookmarked ? "북마크 아이콘" : "북마크 border 아이콘"}
            loading="lazy"
            width={7}
            height={7}
            className="h-7 w-7"
            src={
              isBookmarked
                ? "https://zighang.com/icon/bookmark.svg"
                : "https://zighang.com/icon/bookmark_border.svg"
            }
          />
        </button>
      </div>
      {activeTab === "job" ? (
        <div className="flex items-start  gap-2.5 mt-1.5 h-full">
          <div className="w-16 h-16 bg-gray-100 flex items-center justify-center rounded-xs">
            <Image
              src={logo}
              alt={`${company} 로고`}
              className="max-w-full max-h-full "
              width={60}
              height={60}
            />
          </div>
          <div className="h-16 flex flex-col justify-between">
            <p className="font-semibold text-base">{title}</p>
            <p className="text-neutral-400 font-medium text-xs">{company}</p>
          </div>
        </div>
      ) : (
        <p className=" text-zinc-800 text-sm font-medium">
          평소 재택근무를 좋아한다는 키워드와 가우디오랩의 근무환경과 일치하여
          추천하였어요.
        </p>
      )}
    </div>
  );
}
