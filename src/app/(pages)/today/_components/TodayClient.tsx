"use client";

import { useEffect, useMemo, useRef } from "react";
import JobCardList from "../../[category]/_components/Card/JobCardList";
import FilterBar from "../../[category]/_components/Filter/FilterBar";
import FilterModal from "../../[category]/_components/Filter/FilterModal";
import {
  FilterDialogProvider,
  useFilterDialog,
} from "../../[category]/_hooks/useFilterDialog";
import { mapFiltersToParams } from "@/app/_utils/mapFiltersToParams";
import { useInfiniteRecruitments } from "@/app/_api/recruitment/useRecruitments";
import { Job } from "@/app/_types/jobs";
import filterAdapt from "@/app/_utils/filterAdapt";
import ResultHeaderConnector from "../../[category]/_components/Filter/ResultHeaderConnector";
import { useInfiniteBookmarks } from "@/app/_api/bookmark/list";
import { useAuthState } from "@/app/_api/auth/useAuthState";
import { Ranking } from "../../[category]/_components/Ranking/Ranking";

export default function TodayClient({ active }: { active: string }) {
  return (
    <div className="relative w-full overflow-visible px-0 md:mx-auto md:max-w-screen-xl md:px-10">
      <div className="mx-5 my-5">
        <Ranking slug={"today"} />
      </div>
      <FilterDialogProvider mode="today">
        {active === "all" && (
          <>
            <FilterBar />
            <ResultHeaderConnector />
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
