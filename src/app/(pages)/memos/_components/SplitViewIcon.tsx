interface SplitViewIconProps {
  isSelected?: boolean;
  width?: number;
  height?: number;
}

export default function SplitViewIcon({
  isSelected = false,
  width = 24,
  height = 24,
}: SplitViewIconProps) {
  const strokeColor = isSelected ? "#7951FF" : "#C5C5C8";
  const fillColor = isSelected ? "#7951FF" : "#C5C5C8";
  const maskId = isSelected
    ? "path-1-inside-1_3940_9142"
    : "path-1-inside-1_3940_8679";

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="cursor-pointer"
    >
      <mask id={maskId} fill="white">
        <rect x="2" y="2" width="20" height="20" rx="1" />
      </mask>
      <rect
        x="2"
        y="2"
        width="20"
        height="20"
        rx="1"
        stroke={strokeColor}
        strokeWidth="4"
        mask={`url(#${maskId})`}
      />
      <rect
        x="11.1406"
        y="6"
        width="12"
        height="5.14242"
        rx="1"
        transform="rotate(90 11.1406 6)"
        fill={fillColor}
      />
      <rect
        x="18"
        y="6"
        width="12"
        height="5.14242"
        rx="1"
        transform="rotate(90 18 6)"
        fill={fillColor}
      />
    </svg>
  );
}
