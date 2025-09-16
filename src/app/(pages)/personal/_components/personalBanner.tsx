import Image from "next/image";

interface PersonalBannerProps {
  hasFiles: boolean;
}

export default function PersonalBanner({ hasFiles }: PersonalBannerProps) {
  // 파일이 하나라도 있으면 배너를 숨김
  if (hasFiles) {
    return null;
  }

  return (
    <div className="max-w-[786px] md:w-[786px] h-64 flex justify-between bg-gradient-to-br from-violet-500 via-violet-500/70 to-violet-500 rounded-lg">
      {/* 모바일 배너 */}
      <Image
        src="/banner/mobile_banner.png"
        alt="MobileBanner"
        width={786}
        height={250}
        className="block md:hidden"
      />
      {/* PC 배너 */}
      <Image
        src="/banner/pc_banner.png"
        alt="PcBanner"
        width={786}
        height={250}
        className="hidden md:block"
      />
    </div>
  );
}
