import Image from "next/image";
import { Job } from "@/app/_types/jobs";

interface RecruitmentContentProps {
  job: Job;
}

export default function RecruitmentContent({ job }: RecruitmentContentProps) {
  return (
    <div className="w-full">
      {job.imageUrl ? (
        <div className="w-full px-4">
          <Image
            alt="채용 공고 이미지"
            src={job.imageUrl}
            width={0}
            height={0}
            className="w-full h-auto rounded-lg"
            loading="lazy"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 960px"
            style={{ color: "transparent" }}
          />
        </div>
      ) : (
        <div className="w-full px-4 text-center text-gray-500 py-20">
          공고 이미지가 없습니다.
        </div>
      )}
      <div className="h-20"></div>
    </div>
  );
}
