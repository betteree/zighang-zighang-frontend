"use client";

import { useState, useTransition } from "react";
import View from "./View";
import Bookmark from "./BookMark";
import { toggleBookmark } from "./toggleBookmark";
import { Job } from "@/app/_types/jobs";

export default function Card({
  id,
  href,
  company,
  title,
  location,
  experience,
  contractType,
  education,
  views,
  bookmarked: initialBookmarked = false,
}: Job) {
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);
  const [isPending, startTransition] = useTransition();

  const onToggle = () => {
    setIsBookmarked((prev) => {
      const next = !prev;
      startTransition(async () => {
        try {
          await toggleBookmark(id, next);
        } catch {
          setIsBookmarked(prev);
          // 실패 시에 정확히 직전 상태로 롤백하도록 함
        }
      });
      return next;
    });
    startTransition(async () => {
      try {
        await toggleBookmark(id, !isBookmarked);
      } catch {
        setIsBookmarked(initialBookmarked);
      }
    });
  };

  // 배경색 랜덤 변경
  const stringToColor = (str: string): string => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash) % 360;
    return `hsl(${hue}, 70%, 70%)`;
  };

  return (
    <div className="relative w-full md:flex-1 md:flex-grow md:self-stretch min-w-full">
      <a
        target="_blank"
        href={href?.trim() ? href : `/recruitments/${encodeURIComponent(id)}`}
        className="flex flex-[1_0_0] items-center gap-2 rounded-[24px] border border-[#EDEDED] h-[120px] shadow-[0px_4px_30px_0px_#00000008] transition-shadow hover:shadow-[0px_6px_16px_rgba(0,0,0,0.08)] md:mx-0 md:h-[164px] md:pl-[20px]"
        rel="noopener noreferrer"
      >
        <div className="flex flex-1 flex-row items-center gap-2.5 md:gap-6">
          <section className="relative flex aspect-[1/1] flex-shrink-0 items-center justify-center rounded-xl md:rounded-2xl ml-2 w-[60px] md:ml-0 md:w-[80px] overflow-hidden">
            {/* <img
              alt={`${company} 채용 이미지`}
              src={imageUrl}
              className="aspect-[1/1] rounded-xl object-cover md:rounded-2xl w-[60px] md:w-[80px] border border-black/10"
            /> */}
            <div
              style={{ backgroundColor: stringToColor(company) }}
              className="flex items-center justify-center w-full h-full bg-violet-200 text-sm font-bold text-white"
            >
              {company.slice(0, 3)}
            </div>
          </section>

          <div className="flex flex-col gap-[6px] md:gap-3">
            <div className="flex flex-wrap items-center gap-[0px] text-[#71717A] ds-mobile-summary">
              <span className="break-keep text-sm md:text-base">{company}</span>
            </div>

            <div className="flex items-center gap-2 break-all font-bold text-black">
              <p className="max-w-[240px] text-sm md:text-lg md:max-w-[356px] ds-mobile-title2 leading-[140%]">
                {title}
              </p>
            </div>

            <div className="flex flex-col gap-1 text-[12px] text-[#71717A] md:text-sm">
              <div className="flex flex-wrap items-center gap-[1px] md:gap-1 ds-mobile-summary">
                <span>{experience}</span>
                <span>·</span>
                <span>{contractType}</span>
                <span>·</span>
                <span>{education}</span>
                <span>·</span>
                <span className="break-keep">{location}</span>

                <span>
                  <div
                    data-orientation="vertical"
                    role="none"
                    className="shrink-0 mx-[6px] h-2 w-[1px] bg-line"
                  />
                </span>

                <span>
                  <View count={views} hot={false} />
                </span>
              </div>
            </div>
          </div>
        </div>

        <div
          className="flex w-12 h-full flex-row items-center justify-center border-l border-[#EDEDED] pl-0 md:w-20"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <div className="flex h-full w-full flex-col">
            <Bookmark
              onClick={() => {
                onToggle();
              }}
              active={isBookmarked}
              disabled={isPending}
            />

            <div className="h-[1px] w-full bg-[#EDEDED]" />

            <div className="flex h-1/2 items-center justify-center">
              <div className="text-[13px] font-medium leading-[20px] text-[#71717A]">
                <div className="break-keep text-center ds-mobile-subtitle1">
                  {/* {dday} */}
                  D-3
                </div>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}
