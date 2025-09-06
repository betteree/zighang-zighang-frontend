export function ExperienceStep({
  onNext,
  onBack,
}: {
  onNext: (경력: number) => void;
  onBack: () => void;
}) {
  return (
    <div>
      경력 선택
      <button onClick={onBack}>이전</button>
      <button onClick={() => onNext(2)}>다음</button>
    </div>
  );
}


