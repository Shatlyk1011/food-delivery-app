import { FC } from "react";

import { PlusIcon } from "@/app/icons";

interface Props {
  dish: Dish;
  isDishDisabled: boolean;
  addItem: () => void;
  btnTitle: string;
  handleDish: () => void;
}

const Index: FC<Props> = ({ dish, isDishDisabled, addItem, btnTitle, handleDish }) => {
  return (
    <div className="relative m-1 flex max-w-full flex-col overflow-hidden rounded-[14px] bg-bg-1 p-3 md:p-2">
      <div className=" relative mb-2.5 h-44 w-full overflow-hidden rounded-[14px] " onClick={handleDish}>
        <img
          className="h-full w-full cursor-pointer object-cover duration-200 hover:brightness-105"
          src={dish.image?.url || ""}
          alt={dish.image?.alt || "Тут должно было быть изображение"}
        />
      </div>
      <div className="mb-2.5 h-fit font-medium">
        <h4 className="text-xl md:text-base xl:text-lg">
          {dish.title} - {dish.price}TMT
        </h4>
        <p className="line-clamp-2 text-base md:text-xs xl:text-sm">{dish.description}</p>
      </div>
      <div className="flex flex-1 flex-col justify-end">
        <div className="mb-1 text-base leading-5 text-text-4 md:text-sm">{dish.gram}gr</div>
        <button
          type="button"
          disabled={isDishDisabled}
          onClick={() => {
            if (!isDishDisabled) addItem();
          }}
          className=" flex w-full justify-center space-x-2 rounded-[14px] bg-gray-2 p-3"
        >
          {!isDishDisabled && <PlusIcon />}
          <p className="inline">{btnTitle}</p>
        </button>
      </div>
      {isDishDisabled && <div className="absolute left-0 top-0 z-20 h-full w-full bg-white/50"></div>}
    </div>
  );
};
export default Index;
