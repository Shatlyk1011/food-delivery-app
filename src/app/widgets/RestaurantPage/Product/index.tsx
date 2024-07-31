import { FC } from "react";
import Image from "next/image";

import { PlusIcon } from "@/app/icons";

interface Props {
  item: any;
  addItem: () => void;
  addTitle: string;
}

const Index: FC<Props> = ({ item, addItem, addTitle }) => {
  return (
    <div className="m-1 max-w-full rounded-[14px] bg-bg-1 p-3 md:p-2">
      <div className="relative mb-2.5 h-44 w-full overflow-hidden rounded-[14px]">
        <Image className="" objectFit="cover" src={item.imgSrc} fill={true} alt="dish picture" />
      </div>

      <div className="mb-2.5 font-medium">
        <h4 className="text-xl xl:text-lg md:text-base">{item.price}TMT</h4>
        <p className="line-clamp-2 text-base xl:text-sm md:text-xs">{item.description}</p>
      </div>

      <div className="mb-1 text-base leading-5 text-text-4 md:text-sm">{item.gramm}gr</div>
      <button onClick={addItem} className="flex w-full justify-center space-x-2 rounded-[14px] bg-gray-2 p-3">
        <PlusIcon />
        <p className="inline">{addTitle}</p>
      </button>
    </div>
  );
};
export default Index;
