import Image from "next/image";
import Link from "next/link";
import NotePad from "./Note/NotePad";
export default function SidebarActions() {
  return (
    <>
      {/* 데스크톱 사이드바 */}
      <div className="relative z-40 hidden flex-col xl:flex">
        <div className="sticky top-16 flex min-w-[360px] flex-col gap-2 py-9">
          <div className="flex gap-2">
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 border border-[#D5D7DA] bg-white hover:bg-zinc-100 active:bg-zinc-200 transition-colors h-12 min-w-12 p-2 !border !border-[#EDEDED] !bg-[#FAFAFA]">
              <Image
                alt="북마크 border 아이콘"
                loading="lazy"
                width={28}
                height={28}
                className="h-7 w-7"
                src="https://zighang.com/icon/bookmark_border.svg"
              />
            </button>
            <button className="whitespace-nowrap text-sm font-medium focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 border border-[#D5D7DA] hover:bg-zinc-100 active:bg-zinc-200 transition-colors flex h-12 flex-1 items-center justify-center gap-2.5 rounded-lg !border-0 bg-[#F7F1FB] px-4 py-3">
              <div className="bg-gradient-to-b from-[#6F00B6] to-[#6F00B6] bg-clip-text text-lg font-semibold text-transparent">
                공유하기
              </div>
            </button>
            <button className="whitespace-nowrap rounded-lg text-sm font-medium focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 bg-primary text-white hover:bg-primary/90 transition-colors hover:cursor-pointer px-4 py-2 flex h-12 flex-1 items-center justify-center">
              <span className="text-lg">지원하기</span>
            </button>
          </div>
          <Link
            href="https://sprint.codeit.kr/track/frontend?utm_source=zighang_paid&utm_medium=display&utm_campaign=partnership&utm_content=frontend"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex items-center justify-between rounded-lg bg-[#F8F9FC] p-4 py-3 transition-colors hover:bg-[#F1F3FA]"
          >
            <div className="flex items-center gap-3">
              <div className="jutify-center ds-web-badge-lg ml-2 text-[#363636]">
                인턴십 기회가 있는
                <span className="text-[#7352DF]">프론트엔드 부트캠프</span>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="shrink-0 w-[1px] mr-6 h-6 bg-[#DDDDE1]"></div>
              <Image
                alt="코드잇 스프린트 로고"
                loading="lazy"
                width={56}
                height={32}
                className="h-8 w-14"
                src="https://zighang.com/codeit-sprint.svg"
              />
            </div>
          </Link>
          <NotePad></NotePad>
        </div>
      </div>

      {/* 모바일 하단 액션 바 */}
      <div className="fixed bottom-0 left-0 z-[50] w-full border-t border-t-line bg-white shadow-lg xl:hidden">
        <div className="flex items-center justify-between gap-2 px-4 py-3">
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 border border-[#D5D7DA] bg-white hover:bg-zinc-100 active:bg-zinc-200 transition-colors h-12 min-w-12 p-2 !border !border-[#EDEDED] !bg-[#FAFAFA]">
            <Image
              alt="북마크 border 아이콘"
              loading="lazy"
              width={28}
              height={28}
              className="h-7 w-7"
              src="https://zighang.com/icon/bookmark_border.svg"
            />
          </button>
          <button className="whitespace-nowrap text-sm font-medium focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 border border-[#D5D7DA] hover:bg-zinc-100 active:bg-zinc-200 transition-colors flex h-12 flex-1 items-center justify-center gap-2.5 rounded-lg !border-0 bg-[#F7F1FB] px-4 py-3">
            <div className="bg-gradient-to-b from-[#6F00B6] to-[#6F00B6] bg-clip-text text-base font-semibold text-transparent">
              공유하기
            </div>
          </button>
          <button className="whitespace-nowrap rounded-lg text-sm font-medium focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 bg-primary text-white hover:bg-primary/90 transition-colors hover:cursor-pointer px-4 py-2 flex h-12 flex-1 items-center justify-center">
            <span className="text-base">지원하기</span>
          </button>
        </div>
      </div>
    </>
  );
}
