import Link from "next/link";

export default function StatsSection() {
  return (
    <div className="flex w-full items-center justify-center py-5 md:py-6">
      <div className="relative inline-flex items-center gap-2 md:gap-4">
        <Link
          className="relative inline-flex flex-[0_0_auto] cursor-pointer items-center gap-1"
          href="/company"
        >
          <p className="relative w-fit whitespace-nowrap text-sm font-semibold leading-[normal] tracking-[0] md:text-base">
            <span className="text-[#6F00B6]">33764개 기업</span>
            <span className="text-[#646464]"> 전체 보기</span>
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-chevron-right text-[#646464]"
          >
            <path d="m9 18 6-6-6-6"></path>
          </svg>
        </Link>
        <Link
          className="relative inline-flex flex-[0_0_auto] cursor-pointer items-center gap-1"
          href="/all"
        >
          <p className="relative w-fit whitespace-nowrap text-sm font-semibold leading-[normal] tracking-[0] md:text-base">
            <span className="text-[#6F00B6]">94184개 공고</span>
            <span className="text-[#646464]"> 전체 보기</span>
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-chevron-right text-[#646464]"
          >
            <path d="m9 18 6-6-6-6"></path>
          </svg>
        </Link>
      </div>
    </div>
  );
}
