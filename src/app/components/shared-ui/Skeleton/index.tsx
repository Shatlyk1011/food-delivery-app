import { cn } from "@/app/shared/lib/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("animate-pulse rounded-md bg-[#ccc]/[0.2]", className)} {...props} />;
}

export { Skeleton };
