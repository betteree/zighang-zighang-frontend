import { useFunnel } from "@use-funnel/browser";
import { useRouter } from "next/navigation";
import { useSubmitOnboarding } from "@/app/_api/user/useOnboarding";
import { mapJobGroup, mapJobCategory, mapEducationLevel, mapGraduationStatus, reverseMapJobGroup, reverseMapEducationLevel, reverseMapGraduationStatus } from "../_utils/mapping";
import { saveOnboardingData } from "../_utils/storage";
import { getOnboardingInfo } from "../_utils/onboardingCheck";
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

type ApiOnboardingPayload = {
  interestedJobs: string[];
  interestedJobCategories: string[];
  careerYear: number;
  educationLevel: string;
  graduationStatus: string;
  preferredRegion: string;
};


function toApiPayload(
  context: 지역입력,
  지역: string | null | undefined
): ApiOnboardingPayload {
  return {
    interestedJobs: context.직군.map(job => mapJobGroup(job)),
    interestedJobCategories: (context.직무 || []).map(job => mapJobCategory(job)),
    careerYear: context.경력 || 0,
    educationLevel: mapEducationLevel(context.학력 || ""),
    graduationStatus: mapGraduationStatus(context.졸업상태 || "졸업"),
    preferredRegion: 지역 || "",
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
            if (applyRecent) {
              // 최근 필터 적용 시 온보딩 데이터를 가져와서 첫 단계에 미리 설정
              const onboardingInfo = getOnboardingInfo();
              if (onboardingInfo) {
                // 매핑된 값들을 원래 UI 값으로 역변환
                const originalJobGroups = onboardingInfo.data.interestedJobs.map(reverseMapJobGroup);

                const originalEducation = reverseMapEducationLevel(onboardingInfo.data.educationLevel);
                const originalGraduationStatus = reverseMapGraduationStatus(onboardingInfo.data.graduationStatus);

                history.push("직군입력", (prev) => ({
                  ...prev,
                  최근필터적용: true,
                  직군: originalJobGroups,
                  직무: onboardingInfo.data.interestedJobCategories,
                  경력: onboardingInfo.data.careerYear,
                  학력: originalEducation,
                  졸업상태: originalGraduationStatus,
                  지역: onboardingInfo.data.preferredRegion,
                }));
                return;
              }
            }
            
            // 일반적인 온보딩 진행
            history.push("직군입력", (prev) => ({
              ...prev,
              최근필터적용: applyRecent,
            }));
          }}
        />
      )}
      직군입력={({ context, history }) => (
        <JobCategoryStep
          initialSelected={context.직군 || []}
          onNext={(직군) =>
            history.push("직무입력", (prev) => ({ ...prev, 직군 }))
          }
          onSkip={() =>
            history.push("모르겠어요", () => ({
              직군: ["미정"],
              직무: ["미정"],
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
            console.log("직무입력 onNext 전달값:", 직무);
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
          initialEducation={context.학력}
          initialGraduationStatus={context.졸업상태}
          onBack={() => history.back()}
          onNext={(학력, 졸업상태) =>
            history.push("지역입력", { ...context, 학력, 졸업상태 })
          }
        />
      )}
      지역입력={({ context, history }) => (
        <LocationStep
          initialRegion={context.지역 || undefined}
          onBack={() => history.back()}
          onSubmit={(지역) => {
            // 지역 정보를 context에 저장하고 파일업로드 단계로 이동
            history.push("파일업로드", (prev) => ({ ...prev, 지역 }));
          }}
        />
      )}
      파일업로드={({ context, history }) => {
        const apiPayload = toApiPayload(context, context.지역);

        return (
          <UploadStep
            apiPayload={apiPayload}
            isLoading={submitOnboardingMutation.isPending}
            onNext={async (file, payload) => {
              try {
                const responseData = await submitOnboardingMutation.mutateAsync({ payload, file });
                
                // 로컬 스토리지에 온보딩 데이터 저장
                saveOnboardingData({
                  interestedJobs: payload.interestedJobs,
                  interestedJobCategories: payload.interestedJobCategories,
                  careerYear: payload.careerYear,
                  educationLevel: payload.educationLevel,
                  graduationStatus: payload.graduationStatus,
                  preferredRegion: payload.preferredRegion,
                });
                
                // API 응답 데이터를 완료 단계로 전달
                history.push("완료", { 
                  recruitments: [],
                  userData: responseData.data 
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
