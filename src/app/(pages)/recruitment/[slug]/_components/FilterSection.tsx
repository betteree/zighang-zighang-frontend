export default function FilterSection() {
  return (
    <div className="sticky top-0 z-[30] flex w-full cursor-pointer bg-white border-b border-b-line px-4 py-6 md:border-b md:border-b-line xl:justify-center xl:px-0 xl:py-6">
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
            <span className="font-semibold text-primary">43곳</span>
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
  );
}
