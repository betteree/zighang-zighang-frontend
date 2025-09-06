import React from "react";

interface ArrowLeftProps {
  width?: number;
  height?: number;
  className?: string;
}

export function ArrowLeft({ width = 24, height = 25, className = "" }: ArrowLeftProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 25"
      fill="none"
      className={className}
    >
      <path
        d="M15.0005 16.3755L11.1205 12.4955L15.0005 8.61546C15.3905 8.22546 15.3905 7.59546 15.0005 7.20546C14.6105 6.81546 13.9805 6.81546 13.5905 7.20546L9.00047 11.7955C8.61047 12.1855 8.61047 12.8155 9.00047 13.2055L13.5905 17.7955C13.9805 18.1855 14.6105 18.1855 15.0005 17.7955C15.3805 17.4055 15.3905 16.7655 15.0005 16.3755Z"
        fill="currentColor"
      />
    </svg>
  );
}
