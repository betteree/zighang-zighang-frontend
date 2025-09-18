import { useFunnel } from "@use-funnel/browser";
import { useRouter } from "next/navigation";
import { useSubmitOnboarding } from "@/app/_api/user/useOnboarding";
import {
  mapJobGroup,
  mapEducationLevel,
  mapGraduationStatus,
  saveOnboardingFiltersToStorage,
  loadOnboardingFiltersFromStorage,
  mapApiParamsToOnboarding,
} from "../_utils/mapping";
import {
  JobCategoryStep,
  JobStep,
  ExperienceStep,
  EducationStep,
  LocationStep,
  ExploreJobStep,
} from "./steps";
import { IntroStep } from "./steps/IntroStep";
import type {
  직군입력,
  직무입력,
  경력입력,
  학력입력,
  지역입력,
  파일업로드,
  완료,
  모르겠어요,
} from "../_types/context";
import { UploadStep } from "./upload/UploadStep";
import SuccessStep from "./steps/SuccessStep";

export type ApiOnboardingPayload = {
  interestedJobs: string[];
  interestedJobCategories: string[];
  careerYear: number;
  educationLevel: string;
  graduationStatus: string;
  preferredRegions: string[] | null;
};

function toApiPayload(context: 지역입력): ApiOnboardingPayload {
  return {
    interestedJobs: context.직군.map(mapJobGroup),
    interestedJobCategories: (context.직무 || [])
      .filter((job) => job.trim() !== "")
      .map(mapJobGroup), // 직무도 매핑 적용
    careerYear: context.경력 || 0,
    educationLevel: mapEducationLevel(context.학력 || ""),
    graduationStatus: mapGraduationStatus(context.졸업상태 || "졸업"),
    preferredRegions: context.지역 ?? null,
  };
}

export default function OnboardingFunnel() {
  const router = useRouter();
  const submitOnboardingMutation = useSubmitOnboarding();

  const funnel = useFunnel<{
    인트로: Record<string, never>;
    직군입력: 직군입력;
    직무입력: 직무입력;
    경력입력: 경력입력;
    학력입력: 학력입력;
    지역입력: 지역입력;
    파일업로드: 파일업로드;
    완료: 완료;
    모르겠어요: 모르겠어요;
  }>({
    id: "onboarding-funnel",
    initial: {
      step: "인트로",
      context: {},
    },
  });
  return (
    <funnel.Render
      인트로={({ history }) => (
        <IntroStep
          onNext={(applyRecent) => {
            let initialContext: Partial<지역입력> = {
              최근필터적용: applyRecent,
            };

            // 최근 필터 적용이 체크된 경우 로컬 스토리지에서 데이터 불러오기
            if (applyRecent) {
              const savedFilters = loadOnboardingFiltersFromStorage();
              if (savedFilters) {
                const onboardingData = mapApiParamsToOnboarding(savedFilters);
                initialContext = {
                  ...initialContext,
                  직군: onboardingData.직군,
                  직무: onboardingData.직무,
                  경력: onboardingData.경력,
                  학력: onboardingData.학력,
                  졸업상태: onboardingData.졸업상태,
                  지역: onboardingData.지역,
                };
              }
            }

            history.push(
              "직군입력",
              (prev) =>
                ({
                  ...prev,
                  ...initialContext,
                } as 직군입력)
            );
          }}
        />
      )}
      직군입력={({ history, context }) => (
        <JobCategoryStep
          onBack={() => history.back()}
          initialSelected={context.직군 || []}
          onNext={(직군) =>
            history.push("직무입력", (prev) => ({ ...prev, 직군 }))
          }
          onSkip={() =>
            history.push("모르겠어요", () => ({
              직군: [],
              직무: [],
            }))
          }
        />
      )}
      모르겠어요={({ history }) => (
        <ExploreJobStep
          onBack={() => history.back()}
          onNext={(직군) =>
            history.push("학력입력", (prev) => ({ ...prev, 직군 }))
          }
        />
      )}
      직무입력={({ context, history }) => (
        <JobStep
          jobGroup={context.직군}
          initialSelected={context.직무 || []}
          onBack={() => history.back()}
          onNext={(직무) => {
            history.push("경력입력", (prev) => ({ ...prev, 직무 }));
          }}
        />
      )}
      경력입력={({ context, history }) => (
        <ExperienceStep
          jobs={context.직무}
          initialExperience={context.경력}
          onBack={() => history.back()}
          onNext={(경력) =>
            history.push("학력입력", (prev) => ({ ...prev, 경력 }))
          }
        />
      )}
      학력입력={({ context, history }) => (
        <EducationStep
          initialSchool={context.학력}
          initialGraduation={context.졸업상태}
          onBack={() => history.back()}
          onNext={(학력, 졸업상태) =>
            history.push("지역입력", { ...context, 학력, 졸업상태 })
          }
        />
      )}
      지역입력={({ context, history }) => (
        <LocationStep
          initialRegion={context.지역 || []}
          onBack={() => history.back()}
          onSubmit={(지역) => {
            // 지역 정보를 context에 저장하고 파일업로드 단계로 이동

            history.push("파일업로드", (prev) => ({
              ...prev,
              지역: Array.isArray(지역) ? Array.from(new Set(지역)) : null,
            }));
          }}
        />
      )}
      파일업로드={({ context, history }) => {
        const apiPayload = toApiPayload(context);

        return (
          <UploadStep
            apiPayload={apiPayload}
            onBack={() => history.back()}
            onNext={async (file, payload) => {
              try {
                const responseData = await submitOnboardingMutation.mutateAsync(
                  { payload, file }
                );

                saveOnboardingFiltersToStorage({
                  직군: context.직군 || [],
                  직무: context.직무 || [],
                  경력: context.경력 || 0,
                  학력: context.학력 || "",
                  졸업상태: context.졸업상태 || "",
                  지역: context.지역 ?? null,
                });

                // API 응답 데이터를 완료 단계로 전달
                history.push("완료", {
                  recruitments: [],
                  userData: responseData.data,
                });
              } catch (error) {
                console.error("온보딩 제출 실패:", error);
                // 에러가 발생해도 다음 단계로 진행
                history.push("완료", {});
              }
            }}
          />
        );
      }}
      완료={({ context }) => (
        <SuccessStep
          name={context.userData?.name || "사용자"}
          recruitments={context.recruitments}
          onComplete={() => router.push("/")}
        />
      )}
    />
  );
}
