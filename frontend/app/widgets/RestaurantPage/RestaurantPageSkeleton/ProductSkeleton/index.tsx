import { Skeleton } from "@/components/shared-ui/Skeleton";
import { FC } from "react";

interface Props {
  length?: number;
}

const Index: FC<Props> = ({ length = 6 }) => {
  return (
    <>
      {Array.from({ length }).map((_, idx) => (
        <div key={idx} className="m-1 max-w-full rounded-[14px] p-3">
          <Skeleton className="relative mb-3 h-44 w-full rounded-[14px]" />
          <div className="mb-2 space-y-2">
            <Skeleton className="h-8 w-[120px]" />
            <Skeleton className="h-10 w-full" />
          </div>
          <Skeleton className="mb-1 mt-2 h-3 w-[50px]" />
          <Skeleton className="h-12 w-full rounded-2xl" />
        </div>
      ))}
    </>
  );
};

export default Index;
