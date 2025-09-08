"use client";

import { useEffect, useMemo, useRef } from "react";
import JobCardList from "./Card/JobCardList";
import FilterBar from "./Filter/FilterBar";
import FilterModal from "./Filter/FilterModal";
import { jobCategories } from "@/app/_constants/jobCategories";
import {
  FilterDialogProvider,
  DEFAULT,
  type FilterState,
  useFilterDialog,
} from "@/app/(pages)/[category]/_hooks/useFilterDialog";
import { mapFiltersToParams } from "@/app/_utils/mapFiltersToParams";
import { useInfiniteRecruitments } from "@/app/_api/recruitment/useRecruitments";
import { Job } from "@/app/_types/jobs";
import filterAdapt from "@/app/_utils/filterAdapt";
import ResultHeaderConnector from "./Filter/ResultHeaderConnector";

export default function CategoryClient({ slug }: { slug: string }) {
  const slugToJobGroup = (s: string) =>
    jobCategories.find((c) => c.href.slice(1) === s)?.name ?? "전체";

  const initial = useMemo<FilterState>(
    () => ({ ...DEFAULT, jobGroup: slugToJobGroup(slug) }),
    [slug]
  );

  return (
    <div className="relative w-full overflow-visible px-0 md:mx-auto md:max-w-screen-xl md:px-10">
      <FilterDialogProvider initial={initial}>
        <FilterBar />
        <ResultHeaderConnector />
        <Inner />
        <FilterModal />
      </FilterDialogProvider>
    </div>
  );
}

// 공고 카드 데이터 받아오는 쪽
function Inner() {
  const { filters } = useFilterDialog();
  const params = useMemo(() => mapFiltersToParams(filters), [filters]);

  const {
    data,
    status,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteRecruitments({ ...params });

  if (status === "pending")
    return <div className="p-4 text-center">Loading…</div>;
  if (status === "error")
    return (
      <div className="p-4 text-center text-red-600">
        {String((error as Error)?.message)}
      </div>
    );

  const pages = data?.pages ?? [];
  const content = pages.flatMap((p) => p?.data?.content ?? []);
  const jobs: Job[] = content.map(filterAdapt);

  return (
    <main className="p-4 space-y-4">
      <JobCardList jobs={jobs} />
      <AutoLoader
        canLoad={!!hasNextPage}
        loading={!!isFetchingNextPage}
        onLoad={() => fetchNextPage()}
      />
    </main>
  );
}

// 무한 스크롤
function AutoLoader({
  canLoad,
  loading,
  onLoad,
}: {
  canLoad: boolean;
  loading: boolean;
  onLoad: () => void;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && canLoad && !loading) onLoad();
      },
      { root: null, rootMargin: "200px", threshold: 0 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [canLoad, loading, onLoad]);

  return (
    <div ref={ref} className="flex justify-center py-6 text-sm text-zinc-500">
      {loading ? "불러오는 중…" : canLoad ? "더 불러오는 중" : ""}
    </div>
  );
}
