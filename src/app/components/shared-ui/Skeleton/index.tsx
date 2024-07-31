import { cn } from "@/app/shared/lib/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("dark:bg-stone-800 animate-pulse rounded-md bg-gray-1", className)} {...props} />;
}

export { Skeleton };
