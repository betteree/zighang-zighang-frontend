import { useFunnel } from "@use-funnel/browser";

import {
  JobCategoryStep,
  JobStep,
  ExperienceStep,
  EducationStep,
  LocationStep,
} from "./steps";
import type {
  직군입력,
  직무입력,
  경력입력,
  학력입력,
  지역입력,
  파일업로드,
  완료,
} from "../_types/context";
import { UploadStep } from "./upload/UploadStep";

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
    직군입력: 직군입력;
    직무입력: 직무입력;
    경력입력: 경력입력;
    학력입력: 학력입력;
    지역입력: 지역입력;
    파일업로드: 파일업로드;
    완료: 완료;
  }>({
    id: "onboarding-funnel",
    initial: {
      step: "직군입력",
      context: {},
    },
  });
  return (
    <funnel.Render
      직군입력={({ history }) => (
        <JobCategoryStep
          onNext={(직군) =>
            history.push("직무입력", (prev) => ({ ...prev, 직군 }))
          }
          onSkip={() =>
            history.push("경력입력", () => ({ 직군: ["미정"], 직무: ["미정"] }))
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
      완료={() => (
        <div className="p-6 text-center">
          <h2 className="text-lg font-semibold text-emerald-600">
            🎉 모든 과정이 완료되었습니다!
          </h2>
        </div>
      )}
    />
  );
}
