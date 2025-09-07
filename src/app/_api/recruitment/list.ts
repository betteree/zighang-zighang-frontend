import type { GetRecruitmentsResponse } from "@/app/(pages)/recruitment/[slug]/_types/types";

export type FetchParams = {
  page?: number;
  size?: number;
  jobs?: string[];
  jobCategories?: string[];
  employmentTypes?: string[];
  educations?: string[];
  locations?: string[];
  deadlineTypes?: string[];
  minExperience?: number;
  maxExperience?: number;
};

const appendArr = (qs: URLSearchParams, k: string, v?: string[]) =>
  v?.forEach((x) => qs.append(k, x));

export async function fetchRecruitmentsClient({
  page = 0,
  size = 20,
  jobs,
  jobCategories,
  employmentTypes,
  educations,
  locations,
  deadlineTypes,
  minExperience,
  maxExperience,
}: FetchParams = {}): Promise<GetRecruitmentsResponse> {
  const qs = new URLSearchParams({ page: String(page), size: String(size) });
  appendArr(qs, "jobs", jobs);
  appendArr(qs, "jobCategories", jobCategories);
  appendArr(qs, "employmentTypes", employmentTypes);
  appendArr(qs, "educations", educations);
  appendArr(qs, "locations", locations);
  appendArr(qs, "deadlineTypes", deadlineTypes);
  if (minExperience != null) qs.set("minExperience", String(minExperience));
  if (maxExperience != null) qs.set("maxExperience", String(maxExperience));

  const url = `/api/recruitments?${qs.toString()}`;
  const res = await fetch(url, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
