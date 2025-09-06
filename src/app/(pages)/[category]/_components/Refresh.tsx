import Image from "next/image";
type RefreshProps = {
  activated?: boolean;
  onClick?: () => void;
};

export default function Refresh({ activated = false, onClick }: RefreshProps) {
  return (
    <div
      onClick={onClick}
      className={`z-10 flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-[10px] transition-all duration-300 md:h-11 md:w-11
        ${
          activated
            ? " bg-violet-100"
            : " bg-white hover:bg-gray-100 active:bg-gray-200"
        }
      `}
    >
      <Image
        alt="새로고침 아이콘"
        width={24}
        height={24}
        className="h-6 w-6"
        style={{
          filter: activated ? "none" : "grayscale(100%)",
        }}
        src="https://zighang.com/icon/refresh.svg"
      />
    </div>
  );
}
