"use client";

import {
  JOB_GROUP,
  JOB_ROLE_BY_GROUP,
  HIRE_TYPE,
  EDUCATION_LEVELS,
  REGIONS,
  DEADLINE_TYPES,
} from "@/app/_constants/filterOptions";
import { useFilterDialog } from "@/app/(pages)/[category]/_hooks/useFilterDialog";
import FilterSection from "./FilterSection";
import FilterRange from "./FilterRange";
import { useEffect, useMemo } from "react";

const getRolesForGroupDisplay = (group: string): string[] => {
  if (group === "전체") return ["전체"];
  return ["전체", ...(JOB_ROLE_BY_GROUP[group] ?? [])];
};

export default function FilterModal() {
  const {
    open,
    closeDialog,
    filters,
    setJobGroup,
    toggleJobRole,
    toggleHireType,
    toggleEducation,
    toggleRegion,
    setExperience,
    resetAll,
  } = useFilterDialog();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  const jobRoleOptions = useMemo(
    () => getRolesForGroupDisplay(filters.jobGroup),
    [filters.jobGroup]
  );
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={closeDialog} />
      <div className="absolute inset-x-0 bottom-0 top-0 md:inset-auto md:left-1/2 md:top-16 md:-translate-x-1/2 md:max-w-[617px] md:max-h-[660px] md:rounded-lg md:shadow-2xl bg-white flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200">
          <h2 className="text-lg font-semibold">필터</h2>
          <button
            onClick={closeDialog}
            className="text-zinc-500 hover:text-black"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
          <FilterSection
            title="직군"
            options={JOB_GROUP}
            selected={(o) => filters.jobGroup === o}
            onToggle={setJobGroup}
          />
          <FilterSection
            title="직무"
            note="중복 선택 가능"
            options={jobRoleOptions}
            selected={(o) => filters.jobRoles.includes(o)}
            onToggle={toggleJobRole}
          />
          <FilterSection
            title="채용 유형"
            note="중복 선택 가능"
            options={HIRE_TYPE}
            selected={(o) => filters.hireTypes.includes(o)}
            onToggle={toggleHireType}
          />

          <FilterSection
            title="학력 조건"
            note="중복 선택 가능"
            options={EDUCATION_LEVELS}
            selected={(o) => filters.educations.includes(o)}
            onToggle={toggleEducation}
          />

          <section className="space-y-2">
            <div className="flex items-end gap-3">
              <h3 className="text-sm font-semibold">경력 조건</h3>
              <span className="text-xs text-zinc-500">범위 선택</span>
            </div>
            <FilterRange
              min={filters.experience.min}
              max={filters.experience.max}
              onChange={setExperience}
            />
          </section>

          <FilterSection
            title="지역"
            note="중복 선택 가능"
            options={REGIONS}
            selected={(o) => filters.regions.includes(o)}
            onToggle={toggleRegion}
          />

          <FilterSection
            title="마감 유형"
            note="중복 선택 가능"
            options={DEADLINE_TYPES}
            selected={(o) => filters.deadlineTypes.includes(o)}
            onToggle={toggleHireType}
          />
        </div>

        <div className="sticky bottom-0 flex items-center gap-4 border-t md:rounded-b-lg border-zinc-200 bg-white px-6 py-4">
          <button
            onClick={resetAll}
            className="px-4 py-3 rounded-lg  border-2 border-zinc-300 text-sm  text-zinc-700 hover:bg-zinc-50"
          >
            초기화
          </button>
          <button
            onClick={() => {
              closeDialog();
            }}
            className="flex-1 py-3 rounded-lg font-semibold text-white bg-violet-600 hover:bg-violet-700"
          >
            적용
          </button>
        </div>
      </div>
    </div>
  );
}
