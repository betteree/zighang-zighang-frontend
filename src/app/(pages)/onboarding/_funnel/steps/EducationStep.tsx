export function EducationStep({
  onNext,
  onBack,
}: {
  onNext: (학력: string) => void;
  onBack: () => void;
}) {
  return (
    <div>
      학력 선택
      <button onClick={onBack}>이전</button>
      <button onClick={() => onNext("학사")}>다음</button>
    </div>
  );
}


