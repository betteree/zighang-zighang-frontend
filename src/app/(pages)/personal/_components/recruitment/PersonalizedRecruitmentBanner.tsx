"use client";

import { Profile } from "@/components/Icons/Profile";
import KeywordButton from "./keywordButton";
import { useKeywords } from "@/app/_api/resume/hooks/useKeywords";

interface PersonalizedRecruitmentBannerProps {
  userName?: string;
}

export default function PersonalizedRecruitmentBanner({
  userName = "민수",
}: PersonalizedRecruitmentBannerProps) {
  const { data: keywords = [], isLoading: loading } = useKeywords();

  return (
    <div className="px-1 py-4 md:p-4 flex flex-col items-center justify-center w-60 min-h-36 md:w-full md:min-h-18 md:flex-row md:gap-7 bg-violet-50 rounded-lg mb-3.5">
      <div className="flex items-center gap-2">
        <Profile></Profile>
        <p className="text-lg font-semibold">{userName}님의 공고 키워드</p>
      </div>
      <div className="flex items-center justify-center min-w-60 md:w-auto flex-wrap gap-2 mt-6 md:mt-0 md:flex-nowrap">
        {loading ? (
          <p className="text-gray-500 text-sm">키워드를 불러오는 중...</p>
        ) : keywords.length > 0 ? (
          keywords.map((keyword, index) => (
            <KeywordButton key={`${keyword}-${index}`} keyword={keyword} />
          ))
        ) : (
          <p className="text-gray-500 text-sm">키워드가 없습니다.</p>
        )}
      </div>
    </div>
  );
}
