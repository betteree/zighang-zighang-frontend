import React from "react";

type IconProps = React.SVGProps<SVGSVGElement> & {
  variant: "bookmark";
};

export default function Icon({ variant, ...props }: IconProps) {
  switch (variant) {
    case "bookmark":
      return (
        <svg
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
        >
          <path
            d="M19.8333 3.5H8.16659C6.88325 3.5 5.83325 4.55 5.83325 5.83333V24.5L13.9999 21L22.1666 24.5V5.83333C22.1666 4.55 21.1166 3.5 19.8333 3.5Z"
            fill="currentColor"
          />
        </svg>
      );
  }
}
