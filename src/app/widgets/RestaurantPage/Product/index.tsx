import { FC } from "react";
import Image from "next/image";

import { PlusIcon } from "@/app/icons";

interface Props {
  dish: Dish;
  addItem: () => void;
  addTitle: string;
  handleDish: () => void;
}

const Index: FC<Props> = ({ dish, addItem, addTitle, handleDish }) => {
  return (
    <div className="m-1 max-w-full rounded-[14px] bg-bg-1 p-3 md:p-2">
      <div className=" relative mb-2.5 h-44 w-full overflow-hidden rounded-[14px] " onClick={handleDish}>
        <Image
          className="hover:brightness-115 duration-200"
          objectFit="cover"
          src={dish.image.url}
          fill={true}
          alt={dish.image.alt}
        />
      </div>

      <div className="mb-2.5 font-medium">
        <h4 className="text-xl xl:text-lg md:text-base">
          {dish.title} - {dish.price}TMT
        </h4>
        <p className="line-clamp-2 text-base xl:text-sm md:text-xs">{dish.description}</p>
      </div>

      <div className="mb-1 text-base leading-5 text-text-4 md:text-sm">{dish.gram}gr</div>
      <button onClick={addItem} className="flex w-full justify-center space-x-2 rounded-[14px] bg-gray-2 p-3">
        <PlusIcon />
        <p className="inline">{addTitle}</p>
      </button>
    </div>
  );
};
export default Index;
