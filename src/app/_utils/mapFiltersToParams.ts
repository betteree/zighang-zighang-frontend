import type { FetchParams } from "@/app/_api/recruitment/list";
import type { FilterState } from "@/app/(pages)/[category]/_hooks/useFilterDialog";
import { EXPERIENCE_MIN, EXPERIENCE_MAX } from "@/app/_constants/filterOptions";
import { toApiJob } from "@/app/_utils/jobFormat";
import { isAll } from "./isAll";

export function mapFiltersToParams(f: FilterState): FetchParams {
  const p: FetchParams = {};

  if (f.jobGroup && f.jobGroup !== "전체") p.jobs = [toApiJob(f.jobGroup)];
  if (f.jobRoles?.length && !isAll(f.jobRoles))
    p.jobCategories = f.jobRoles.map(toApiJob);
  if (f.hireTypes?.length && !isAll(f.hireTypes))
    p.employmentTypes = f.hireTypes.map(toApiJob);
  if (f.educations?.length && !isAll(f.educations)) p.educations = f.educations;
  if (f.regions?.length && !isAll(f.regions)) p.locations = f.regions;
  if (f.deadlineTypes?.length && !isAll(f.deadlineTypes))
    p.deadlineTypes = f.deadlineTypes.map(toApiJob);

  const { min, max } = f.experience ?? {};
  if (typeof min === "number" && min !== EXPERIENCE_MIN) p.minExperience = min;
  if (typeof max === "number" && max !== EXPERIENCE_MAX) p.maxExperience = max;

  return p;
}
