interface EduChipProps {
  isSelected?: boolean;
  width?: number;
  height?: number;
  className?: string;
  backgroundless?: boolean;
}

export function EduChip({
  isSelected = false,
  width = 28,
  height = 28,
  className,
  backgroundless = false,
}: EduChipProps) {
  const backgroundColor = isSelected ? "#FFF2EC" : "#F1F1F5";
  const pathColor = isSelected ? "#EF5108" : "#AAAAAD";

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
        d="M7.71149 14.98V17.3216C7.71149 17.93 8.04482 18.4966 8.57816 18.7883L12.7448 21.0633C13.2448 21.3383 13.8448 21.3383 14.3448 21.0633L18.5115 18.7883C19.0448 18.4966 19.3782 17.93 19.3782 17.3216V14.98L14.3448 17.73C13.8448 18.005 13.2448 18.005 12.7448 17.73L7.71149 14.98ZM12.7448 6.92998L5.71982 10.7633C5.14482 11.08 5.14482 11.9133 5.71982 12.23L12.7448 16.0633C13.2448 16.3383 13.8448 16.3383 14.3448 16.0633L21.0448 12.405V17.33C21.0448 17.7883 21.4198 18.1633 21.8782 18.1633C22.3365 18.1633 22.7115 17.7883 22.7115 17.33V11.9883C22.7115 11.68 22.5448 11.405 22.2782 11.255L14.3448 6.92998C13.8448 6.66331 13.2448 6.66331 12.7448 6.92998Z"
        fill={pathColor}
      />
    </svg>
  );
}
