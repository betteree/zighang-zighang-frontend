"use client";

import React from "react";
import { ExperienceWheel } from "./ExperienceWheel";
import { RecruitCountBadge } from "./RecruitCountBadge";
import { InfoCircle } from "../../_components/Icons/InfoCircle";
import { InfoTooltip } from "../../_components/Tooltip/InfoTooltip";
import {
  StepContainer,
  StepHeader,
  StepActions,
  ActionButton,
} from "../../_components";
const MIN_EXPERIENCE_YEARS = 0; // 0=신입
const DEFAULT_EXPERIENCE_YEARS = 1; // 초기 표시 값
const MAX_EXPERIENCE_YEARS = 10; // 10년+

type Props = {
  onNext: (경력: number) => void;
  onBack: () => void;
  jobs?: string[]; // 직무 키 배열
  initialExperience?: number; // 초기 경력값
};

export function ExperienceStep({
  onNext,
  onBack,
  jobs = [],
  initialExperience,
}: Props) {
  const [selectedYears, setSelectedYears] = React.useState<number>(
    initialExperience ?? DEFAULT_EXPERIENCE_YEARS
  );

  // 화면(휠 바깥) 스와이프로 연차 변경을 위한 refs
  const pickerAreaRef = React.useRef<HTMLDivElement | null>(null);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const touchStartYRef = React.useRef<number | null>(null);
  const accumDeltaRef = React.useRef(0);
  const lastTickRef = React.useRef<number>(0);
  const SWIPE_STEP_PX = 220; // 1년 변화 기준 거리
  const SWIPE_COOLDOWN_MS = 240; // 연속 변화 쿨다운

  // 추가: 너무 작은/큰 움직임 무시·완화
  const DEADZONE_PX = 18; // 이 값 미만은 무시해서 미세 흔들림 차단
  const MAX_DELTA_PER_FRAME = 40; // 프레임당 최대 반영 이동량(스파이크 캡)
  const FRICTION = 0.7; // 스텝 처리 후 누적치에 마찰(잔떨림 완화)

  // 마우스 드래그용
  const pointerStartYRef = React.useRef<number | null>(null);
  const pointerActiveRef = React.useRef(false);
  const stopPointerDrag = (e?: React.PointerEvent<HTMLDivElement>) => {
    try {
      e?.currentTarget?.releasePointerCapture?.(
        (e as React.PointerEvent<HTMLDivElement>)?.pointerId
      );
    } catch {}
    pointerActiveRef.current = false;
    pointerStartYRef.current = null;
    accumDeltaRef.current = 0;
  };

  // 스와이프/드래그 공통 증감 처리
  const adjustByDelta = (deltaY: number) => {
    const now = performance.now();
    if (now - lastTickRef.current < SWIPE_COOLDOWN_MS) return;

    // 1) 아주 작은 흔들림은 무시 (데드존)
    if (Math.abs(deltaY) < DEADZONE_PX) return;

    // 2) 갑작스런 큰 값은 캡 (트랙패드/모바일 스파이크 완화)
    if (deltaY > MAX_DELTA_PER_FRAME) deltaY = MAX_DELTA_PER_FRAME;
    if (deltaY < -MAX_DELTA_PER_FRAME) deltaY = -MAX_DELTA_PER_FRAME;

    accumDeltaRef.current += deltaY;

    while (accumDeltaRef.current <= -SWIPE_STEP_PX) {
      let stepped = false;
      setSelectedYears((y) => {
        if (y >= MAX_EXPERIENCE_YEARS) return y;
        stepped = true;
        return Math.min(MAX_EXPERIENCE_YEARS, y + 1);
      });
      if (!stepped) break;
      accumDeltaRef.current += SWIPE_STEP_PX;
      lastTickRef.current = now;

      accumDeltaRef.current *= FRICTION;
    }
    while (accumDeltaRef.current >= SWIPE_STEP_PX) {
      let stepped = false;
      setSelectedYears((y) => {
        if (y <= MIN_EXPERIENCE_YEARS) return y;
        stepped = true;
        return Math.max(MIN_EXPERIENCE_YEARS, y - 1);
      });
      if (!stepped) break;
      accumDeltaRef.current -= SWIPE_STEP_PX;
      lastTickRef.current = now;
      accumDeltaRef.current *= FRICTION;
    }
  };

  const handleWheelChange = (value: number) => setSelectedYears(value);

  const canProceed = true; // 기본값 선택(1년)으로 바로 진행 가능
  const handleNext = () => {
    onNext(selectedYears);
  };

  const handleButtonClick = () => {
    handleNext();
  };

  const onTouchStartPage: React.TouchEventHandler<HTMLDivElement> = (e) => {
    if (
      pickerAreaRef.current &&
      pickerAreaRef.current.contains(e.target as Node)
    )
      return;
    // 버튼 영역에서는 터치 이벤트 무시
    if ((e.target as HTMLElement).closest("button")) return;
    touchStartYRef.current = e.touches[0].clientY;
    accumDeltaRef.current = 0;
    lastTickRef.current = performance.now();
  };
  const onTouchMovePage: React.TouchEventHandler<HTMLDivElement> = (e) => {
    if (
      pickerAreaRef.current &&
      pickerAreaRef.current.contains(e.target as Node)
    )
      return;
    // 버튼 영역에서는 터치 이벤트 무시
    if ((e.target as HTMLElement).closest("button")) return;
    if (touchStartYRef.current == null) return;
    const currentY = e.touches[0].clientY;
    const dy = currentY - touchStartYRef.current;
    touchStartYRef.current = currentY;
    adjustByDelta(dy);
  };
  const onTouchEndPage: React.TouchEventHandler<HTMLDivElement> = () => {
    touchStartYRef.current = null;
    accumDeltaRef.current = 0;
  };

  // 마우스 드래그로 연차 변경 (휠 내부 제외)
  const onPointerDownPage: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (e.pointerType === "touch") return; // 터치는 기존 핸들러 사용
    // 버튼 영역에서는 포인터 이벤트 무시
    if ((e.target as HTMLElement).closest("button")) return;
    // 마우스 드래그: 휠 영역 포함 전체에서 동작
    try {
      e.currentTarget.setPointerCapture?.(e.pointerId);
    } catch {}
    e.preventDefault();
    containerRef.current = e.currentTarget;
    pointerActiveRef.current = true;
    pointerStartYRef.current = e.clientY;
    accumDeltaRef.current = 0;
    lastTickRef.current = performance.now();
  };
  const onPointerMovePage: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (!pointerActiveRef.current || e.pointerType === "touch") return;
    // 영역 이탈 시 드래그 종료
    const rect = containerRef.current?.getBoundingClientRect();
    if (
      rect &&
      (e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom)
    ) {
      stopPointerDrag(e);
      return;
    }
    const currentY = e.clientY;
    const dy = currentY - (pointerStartYRef.current ?? currentY);
    pointerStartYRef.current = currentY;
    adjustByDelta(dy);
  };
  const onPointerUpPage: React.PointerEventHandler<HTMLDivElement> = (e) => {
    stopPointerDrag(e);
  };
  const onPointerLeavePage: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (!pointerActiveRef.current) return;
    stopPointerDrag(e);
  };
  const onPointerCancelPage: React.PointerEventHandler<HTMLDivElement> = (
    e
  ) => {
    if (!pointerActiveRef.current) return;
    stopPointerDrag(e);
  };

  return (
    <StepContainer>
      <StepHeader
        title="가고 싶은 직군의 경력이 어떻게 되세요?"
        subTitle={
          <InfoTooltip
            content={
              <div className="text-Body2-12r whitespace-pre-wrap leading-[17px] w-[252px]">
                총 경력 연차는 지금까지 근무한 모든 기간의 합
                (정규직·계약직·프리랜서 포함, 인턴)이며, 추후 언제든 수정할 수
                있습니다.
              </div>
            }
          >
            <InfoCircle />
          </InfoTooltip>
        }
        stepNumber={2}
        totalSteps={4}
        onBack={onBack}
      />
      <div className="text-Heading2-20sb md:hidden flex flex-col text-black p-7 pb-0">
        가고 싶은 직군의 <br />
        <span className="flex">
          <p className="text-violet-500">경력</p>이 어떻게 되세요?
          <InfoTooltip
            content={
              <div className="text-Body2-12r whitespace-pre-wrap leading-[17px] w-[252px]">
                총 경력 연차는 지금까지 근무한 모든 기간의 합
                (정규직·계약직·프리랜서 포함, 인턴)이며, 추후 언제든 수정할 수
                있습니다.
              </div>
            }
          >
            <InfoCircle />
          </InfoTooltip>
        </span>
      </div>
      <div
        className=" touch-pan-y w-full flex flex-col items-center md:h-[calc(500px-55px)] select-none"
        onTouchStart={onTouchStartPage}
        onTouchMove={onTouchMovePage}
        onTouchEnd={onTouchEndPage}
        onPointerDown={onPointerDownPage}
        onPointerMove={onPointerMovePage}
        onPointerUp={onPointerUpPage}
        onPointerLeave={onPointerLeavePage}
        onPointerCancel={onPointerCancelPage}
        ref={containerRef}
      >
        {/* 선택 영역 */}
        <div className="flex flex-col items-center justify-center flex-1 relative w-full">
          <div className="flex items-center gap-2 mb-10 md:mb-5 mt-[108px]">
            <span className="text-Heading2-20sb text-black">내 경력은</span>

            <ExperienceWheel
              ref={pickerAreaRef}
              selected={selectedYears}
              onChange={handleWheelChange}
            />
            <span className="text-Heading2-20sb text-black">이다.</span>
          </div>

          <RecruitCountBadge years={selectedYears} jobs={jobs} />
        </div>

        {/* 하단 액션 */}
        <StepActions className="w-full md:w-auto md:h-full md:items-end md:pb-[30px]">
          <ActionButton
            onClick={handleButtonClick}
            state={canProceed ? "abled" : "disabled"}
          >
            다음
          </ActionButton>
        </StepActions>
      </div>
    </StepContainer>
  );
}
