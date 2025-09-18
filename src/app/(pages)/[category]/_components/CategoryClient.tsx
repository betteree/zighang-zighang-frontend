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
import { useInfiniteBookmarks } from "@/app/_api/bookmark/list";
import { useAuthState } from "@/app/_api/auth/useAuthState";
import { Ranking } from "./Ranking/Ranking";

export default function CategoryClient({
  slug,
  active,
}: {
  slug: string;
  active: string;
}) {
  const slugToJobGroup = (s: string) =>
    jobCategories.find((c) => c.href.slice(1) === s)?.name ?? "전체";

  const initial = useMemo<FilterState>(() => {
    const baseState = { ...DEFAULT, jobGroup: slugToJobGroup(slug) };
    return baseState;
  }, [slug]);

  return (
    <div className="relative w-full overflow-visible px-0 md:mx-auto md:max-w-screen-xl md:px-10">
      <div className="mx-5 my-5">
        <Ranking slug={slug} useCategoryApi={true} />
      </div>
      <FilterDialogProvider initial={initial}>
        {active === "all" && (
          <>
            <div className="mx-5">
              <FilterBar />
              <ResultHeaderConnector />
            </div>
          </>
        )}
        <Inner active={active} />
        <FilterModal />
      </FilterDialogProvider>
    </div>
  );
}

// 공고 카드 데이터 받아오는 쪽
function Inner({ active }: { active: string }) {
  const { filters } = useFilterDialog();
  const params = useMemo(() => mapFiltersToParams(filters), [filters]);
  const { isLoggedIn } = useAuthState();

  const isSaved = active === "saved";

  const savedQ = useInfiniteBookmarks(
    { size: 20 },
    { enabled: isSaved && isLoggedIn }
  );
  const allQ = useInfiniteRecruitments(params, { enabled: !isSaved });

  const query = isSaved ? savedQ : allQ;

  const {
    data,
    status,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = query;

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
  const jobs: Job[] = content
    .map(filterAdapt)
    .map((j) => ({ ...j, bookmarked: isSaved ? true : j.bookmarked }));

  return (
    <main className="p-4 space-y-4">
      <JobCardList jobs={jobs} isLoggedIn={isLoggedIn} isSaved={isSaved} />
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
