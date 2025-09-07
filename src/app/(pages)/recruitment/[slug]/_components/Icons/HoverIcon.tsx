import React from "react";

type IconProps = React.SVGProps<SVGSVGElement> & {
  variant:
    | "trash"
    | "plus"
    | "edit"
    | "right"
    | "maximize"
    | "more"
    | "minimize";
};

export default function HoverIcon({ variant, ...props }: IconProps) {
  switch (variant) {
    case "trash":
      return (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
          {...props}
        >
          <path
            d="M3.375 5.625H4.625H14.625"
            stroke="currentColor"
            strokeWidth={1.25}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13.5 5.625V14.5125C13.5 14.8407 13.3645 15.1555 13.1234 15.3875C12.8823 15.6196 12.5553 15.75 12.2143 15.75H5.78571C5.44472 15.75 5.1177 15.6196 4.87658 15.3875C4.63546 15.1555 4.5 14.8407 4.5 14.5125V5.625M6.42857 5.625V3.4875C6.42857 3.15929 6.56403 2.84453 6.80515 2.61246C7.04627 2.38038 7.37329 2.25 7.71429 2.25H10.2857C10.6267 2.25 10.9537 2.38038 11.1949 2.61246C11.436 2.84453 11.5714 3.15929 11.5714 3.4875V5.625"
            stroke="currentColor"
            strokeWidth={1.25}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7.875 9V12.375"
            stroke="currentColor"
            strokeWidth={1.25}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10.125 9V12.375"
            stroke="currentColor"
            strokeWidth={1.25}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "plus":
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
        >
          <path
            d="M12 7V17"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M17 12L7 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );

    case "edit":
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16.0423 5.06836C16.4656 5.06836 16.821 5.21119 17.1078 5.49793L18.502 6.89303C18.7887 7.17974 18.9324 7.53448 18.9324 7.95763C18.9324 8.38078 18.7887 8.73552 18.502 9.02223L9.17241 18.3519L5.83408 19.0478C5.56979 19.1064 5.34199 19.0397 5.15115 18.8488C4.96044 18.6581 4.89448 18.4309 4.95301 18.1667L5.64812 14.8276L14.9778 5.49793C15.2644 5.21137 15.6193 5.06841 16.0423 5.06836ZM16.0464 6.30267C15.9745 6.3027 15.9149 6.32702 15.8669 6.37495L7.36398 14.869L9.131 16.636L17.6258 8.13384C17.6738 8.08589 17.6973 8.0255 17.6973 7.95357C17.6973 7.88155 17.6738 7.82122 17.6258 7.77329L16.2267 6.37495C16.1787 6.32699 16.1185 6.30267 16.0464 6.30267Z"
            fill="currentColor"
          />
        </svg>
      );

    case "right":
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
        >
          <path
            d="M8.99953 8.12441L12.8795 12.0044L8.99953 15.8844C8.60953 16.2744 8.60953 16.9044 8.99953 17.2944C9.38953 17.6844 10.0195 17.6844 10.4095 17.2944L14.9995 12.7044C15.3895 12.3144 15.3895 11.6844 14.9995 11.2944L10.4095 6.70442C10.0195 6.31441 9.38953 6.31441 8.99953 6.70442C8.61953 7.09442 8.60953 7.73441 8.99953 8.12441Z"
            fill="currentColor"
          />
        </svg>
      );

    case "maximize":
      return (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
          {...props}
        >
          <path
            d="M10 2H14V6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6 14H2V10"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14 2L9 7"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2 14L7 9"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "more":
      return (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
          {...props}
        >
          <path
            d="M9.9974 10.8327C10.4576 10.8327 10.8307 10.4596 10.8307 9.99935C10.8307 9.53911 10.4576 9.16602 9.9974 9.16602C9.53716 9.16602 9.16406 9.53911 9.16406 9.99935C9.16406 10.4596 9.53716 10.8327 9.9974 10.8327Z"
            stroke="currentColor"
            strokeWidth="1.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9.9974 5.00065C10.4576 5.00065 10.8307 4.62756 10.8307 4.16732C10.8307 3.70708 10.4576 3.33398 9.9974 3.33398C9.53716 3.33398 9.16406 3.70708 9.16406 4.16732C9.16406 4.62756 9.53716 5.00065 9.9974 5.00065Z"
            stroke="currentColor"
            strokeWidth="1.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9.9974 16.6667C10.4576 16.6667 10.8307 16.2936 10.8307 15.8333C10.8307 15.3731 10.4576 15 9.9974 15C9.53716 15 9.16406 15.3731 9.16406 15.8333C9.16406 16.2936 9.53716 16.6667 9.9974 16.6667Z"
            stroke="currentColor"
            strokeWidth="1.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "minimize":
      return (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
          {...props}
        >
          <path
            d="M13 7H9V3"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3 9H7V13"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 7L14 2"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7 9L2 14"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}
