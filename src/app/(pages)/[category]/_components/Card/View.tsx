import Image from "next/image";
type ViewProps = {
  count: number;
  hot?: boolean;
};

export default function View({ count, hot = false }: ViewProps) {
  return (
    <div className="flex flex-row items-center gap-1">
      <Image
        alt="조회수 아이콘"
        width={20}
        height={20}
        className="h-[14px] w-[14px] flex-shrink-0 md:h-[20px] md:w-[20px]"
        src={
          hot
            ? "https://zighang.com/icon/hot.svg"
            : "https://zighang.com/icon/visibility.svg"
        }
      />
      <div
        className={`ds-mobile-badge-sm md:ds-web-summary`}
        style={{
          color: hot ? "var(--Zighang-Tag-Label-Red, #FF5757)" : "#71717A",
        }}
      >
        {count}
      </div>
    </div>
  );
}
