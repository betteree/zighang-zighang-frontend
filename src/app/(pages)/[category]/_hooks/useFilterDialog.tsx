"use client";
import {
  createContext,
  useContext,
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { EXPERIENCE_MIN, EXPERIENCE_MAX } from "@/app/_constants/filterOptions";

export type FilterState = {
  jobGroup: string;
  jobRoles: string[];
  hireTypes: string[];
  educations: string[];
  regions: string[];
  deadlineTypes: string[];
  experience: { min: number; max: number };
};

export type Section =
  | "all"
  | "jobGroup"
  | "jobRole"
  | "hireType"
  | "education"
  | "experience"
  | "region"
  | "deadline";

type Ctx = {
  open: boolean;
  section: Section;
  filters: FilterState;
  openDialog: (s?: Section) => void;
  closeDialog: () => void;
  setJobGroup: (id: string) => void;
  toggleJobRole: (id: string) => void;
  toggleHireType: (id: string) => void;
  toggleEducation: (id: string) => void;
  toggleRegion: (id: string) => void;
  toggleDeadline: (id: string) => void;
  setExperience: (min: number, max: number) => void;
  resetAll: () => void;
};

const FilterCtx = createContext<Ctx | null>(null);

export const DEFAULT: FilterState = {
  jobGroup: "전체",
  jobRoles: ["전체"],
  hireTypes: ["전체"],
  educations: ["전체"],
  regions: ["전체"],
  deadlineTypes: ["전체"],
  experience: { min: EXPERIENCE_MIN, max: EXPERIENCE_MAX },
};

const toggleIn = (list: string[], id: string) => {
  if (id === "전체") return ["전체"];
  const base = list.includes("전체") ? [] : [...list];
  const i = base.indexOf(id);
  if (i >= 0) base.splice(i, 1);
  else base.push(id);
  return base.length ? base : ["전체"];
};

export function FilterDialogProvider({
  children,
  initial = DEFAULT,
}: {
  children: ReactNode;
  initial?: FilterState;
}) {
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState<Section>("all");
  const [filters, setFilters] = useState<FilterState>(initial);

  const openDialog = useCallback(
    (s: Section = "all") => {
      setSection(s);
      setOpen(true);
    },
    [setSection, setOpen]
  );
  const closeDialog = useCallback(() => setOpen(false), [setOpen]);

  const setJobGroup = useCallback(
    (id: string) => setFilters((p) => ({ ...p, jobGroup: id })),
    [setFilters]
  );

  const toggleJobRole = useCallback(
    (id: string) =>
      setFilters((p) => ({ ...p, jobRoles: toggleIn(p.jobRoles, id) })),
    [setFilters]
  );
  const toggleHireType = useCallback(
    (id: string) =>
      setFilters((p) => ({ ...p, hireTypes: toggleIn(p.hireTypes, id) })),
    [setFilters]
  );
  const toggleEducation = useCallback(
    (id: string) =>
      setFilters((p) => ({ ...p, educations: toggleIn(p.educations, id) })),
    [setFilters]
  );
  const toggleRegion = useCallback(
    (id: string) =>
      setFilters((p) => ({ ...p, regions: toggleIn(p.regions, id) })),
    [setFilters]
  );
  const toggleDeadline = useCallback(
    (id: string) =>
      setFilters((p) => ({
        ...p,
        deadlineTypes: toggleIn(p.deadlineTypes, id),
      })),
    [setFilters]
  );
  const setExperience = useCallback(
    (min: number, max: number) =>
      setFilters((p) => ({ ...p, experience: { min, max } })),
    [setFilters]
  );

  const resetAll = useCallback(() => setFilters(DEFAULT), [setFilters]);

  const value: Ctx = useMemo(
    () => ({
      open,
      section,
      filters,
      openDialog,
      closeDialog,
      setJobGroup,
      toggleJobRole,
      toggleHireType,
      toggleEducation,
      toggleRegion,
      toggleDeadline,
      setExperience,
      resetAll,
    }),
    [
      open,
      section,
      filters,
      openDialog,
      closeDialog,
      setJobGroup,
      toggleJobRole,
      toggleHireType,
      toggleEducation,
      toggleRegion,
      toggleDeadline,
      setExperience,
      resetAll,
    ]
  );

  return <FilterCtx.Provider value={value}>{children}</FilterCtx.Provider>;
}

export function useFilterDialog() {
  const ctx = useContext(FilterCtx);
  if (!ctx) throw new Error("useFilterDialog must be used in provider");
  return ctx;
}
