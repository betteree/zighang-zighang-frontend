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
      className={`min-h-screen md:bg-[#F1F1F5] flex flex-col items-center ${className}`}
    >
      <Image
        src="https://zighang.com/header_logo_new.svg"
        alt="logo"
        width={59}
        height={22}
        className="hidden md:block md:w-[59px] md:h-[22px] md:mt-[25px] md:mb-[33px]"
      />

      <div className="w-full h-screen md:w-[815px] md:h-[500px] bg-white md:rounded-[16px]">
        {children}
      </div>
    </div>
  );
}
