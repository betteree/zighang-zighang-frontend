import * as React from "react";
import type { ExploreJobKey } from "@/app/_constants/exploreJobCard";
import { EXPLORE_JOB_BY_KEY } from "@/app/_utils/exploreJobs";
import { EXPLORE_JOBS_WITH_ICON } from "@/app/_utils/exploreJobs";

export function ExplorePreview({
  selectedKey,
}: {
  selectedKey: ExploreJobKey;
}) {
  const meta = React.useMemo(
    () => EXPLORE_JOBS_WITH_ICON.find((i) => i.key === selectedKey),
    [selectedKey]
  );
  if (!meta) return null;
  const Icon = meta.Icon;
  const selectedCategory = meta.category;
  const selectedJobs = EXPLORE_JOB_BY_KEY[selectedKey].jobs;

  return (
    <section className="flex flex-col items-center">
      <div className="flex items-center justify-center w-11 h-11 mb-4 rounded-full bg-violet-50">
        <Icon isSelected />
      </div>
      <h2 className="text-xl font-semibold mb-1 w-[240px] md:w-full text-center">
        {selectedCategory}을 선호하는군요!
      </h2>
      <p className="text-base text-neutral-500 font-semibold mb-6">
        성향에 맞는 직군을 추천해드릴게요!
      </p>

      <div className="flex gap-2 md:max-w-xl flex-wrap justify-center">
        {selectedJobs.map((job) => (
          <button
            key={job}
            className="rounded-lg border border-neutral-100 shadow-md text-lg font-semibold px-5 py-2 md:px-7 md:py-3 bg-white"
          >
            {job}
          </button>
        ))}
      </div>
    </section>
  );
}
