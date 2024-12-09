import { FC } from "react";

import ProductSkeleton from "@/widgets/RestaurantPage/RestaurantPageSkeleton/ProductSkeleton";
import { Skeleton } from "@/app/components/shared-ui/Skeleton";

interface Props { }

const Index: FC<Props> = () => {
  return (
    <div className="flex justify-between px-4 py-8 2xl:py-6 lg:px-2.5 lg:py-4 md:px-2 md:py-2.5">
      <div className="flex flex-1 space-x-8 2xl:space-x-4 md:space-x-0">
        <Skeleton className="relative h-[calc(100vh-140px)] w-96 2xl:w-64 md:hidden">
          <ul className=" mt-5 space-y-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <Skeleton key={i} className="z-[20] mx-4 rounded-[14px] bg-black/[0.03] px-[14px] py-3 first:mb-16">
                <span className="opacity-0">hmm??</span>
              </Skeleton>
            ))}
          </ul>
        </Skeleton>
        <div className="basis-[80%] md:basis-full">
          <Skeleton className="relative h-80 max-w-full overflow-hidden rounded-2xl md:h-60">
            <div className="absolute bottom-0 left-9 z-20 h-40 w-full md:bottom-6 md:left-5">
              <Skeleton className="mb-3 h-10 w-1/2 bg-black/[0.03]"></Skeleton>
              <div className="flex space-x-2.5">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className={`h-14 w-28 bg-black/[0.03] ${i === 2 && "w-14"}`} />
                ))}
              </div>
            </div>
          </Skeleton>

          <div className="w-full">
            <div className="manual_grid_220 mt-2 2xl:mt-4 md:w-full">
              <ProductSkeleton length={6} />
            </div>
          </div>
        </div>
      </div>
      <Skeleton className="right-32 top-48 ml-8 h-[calc(100vh-140px)] w-80 2xl:ml-4 xl:hidden"></Skeleton>
    </div>
  );
};
export default Index;
