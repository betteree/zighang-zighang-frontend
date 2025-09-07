"use client";
import { useRouter } from "next/navigation";
import { StepContainer } from "../../_components";
import RecruitmentCardList from "../../_components/RecommendCard/RecruitmentCardList";

// 임시 데이터 api 연동시 삭제
const mock = [
  {
    id: "1",
    experience: "1년차 이상",
    logo: "/",
    title: "프론트엔드 엔지니어",
    company: "ACME",
    location: "서울 강남구",
  },
  {
    id: "2",
    experience: "신입 가능",
    logo: "/",
    title: "백엔드 개발자 (Java)",
    company: "BetaSoft",
    location: "서울 마포구",
  },
  {
    id: "3",
    experience: "3년차 이상",
    logo: "/",
    title: "풀스택 엔지니어",
    company: "CyberWorks",
    location: "경기 성남시",
  },
  {
    id: "4",
    experience: "2년차 이상",
    logo: "/",
    title: "데이터 분석가",
    company: "Delta Analytics",
    location: "서울 송파구",
  },
  {
    id: "5",
    experience: "신입 가능",
    logo: "/",
    title: "모바일 앱 개발자 (iOS)",
    company: "Echo Mobile",
    location: "부산 해운대구",
  },
  {
    id: "6",
    experience: "5년차 이상",
    logo: "/",
    title: "DevOps 엔지니어",
    company: "FoxTech",
    location: "서울 용산구",
  },
  {
    id: "7",
    experience: "경력무관",
    logo: "/",
    title: "QA 엔지니어",
    company: "Green Labs",
    location: "대전 유성구",
  },
  {
    id: "8",
    experience: "2년차 이상",
    logo: "/",
    title: "AI 리서처",
    company: "Helios AI",
    location: "서울 강동구",
  },
  {
    id: "9",
    experience: "신입 가능",
    logo: "/",
    title: "UI/UX 디자이너",
    company: "Iris Studio",
    location: "인천 연수구",
  },
  {
    id: "10",
    experience: "4년차 이상",
    logo: "/",
    title: "프로덕트 매니저",
    company: "Jupiter Systems",
    location: "서울 서초구",
  },
];

export default function SuccessStep({ name }: { name: string }) {
  const router = useRouter();
  return (
    <StepContainer>
      <div className="flex flex-col items-center">
        <div className="bg-violet-500 rounded-full w-20 h-20 mt-20"></div>
        <p className="text-2xl font-semibold mt-3.5">반가워요 {name}님!</p>
        <p className="text-neutral-500 text-lg font-semibold">
          공고 탐색 페이지에서 응답 내용 기반 적합한 공고를 보여드릴게요!
        </p>

        <section
          className="mx-auto w-full mt-7 relative overflow-hidden
    [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]
    [mask-size:100%_100%] [mask-repeat:no-repeat]
    [-webkit-mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]
    [-webkit-mask-size:100%_100%] [-webkit-mask-repeat:no-repeat]
    "
        >
          <RecruitmentCardList items={mock} />
        </section>
        <button
          className="text-white text-base font-semibold px-10 py-3 bg-violet-500 rounded-lg mt-11"
          onClick={() => router.push("/")}
        >
          공고 탐색 시작
        </button>
      </div>
    </StepContainer>
  );
}
