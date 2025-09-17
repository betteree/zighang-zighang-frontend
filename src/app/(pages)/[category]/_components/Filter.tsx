import Image from "next/image";
type FilterProps = {
  activated?: boolean;
  onClick?: () => void;
};

export default function Filter({ activated = false, onClick }: FilterProps) {
  return (
    <button
      onClick={onClick}
      aria-label={activated ? "필터 임시 해제" : "필터 적용"}
      className={`cursor-pointer flex h-10 w-10 items-center justify-center rounded-lg md:h-11 md:w-11 active:bg-[#E4DAFF] 
        ${
          activated
            ? " bg-violet-100"
            : "  bg-white hover:bg-gray-100 active:bg-gray-200 text-[#71717A]"
        }`}
    >
      <Image
        alt="필터 아이콘"
        width={20}
        height={20}
        className="h-5 w-5"
        style={{
          filter: activated ? "none" : "grayscale(100%)",
        }}
        src="https://zighang.com/icon/filter.svg"
      />
    </button>
  );
}
