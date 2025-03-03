import React from "react";

interface PrimaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  className = "",
  disabled,
  children,
  ...props
}) => {
  return (
    <button
      {...props}
      className={
        `inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-black uppercase tracking-widest hover:bg-gray-200 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 ${
          disabled ? "opacity-25" : ""
        } ` + className
      }
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
