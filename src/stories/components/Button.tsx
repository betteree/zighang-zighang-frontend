import React from 'react';

export interface ButtonProps {
  /**
   * 버튼의 주요 콘텐츠
   */
  children: React.ReactNode;
  /**
   * 버튼의 크기
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * 버튼의 색상 변형
   */
  variant?: 'primary' | 'secondary' | 'outline';
  /**
   * 클릭 이벤트 핸들러
   */
  onClick?: () => void;
  /**
   * 비활성화 상태
   */
  disabled?: boolean;
}

/**
 * 재사용 가능한 Button 컴포넌트
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  size = 'medium',
  variant = 'primary',
  onClick,
  disabled = false,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  
  const sizeClasses = {
    small: 'h-8 px-3 text-sm',
    medium: 'h-10 px-4 py-2',
    large: 'h-12 px-6 text-lg'
  };
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
    outline: 'border border-gray-300 bg-transparent hover:bg-gray-50'
  };

  const classes = [
    baseClasses,
    sizeClasses[size],
    variantClasses[variant]
  ].join(' ');

  return (
    <button
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
