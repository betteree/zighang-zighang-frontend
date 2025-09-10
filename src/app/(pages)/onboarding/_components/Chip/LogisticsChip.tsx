// LogisticsChip.tsx - 운송배송 칩 컴포넌트
interface LogisticsChipProps {
  isSelected?: boolean;
  width?: number;
  height?: number;
  className?: string;
  backgroundless?: boolean;
}

export function LogisticsChip({
  isSelected = false,
  width = 28,
  height = 28,
  className,
  backgroundless = false,
}: LogisticsChipProps) {
  const backgroundColor = isSelected ? "#E4F1FF" : "#F1F1F5";
  const pathColor = isSelected ? "#0058B6" : "#AAAAAD";

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {!backgroundless && (
        <rect width="28" height="28" rx="14" fill={backgroundColor} />
      )}
      <path
        d="M22.2485 10.575L21.3735 7.76667C21.1901 7.01667 20.5401 6.5 19.7818 6.5H8.20679C7.45679 6.5 6.79846 7.025 6.62346 7.76667L5.74846 10.575C5.36512 12.2167 6.45679 13.1667 6.49846 13.2167V19.8333C6.49846 20.75 7.24846 21.5 8.16512 21.5H19.8318C20.7485 21.5 21.4985 20.75 21.4985 19.8333V13.2167C22.4318 12.2833 22.4068 11.2083 22.2485 10.575ZM14.8318 8.16667H16.4651L16.9151 11.1C16.9901 11.6917 16.5901 12.3333 15.8485 12.3333C15.2901 12.3333 14.8318 11.8417 14.8318 11.2417V8.16667ZM9.36512 11.3833C9.29846 11.925 8.86512 12.3333 8.35679 12.3333C7.58179 12.3333 7.23179 11.525 7.36512 10.9667L8.20679 8.16667H9.84845L9.36512 11.3833ZM13.1651 11.2417C13.1651 11.8417 12.7068 12.3333 12.0901 12.3333C11.4651 12.3333 11.0068 11.75 11.0735 11.1L11.5318 8.16667H13.1651V11.2417ZM19.6401 12.3333C19.1318 12.3333 18.6901 11.925 18.6318 11.3833L18.1485 8.16667L19.7568 8.15833L20.6318 10.9667C20.7651 11.525 20.4235 12.3333 19.6401 12.3333Z"
        fill={pathColor}
      />
    </svg>
  );
}
