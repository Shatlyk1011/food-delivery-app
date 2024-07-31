import { FC } from "react";
import Image from "next/image";

import IncreseDecrease from "@/app/components/shared-ui/IncreaseDecrease";

interface Props {
  item: any;
  increaseItem: () => void;
  decreaseItem: () => void;
}

const Index: FC<Props> = ({ item, increaseItem, decreaseItem }) => {
  return (
    <div className="flex items-center space-x-2">
      <div className="relative h-16 w-16 overflow-hidden rounded-xl">
        <Image src={item.imgSrc} objectFit="cover" fill={true} alt="dish photo" />
      </div>

      <div className="flex-1 self-start">
        <h6 className="line-clamp-2 text-sm">{item?.description}</h6>
        <div className="text-xs font-medium">
          {item?.price} mtm, <span className="font-base text-text-4">{item?.gramm}</span>
        </div>
      </div>
      <div className="flex-1">
        <IncreseDecrease count={item.count} increase={increaseItem} decrease={decreaseItem} />
      </div>
    </div>
  );
};
export default Index;
