"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import RecruitmentCard from "./RecruitmentCard";

interface Item {
  id: string;
  experience: string;
  title: string;
  company: string;
  location: string;
  logo: string;
}

interface RecruitmentCardListProps {
  items: Item[];
  className?: string;
  reverse?: boolean;
}

export default function RecruitmentCardList({
  items,
  className,
  reverse = false,
}: RecruitmentCardListProps) {
  return (
    <div className={`w-full ${className || ""}`}>
      <Swiper
        modules={[Autoplay, FreeMode]}
        loop={true} // loop 다시 활성화
        loopAdditionalSlides={3} // 충분한 추가 슬라이드
        freeMode={{ enabled: true, momentum: false }}
        autoplay={{
          delay: 0, // 연속적으로 움직이게
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
          reverseDirection: reverse, // reverse prop에 따라 방향 결정
        }}
        speed={5000} // 더 빠른 속도로 끊김 감소
        slidesPerView="auto" // 카드 너비에 맞춰 유동
        spaceBetween={1}
        className="h-24 md:h-28"
        allowTouchMove={false} // 터치로 인한 방해 방지
        watchSlidesProgress={true} // 슬라이드 진행률 감시
      >
        {items.map((it) => (
          <SwiperSlide key={it.id} style={{ width: 240 }}>
            <RecruitmentCard
              experience={it.experience}
              logo={it.logo}
              title={it.title}
              company={it.company}
              location={it.location}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
