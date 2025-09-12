// 공고 목록 조회 React Query 훅

import {
  useQuery,
  UseQueryResult,
  useInfiniteQuery,
} from "@tanstack/react-query";
import {
  fetchRecruitments,
  RecruitmentFilters,
  RecruitmentListResponse,
} from "./recruitmentApi";
import {
  getOnboardingData,
  isOnboardingDataValid,
} from "@/app/(pages)/onboarding/_utils/storage";
import {
  fetchRecruitmentsClient,
  type FetchParams,
} from "@/app/_api/recruitment/list";

// 공고 목록 조회 훅
export function useRecruitments(
  filters: RecruitmentFilters = {},
  enabled: boolean = true
): UseQueryResult<RecruitmentListResponse, Error> {
  return useQuery({
    queryKey: ["recruitments", filters],
    queryFn: () => fetchRecruitments(filters),
    enabled,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });
}

// 온보딩 데이터를 기반으로 한 공고 목록 조회 훅
export function useRecruitmentsFromOnboarding(
  enabled: boolean = true
): UseQueryResult<RecruitmentListResponse, Error> {
  const onboardingData = getOnboardingData();
  const isDataValid = onboardingData
    ? isOnboardingDataValid(onboardingData)
    : false;

  const filters: RecruitmentFilters =
    onboardingData && isDataValid
      ? {
          jobs: onboardingData.interestedJobs,
          jobCategories: onboardingData.interestedJobCategories,
          minExperience: Math.max(0, onboardingData.careerYear - 1),
          maxExperience: onboardingData.careerYear + 2,
          educations: [onboardingData.educationLevel],
          locations: [onboardingData.preferredRegion],
          page: 0,
          size: 20,
        }
      : {};

  return useRecruitments(filters, enabled && isDataValid);
}

// 온보딩 데이터를 필터로 변환하는 유틸 함수
export function createFiltersFromOnboarding(): RecruitmentFilters | null {
  const onboardingData = getOnboardingData();

  if (!onboardingData || !isOnboardingDataValid(onboardingData)) {
    return null;
  }

  return {
    jobs: onboardingData.interestedJobs,
    jobCategories: onboardingData.interestedJobCategories,
    minExperience: Math.max(0, onboardingData.careerYear - 1),
    maxExperience: onboardingData.careerYear + 2,
    educations: [onboardingData.educationLevel],
    locations: [onboardingData.preferredRegion],
    page: 0,
    size: 20,
  };
}
export function useInfiniteRecruitments(
  params: Omit<FetchParams, "page" | "size"> = {},
  options?: { enabled?: boolean }
) {
  return useInfiniteQuery({
    queryKey: ["recruitments:infinite", params],
    queryFn: ({ pageParam }) =>
      fetchRecruitmentsClient({ page: pageParam ?? 0, size: 20, ...params }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const current = lastPage?.data?.page?.page ?? 0;
      const totalPage = lastPage?.data?.page?.totalPage ?? 0;
      const hasNext = current + 1 < totalPage;
      return hasNext ? current + 1 : undefined;
    },
    enabled: options?.enabled ?? true,
    staleTime: 60_000,
    gcTime: 5 * 60_000,
  });
}
