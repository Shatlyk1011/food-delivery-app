import { FC } from "react";

import { Link } from "@/i18n/routing";

import { MotocycleIcon, StarIcon, UsdIcon } from "@/app/icons";

import { DEFAULT_IMAGE_PATH } from "@/app/shared/constants";

interface Props {
  item: MainPageRestaurant;
  isDeliveryFree: boolean;
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

    default:
      return 3;
  }
};

const Index: FC<Props> = ({ item, isDeliveryFree, t }) => {
  return (
    <div className="relative inline-block px-4 pb-5 xl:px-2">
      <Link href={`/restaurant/${item.id}`} className="group focus:outline-none">
        <figure className="relative mb-2 h-full max-h-52 min-h-52 w-full cursor-pointer overflow-hidden rounded-[14px] outline-none ring-text-2 ring-offset-2 group-focus-visible:ring-2">
          <img
            className="absolute h-full w-full bg-gray-2 object-cover"
            src={item.bannerImage?.url || DEFAULT_IMAGE_PATH}
            alt={item.bannerImage?.alt || "image"}
          />
          {isDeliveryFree && (
            <div className="absolute left-2 top-2 z-10 flex items-center space-x-1 rounded-full bg-white/80 px-1 py-[3px] pr-1.5 text-black">
              <MotocycleIcon className="box-content h-4 w-4 rounded-full bg-[#5AC31A] p-1 text-white" />
              <p className="text-xs font-medium tracking-normal text-text-1">{t("Index.freeDelivery")}</p>
            </div>
          )}

          <div className="absolute bottom-0 right-0 z-10 rounded-[14px] rounded-br-none bg-black/60 px-2 py-3 leading-[1] text-white">
            {deliveryTime(item.deliveryTime || "", t)}
          </div>
        </figure>
      </Link>
      <div>
        <h5 className="mb-0.5 line-clamp-2 text-2xl">{item.title}</h5>

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
