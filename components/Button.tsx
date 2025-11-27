import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'locked' | 'outline';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "font-bold py-3 px-6 rounded-2xl transition-all transform active:scale-95 border-b-4 flex items-center justify-center uppercase tracking-wider text-sm sm:text-base";
  
  const variants = {
    primary: "bg-primary border-primaryDark text-white hover:bg-green-500",
    secondary: "bg-secondary border-secondaryDark text-white hover:bg-sky-400",
    danger: "bg-danger border-dangerDark text-white hover:bg-red-500",
    locked: "bg-locked border-lockedDark text-gray-400 cursor-not-allowed border-b-2",
    outline: "bg-transparent border-2 border-gray-200 text-gray-500 hover:bg-gray-100 border-b-4"
  };

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthStyle} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};