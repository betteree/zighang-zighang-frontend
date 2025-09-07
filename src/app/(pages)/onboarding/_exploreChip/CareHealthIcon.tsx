interface CareHealthIconProps extends React.SVGProps<SVGSVGElement> {
  isSelected?: boolean;
}

export function CareHealthIcon({
  isSelected = false,
  ...props
}: CareHealthIconProps) {
  return (
    <svg
      viewBox="0 0 51 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={
        isSelected
          ? "[filter:drop-shadow(0_0_8px_rgba(255,224,216,0.85))_drop-shadow(0_0_16px_rgba(255,224,216,0.45))]"
          : ""
      }
      {...props}
    >
      <g clipPath="url(#clip0_2920_13865)">
        <rect x="0.459717" width="50" height="50" rx="8.33333" fill="#FFE0D8" />
        <g>
          <rect
            x="9.05823"
            y="20.4551"
            width="17.1429"
            height="30"
            rx="8.57143"
            transform="rotate(-45 9.05823 20.4551)"
            fill="white"
          />
          <path
            d="M15.1191 26.516C11.7718 23.1686 11.7718 17.7415 15.1191 14.3942C18.4665 11.0468 23.8936 11.0468 27.241 14.3942L31.7867 18.9398L19.6648 31.0617L15.1191 26.516Z"
            fill="#F17049"
          />
        </g>
      </g>
      <defs>
        <filter
          id="glow"
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter
          id="filter0_d_2920_13865"
          x="-7.39136"
          y="-8.11621"
          width="66.2343"
          height="66.2339"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="10" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.971586 0 0 0 0 0.642812 0 0 0 0 0.543415 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_2920_13865"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_2920_13865"
            result="shape"
          />
        </filter>

        <clipPath id="clip0_2920_13865">
          <rect x="0.459717" width="50" height="50" rx="8.33333" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
