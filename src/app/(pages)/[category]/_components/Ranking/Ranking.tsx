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

  // 카테고리별 제목 매핑
  const getCategoryTitle = (categorySlug: string) => {
    const category = jobCategories.find(
      (c) => c.href.slice(1) === categorySlug
    );
    return category?.name || "전체";
  };

  // 로컬스토리지에서 jobs 배열 확인하여 제목 결정
  const getRankingTitle = () => {
    try {
      const stored = localStorage.getItem("userFilters");
      if (stored) {
        const userFilters = JSON.parse(stored);
        const jobs = userFilters.jobs || [];
        if (jobs.length === 0) {
          return "흥미직군 TOP 인기공고";
        }
      }
    } catch (error) {
      console.error("로컬스토리지 읽기 실패:", error);
    }
    return `${getCategoryTitle(slug)} 실시간 공고`;
  };

  const { data, isLoading, error } = usePopularRecruitments();

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
        getRankingTitle={getRankingTitle}
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
  getRankingTitle,
  isLoggedIn,
  router,
}: {
  slug: string;
  data?: Job[];
  isLoading: boolean;
  error: Error | null;
  getCategoryTitle: (slug: string) => string;
  getRankingTitle: () => string;
  isLoggedIn: boolean;
  router: ReturnType<typeof useRouter>;
}) {
  // 로딩 상태
  if (isLoading) {
    return (
      <div className="hidden md:flex w-full border px-7 py-4 border-neutral-200 rounded-lg items-center gap-5">
        <div className="w-45">
          <h3 className="text-purple-800 text-sm font-semibold">
            {getRankingTitle()}
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
            {getRankingTitle()}
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
            {getRankingTitle()}
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
        <div className="flex items-center gap-2 w-[140px]">
          <h3 className="text-purple-800 text-sm font-semibold">
            {getRankingTitle()}
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
            <span className="text-black text-sm flex items-center">
              <RankingIcon />
              <span className="ml-2 text-Button3-14sb">로그인하면</span>
              <span className="ml-1 text-violet-500 text-Button3-14sb">
                인기 공고
              </span>
              <span className="text-Button3-14sb">를 확인할 수 있어요</span>
              <ArrowIcon />
            </span>
          </div>
        </div>
      ) : (
        <div className="flex gap-6 w-full justify-between">
          {topItems.map((item, index) => (
            <section
              key={item.id}
              className="flex cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition-colors"
              onClick={() => router.push(`/recruitment/${item.id}`)}
            >
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
                <div className="flex items-center pb-4">
                  <TriangleUpIcon />
                  <p className="text-red-500 text-xs font-medium ">
                    {item.views}
                  </p>
                </div>
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
      className="text-yellow-500"
    >
      <path
        d="M17.1623 15.4285H1.62844C1.3513 15.4285 1.12195 15.213 1.1047 14.9364L0.554622 6.11357C0.529925 5.71744 0.936937 5.43835 1.29755 5.60413L5.36678 7.47483C5.62525 7.59365 5.93132 7.4849 6.05686 7.22964L9.14546 0.949663C9.33701 0.560185 9.89165 0.558389 10.0857 0.946618L13.2199 7.21634C13.35 7.4766 13.667 7.58132 13.9265 7.44976L17.4726 5.65218C17.8346 5.4687 18.2589 5.74788 18.2336 6.15288L17.686 14.9364C17.6688 15.213 17.4394 15.4285 17.1623 15.4285Z"
        fill="currentColor"
      />
      <rect
        x="0.5"
        y="13.9429"
        width="18"
        height="2.05713"
        rx="1"
        fill="currentColor"
      />
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

function TriangleUpIcon() {
  return (
    <svg
      width="12"
      height="9"
      viewBox="0 0 12 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.9554 9H1.04464C0.212491 9 -0.255603 8.04292 0.255286 7.38606L5.21065 1.01488C5.61101 0.500136 6.38899 0.500134 6.78935 1.01488L11.7447 7.38606C12.2556 8.04292 11.7875 9 10.9554 9Z"
        fill="#FF4A4A"
      />
    </svg>
  );
}
