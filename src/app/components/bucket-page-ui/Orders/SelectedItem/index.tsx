"use client";
import { FC } from "react";

import IncreaseDecrease from "@/app/components/shared-ui/IncreaseDecrease";

import { DEFAULT_IMAGE_PATH } from "@/app/shared/constants";

interface Props {
  item: any;
  increase: () => void;
  decrease: () => void;
}

const Index: FC<Props> = ({ item, decrease, increase }) => {
  return (
    <div className="py-2.5">
      <div className="flex flex-wrap space-x-2">
        <div className="relative h-20 w-20 overflow-hidden rounded-xl">
          <img src={item.image?.url || DEFAULT_IMAGE_PATH} className="h-full w-full object-cover" alt="alt name" />
        </div>
        <div className="flex flex-1 justify-between space-y-1">
          <div>
            <h5 className="line-clamp-2  text-base font-medium">
              {item.title} - <span className="font-normal">{item.description}</span>
            </h5>
            <p className="mt-1 text-sm font-medium text-text-4">{item.gram}gr</p>
          </div>
          <div className="ml-2 flex items-center justify-between">
            <div className="flex items-center space-x-4 sm:flex-col sm:space-x-0 sm:space-y-2">
              <IncreaseDecrease
                count={item.count}
                increase={increase}
                decrease={decrease}
                className="w-20 space-x-3 xl:w-24 md:w-[68px] md:space-x-1"
              />
              <p className="min-w-16 text-base font-medium md:text-sm">{item.price}$</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Index;
