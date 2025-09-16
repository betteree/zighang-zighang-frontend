import React from "react";
import { ResponsiveStepActions } from "../Button";

interface StepActionsProps {
  children: React.ReactNode;
  className?: string;
  showBorder?: boolean;
}

export function StepActions({
  children,
  className = "",
  showBorder = true,
}: StepActionsProps) {
  return (
    <ResponsiveStepActions className={className} showBorder={showBorder}>
      {children}
    </ResponsiveStepActions>
  );
}
