import Image from "next/image";
import Link from "next/link";

interface SimilarRecruitment {
  uid: string;
  title: string;
  company: {
    name: string;
  };
  imageUrl: string;
  recruitmentJobs: {
    "IT·개발": string[];
  };
  types: number[];
  careers: number[];
}

interface SimilarRecruitmentsProps {
  recruitments: SimilarRecruitment[];
  recCount: {
    count: number;
  };
}

export default function SimilarRecruitments({
  recruitments,
  recCount,
}: SimilarRecruitmentsProps) {
  return (
    <div className="flex w-full flex-col gap-2 border-t border-line py-9 md:gap-5 xl:border-none">
      <div className="sticky top-0 z-[40] cursor-pointer bg-white">
        <div className="flex w-full flex-col items-start px-4 md:pt-1 xl:px-0">
          <div className="h-1"></div>
          <div className="text-xl font-bold">비슷한 채용공고</div>
          <div className="h-1"></div>
          <div className="sticky top-0 z-[30] flex w-full cursor-pointer bg-white px-0">
            <div className="flex w-full justify-between md:gap-5 xl:max-w-[1200px] xl:justify-start">
              <div className="flex items-center gap-[6px]">
                <div className="rounded-lg bg-[#F0F0F7] px-[10px] py-[7px] text-xs font-medium text-[#5E5E5E] xl:px-4 xl:py-[10px]">
                  DevOps·SRE
                </div>
                <div className="rounded-lg bg-[#F0F0F7] px-[10px] py-[7px] text-xs font-medium text-[#5E5E5E] xl:px-4 xl:py-[10px]">
                  정규직
                </div>
                <div className="rounded-lg bg-[#F0F0F7] px-[10px] py-[7px] text-xs font-medium text-[#5E5E5E] xl:px-4 xl:py-[10px]">
                  1년차 이상
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-[#5E5E5E]">
                <div className="font-medium">
                  <span className="font-semibold text-primary">
                    {recCount.count}곳
                  </span>
                  <span>에서 채용 중</span>
                </div>
                <svg
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="box-border flex w-full flex-grow flex-col items-start gap-2 px-4 md:content-start md:justify-between xl:px-0">
        {recruitments.map((recruitment) => (
          <Link
            key={recruitment.uid}
            target="_blank"
            className="flex w-full cursor-pointer items-center gap-4 rounded-xl border border-line p-4"
            href={`/recruitment/${recruitment.uid}`}
          >
            <Image
              alt="채용 기업로고 이미지"
              loading="lazy"
              width={64}
              height={64}
              className="h-16 w-16 cursor-pointer rounded-xl border border-line object-cover"
              style={{ color: "transparent" }}
              src={recruitment.imageUrl}
            />
            <div className="flex flex-1 flex-col justify-center gap-2">
              <div
                className={`break-all text-base font-semibold ${
                  recruitment.title.includes("채용") ? "" : "opacity-40"
                }`}
              >
                {recruitment.title}
              </div>
              <div className="flex items-center">
                <div className="text-sm font-medium text-[#5E5E5E]">
                  {recruitment.company.name}
                </div>
              </div>
              <div className="flex items-center gap-[6px]">
                {recruitment.recruitmentJobs["IT·개발"]?.map((job, index) => (
                  <div
                    key={index}
                    className="rounded-lg bg-[#F0F0F7] px-2 py-1 text-[10px] font-medium text-[#5E5E5E]"
                  >
                    {job}
                  </div>
                ))}
                <div className="rounded-lg bg-[#F0F0F7] px-2 py-1 text-[10px] font-medium text-[#5E5E5E]">
                  정규직
                </div>
                <div className="rounded-lg bg-[#F0F0F7] px-2 py-1 text-[10px] font-medium text-[#5E5E5E]">
                  {recruitment.careers.includes(1) ? "1년차 이상" : "경력 무관"}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                className="h-6 w-6"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="none" d="M0 0h24v24H0V0z"></path>
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"></path>
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
