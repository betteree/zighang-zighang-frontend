export function SecondaryButton({
  children,
  onClick,
  disabled = false,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  const getButtonClasses = () => {
    const baseClasses =
      "flex items-center justify-center text-Button2-16sb w-full md:w-[156px] h-[50px] md:h-[42px] rounded-[8px] transition-all duration-200 border border-[#C5C5C8] ";

    if (disabled) {
      return `${baseClasses} bg-gray-100 text-gray-400 cursor-not-allowed`;
    }

    return `${baseClasses} bg-white text-gray-700 cursor-pointer`;
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={getButtonClasses()}
    >
      {children}
    </button>
  );
}
