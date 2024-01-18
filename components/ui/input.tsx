import { cn } from "@/utils/cn";
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const inputStyles = `
bg-transparent 
border dark:border-white/10 border-gray-300
rounded-md
block w-full
outline-none
inline-flex gap-x-2
py-1 px-2 md:px-4
text-base
transition
hover:bg-white/10`;

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <input
      type={props.type}
      {...props}
      className={cn(inputStyles, props.className)}
      ref={ref}
      placeholder={props.placeholder}
    />
  );
});

Input.displayName = "Input";

export { Input };
