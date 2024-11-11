import * as React from "react";

import { cn } from "@/shared/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, label, ...props }, ref) => {
  return (
    <div className="flex w-full flex-col items-baseline">
      {label && <h3 className="pb-2 text-sm md:pb-1.5 md:text-xs ">{label}</h3>}
      <textarea
        className={cn(
          "placeholder:text-stone-500  flex min-h-[80px] w-full rounded-md border border-gray-1 bg-white px-3 py-2 text-sm ring-offset-[#94A3B8] placeholder:text-[#94A3B8] focus-visible:outline-none  focus-visible:ring-1 focus-visible:ring-[#94A3B8] disabled:cursor-not-allowed disabled:opacity-50 md:placeholder:text-xs",
          className,
        )}
        ref={ref}
        {...props}
      />
    </div>
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
