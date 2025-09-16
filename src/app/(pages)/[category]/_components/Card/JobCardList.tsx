"use client";

import Card from "./Card";
import { Job } from "@/app/_types/jobs";

export default function JobCardList({
  jobs,
  isLoggedIn,
  isSaved,
}: {
  jobs: Job[];
  isLoggedIn?: boolean;
  isSaved?: boolean;
}) {
  if (!jobs.length) {
    // 저장된 공고 페이지에서 빈 상태일 때
    if (isSaved) {
      if (isLoggedIn === false) {
        return (
          <div className="w-full rounded-xl p-10 text-center text-sm text-zinc-500">
            로그인이 필요합니다.
          </div>
        );
      } else {
        return (
          <div className="w-full rounded-xl p-10 text-center text-sm text-zinc-500">
            북마크된 공고가 없어요.
          </div>
        );
      }
    }

    // 전체 공고 페이지에서 빈 상태일 때
    return (
      <div className="w-full rounded-xl p-10 text-center text-sm text-zinc-500">
        조건에 맞는 공고가 없어요.
      </div>
    );
  }

  return (
    <div className="w-full md:px-4">
      <div
        className="box-border flex w-full flex-grow flex-col items-start gap-2.5 px-4 pb-10 pt-0
                      md:grid md:grid-cols-2 md:content-start md:justify-between md:gap-4 md:px-0 md:pb-12 md:pt-0"
      >
        {jobs.map((job) => (
          <Card
            key={job.id}
            id={job.id}
            href={job.href}
            company={job.company}
            companyImageUrl={job.companyImageUrl}
            title={job.title}
            location={job.location}
            experience={job.experience}
            contractType={job.contractType}
            education={job.education}
            imageUrl={job.imageUrl}
            views={job.views}
            deadlineType={job.deadlineType}
            hot={job.hot ?? false}
            bookmarked={job.bookmarked}
          />
        ))}
      </div>
    </div>
  );
}
