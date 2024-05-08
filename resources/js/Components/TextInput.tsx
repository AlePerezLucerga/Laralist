import React, { forwardRef, useEffect, useRef } from "react";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  isFocused?: boolean;
}

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (props, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (props.isFocused && inputRef.current) {
        inputRef.current.focus();
      }
    }, [props.isFocused]);

    return (
      <input
        {...props}
        type={props.type || "text"}
        className={
          "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm " +
          (props.className || "")
        }
        ref={ref || inputRef}
      />
    );
  }
);

export default TextInput;
