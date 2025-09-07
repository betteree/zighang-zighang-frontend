import Image from 'next/image';

interface RecruitmentHeaderProps {
  recruitment: {
    title: string;
    company: {
      name: string;
    };
    imageUrl: string;
    hits: number;
  };
}

export default function RecruitmentHeader({ recruitment }: RecruitmentHeaderProps) {
  return (
    <div className="flex w-full items-start gap-5">
      <section
        className="relative flex aspect-[1/1] flex-shrink-0 items-center justify-center rounded-xl md:rounded-2xl w-16 md:w-[100px]"
        style={{ backgroundColor: '#4ec06c' }}
      >
        <span className="font-bold text-white text-[9px] md:text-xs whitespace-pre-line text-center leading-[12px] md:leading-[18px]">
          Amazon WebSe..
        </span>
      </section>
      <div className="flex w-full flex-col gap-2">
        <h1 className="break-all text-xl font-semibold text-black md:gap-5 md:text-[26px]">
          {recruitment.title}
        </h1>
        <span className="w-fit text-sm font-medium text-[#5E5E5E] md:text-lg">
          {recruitment.company.name}
        </span>
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-1 rounded-[8px] bg-[#7951FF]/10 px-2 py-1.5 text-xs font-bold text-[#7951FF] md:gap-1">
              <Image
                alt="오늘 뜬 공고 아이콘"
                loading="lazy"
                width={16}
                height={16}
                src="https://zighang.com/icon/fire.svg"
              />
              오늘 뜬 공고
            </div>
            <div className="flex items-center gap-1 rounded-[8px] bg-[#6F6F6F]/10 px-2 py-1.5 text-xs font-bold text-[#6F6F6F] md:gap-2">
              <Image
                alt="조회수 아이콘"
                loading="lazy"
                width={19}
                height={12}
                className="h-[9px] w-[15px] md:h-[12px] md:w-[19px]"
                src="https://zighang.com/icon/eye.svg"
              />
              <div>{recruitment.hits}</div>
            </div>
          </div>
          <button
            className="group flex cursor-pointer items-center gap-1 border-none bg-transparent p-0 text-xs font-medium leading-[17px] text-[#71717A] underline transition-colors duration-200 hover:text-[#6F00B6] md:text-sm"
            type="button"
            aria-haspopup="dialog"
            aria-expanded="false"
            aria-controls="radix-:Rbh2aqfnnjr9kq:"
            data-state="closed"
          >
            <Image
              alt="오류 제보 아이콘"
              loading="lazy"
              width={14}
              height={14}
              className="block transition-all duration-200 group-hover:hidden md:h-5 md:w-5"
              src="https://zighang.com/icon/report_problem.svg"
            />
            <Image
              alt="오류 제보 아이콘"
              loading="lazy"
              width={14}
              height={14}
              className="hidden transition-all duration-200 group-hover:block md:h-5 md:w-5"
              src="https://zighang.com/icon/report_problem_purple.svg"
            />
            오류 제보하기
          </button>
        </div>
      </div>
    </div>
  );
}
