type ProgressIconProps = {
  progress: number; // 0~100
};

export default function ProgressIcon({ progress }: ProgressIconProps) {
  // 2번 로테이션을 위한 애니메이션 상태 계산
  const getAnimationState = () => {
    // 5-55%: 첫 번째 누적, 55-100%: 두 번째 누적
    const isFirstCycle = progress >= 10 && progress <= 55;
    const isSecondCycle = progress >= 55;

    let cycleProgress = 0;
    if (isFirstCycle) {
      cycleProgress = progress - 10; // 5%부터 시작
    } else if (isSecondCycle) {
      cycleProgress = progress - 60; // 55%부터 시작
    }

    // 각 원의 표시 상태 계산 (50% 구간을 3등분)
    const innerVisible = cycleProgress >= 10;
    const middleVisible = cycleProgress >= 16.67; // 50%의 1/3
    const outerVisible = cycleProgress >= 33.33; // 50%의 2/3

    return {
      inner: innerVisible ? 1 : 0,
      middle: middleVisible ? 1 : 0,
      outer: outerVisible ? 1 : 0,
    };
  };

  const animationState = getAnimationState();

  return (
    <div className="relative flex items-center justify-center">
      {/* 100%일 때 제일 큰 원 */}
      <svg
        width="160"
        height="160"
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute"
        style={{
          opacity: animationState.outer,
          transition: "all 0.3s ease-out",
        }}
      >
        <circle cx="80" cy="80" r="80" fill="#B6A1FF" fillOpacity="0.05" />
      </svg>

      {/* 70%일 때 중간 원 */}
      <svg
        width="124"
        height="124"
        viewBox="0 0 124 124"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute"
        style={{
          opacity: animationState.middle,
          transition: "all 0.3s ease-out",
        }}
      >
        <circle cx="62" cy="62" r="62" fill="#7951FF" fillOpacity="0.07" />
      </svg>

      {/* 40%일 때 작은 원 */}
      <svg
        width="77"
        height="77"
        viewBox="0 0 77 77"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute"
        style={{
          opacity: animationState.inner,
          transition: "all 0.3s ease-out",
        }}
      >
        <circle cx="38.5" cy="38.5" r="38" fill="#7951FF" fillOpacity="0.1" />
      </svg>

      {/* 항상 있는 아이콘 */}
      <svg
        width="46"
        height="46"
        viewBox="0 0 46 46"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M45.9334 23.9139C45.695 25.3686 44.4457 26.5567 41.947 28.933L27.6512 42.5283C25.4281 44.6426 24.3165 45.6997 22.9783 45.9262C22.5446 45.9995 22.1024 46.0083 21.6661 45.9522C20.3199 45.779 19.1667 44.7669 16.8604 42.7426L2.50673 30.1442C1.07888 28.8909 0.364955 28.2643 0.42984 27.6947C0.449877 27.5188 0.512295 27.3503 0.611799 27.2035C0.934024 26.728 1.8863 26.7112 3.79084 26.6776L22.5439 26.3462C22.9188 26.3396 23.1062 26.3363 23.2251 26.4346C23.2631 26.466 23.2952 26.504 23.32 26.5467C23.3973 26.6801 23.3631 26.8645 23.2947 27.2331L22.6359 30.7839C22.3525 32.3113 22.2108 33.0751 22.6448 33.3833C23.0787 33.6915 23.7532 33.3062 25.102 32.5354L38.4734 24.8946C39.7851 24.1451 40.4409 23.7703 40.4409 23.206C40.4409 22.6417 39.7851 22.2669 38.4734 21.5174L25.102 13.8766C23.7532 13.1058 23.0787 12.7204 22.6448 13.0287C22.2108 13.3369 22.3525 14.1006 22.6359 15.6281L23.294 19.1751C23.3624 19.5437 23.3966 19.7279 23.3193 19.8613C23.2946 19.904 23.2624 19.942 23.2244 19.9735C23.1056 20.0718 22.9183 20.0685 22.5435 20.062L3.79271 19.7377C1.88757 19.7048 0.934992 19.6883 0.612596 19.2129C0.51304 19.0661 0.450573 18.8976 0.430494 18.7217C0.365469 18.152 1.07953 17.5251 2.50765 16.2713L16.8603 3.6704C19.1666 1.64553 20.3198 0.633087 21.6662 0.459799C22.1025 0.403646 22.5447 0.412398 22.9784 0.485768C24.3168 0.712187 25.4285 1.76945 27.6519 3.88397L41.947 17.4786C44.4457 19.8549 45.695 21.043 45.9334 22.4977C46.0103 22.9667 46.0103 23.4449 45.9334 23.9139Z"
          fill="#7951FF"
        />
      </svg>
    </div>
  );
}
