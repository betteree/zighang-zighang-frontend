import type { Job } from "@/app/_types/jobs";
import type { Recruitment } from "@/app/(pages)/recruitment/[slug]/_types/types";
import { toDisplayJobSpace } from "./jobFormat";

export default function filterAdapt(r: Recruitment): Job {
  const exp =
    (r.minExperience === 0 && r.maxExperience === 0) ||
    (r.minExperience === null && r.maxExperience === null)
      ? "경력 무관"
      : r.minExperience === r.maxExperience
      ? `${r.minExperience}년차 이상`
      : `${r.minExperience}–${r.maxExperience}년`;
  const edu = r.educations?.includes("학력_무관")
    ? "학력 무관"
    : r.educations.join(", ");
  const deeadline = toDisplayJobSpace(r.deadlineType);
  return {
    id: r.id,
    href: r.recruitmentUrl,
    company: r.companyName,
    companyImageUrl: r.companyImageUrl,
    title: r.title,
    location: r.locations.join(", "),
    experience: exp,
    contractType: r.employmentTypes.join(", "),
    education: edu,
    imageUrl: r.imageUrl, //지금은 이미지를 받아올 수 없으므로 제목으로
    deadlineType: deeadline,
    views: r.views,
    jobGroup: r.jobs[0] ?? "기타",
    bookmarked: r.isBookmarked,
  };
}
