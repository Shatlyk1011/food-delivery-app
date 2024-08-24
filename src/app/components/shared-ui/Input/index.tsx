import * as React from "react";

import { cn } from "@/app/shared/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, label, ...props }, ref) => {
  return (
    <div className="flex w-full flex-col items-baseline">
      {label && <h3 className="pb-2 text-sm">{label}</h3>}
      {/* {type === "tel" && <span className="absolute ml-3 mt-[11px] text-sm">+993</span>} */}
      <input
        type={type}
        className={cn(
          `file:bg-transparent h-10 w-full rounded-md border border-gray-1 bg-white px-3 py-2 text-sm ring-offset-[#94A3B8] file:border-0 file:text-sm file:font-medium placeholder:text-[#94A3B8] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#94A3B8] disabled:cursor-not-allowed  disabled:opacity-50`,
          className,
        )}
        ref={ref}
        {...props}
      />
    </div>
  );
});
Input.displayName = "Input";

export default Input;
