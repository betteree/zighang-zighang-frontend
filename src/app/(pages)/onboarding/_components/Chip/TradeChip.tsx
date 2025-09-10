// TradeChip.tsx - 무역 칩 컴포넌트
interface TradeChipProps {
  isSelected?: boolean;
  width?: number;
  height?: number;
  className?: string;
  backgroundless?: boolean;
}

export function TradeChip({
  isSelected = false,
  width = 28,
  height = 28,
  className,
  backgroundless = false,
}: TradeChipProps) {
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
        d="M22.3334 19.7719V10.8969C22.3334 10.2136 21.9167 9.60527 21.2834 9.34694L14.6167 6.68027C14.2167 6.52194 13.7751 6.52194 13.3751 6.68027L6.70841 9.34694C6.08341 9.60527 5.66675 10.2219 5.66675 10.8969V19.7719C5.66675 20.6886 6.41675 21.4386 7.33341 21.4386H9.83342V13.9386H18.1667V21.4386H20.6667C21.5834 21.4386 22.3334 20.6886 22.3334 19.7719ZM13.1667 19.7719H11.5001V21.4386H13.1667V19.7719ZM14.8334 17.2719H13.1667V18.9386H14.8334V17.2719ZM16.5001 19.7719H14.8334V21.4386H16.5001V19.7719Z"
        fill={pathColor}
      />
    </svg>
  );
}
