"use client";

import { jobCategories } from "@/app/_constants/jobCategories";
import { usePopularRecruitments } from "@/app/_api/popular/usePopular";
import { useAuthState } from "@/app/_api/auth/useAuthState";
import { useRouter } from "next/navigation";
import { MobileRankingAnimation } from "./MobileRankingAnimation";
import { Job } from "@/app/_types/jobs";

interface RankingProps {
  slug: string;
}

export function Ranking({ slug }: RankingProps) {
  const { isLoggedIn } = useAuthState();
  const router = useRouter();

  // slug를 API용 job 파라미터로 변환
  const getJobParam = (categorySlug: string) => {
    const categoryMap: { [key: string]: string } = {
      it: "IT_개발",
      ai: "AI_데이터",
      game: "게임",
      design: "디자인",
      strategy: "기획_전략",
      marketing: "마케팅_광고",
      md: "상품기획_MD",
      sales: "영업",
      logistics: "무역_물류",
      driver: "운송_배송",
      legal: "법률_법무",
      hr: "HR_총무",
      accounting: "회계_재무_세무",
      finance: "증권_운용",
      bank: "은행_카드_보험",
      research: "엔지니어링_RND",
      construction: "건설_건축",
      production: "생산_기능직",
      medical: "의료_보건",
      public: "공공_복지",
      education: "교육",
      media: "미디어_엔터",
      customer: "고객상담_TM",
      service: "서비스",
      food: "식음료",
    };
    return categoryMap[categorySlug] || "IT_개발";
  };

  // 카테고리별 제목 매핑
  const getCategoryTitle = (categorySlug: string) => {
    const category = jobCategories.find(
      (c) => c.href.slice(1) === categorySlug
    );
    return category?.name || "전체";
  };

  const jobParam = getJobParam(slug);
  const { data, isLoading, error } = usePopularRecruitments(jobParam);

  // 모바일용 애니메이션 컴포넌트 렌더링
  return (
    <>
      {/* 모바일용 애니메이션 컴포넌트 */}
      <MobileRankingAnimation
        slug={slug}
        data={data?.data}
        isLoading={isLoading}
        error={error}
      />

      {/* 데스크톱용 기존 컴포넌트 */}
      <DesktopRanking
        slug={slug}
        data={data?.data}
        isLoading={isLoading}
        error={error}
        getCategoryTitle={getCategoryTitle}
        isLoggedIn={isLoggedIn}
        router={router}
      />
    </>
  );
}

// 데스크톱용 랭킹 컴포넌트
function DesktopRanking({
  slug,
  data,
  isLoading,
  error,
  getCategoryTitle,
  isLoggedIn,
  router,
}: {
  slug: string;
  data?: Job[];
  isLoading: boolean;
  error: Error | null;
  getCategoryTitle: (slug: string) => string;
  isLoggedIn: boolean;
  router: ReturnType<typeof useRouter>;
}) {
  // 로딩 상태
  if (isLoading) {
    return (
      <div className="hidden md:flex w-full border px-7 py-4 border-neutral-200 rounded-lg items-center gap-5">
        <div className="w-45">
          <h3 className="text-purple-800 text-sm font-semibold">
            {getCategoryTitle(slug)} 실시간 공고
          </h3>
          <p className="text-neutral-400 text-[10px] font-medium">로딩 중...</p>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="text-neutral-400 text-sm">
            데이터를 불러오는 중입니다...
          </div>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div className="hidden md:flex w-full border px-7 py-4 border-neutral-200 rounded-lg items-center gap-5">
        <div className="w-45">
          <h3 className="text-purple-800 text-sm font-semibold">
            {getCategoryTitle(slug)} 실시간 공고
          </h3>
          <p className="text-neutral-400 text-[10px] font-medium">오류 발생</p>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="text-red-500 text-sm">
            데이터를 불러올 수 없습니다.
          </div>
        </div>
      </div>
    );
  }

  // 데이터가 없을 때
  if (!data || data.length === 0) {
    return (
      <div className="hidden md:flex w-full border px-7 py-4 border-neutral-200 rounded-lg items-center gap-5">
        <div className="w-45">
          <h3 className="text-purple-800 text-sm font-semibold">
            {getCategoryTitle(slug)} 실시간 공고
          </h3>
          <p className="text-neutral-400 text-[10px] font-medium">
            {new Date().toLocaleString("ko-KR")}
          </p>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="text-neutral-400 text-sm">인기 공고가 없습니다.</div>
        </div>
      </div>
    );
  }

  // 상위 3개만 표시
  const topItems = data.slice(0, 3);

  return (
    <div className="hidden md:flex w-full border px-7 py-4 border-neutral-200 rounded-lg items-center gap-5">
      <div className="w-45">
        <div className="flex items-center gap-2">
          <h3 className="text-purple-800 text-sm font-semibold">
            {getCategoryTitle(slug)} 실시간 공고
          </h3>
        </div>
        <p className="text-neutral-400 text-[10px] font-medium">
          {new Date().toLocaleString("ko-KR")}
        </p>
      </div>

      <div className="w-0 h-11 border border-dashed border-zinc-200"></div>

      {!isLoggedIn ? (
        <div className="flex-1 flex items-center justify-center relative">
          {/* 블러 처리된 배경 */}
          <div className="absolute inset-0 flex gap-6 w-full justify-between blur-sm">
            <div className="flex gap-2 items-center">
              <p className="text-purple-800 text-lg font-medium pb-3">1</p>
              <div className="flex flex-col">
                <p className="text-zinc-800 text-Subheading3-14m truncate max-w-[250px]">
                  백엔드 개발자
                </p>
                <p className="text-zinc-600 text-Subheading4-12m">바카티오</p>
              </div>
              <p className="text-red-500 text-xs font-medium pb-4">32</p>
            </div>
            <div className="flex gap-2 items-center">
              <p className="text-purple-800 text-lg font-medium pb-3">2</p>
              <div className="flex flex-col">
                <p className="text-zinc-800 text-Subheading3-14m truncate max-w-[250px]">
                  프론트엔드 개발자
                </p>
                <p className="text-zinc-600 text-Subheading4-12m">테크나인</p>
              </div>
              <p className="text-red-500 text-xs font-medium pb-4">28</p>
            </div>
            <div className="flex gap-2 items-center">
              <p className="text-purple-800 text-lg font-medium pb-3">3</p>
              <div className="flex flex-col">
                <p className="text-zinc-800 text-Subheading3-14m truncate max-w-[250px]">
                  AI 엔지니어
                </p>
                <p className="text-zinc-600 text-Subheading4-12m">
                  인텔리젠스랩
                </p>
              </div>
              <p className="text-red-500 text-xs font-medium pb-4">25</p>
            </div>
          </div>
          {/* 중앙 메시지 */}
          <div
            className="relative z-10 text-center bg-gray-100 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors"
            onClick={() => router.push("/join")}
          >
            <span className="text-black text-sm flex items-center text-Button3-14sb">
              <RankingIcon />
              <span className="ml-2">로그인하면</span>
              <span className="ml-1 text-violet-500">인기 공고</span>
              <span>를 확인할 수 있어요</span>
              <ArrowIcon />
            </span>
          </div>
        </div>
      ) : (
        <div className="flex gap-6 w-full justify-between">
          {topItems.map((item, index) => (
            <section key={item.id} className="flex">
              <div className="flex gap-2 items-center">
                <p className="text-purple-800 text-lg font-medium pb-3">
                  {index + 1}
                </p>
                <div className="flex flex-col">
                  <p className="text-zinc-800 text-Subheading3-14m truncate max-w-[250px]">
                    {item.title}
                  </p>
                  <p className="text-zinc-600 text-Subheading4-12m">
                    {item.companyName || "회사명 없음"}
                  </p>
                </div>
                <p className="text-red-500 text-xs font-medium pb-4">
                  {item.views}
                </p>
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

// 랭킹 아이콘 컴포넌트
function RankingIcon() {
  return (
    <svg
      width="19"
      height="16"
      viewBox="0 0 19 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.1623 15.4285H1.62844C1.3513 15.4285 1.12195 15.213 1.1047 14.9364L0.554622 6.11357C0.529925 5.71744 0.936937 5.43835 1.29755 5.60413L5.36678 7.47483C5.62525 7.59365 5.93132 7.4849 6.05686 7.22964L9.14546 0.949663C9.33701 0.560185 9.89165 0.558389 10.0857 0.946618L13.2199 7.21634C13.35 7.4766 13.667 7.58132 13.9265 7.44976L17.4726 5.65218C17.8346 5.4687 18.2589 5.74788 18.2336 6.15288L17.686 14.9364C17.6688 15.213 17.4394 15.4285 17.1623 15.4285Z"
        fill="url(#paint0_linear_3314_32428)"
      />
      <rect
        x="0.5"
        y="13.9429"
        width="18"
        height="2.05713"
        rx="1"
        fill="#FFC803"
      />
      <defs>
        <linearGradient
          id="paint0_linear_3314_32428"
          x1="9.49346"
          y1="5.14684"
          x2="9.07274"
          y2="13.8946"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFCC00" />
          <stop offset="1" stopColor="#FF9D00" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// 화살표 아이콘 컴포넌트
function ArrowIcon() {
  return (
    <svg
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.0001 5.59221C7.6751 5.91721 7.6751 6.44221 8.0001 6.76721L11.2334 10.0005L8.0001 13.2339C7.6751 13.5589 7.6751 14.0839 8.0001 14.4089C8.3251 14.7339 8.8501 14.7339 9.1751 14.4089L13.0001 10.5839C13.3251 10.2589 13.3251 9.73388 13.0001 9.40888L9.1751 5.58388C8.85843 5.26721 8.3251 5.26721 8.0001 5.59221Z"
        fill="#AAAAAD"
      />
    </svg>
  );
}
