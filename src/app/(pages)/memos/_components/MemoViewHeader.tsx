import SingleViewIcon from "./SingleViewIcon";
import SplitViewIcon from "./SplitViewIcon";

interface MemoViewHeaderProps {
  selectedView?: "single" | "split";
  onViewChange?: (view: "single" | "split") => void;
}

export default function MemoViewHeader({
  selectedView = "single",
  onViewChange,
}: MemoViewHeaderProps) {
  return (
    <div className="h-[58px] flex justify-end px-4 py-[14px] text-Heading3-18sb border-b border-[#E1E1E4] flex-shrink-0">
      <div className="mr-[10px] relative group">
        화면분할
        {/* 툴팁 */}
        <div
          className={`
            absolute bottom-full left-1/2 transform -translate-x-1/2 mb-[24px]
            px-3 py-2 bg-[#000000] text-white rounded-lg
            whitespace-nowrap opacity-0 group-hover:opacity-100
            transition-opacity duration-200 pointer-events-none z-10
            text-Body1-14r
          `}
        >
          아이콘을 클릭하면 최대 2단까지 화면을 나눌 수 있어요!
          {/* 툴팁 화살표 */}
          <div
            className={`
              absolute top-full left-1/2 transform -translate-x-1/2
              w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px]
              border-l-transparent border-r-transparent border-t-[#000000]
            `}
          ></div>
        </div>
      </div>
      <div className="flex gap-[2px]">
        <button onClick={() => onViewChange?.("single")}>
          <SingleViewIcon isSelected={selectedView === "single"} />
        </button>
        <button onClick={() => onViewChange?.("split")}>
          <SplitViewIcon isSelected={selectedView === "split"} />
        </button>
      </div>
    </div>
  );
}
