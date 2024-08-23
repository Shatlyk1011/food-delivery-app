import { MotocycleIcon } from "@/app/icons";
import { FC } from "react";

interface Props {
  deliveryTitle: string;
  deliveryPrice: number;
  isDeliveryFree?: string;
}

const Index: FC<Props> = ({ deliveryTitle, deliveryPrice, isDeliveryFree }) => {
  return (
    <div className="flex flex-1 items-center gap-2.5  bg-bg-1">
      <div className="h-12 w-12 rounded-[14px] bg-bg-2 p-3">
        <MotocycleIcon width={24} height={24} />
      </div>
      <p className={`text-sm font-medium leading-3 ${isDeliveryFree && "text-success"}`}>
        {deliveryTitle} {deliveryPrice ?? isDeliveryFree ?? 0} TMT
      </p>
    </div>
  );
};
export default Index;
