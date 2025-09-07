export default function BannerSection() {
  return (
    <div className="relative w-full overflow-visible px-0 md:mx-auto">
      <div className="flex w-full flex-col items-center justify-center py-8 md:py-0">
        <div className="relative mx-auto w-full max-w-[900px]">
          <div className="relative w-full px-0 sm:px-2 md:px-0">
            <div className="relative flex w-full cursor-pointer items-center justify-center bg-gray-100 rounded-lg h-[100px] sm:h-[120px] md:h-[136px]">
              <p className="text-gray-500">
                배너 이미지가 여기에 표시됩니다
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
