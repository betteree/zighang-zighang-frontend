"use client";
import { useRouter } from "next/navigation";
import { StepActions, StepContainer } from "../../_components";
import RecruitmentCardList from "../../_components/RecommendCard/RecruitmentCardList";
import type { RecruitmentItem } from "../../_types/context";
import { usePopularRecruitments } from "@/app/_api/popular/usePopular";

export default function SuccessStep({
  name,
  onComplete,
}: {
  name: string;
  recruitments?: RecruitmentItem[];
  onComplete?: () => void;
}) {
  const router = useRouter();
  const { data: popularData } = usePopularRecruitments();
  // API 데이터를 RecruitmentItem 형식으로 변환
  const transformedData =
    popularData?.data?.map((item) => ({
      id: item.id,
      experience: item.minExperience
        ? `${item.minExperience}년차 이상`
        : "경력 무관",
      logo: item.companyImageUrl || "/",
      title: item.title,
      company: item.companyName || item.company || "회사명 없음",
      location:
        Array.isArray(item.locations) && item.locations.length > 0
          ? item.locations.join(", ")
          : item.location || "지역 정보 없음",
    })) || [];

  // 로딩 중이거나 에러가 있으면 mock 데이터 사용, 아니면 API 데이터 사용

  const handleComplete = () => {
    if (onComplete) {
      onComplete();
    } else {
      router.push("/");
    }
  };
  return (
    <StepContainer>
      <div className="md:hidden w-full flex items-center justify-between md:border-b md:border-gray-200 pl-[16px] pr-[19px] pt-[14px] pb-[15px]">
        <button
          className="text-Button1-18sb flex items-center"
          onClick={() => router.push("/")}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M12.0091 13.4141L17.6661 19.0711C17.8547 19.2533 18.1073 19.3541 18.3695 19.3518C18.6317 19.3495 18.8825 19.2444 19.0679 19.059C19.2533 18.8736 19.3585 18.6227 19.3608 18.3605C19.363 18.0984 19.2623 17.8458 19.0801 17.6571L13.4231 12.0001L19.0801 6.34315C19.2623 6.15455 19.363 5.90194 19.3608 5.63975C19.3585 5.37755 19.2533 5.12674 19.0679 4.94133C18.8825 4.75592 18.6317 4.65075 18.3695 4.64848C18.1073 4.6462 17.8547 4.74699 17.6661 4.92915L12.0091 10.5861L6.3521 4.92915C6.16265 4.75149 5.91151 4.65451 5.65183 4.65873C5.39215 4.66295 5.14429 4.76803 4.96071 4.95174C4.77713 5.13546 4.67222 5.38339 4.66819 5.64307C4.66415 5.90276 4.76131 6.15382 4.9391 6.34315L10.5951 12.0001L4.9381 17.6571C4.84259 17.7494 4.76641 17.8597 4.714 17.9817C4.66159 18.1037 4.634 18.235 4.63285 18.3677C4.6317 18.5005 4.657 18.6322 4.70728 18.7551C4.75756 18.878 4.83181 18.9897 4.92571 19.0835C5.0196 19.1774 5.13125 19.2517 5.25415 19.302C5.37704 19.3523 5.50872 19.3776 5.6415 19.3764C5.77428 19.3752 5.9055 19.3477 6.0275 19.2952C6.14951 19.2428 6.25985 19.1667 6.3521 19.0711L12.0091 13.4141Z"
              fill="black"
            />
          </svg>
        </button>
      </div>
      <div className="flex flex-col items-center">
        <CheckBadge className="mt-20" />
        <p className="text-2xl font-semibold mt-3.5">반가워요 {name}님!</p>
        <p className="text-Subheading3-14m md:text-Subheading2-16m text-neutral-600 w-50 md:w-auto text-center mt-2">
          공고 탐색 페이지에서 응답 내용 기반 적합한 공고를 보여드릴게요!
        </p>

        <section
          className="mx-auto w-full mt-10 relative overflow-hidden
    [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]
    [mask-size:100%_100%] [mask-repeat:no-repeat]
    [-webkit-mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]
    [-webkit-mask-size:100%_100%] [-webkit-mask-repeat:no-repeat]
    "
        >
          <RecruitmentCardList items={transformedData} />
          <RecruitmentCardList
            items={transformedData}
            className="md:hidden"
            reverse={true}
          />
        </section>

        <StepActions showBorder={false} className="mt-7">
          <button
            className="text-white text-base font-semibold px-10 py-3 bg-violet-500 rounded-lg w-full md:w-auto cursor-pointer"
            onClick={handleComplete}
          >
            공고 탐색 시작
          </button>
        </StepActions>
      </div>
    </StepContainer>
  );
}

// CheckBadge.tsx

function CheckBadge({
  size = 80,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="80" height="80" rx="40" fill="#D9BBEC" fillOpacity="0.7" />
      <rect
        x="11"
        y="11"
        width="58"
        height="58"
        rx="29"
        fill="url(#paint0_linear_2602_22170)"
      />
      <path
        d="M27 38.5L36.5 47.5L53 32"
        stroke="white"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_2602_22170"
          x1="25.7458"
          y1="13.4576"
          x2="56.2203"
          y2="87.1864"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#7951FF" />
          <stop offset="1" stopColor="#9F55CE" />
        </linearGradient>
      </defs>
    </svg>
  );
}
