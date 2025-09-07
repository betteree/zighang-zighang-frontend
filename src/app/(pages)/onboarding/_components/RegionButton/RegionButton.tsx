import { forwardRef } from "react";

export const RegionButton = forwardRef<
  HTMLButtonElement,
  {
    label: string;
    active: boolean;
    onClick?: () => void;
  }
>(function RegionButton({ label, active, onClick }, ref) {
  const getButtonClasses = () => {
    const baseClasses = "w-48 px-3.5 py-1.5 text-sm font-medium text-left";
    return active
      ? `${baseClasses} bg-purple-100 text-purple-900`
      : `${baseClasses} bg-white text-black`;
  };

  return (
    <button ref={ref} onClick={onClick} className={getButtonClasses()}>
      {label}
    </button>
  );
});
