"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import RecruitmentCard from "./RecruitmentCard";

interface Item {
  id: string;
  experience: string;
  logo: string;
  title: string;
  company: string;
  location: string;
}

export default function RecruitmentCardList({ items }: { items: Item[] }) {
  return (
    <div className="w-full">
      <Swiper
        modules={[Autoplay, Navigation, Pagination, FreeMode]}
        loop={true}
        freeMode={{ enabled: true, momentum: false }}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        speed={4000}
        slidesPerView="auto" // 카드 너비에 맞춰 유동
        spaceBetween={1}
        className="h-28"
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
