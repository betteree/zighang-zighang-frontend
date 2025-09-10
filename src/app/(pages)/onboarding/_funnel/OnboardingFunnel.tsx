import { useFunnel } from "@use-funnel/browser";

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
  jobCategory: string[];
  job: string[];
  experience: number[];
  education: string;
  location: string[];
};

function toApiPayload(
  context: 지역입력,
  지역: string | null
): ApiOnboardingPayload {
  return {
    jobCategory: context.직군,
    job: context.직무,
    experience: [context.경력],
    education: context.학력,
    location: [지역],
  } as ApiOnboardingPayload;
}

export default function OnboardingFunnel() {
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
            history.push("직군입력", (prev) => ({ ...prev, 최근필터적용: applyRecent }));
          }}
        />
      )}
      직군입력={({ history }) => (
        <JobCategoryStep
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
          onBack={() => history.back()}
          onNext={(직무) => {
            console.log("직무입력 onNext 전달값:", 직무);
            history.push("경력입력", (prev) => ({ ...prev, 직무 }));
          }}
        />
      )}
      경력입력={({ context, history }) => {
        console.log("경력입력 context.직무:", context.직무);
        return (
          <ExperienceStep
            jobs={context.직무}
            onBack={() => history.back()}
            onNext={(경력) => history.push("학력입력", { ...context, 경력 })}
          />
        );
      }}
      학력입력={({ context, history }) => (
        <EducationStep
          onBack={() => history.back()}
          onNext={(학력) => history.push("지역입력", { ...context, 학력 })}
        />
      )}
      지역입력={({ context, history }) => (
        <LocationStep
          onBack={() => history.back()}
          onSubmit={(지역) => {
            const apiPayload = toApiPayload(context, 지역);
            console.log("API 전송 payload:", apiPayload);
            // TODO: 제출 API 호출 (e.g., await postOnboarding(apiPayload))
            history.push("파일업로드", {});
          }}
        />
      )}
      파일업로드={({ history }) => (
        <UploadStep onNext={() => history.push("완료", {})} />
      )}
      완료={() => <SuccessStep name="김나은" />}
    />
  );
}
