interface SecondaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}
const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  type = "button",
  className = "",
  disabled,
  children,
  ...props
}) => {
  return (
    <button
      {...props}
      type={type}
      className={
        `inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150 ${
          disabled && "opacity-25"
        } ` + className
      }
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default SecondaryButton;
