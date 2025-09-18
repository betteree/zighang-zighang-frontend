"use client";

import { useState } from "react";
import CategoryTabs from "./CategoryTabs";
import CategoryClient from "./CategoryClient";
import TodayClient from "../../today/_components/TodayClient";

export default function CategoryShell({ slug }: { slug: string }) {
  const [active, setActive] = useState<"all" | "saved">("all");

  // company 카테고리일 때는 TodayClient 사용
  if (slug === "company") {
    return (
      <>
        <CategoryTabs active={active} onChange={setActive} />
        <TodayClient active={active} />
      </>
    );
  }

  return (
    <>
      <CategoryTabs active={active} onChange={setActive} />
      <CategoryClient slug={slug} active={active} />
    </>
  );
}
