"use client";

type Props = {
  active: "all" | "saved";
  onChange: (key: "all" | "saved") => void;
};

const tabs = [
  { key: "all" as const, label: "전체공고" },
  { key: "saved" as const, label: "저장한 공고" },
];

export default function CategoryTabs({ active, onChange }: Props) {
  return (
    <div className="relative w-full overflow-visible px-0 laptop:mx-auto laptop:max-w-screen-xl laptop:px-10">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`text-lg font-semibold h-11 inline-flex items-center gap-2.5 ml-4 mt-1 transition-colors laptop:text-2xl laptop:h-16
            border-b-[3px] ${
              active === tab.key
                ? "border-neutral-700"
                : "border-transparent hover:border-neutral-400"
            }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
