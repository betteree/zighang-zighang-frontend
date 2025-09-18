"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FilterSection from "./_components/FilterSection";
import RecruitmentHeader from "./_components/RecruitmentHeader";
import RecruitmentInfo from "./_components/RecruitmentInfo";
import RecruitmentContent from "./_components/RecruitmentContent";
import Separator from "./_components/Separator";
import SimilarRecruitments from "./_components/SimilarRecruitments";
import SidebarActions from "./_components/SidebarActions";
import { useRecruitmentDetail } from "@/app/_api/recruitment/detail/useRecruitmentDetail";
import { useParams } from "next/navigation";
import filterAdapt from "@/app/_utils/filterAdapt";
import { toDisplayJobDot } from "@/app/_utils/jobFormat";
import Image from "next/image";
import Link from "next/link";

const mockSimilarRecruitments = [
  {
    uid: "88320ad8-0f64-49df-89bc-62b7b28e0295",
    title: "Al Backend Engineer (경력) 채용",
    company: { name: "네이버웹툰" },
    imageUrl:
      "https://d2juy7qzamcf56.cloudfront.net/2024-08-20/3cc83a66-e1c6-4301-ac53-f73410370bb4.png",
    recruitmentJobs: { "IT·개발": ["서버·백엔드"] },
    types: [3],
    careers: [1],
  },
  {
    uid: "e483c222-2ca4-479d-b169-441d934aa4e8",
    title: "DevOps Engineer 채용",
    company: { name: "Hyperconnect" },
    imageUrl: "https://d2juy7qzamcf56.cloudfront.net/company/default.svg",
    recruitmentJobs: { "IT·개발": ["DevOps·SRE"] },
    types: [3, 5],
    careers: [11],
  },
  {
    uid: "105410d9-ca43-4591-8826-8b3aab485a0d",
    title: "R & D 인프라 운영 경력 채용",
    company: { name: "AhnLab" },
    imageUrl: "https://d2juy7qzamcf56.cloudfront.net/company/default.svg",
    recruitmentJobs: { "IT·개발": ["DevOps·SRE"] },
    types: [3],
    careers: [1],
  },
  {
    uid: "0062553e-7f5a-455b-aaaf-396e42f905cb",
    title: "클라우드 엔지니어 (DevOps 1 Team) 경력 채용",
    company: { name: "메타넷티플랫폼" },
    imageUrl: "https://d2juy7qzamcf56.cloudfront.net/company/default.svg",
    recruitmentJobs: { "IT·개발": ["DBA"] },
    types: [3],
    careers: [1],
  },
  {
    uid: "5a077384-7c0f-483c-9455-f0a31cd44561",
    title: "Cloud Architect, Professional Services Korea",
    company: { name: "AWS" },
    imageUrl:
      "https://d2juy7qzamcf56.cloudfront.net/2025-01-01/adf9224e-0436-4a7e-ac70-586f769f5636.png",
    recruitmentJobs: { "IT·개발": ["DevOps·SRE"] },
    types: [3],
    careers: [11],
  },
];

const mockRecCount = {
  count: 43,
};

function RecruitmentPageContent({ slug }: { slug: string }) {
  const {
    data: recruitmentData,
    isLoading,
    error,
  } = useRecruitmentDetail(slug);

  if (isLoading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="text-center text-red-600">
          <p className="text-xl mb-4">
            공고를 불러오는 중 오류가 발생했습니다.
          </p>
          <p>
            {error instanceof Error
              ? error.message
              : "알 수 없는 오류가 발생했습니다."}
          </p>
        </div>
      </main>
    );
  }

  const recruitment = recruitmentData?.data;

  if (!recruitment) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="text-center">
          <p className="text-xl">공고를 찾을 수 없습니다.</p>
        </div>
      </main>
    );
  }

  const adaptedJob = filterAdapt(recruitment);

  // jobGroup을 toDisplayJobDot으로 변환
  const displayJob = {
    ...adaptedJob,
    jobGroup: adaptedJob.jobGroup
      ? toDisplayJobDot(adaptedJob.jobGroup)
      : adaptedJob.jobGroup,
  };

  return (
    <main className="flex min-h-screen flex-col items-center">
      <Header />
      <FilterSection job={displayJob} />
      <div className="flex w-full mx-36 max-w-[1200px] justify-center md:gap-[132px] px-0">
        <div className="flex w-full flex-col items-center">
          <div className="flex w-full flex-col items-center px-0">
            <div className="flex w-full flex-col items-center py-5 px-3 md:px-0">
              <RecruitmentHeader job={displayJob} slug={slug} />
              <RecruitmentInfo job={displayJob} />
              <div className="hidden md:flex md:w-[836px] mt-5  justify-between rounded-lg">
                <Link href="/personal" className="cursor-pointer">
                  <Image
                    src="/banner/detail_banner.svg"
                    alt="DetailBanner"
                    width={836}
                    height={152}
                  />
                </Link>
              </div>
            </div>
            <div className="w-full"></div>
            <p className="hidden"></p>
            <div className="h-9"></div>
            <RecruitmentContent job={displayJob} />
            <section className="w-full">
              <div className="h-9"></div>
            </section>
          </div>
          <Separator />
          <div className="tablet:h-12"></div>
          <SimilarRecruitments
            recruitments={mockSimilarRecruitments}
            recCount={mockRecCount}
          />
        </div>
        <SidebarActions slug={slug} job={displayJob} />
      </div>
      <Footer />
    </main>
  );
}

export default function RecruitmentPage() {
  const { slug } = useParams<{ slug: string }>();
  return <RecruitmentPageContent slug={slug} />;
}
