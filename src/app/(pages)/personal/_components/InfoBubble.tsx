"use client";
import React from "react";

type Props = {
  trigger?: React.ReactNode;
  lines?: string[];
  mobileDefaultOpen?: boolean;
  className?: string;
};

export default function InfoBubble({
  trigger,
  lines = [
    "파일은 많을수록 좋아요!\n맞춤공고가 정교해진답니다.",
    "신규공고를 빠짐없이 반영해 항상 최적의 맞춤공고를 보여드릴게요!",
  ],
  mobileDefaultOpen = false,
  className = "",
}: Props) {
  const [mobileOpen, setMobileOpen] = React.useState(mobileDefaultOpen);

  const BubbleDesktop = (
    <div
      className={[
        " relative rounded-lg bg-neutral-900 text-Body1-14r text-white p-3",
        // 아래로 뾰족이(트리거 쪽을 가리킴) — 데스크톱
        "after:content-[''] after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-0",
        "after:border-l-[8px] after:border-r-[8px] after:border-t-[8px] after:border-l-transparent after:border-r-transparent after:border-t-neutral-900",
        className,
      ].join(" ")}
      role="tooltip"
    >
      <ol className="list-decimal list-inside text-start">
        {lines.map((t, i) => (
          <li key={i} className="break-keep ">
            {t}
          </li>
        ))}
      </ol>
    </div>
  );

  const BubbleMobile = (
    <div
      className={[
        "relative rounded-lg bg-neutral-900 text-Body2-12r text-white p-3 ",
        // 위로 뾰족이 — 모바일
        "before:content-[''] before:absolute before:-top-2 before:left-39 before:w-0 before:h-0",
        "before:border-l-[8px] before:border-r-[8px] before:border-b-[8px] before:border-l-transparent before:border-r-transparent before:border-b-neutral-900",
        className,
      ].join(" ")}
      role="dialog"
      aria-modal="true"
    >
      <button
        aria-label="닫기"
        onClick={() => setMobileOpen(false)}
        className="absolute right-2 top-0 h-6 w-6 text-white/80 hover:text-white"
      >
        ×
      </button>
      <div className="text-start ">
        {lines.map((t, i) => (
          <div key={i} className="break-keep whitespace-pre-line flex">
            <span className="font-medium leading-relaxed">{i + 1}.</span>
            <span className="ml-2 leading-relaxed">{t}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="relative inline-block ml-1">
      <div className="hidden md:inline-block relative group">
        {trigger}
        <div className="w-[343px] pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-3 opacity-0 scale-95 transition md:group-hover:opacity-100 md:group-hover:scale-100">
          {BubbleDesktop}
        </div>
      </div>

      <div className="md:hidden relative">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="inline-block"
        >
          {trigger}
        </button>
        {mobileOpen && (
          <div className="w-[213px] absolute z-50 -right-10 top-8">
            {BubbleMobile}
          </div>
        )}
      </div>
    </div>
  );
}
