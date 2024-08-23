import { ReactNode } from "react";

import { cn } from "@/app/shared/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button className={cn("rounded-md bg-primary px-4 py-2 hover:bg-onHover", className)} {...props}>
      {children}
    </button>
  );
}
