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
    <div className="max-w-[786px] md:w-[786px] h-64 flex justify-between rounded-lg">
      {/* 모바일 배너 */}
      <Image
        src="/banner/mobile_banner.svg"
        alt="MobileBanner"
        width={788}
        height={238}
        className="block md:hidden"
      />
      {/* PC 배너 */}
      <Image
        src="/banner/pc_banner.svg"
        alt="PcBanner"
        width={788}
        height={238}
        className="hidden md:block"
      />
    </div>
  );
}
