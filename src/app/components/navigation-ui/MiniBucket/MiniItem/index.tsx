import { FC } from "react";

import IncreaseDecrease from "@/app/components/shared-ui/IncreaseDecrease";
interface Props {
  item: any;
  increase: () => void;
  decrease: () => void;
}

const Index: FC<Props> = ({ item, increase, decrease }) => {
  return (
    <div key={item.id} className="flex items-center space-x-3">
      <div className="relative -mb-[1px] h-16 w-16 overflow-hidden rounded-xl">
        <img className="h-full w-full object-cover" src={item.image?.url || ""} alt={item?.image.alt} />
      </div>
      <div className="flex h-full flex-1 items-center space-x-3 break-all border-b border-gray-2">
        <div className="flex-1 ">
          <p className="mb-1 line-clamp-2 text-sm font-medium">
            {item.title} - {item.description}
          </p>
          <div>
            <p className="text-sm font-medium text-text-2">
              {item.price}TMT • <span className="text-text-4">{item.gram}gr</span>
            </p>
          </div>
        </div>
        <IncreaseDecrease
          count={item.count}
          increase={increase}
          decrease={decrease}
          className="max-w-24 md:max-w-[72px]"
        />
      </div>
    </div>
  );
};
export default Index;
