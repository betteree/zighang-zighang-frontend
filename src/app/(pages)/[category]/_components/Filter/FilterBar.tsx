"use client";
import { useFilterDialog } from "@/app/(pages)/[category]/_hooks/useFilterDialog";
import Refresh from "../Refresh";
import { isAll } from "@/app/_utils/isAll";
import Filter from "../Filter";

function Chip({
  active,
  label,
  onClick,
}: {
  active?: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "h-11 px-4 shrink-0 rounded-lg font-semibold border text-laptop inline-flex items-center gap-1 transition cursor-pointer",
        active
          ? "border-zighang-1000 text-zighang-1000 bg-violet-50"
          : "border-zinc-200 hover:bg-zinc-50",
      ].join(" ")}
    >
      {label} <span className="text-xs">▾</span>
    </button>
  );
}

export default function FilterBar() {
  const { openDialog, filters, resetAll, mode } = useFilterDialog();

  const activeJobGroup = filters.jobGroup !== "전체";
  const activeJobRole = !isAll(filters.jobRoles);
  const activeHireType = !isAll(filters.hireTypes);
  const activeEducation = !isAll(filters.educations);
  const activeRegion = !isAll(filters.regions);
  const activeExperience = !(
    filters.experience.min === 0 && filters.experience.max === 10
  );
  const activeDeadline = !isAll(filters.deadlineTypes ?? ["전체"]);

  const anyFilterActive =
    (mode === "today" ? activeJobGroup : false) ||
    activeJobRole ||
    activeHireType ||
    activeEducation ||
    activeRegion ||
    activeExperience ||
    activeDeadline;

  return (
    <div className="flex gap-2 mt-5 ">
      <div className="flex items-center gap-1 md:gap-2">
        <Refresh activated={anyFilterActive} onClick={resetAll} />

        <div
          data-orientation="vertical"
          role="none"
          className="shrink-0 mx-1 h-7 w-[1.5px] bg-[#DDDDE1] md:mx-2"
        />

        <Filter activated={anyFilterActive} onClick={() => openDialog("all")} />
      </div>

      <div className="flex items-center gap-2 overflow-x-auto">
        {mode === "today" && (
          <Chip
            label="직군"
            active={!!activeJobGroup}
            onClick={() => openDialog("jobGroup")}
          />
        )}
        <Chip
          label="직무"
          active={activeJobRole}
          onClick={() => openDialog("jobRole")}
        />
        <Chip
          label="채용 유형"
          active={activeHireType}
          onClick={() => openDialog("hireType")}
        />
        <Chip
          label="학력 조건"
          active={activeEducation}
          onClick={() => openDialog("education")}
        />
        <Chip
          label="경력 조건"
          active={activeExperience}
          onClick={() => openDialog("experience")}
        />
        <Chip
          label="지역"
          active={activeRegion}
          onClick={() => openDialog("region")}
        />
        <Chip
          label="마감 유형"
          active={activeDeadline}
          onClick={() => openDialog("deadline")}
        />
      </div>
    </div>
  );
}
