import { Profile } from "@/components/Icons/Profile";
import KeywordButton from "./keywordButton";

interface Keyword {
  id: string;
  keyword: string;
}

interface PersonalizedRecruitmentBannerProps {
  userName?: string;
  keywords?: Keyword[];
  onKeywordClick?: (keywordId: string) => void;
}

export default function PersonalizedRecruitmentBanner({
  userName = "민수",
  keywords = [
    { id: "1", keyword: "재택" },
    { id: "2", keyword: "스타트업" },
    { id: "3", keyword: "대기업" },
    { id: "4", keyword: "프리랜서" },
    { id: "5", keyword: "원격근무" },
  ],
  onKeywordClick,
}: PersonalizedRecruitmentBannerProps) {
  return (
    <div className="p-4 flex flex-col items-center justify-center min-w-64 min-h-36 md:w-full md:min-h-18 md:flex-row md:gap-7 bg-violet-50 rounded-lg mb-3.5">
      <div className="flex items-center gap-2">
        <Profile></Profile>
        <p className="text-lg font-semibold">{userName}님의 공고 키워드</p>
      </div>
      <div className="flex items-center justify-center w-64 md:w-auto flex-wrap gap-2 mt-6 md:mt-0 md:flex-nowrap">
        {keywords.map((keyword) => (
          <KeywordButton
            key={keyword.id}
            keyword={keyword.keyword}
            onClick={() => onKeywordClick?.(keyword.id)}
          />
        ))}
      </div>
    </div>
  );
}
