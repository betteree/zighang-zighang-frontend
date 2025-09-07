import React from "react";

interface StepActionsProps {
  children: React.ReactNode;
  className?: string;
}

export function StepActions({ children, className = "" }: StepActionsProps) {
  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      {children}
    </div>
  );
}
