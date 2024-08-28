import { MotocycleIcon } from "@/app/icons";
import { WalkIcon } from "@/app/icons";

import { FC } from "react";

interface Props {
  t: any;
  isDelivery: boolean;
  deliveryTitle: string;
  deliveryPrice?: string;
  isDeliveryFree?: string;
  deliveryTime?: number;
}

const Index: FC<Props> = ({ t, isDelivery, deliveryTime, deliveryTitle, deliveryPrice, isDeliveryFree }) => {
  return (
    <div className="flex flex-1 items-center gap-2.5  bg-bg-1">
      <div className="h-12 w-12 rounded-[14px] bg-bg-2 p-3">
        {isDelivery ? <MotocycleIcon width={24} height={24} /> : <WalkIcon />}
      </div>

      <p className={`text-sm font-medium leading-3 ${isDeliveryFree && "text-success"}`}>
        {deliveryTitle} {deliveryPrice && deliveryPrice}
        {!isNaN(deliveryTime) && `${deliveryTime - 10} - ${deliveryTime + t("Index.min")}`}
      </p>
    </div>
  );
};
export default Index;
