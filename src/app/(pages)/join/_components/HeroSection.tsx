export default function HeroSection() {
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex flex-col items-center text-[28px] font-semibold">
        <div className="text-center">
          <span className="text-[#7A52FF]">내 직군의 채용 공고</span>를<br className="md:hidden" />
          <span className="md:inline hidden"> </span>매일 받아보세요
        </div>
      </div>
      <div className="flex flex-col items-center text-base text-label-neutral">
        <div className="text-center">
          오늘 올라온 채용공고 10개를<br className="md:hidden" />
          <span className="md:inline hidden"> </span>매일 아침 이메일로 보내드립니다
        </div>
      </div>
    </div>
  );
}
