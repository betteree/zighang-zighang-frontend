"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { A11y } from "swiper/modules";
import "swiper/css";

import type { ExploreJobKey } from "@/app/_constants/exploreJobCard";
import { EXPLORE_JOBS_WITH_ICON } from "@/app/_utils/exploreJobs";
import ExploreJobCard from "./ExploreJobCard";
import { LeftButton } from "../Icons/LeftButton";
import { RightButton } from "../Icons/RightButton";

type Item = (typeof EXPLORE_JOBS_WITH_ICON)[number];

interface Props {
  value?: ExploreJobKey | null;
  onChange?: (key: ExploreJobKey | null) => void;
  className?: string;
}

export default function ExploreJobCarousel({
  value,
  onChange,
  className,
}: Props) {
  const [selectedKey, setSelectedKey] = useState<ExploreJobKey | null>(
    value ?? null
  );
  const [atBeginning, setAtBeginning] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [swiper, setSwiper] = React.useState<SwiperType | null>(null);

  useEffect(() => {
    if (value !== undefined) setSelectedKey(value);
  }, [value]);

  const handleSelect = (item: Item, next: boolean) => {
    const nextKey: ExploreJobKey | null = next ? item.key : null;
    if (onChange) onChange(nextKey);
    else setSelectedKey(nextKey);
  };

  return (
    <div className={["w-full relative", className || ""].join(" ")}>
      {/* 커스텀 내비게이션 */}
      <button
        type="button"
        onClick={() => swiper?.slidePrev()}
        disabled={atBeginning}
        className={`cursor-pointer hidden md:block absolute left-7 top-25 z-10 ${
          atBeginning ? "cursor-not-allowed " : ""
        }`}
        aria-label="이전"
      >
        <LeftButton disabled={atBeginning} />
      </button>

      <button
        type="button"
        onClick={() => swiper?.slideNext()}
        disabled={atEnd}
        className={`cursor-pointer hidden md:block absolute right-7 top-25 z-10 ${
          atEnd ? "cursor-not-allowed " : ""
        }`}
        aria-label="다음"
      >
        <RightButton disabled={atEnd} />
      </button>

      {/* 가로 마스크는 유지 */}
      <div
        className="mx-auto w-full relative overflow-hidden 
          [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]
          [mask-size:100%_100%] [mask-repeat:no-repeat]
          [-webkit-mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]
          [-webkit-mask-size:100%_100%] [-webkit-mask-repeat:no-repeat]"
      >
        <Swiper
          modules={[A11y]}
          onSwiper={(s) => {
            setSwiper(s);
            setAtBeginning(s.isBeginning);
            setAtEnd(s.isEnd);
          }}
          slidesPerGroup={1}
          spaceBetween={16}
          slidesPerView="auto"
          centeredSlides={true}
          breakpoints={{
            0: {
              slidesPerView: 1.5,
              centeredSlides: true,
            },
            768: {
              slidesPerView: 4.5,
              centeredSlides: false,
            },
          }}
          onSlideChange={(s) => {
            setAtBeginning(s.isBeginning);
            setAtEnd(s.isEnd);
          }}
          className="!py-2 overflow-visible md:!px-8  "
        >
          {EXPLORE_JOBS_WITH_ICON.map((item) => {
            const isSelected = selectedKey === item.key;
            return (
              <SwiperSlide key={item.key} className="!h-auto overflow-visible">
                <div className="flex justify-center overflow-visible">
                  <ExploreJobCard
                    jobKey={item.key}
                    category={item.category}
                    Icon={item.Icon}
                    selected={isSelected}
                    onSelect={(_, next) => handleSelect(item, next)}
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}
