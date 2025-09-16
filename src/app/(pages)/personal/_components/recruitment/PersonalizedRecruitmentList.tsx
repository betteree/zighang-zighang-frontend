"use client";

import { useState, useEffect } from "react";
import PersonalizedRecruitmentCard from "./PersonalizedRecruitmentCard";
import PersonalizedRecruitmentBanner from "./PersonalizedRecruitmentBanner";

// 페이지네이션 아이콘 컴포넌트
const ChevronLeftIcon = ({ isDisabled }: { isDisabled: boolean }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.0005 15.8756L11.1205 11.9956L15.0005 8.11559C15.3905 7.72559 15.3905 7.09559 15.0005 6.70559C14.6105 6.31559 13.9805 6.31559 13.5905 6.70559L9.00047 11.2956C8.61047 11.6856 8.61047 12.3156 9.00047 12.7056L13.5905 17.2956C13.9805 17.6856 14.6105 17.6856 15.0005 17.2956C15.3805 16.9056 15.3905 16.2656 15.0005 15.8756Z"
      fill={isDisabled ? "#D1D5DB" : "#000000"}
    />
  </svg>
);

const ChevronRightIcon = ({ isDisabled }: { isDisabled: boolean }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.99953 8.12441L12.8795 12.0044L8.99953 15.8844C8.60953 16.2744 8.60953 16.9044 8.99953 17.2944C9.38953 17.6844 10.0195 17.6844 10.4095 17.2944L14.9995 12.7044C15.3895 12.3144 15.3895 11.6844 14.9995 11.2944L10.4095 6.70442C10.0195 6.31441 9.38953 6.31441 8.99953 6.70442C8.61953 7.09442 8.60953 7.73441 8.99953 8.12441Z"
      fill={isDisabled ? "#D1D5DB" : "#000000"}
    />
  </svg>
);

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
  itemsPerPage,
  className = "",
  currentPage: externalCurrentPage,
  totalPages: externalTotalPages,
  onPageChange,
}: PersonalizedRecruitmentListProps) {
  const [internalCurrentPage, setInternalCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1416);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // 외부에서 페이지네이션을 관리하는 경우와 내부에서 관리하는 경우 구분
  const isExternalPagination =
    externalCurrentPage !== undefined && onPageChange;

  const currentPage = isExternalPagination
    ? externalCurrentPage
    : internalCurrentPage;
  const totalPages = isExternalPagination
    ? externalTotalPages || 1
    : Math.ceil(items.length / (itemsPerPage || (isMobile ? 3 : 9)));

  // 외부 페이지네이션인 경우 모든 아이템을 표시, 내부 페이지네이션인 경우 슬라이싱
  const currentItems = isExternalPagination
    ? items
    : (() => {
        const currentItemsPerPage =
          itemsPerPage !== undefined ? itemsPerPage : isMobile ? 3 : 9;
        const startIndex = (currentPage - 1) * currentItemsPerPage;
        const endIndex = startIndex + currentItemsPerPage;
        return items.slice(startIndex, endIndex);
      })();

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    if (isExternalPagination) {
      onPageChange!(page);
    } else {
      setInternalCurrentPage(page);
    }
  };

  // 페이지 번호 배열 생성
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  return (
    <div
      className={`w-full ${className} items-center justify-center flex flex-col`}
    >
      <PersonalizedRecruitmentBanner />
      {/* 그리드 레이아웃 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 ">
        {currentItems.map((item, index) => (
          <PersonalizedRecruitmentCard
            key={`${item.id}-${item.company}-${item.title}-${index}`}
            item={item}
          />
        ))}
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
          {/* 이전 페이지 버튼 */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center justify-center  hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeftIcon isDisabled={currentPage === 1} />
          </button>

          {/* 페이지 번호들 */}
          {getPageNumbers().map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`cursor-pointer flex items-center justify-center w-8 h-8  text-sm font-medium ${
                currentPage === pageNumber ? "text-black" : "  text-gray-500"
              }`}
            >
              {pageNumber}
            </button>
          ))}

          {/* 다음 페이지 버튼 */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center justify-center   hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRightIcon isDisabled={currentPage === totalPages} />
          </button>
        </div>
      )}
    </div>
  );
}
