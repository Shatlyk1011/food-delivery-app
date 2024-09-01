import { FC } from "react";

import { PROFILE_INNER_HEAD } from "@/app/data";

interface Props {
  dishes: UserOrderDish[];
  t: any;
}

const Index: FC<Props> = ({ dishes, t }) => {
  return (
    <div className=" px-8 last:pb-6">
      <h2 className="py-2 pt-5 text-lg font-medium">{t("Index.dishes")}</h2>
      <div className="flex flex-col">
        <ul className="flex w-[40%] border-b border-black/20 text-sm font-medium text-black/85 [&>*]:px-4 [&>*]:py-3">
          {PROFILE_INNER_HEAD.map(({ title, className }) => (
            <li className={`${className}`} key={title}>
              {t(title)}
            </li>
          ))}
        </ul>
        {dishes?.map(({ dish: { price, title }, quantity }, i) => (
          <ul key={i} className="flex w-[40%] items-center border-b border-black/20 text-sm [&>*]:px-4 [&>*]:py-2">
            <li className="w-[40%]">{title}</li>
            <li className="w-[30%]">{price} TMT</li>
            <li className="w-[30%]">{quantity}</li>
          </ul>
        ))}
      </div>
    </div>
  );
};
export default Index;
