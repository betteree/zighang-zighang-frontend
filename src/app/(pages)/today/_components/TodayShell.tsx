"use client";

import { useState } from "react";
import CategoryTabs from "../../[category]/_components/CategoryTabs";
import TodayClient from "./TodayClient";

export default function TodayShell() {
  const [active, setActive] = useState<"all" | "saved">("all");

  return (
    <>
      <CategoryTabs active={active} onChange={setActive} />
      <TodayClient active={active} />
    </>
  );
}
