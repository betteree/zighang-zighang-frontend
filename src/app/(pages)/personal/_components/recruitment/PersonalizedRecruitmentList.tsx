"use client";

import PersonalizedRecruitmentCard from "./PersonalizedRecruitmentCard";
import PersonalizedRecruitmentBanner from "./PersonalizedRecruitmentBanner";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

interface RecruitmentItem {
  id: string | number;
  logo: string;
  company: string;
  title: string;
  bookmarked?: boolean;
  reason: string;
}

interface PersonalizedRecruitmentListProps {
  items: RecruitmentItem[];
  itemsPerPage?: number;
  className?: string;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

export default function PersonalizedRecruitmentList({
  items,
  className = "",
}: PersonalizedRecruitmentListProps) {
  // 데스크탑에서는 모든 아이템을 표시, 모바일에서는 모든 아이템을 Swiper로 표시
  const currentItems = items;

  return (
    <div
      className={`w-full ${className} items-center justify-center flex flex-col`}
    >
      <PersonalizedRecruitmentBanner />

      {/* 데스크탑: 그리드 레이아웃 */}
      <div className="hidden md:grid grid-cols-3 gap-4 mb-6 max-w-[786px]">
        {currentItems.map((item, index) => (
          <PersonalizedRecruitmentCard
            key={`${item.id}-${item.company}-${item.title}-${index}`}
            item={item}
          />
        ))}
      </div>

      {/* 모바일: Swiper */}
      <div className="md:hidden mb-6 w-full max-w-78">
        <Swiper
          modules={[Pagination]}
          spaceBetween={16}
          slidesPerView={1}
          pagination={{
            clickable: true,
            bulletClass: "swiper-pagination-bullet !bg-gray-300 !opacity-100",
            bulletActiveClass: "swiper-pagination-bullet-active !bg-violet-500",
          }}
          className="!pb-12"
        >
          {/* 3개씩 그룹으로 나누어서 표시 */}
          {Array.from(
            { length: Math.ceil(currentItems.length / 3) },
            (_, groupIndex) => (
              <SwiperSlide key={groupIndex}>
                <div className="space-y-4">
                  {currentItems
                    .slice(groupIndex * 3, (groupIndex + 1) * 3)
                    .map((item, index) => (
                      <PersonalizedRecruitmentCard
                        key={`${item.id}-${item.company}-${item.title}-${groupIndex}-${index}`}
                        item={item}
                      />
                    ))}
                </div>
              </SwiperSlide>
            )
          )}
        </Swiper>
      </div>
    </div>
  );
}
