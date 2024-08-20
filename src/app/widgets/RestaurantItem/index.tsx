import { FC, useCallback, useMemo } from "react";

import { Link } from "@/app/(pages)/_providers/i18n/i18config";

import { StarIcon, UsdIcon } from "@/app/icons";

interface Props {
  item: MainPageRestaurant;
  t: any;
}

const deliveryTime = (deliveryTime: string, t: any) => {
  const baseTime = +deliveryTime.slice(1);
  return `${baseTime} - ${baseTime + 10} ${t("Index.min")}`;
};
const computedPriceNumber = (budgetCategory: string) => {
  switch (budgetCategory) {
    case "_1":
      return 1;

    case "_2":
      return 2;

    case "_3":
      return 3;
  }
};

const Index: FC<Props> = ({ item, t }) => {
  return (
    <div className="inline-block px-4 pb-5 xl:px-2">
      <figure className="relative mb-2 max-h-52 min-h-52  cursor-pointer overflow-hidden rounded-[14px]">
        <Link href={`/restaurant/${item.id}`} className="">
          <img
            className="absolute inset-0 h-full w-full bg-gray-2 object-cover"
            src={item.bannerImage?.url || ""}
            alt={item.bannerImage?.alt || "image"}
          />
        </Link>

        <div className="absolute bottom-0 right-0 z-10 rounded-[14px] rounded-br-none bg-black/60 px-2 py-3 leading-[1] text-white">
          {deliveryTime(item.deliveryTime || "", t)}
        </div>
      </figure>
      <div>
        <h5 className="mb-0.5 line-clamp-2 text-2xl font-medium">{item.title}</h5>

        <div className="flex items-center space-x-1.5">
          {/* fill-primary */}
          <StarIcon width={18} height={18} className="fill-gray-1 " />
          <p className="text-sm">{t("Index.noReview")}</p>
          <div className="flex">
            {[1, 2, 3].map((num) => (
              <UsdIcon
                key={num}
                width={12}
                height={12}
                className={num > computedPriceNumber(item.budgetCategory) ? "fill-text-4" : "fill-black"}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Index;
