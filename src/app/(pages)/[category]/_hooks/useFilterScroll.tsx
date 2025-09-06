"use client";

import { useEffect, useRef } from "react";
import type { Section } from "@/app/(pages)/[category]/_hooks/useFilterDialog";

type RefKeys =
  | "jobGroup"
  | "jobRole"
  | "hireType"
  | "education"
  | "experience"
  | "region"
  | "deadline";

function isRefKey(s: Section): s is RefKeys {
  return s !== "all" && s !== "jobGroup";
}

export default function useFilterScroll(open: boolean, section: Section) {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const jobGroup = useRef<HTMLDivElement | null>(null);
  const jobRole = useRef<HTMLDivElement | null>(null);
  const hireType = useRef<HTMLDivElement | null>(null);
  const region = useRef<HTMLDivElement | null>(null);
  const experience = useRef<HTMLDivElement | null>(null);
  const education = useRef<HTMLDivElement | null>(null);
  const deadline = useRef<HTMLDivElement | null>(null);

  const refs = useRef({
    jobGroup,
    jobRole,
    hireType,
    education,
    experience,
    region,
    deadline,
  }).current;

  useEffect(() => {
    if (!open) return;
    const c = scrollRef.current;
    if (!c) return;

    if (!isRefKey(section)) {
      c.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const t = refs[section]?.current;
    if (!t) return;

    const header = 72;
    const top =
      t.getBoundingClientRect().top -
      c.getBoundingClientRect().top +
      c.scrollTop -
      header;

    c.scrollTo({ top, behavior: "smooth" });
  }, [open, section, refs]);

  return { scrollRef, refs };
}
