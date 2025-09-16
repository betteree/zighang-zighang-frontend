import { Job } from "@/app/_types/jobs";

interface RecruitmentInfoProps {
  job: Job;
}

export default function RecruitmentInfo({ job }: RecruitmentInfoProps) {
  return (
    <>
      <div className="h-5"></div>
      <div className="flex w-full items-center gap-[2px]"></div>
      <div className="h-2"></div>
      <div className="flex w-full flex-col gap-2 md:flex-row md:items-center md:gap-3">
        <div className="flex w-full flex-col gap-2 rounded-lg bg-[#F6F6FA] md:flex-1 md:gap-[13px]">
          <section className="grid gap-4 px-6 py-5 md:grid-cols-2 md:gap-3">
            <div className="flex w-full items-center justify-start gap-2 text-sm font-medium md:gap-1">
              <span className="min-w-20 flex-[0] flex-shrink-0 text-[#8E8E8E]">
                경력
              </span>
              <div className="flex w-full flex-[4] justify-start text-black">
                <div>{job.experience}</div>
              </div>
            </div>
            <div className="flex w-full items-center justify-start gap-2 text-sm font-medium md:gap-1">
              <span className="min-w-20 flex-[0] flex-shrink-0 text-[#8E8E8E]">
                근무지역
              </span>
              <div className="flex w-full flex-[4] justify-start text-black">
                <div>{job.location}</div>
              </div>
            </div>
            <div className="flex w-full items-center justify-start gap-2 text-sm font-medium md:gap-1">
              <span className="min-w-20 flex-[0] flex-shrink-0 text-[#8E8E8E]">
                학력
              </span>
              <div className="flex w-full flex-[4] justify-start text-black">
                <div>{job.education}</div>
              </div>
            </div>
            <div className="flex w-full items-center justify-start gap-2 text-sm font-medium md:gap-1">
              <span className="min-w-20 flex-[0] flex-shrink-0 text-[#8E8E8E]">
                근무형태
              </span>
              <div className="flex w-full flex-[4] justify-start text-black">
                <div>{job.contractType}</div>
              </div>
            </div>
            <div className="col-span-2 flex items-center">
              <div className="flex w-full items-center justify-start gap-2 text-sm font-medium md:gap-1">
                <span className="min-w-20 flex-[0] flex-shrink-0 text-[#8E8E8E]">
                  직무
                </span>
                <div className="flex w-full flex-[4] justify-start text-black">
                  <div>{job.jobGroup}</div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
