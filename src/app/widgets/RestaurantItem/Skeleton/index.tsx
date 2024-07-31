import { Skeleton } from "@/app/components/shared-ui/Skeleton";
import { FC } from "react";

interface Props {
  length?: number;
}

const Index: FC<Props> = ({ length = 6 }) => {
  return (
    <>
      {Array.from({ length }).map(() => (
        <div className="inline-block px-4 pb-5">
          <Skeleton className="mb-2 min-h-52 rounded-xl" />
          <div className="mb-4 space-y-3">
            <Skeleton className="h-8 w-[200px]" />
            <Skeleton className="h-4 w-[250px]" />
          </div>
        </div>
      ))}
    </>
  );
};

export default Index;
