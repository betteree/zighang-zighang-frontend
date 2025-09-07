import Image from "next/image";

interface RecruitmentCardProps {
  experience: string;
  logo: string;
  title: string;
  company: string;
  location: string;
}

export default function RecruitmentCard({
  experience,
  logo,
  title,
  company,
  location,
}: RecruitmentCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg px-4 pb-2 w-56 [box-shadow:0_4px_10px_rgba(0,0,0,0.1)]">
      <p className="inline-flex px-1 py-0.5 text-[7.75px] text-blue-500  rounded-sm font-bold bg-blue-500/10">
        {experience}
      </p>
      <div className="flex items-center gap-2.5 mt-1.5">
        <div className="w-12 h-12 bg-gray-100 flex items-center justify-center">
          <Image
            src={logo}
            alt={`${company} 로고`}
            className="max-w-full max-h-full"
            width={48}
            height={48}
          />
        </div>
        <div className="flex flex-col">
          <p className="font-semibold text-xs ">{title}</p>
          <p className="text-black text-[8.86px] mt-0.5">{company}</p>
          <p className="text-zinc-400 text-[7.75px] mt-1.5">{location}</p>
        </div>
      </div>
    </div>
  );
}
