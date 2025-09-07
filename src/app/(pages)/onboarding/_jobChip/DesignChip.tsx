interface DesignChipProps {
  isSelected?: boolean;
  width?: number;
  height?: number;
  className?: string;
  backgroundless?: boolean;
}

export function DesignChip({
  isSelected = false,
  width = 28,
  height = 28,
  className,
  backgroundless = false,
}: DesignChipProps) {
  const backgroundColor = isSelected ? "#F7F1FB" : "#F1F1F5";
  const pathColor = isSelected ? "url(#paint0_linear_2218_13946)" : "#AAAAAD";
  const pencilColor = isSelected ? "url(#paint1_linear_2218_13946)" : "#AAAAAD";

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
        d="M17.5324 13.5912L18.8407 12.2829L15.7157 9.1579L14.4074 10.4662L10.9574 7.02456C10.3074 6.37456 9.24902 6.37456 8.59902 7.02456L7.01569 8.6079C6.36569 9.2579 6.36569 10.3162 7.01569 10.9662L10.4574 14.4079L6.62402 18.2496C6.54069 18.3329 6.49902 18.4329 6.49902 18.5496V21.0829C6.49902 21.3162 6.68236 21.4996 6.91569 21.4996H9.44902C9.55736 21.4996 9.66569 21.4579 9.74069 21.3746L13.5907 17.5246L17.0324 20.9662C18.1324 22.0662 19.3324 21.0246 19.3907 20.9662L20.974 19.3829C21.624 18.7329 21.624 17.6746 20.974 17.0246L17.5324 13.5912ZM11.649 13.2246L8.19902 9.7829L9.77402 8.19956L10.8324 9.2579L10.4407 9.66623C10.1157 9.99123 10.1157 10.5162 10.4407 10.8412C10.7657 11.1662 11.2907 11.1662 11.6157 10.8412L12.0157 10.4412L13.224 11.6496L11.649 13.2246ZM18.2157 19.7996L14.774 16.3579L16.3574 14.7746L17.5657 15.9829L17.1657 16.3829C16.8407 16.7079 16.8407 17.2329 17.1657 17.5579C17.4907 17.8829 18.0157 17.8829 18.3407 17.5579L18.7407 17.1579L19.799 18.2162L18.2157 19.7996Z"
        fill={pathColor}
      />
      <path
        d="M21.2574 9.86623C21.5824 9.54123 21.5824 9.01623 21.2574 8.69123L19.3074 6.74123C18.9157 6.34956 18.374 6.49956 18.1324 6.74123L16.6074 8.26623L19.7324 11.3912L21.2574 9.86623Z"
        fill={pencilColor}
      />
      {isSelected && (
        <defs>
          <linearGradient
            id="paint0_linear_2218_13946"
            x1="14.0001"
            y1="6.50049"
            x2="14.0001"
            y2="21.4996"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#6F00B6" />
            <stop offset="1" stopColor="#6F00B6" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_2218_13946"
            x1="14.0001"
            y1="6.50049"
            x2="14.0001"
            y2="21.4996"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#6F00B6" />
            <stop offset="1" stopColor="#6F00B6" />
          </linearGradient>
        </defs>
      )}
    </svg>
  );
}
