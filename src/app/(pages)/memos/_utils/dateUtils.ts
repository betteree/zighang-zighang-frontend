/**
 * D-Day 계산 유틸 함수
 * @param endDate - 마감일 (ISO 문자열 또는 Date 객체)
 * @returns D-Day 문자열 (예: "D-5", "D-1", "D+1")
 */
export function calculateDDay(endDate: string | Date): string {
  const end = new Date(endDate);
  const today = new Date();

  // 시간을 00:00:00으로 맞춰서 날짜만 비교
  today.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  const diffTime = end.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays > 0) {
    return `D-${diffDays}`;
  } else if (diffDays === 0) {
    return "D-Day";
  } else {
    return `D+${-diffDays}`;
  }
}
