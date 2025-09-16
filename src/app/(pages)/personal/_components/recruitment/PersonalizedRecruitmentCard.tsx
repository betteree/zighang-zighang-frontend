"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useBookmark } from "@/app/_api/bookmark/useBookmark";

interface RecruitmentCardProps {
  item: {
    id: string | number;
    logo: string;
    company: string;
    title: string;
    bookmarked?: boolean;
    reason: string;
  };
}

export default function RecruitmentCard({ item }: RecruitmentCardProps) {
  const { id, logo, company, title, bookmarked, reason } = item;
  const { isBookmarked, mutate, isPending } = useBookmark(id, !!bookmarked);
  const [activeTab, setActiveTab] = useState<"job" | "reason">("job");
  const router = useRouter();

  const handleBookmarkClick = async () => {
    const next = !isBookmarked;
    try {
      await mutate(next);
    } catch (err) {
      alert(`북마크 처리에 실패했습니다.\n${err}`);
    }
  };

  const handleCardClick = () => {
    router.push(`/recruitment/${id}`);
  };

  return (
    <div
      className="border border-gray-200 rounded-lg px-3.5 py-3 w-full h-34 hover:[box-shadow:0_8px_25px_rgba(0,0,0,0.1)] transition-shadow duration-200 cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="flex gap-1 items-cente mb-3.5">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setActiveTab("job");
          }}
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
          onClick={(e) => {
            e.stopPropagation();
            setActiveTab("reason");
          }}
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
          onClick={(e) => {
            e.stopPropagation();
            handleBookmarkClick();
          }}
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
        <div className="flex items-start gap-2.5 mt-1.5 h-full">
          <div className="w-16 h-16 bg-gray-100 border border-gray-200 flex items-center justify-center rounded-md overflow-hidden flex-shrink-0">
            <Image
              src={logo}
              alt={`${company} 로고`}
              className="w-full h-full object-cover"
              width={60}
              height={60}
            />
          </div>
          <div className="h-16 flex flex-col justify-between flex-1 min-w-0">
            <p className="font-semibold text-base h-11 line-clamp-2">{title}</p>
            <p className="text-neutral-400 font-medium text-xs">{company}</p>
          </div>
        </div>
      ) : (
        <p className=" text-zinc-800 text-sm font-medium flex-1">{reason}</p>
      )}
    </div>
  );
}
