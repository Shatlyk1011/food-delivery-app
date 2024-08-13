import { FC } from "react";

import { Link } from "@/app/(pages)/_providers/i18n/i18config";

import { StarIcon, UsdIcon } from "@/app/icons";

interface Props {
  item: MainPageRestaurant;
}

const Index: FC<Props> = ({ item }) => {
  const computedPriceNumber = (() => {
    switch (item.budgetCategory) {
      case "cheap": {
        return 1;
      }
      case "average": {
        return 2;
      }
      case "expensive": {
        return 3;
      }
    }
  })();
  return (
    <div className="inline-block px-4 pb-5 md:px-2 md:pb-3">
      <figure className="relative mb-2 max-h-52 min-h-52 cursor-pointer overflow-hidden rounded-[14px]">
        <Link href={`/restaurant/${item.title}`}>
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src={item.bannerImage?.url || ""}
            alt={item.bannerImage?.alt || "image"}
          />
        </Link>
      </figure>
      <div>
        <h5 className="mb-0.5 line-clamp-2 text-2xl font-medium">{item.title}</h5>

        <div className="flex items-center space-x-1.5">
          {/* fill-primary */}
          <StarIcon width={18} height={18} className="fill-gray-1 " />
          <p className="text-sm">Мало отзывов</p>
          <div className="flex">
            {[1, 2, 3].map((num) => (
              <UsdIcon width={12} height={12} className={num > computedPriceNumber ? "fill-text-4" : "fill-black"} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Index;
