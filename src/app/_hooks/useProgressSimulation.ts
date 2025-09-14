import { useState, useRef, useCallback } from "react";

type ProgressStatus = "loading" | "success" | "error";

interface UseProgressSimulationOptions {
  increment?: number;
  interval?: number;
  onComplete?: () => void;
}

export function useProgressSimulation(
  options: UseProgressSimulationOptions = {}
) {
  const { increment = 30, interval = 200, onComplete } = options;

  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<ProgressStatus>("loading");
  const timerRef = useRef<number | null>(null);

  const startSimulation = useCallback(() => {
    // 기존 타이머가 있다면 정리
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
    }

    // 상태 초기화
    setProgress(0);
    setStatus("loading");

    // 새로운 시뮬레이션 시작
    timerRef.current = window.setInterval(() => {
      setProgress((prevProgress) => {
        const nextProgress = Math.min(100, prevProgress + increment);

        if (nextProgress >= 100) {
          // 타이머 정리
          if (timerRef.current) {
            window.clearInterval(timerRef.current);
            timerRef.current = null;
          }

          // 성공 상태로 변경
          setStatus("success");

          // 완료 콜백 실행
          if (onComplete) {
            onComplete();
          }
        }

        return nextProgress;
      });
    }, interval);
  }, [increment, interval, onComplete]);

  const stopSimulation = useCallback(() => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const resetSimulation = useCallback(() => {
    stopSimulation();
    setProgress(0);
    setStatus("loading");
  }, [stopSimulation]);

  const setError = useCallback(() => {
    stopSimulation();
    setStatus("error");
  }, [stopSimulation]);

  // 컴포넌트 언마운트 시 타이머 정리
  const cleanup = useCallback(() => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  return {
    progress,
    status,
    startSimulation,
    stopSimulation,
    resetSimulation,
    setError,
    cleanup,
  };
}
