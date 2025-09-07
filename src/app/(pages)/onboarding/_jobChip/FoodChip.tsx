interface FoodChipProps {
  isSelected?: boolean;
  width?: number;
  height?: number;
  className?: string;
  backgroundless?: boolean;
}

export function FoodChip({
  isSelected = false,
  width = 28,
  height = 28,
  className,
  backgroundless = false,
}: FoodChipProps) {
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
        d="M10.4997 15.11L12.858 12.7517L7.69968 7.60171C7.29968 7.20171 6.60801 7.31004 6.35801 7.82671C5.76634 9.06837 5.98301 10.5934 7.00801 11.6267L10.4997 15.11ZM16.1497 13.6017C17.4247 14.1934 19.2163 13.7767 20.5413 12.4517C22.133 10.86 22.4413 8.57671 21.2163 7.35171C19.9997 6.13504 17.7163 6.43504 16.1163 8.02671C14.7913 9.35171 14.3747 11.1434 14.9663 12.4184L7.41634 19.9684C7.09134 20.2934 7.09134 20.8184 7.41634 21.1434C7.74134 21.4684 8.26634 21.4684 8.59134 21.1434L13.7497 16.0017L18.8997 21.1517C19.2247 21.4767 19.7497 21.4767 20.0747 21.1517C20.3997 20.8267 20.3997 20.3017 20.0747 19.9767L14.9247 14.8267L16.1497 13.6017Z"
        fill={pathColor}
      />
    </svg>
  );
}
