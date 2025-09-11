"use client";

import { useState } from "react";
import CategoryTabs from "./CategoryTabs";
import CategoryClient from "./CategoryClient";

export default function CategoryShell({ slug }: { slug: string }) {
  const [active, setActive] = useState<"all" | "saved">("all");

  return (
    <>
      <CategoryTabs active={active} onChange={setActive} />
      <CategoryClient slug={slug} active={active} />
    </>
  );
}
