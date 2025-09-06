import Image from "next/image";
import React from "react";

interface StepContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function StepContainer({
  children,
  className = "",
}: StepContainerProps) {
  return (
    <div
      className={`min-h-screen bg-[#F1F1F5] flex flex-col items-center ${className}`}
    >
      <Image
        src="https://zighang.com/header_logo_new.svg"
        alt="logo"
        width={59}
        height={22}
        className="w-[59px] h-[22px] mt-[25px] mb-[33px]"
      />

      <div className="w-[815px] h-[500px] bg-white rounded-[16px]">{children}</div>
    </div>
  );
}
