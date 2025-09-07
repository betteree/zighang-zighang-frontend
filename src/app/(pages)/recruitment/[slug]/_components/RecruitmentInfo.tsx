import Image from 'next/image';

export default function RecruitmentInfo() {
  return (
    <>
      <div className="h-5"></div>
      <div className="flex w-full items-center gap-[2px]">
        <div className="flex min-h-11 w-full items-center gap-4 rounded-lg bg-[#7951FF]/10 md:min-h-12">
          <div className="flex items-center gap-2 pl-4 text-[#7951FF] md:pl-5">
            <Image
              alt="달력 아이콘"
              loading="lazy"
              width={20}
              height={20}
              src="https://zighang.com/icon/calendar.svg"
            />
            <div className="text-sm font-semibold">상시채용</div>
          </div>
          <div className="text-xs font-normal text-[#71717A]">
            8월 15일 게시
          </div>
        </div>
      </div>
      <div className="h-2"></div>
      <div className="flex w-full flex-col gap-2 md:flex-row md:items-center md:gap-3">
        <div className="flex w-full flex-col gap-2 rounded-lg bg-[#F6F6FA] md:flex-1 md:gap-[13px]">
          <section className="grid gap-4 px-6 py-5 md:grid-cols-2 md:gap-3">
            <div className="flex w-full items-center justify-start gap-2 text-sm font-medium md:gap-1">
              <span className="min-w-20 flex-[0] flex-shrink-0 text-[#8E8E8E]">경력</span>
              <div className="flex w-full flex-[4] justify-start text-black">
                <div>1년차 이상</div>
              </div>
            </div>
            <div className="flex w-full items-center justify-start gap-2 text-sm font-medium md:gap-1">
              <span className="min-w-20 flex-[0] flex-shrink-0 text-[#8E8E8E]">근무지역</span>
              <div className="flex w-full flex-[4] justify-start text-black">
                <div>서울</div>
              </div>
            </div>
            <div className="flex w-full items-center justify-start gap-2 text-sm font-medium md:gap-1">
              <span className="min-w-20 flex-[0] flex-shrink-0 text-[#8E8E8E]">학력</span>
              <div className="flex w-full flex-[4] justify-start text-black">
                <div>학력 무관</div>
              </div>
            </div>
            <div className="flex w-full items-center justify-start gap-2 text-sm font-medium md:gap-1">
              <span className="min-w-20 flex-[0] flex-shrink-0 text-[#8E8E8E]">근무형태</span>
              <div className="flex w-full flex-[4] justify-start text-black">
                <div>정규직</div>
              </div>
            </div>
            <div className="col-span-2 flex items-center">
              <div className="flex w-full items-center justify-start gap-2 text-sm font-medium md:gap-1">
                <span className="min-w-20 flex-[0] flex-shrink-0 text-[#8E8E8E]">직무</span>
                <div className="flex w-full flex-[4] justify-start text-black">
                  <div>DevOps·SRE</div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
