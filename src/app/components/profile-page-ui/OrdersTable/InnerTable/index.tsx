import { FC } from "react";

import { PROFILE_INNER_HEAD } from "@/app/data";

interface Props {
  deliveryPrice: number;
  dishes: UserOrderDish[];
  t: any;
}

const Index: FC<Props> = ({ deliveryPrice, dishes, t }) => {
  const totalPrice = dishes?.reduce((acc, { dish: { price }, quantity }) => acc + price * quantity, 0);

  return (
    <div className=" px-8 last:pb-6">
      <h2 className="pb-2 pt-5 text-lg font-medium xl:pt-4 xl:text-base md:text-sm">{t("Index.dishes")}</h2>
      <div className="flex flex-col">
        <ul className="flex w-[40%] border-b border-black/20 text-sm font-medium text-black/75 xl:w-[60%] md:text-xs [&>*]:px-4 [&>*]:py-3 xl:[&>*]:px-3 xl:[&>*]:py-2">
          {PROFILE_INNER_HEAD.map(({ title, className }) => (
            <li className={`${className}`} key={title}>
              {t(title)}
            </li>
          ))}
        </ul>
        {dishes?.map(({ dish: { price, title }, quantity }, i) => (
          <ul
            key={i}
            className="flex w-[40%] items-center border-b border-black/20 text-sm xl:w-[60%] xl:text-sm md:text-xs [&>*]:px-4 [&>*]:py-2 xl:[&>*]:px-3"
          >
            <li className="w-[40%]">{title}</li>
            <li className="w-[30%]">{price} TMT</li>
            <li className="w-[30%]">{quantity}</li>
          </ul>
        ))}
      </div>
      <p className="mt-2 flex w-[40%] justify-between border-b border-black/20 px-4 py-2 text-sm font-medium xl:w-[60%] xl:px-3">
        {Boolean(+deliveryPrice) ? (
          <span className="font-medium opacity-80">
            {t("Index.deliveryPrice")} : {deliveryPrice} TMT
          </span>
        ) : (
          <span className="text-success">{t("Index.freeDelivery")}</span>
        )}
        <span className="font-medium text-info">Общая стоимость: {totalPrice + +deliveryPrice}</span>
      </p>
    </div>
  );
};
export default Index;
