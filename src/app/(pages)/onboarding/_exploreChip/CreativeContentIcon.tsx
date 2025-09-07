interface CreativeContentIconProps extends React.SVGProps<SVGSVGElement> {
  isSelected?: boolean;
}

export function CreativeContentIcon({
  isSelected = false,
  ...props
}: CreativeContentIconProps) {
  return (
    <svg
      viewBox="0 0 51 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className={
        isSelected
          ? "[filter:drop-shadow(0_0_8px_rgba(255,235,169,0.85))_drop-shadow(0_0_16px_rgba(255,235,169,0.45))]"
          : ""
      }
      {...props}
    >
      <g clipPath="url(#clip0_2920_13872)">
        <rect x="0.152588" width="50" height="50" rx="8.33333" fill="#FFEBA9" />
        <g filter="url(#filter0_d_2920_13872)">
          <path
            d="M25.0002 13.0044C29.9706 13.0045 34.0002 17.034 34.0002 22.0044C34.0001 25.1898 32.343 27.986 29.8459 29.5854V30.1421C29.8459 31.1277 29.0464 31.9272 28.0608 31.9272H22.3997C21.414 31.9272 20.6145 31.1277 20.6145 30.1421V29.8618C17.8623 28.3225 16.0003 25.3819 16.0002 22.0044C16.0002 17.0339 20.0298 13.0044 25.0002 13.0044Z"
            fill="white"
          />
        </g>
        <rect
          x="21.1725"
          y="33.2158"
          width="8.27568"
          height="3.10338"
          rx="1"
          fill="#FFAB00"
        />
        <rect
          x="21.1725"
          y="37.354"
          width="8.27568"
          height="3.10338"
          rx="1"
          fill="#FFAB00"
        />
        <path
          d="M24.7698 8V10.6769"
          stroke="white"
          strokeWidth="1.33846"
          strokeLinecap="round"
        />
        <path
          d="M12.1799 15.2461L14.4982 16.5846"
          stroke="white"
          strokeWidth="1.33846"
          strokeLinecap="round"
        />
        <path
          d="M17.0002 10L18.3387 12.3183"
          stroke="white"
          strokeWidth="1.33846"
          strokeLinecap="round"
        />
        <path
          d="M37.3596 15.2461L35.0413 16.5846"
          stroke="white"
          strokeWidth="1.33846"
          strokeLinecap="round"
        />
        <path
          d="M32.3387 10L31.0003 12.3183"
          stroke="white"
          strokeWidth="1.33846"
          strokeLinecap="round"
        />
        <path
          d="M25.0247 18.4635C25.1744 18.0029 25.8261 18.0029 25.9758 18.4635L26.6228 20.4549C26.6898 20.6609 26.8817 20.8004 27.0983 20.8004H29.1922C29.6766 20.8004 29.878 21.4202 29.4861 21.7049L27.7921 22.9357C27.6169 23.063 27.5436 23.2887 27.6105 23.4947L28.2575 25.4861C28.4072 25.9467 27.88 26.3298 27.4881 26.0451L25.7941 24.8143C25.6189 24.687 25.3816 24.687 25.2064 24.8143L23.5124 26.0451C23.1205 26.3298 22.5933 25.9467 22.743 25.4861L23.39 23.4947C23.4569 23.2887 23.3836 23.063 23.2084 22.9357L21.5144 21.7049C21.1225 21.4202 21.3239 20.8004 21.8083 20.8004H23.9021C24.1188 20.8004 24.3107 20.6609 24.3777 20.4549L25.0247 18.4635Z"
          fill="#FFBA2D"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_2920_13872"
          x="-3.99976"
          y="-6.99561"
          width="58"
          height="58.9229"
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
            values="0 0 0 0 1 0 0 0 0 0.815921 0 0 0 0 0.177058 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_2920_13872"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_2920_13872"
            result="shape"
          />
        </filter>
        <clipPath id="clip0_2920_13872">
          <rect x="0.152588" width="50" height="50" rx="8.33333" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
