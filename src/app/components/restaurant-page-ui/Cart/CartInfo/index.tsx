import { FC } from "react";

//components
import DeliveryItem from "./DeliveryItem";
import SelfCarriageItem from "./SelfCarriageItem";
import { InfoIcon } from "@/app/icons";

interface Props {
  isDelivery: boolean;
  t: any;
}

const Index: FC<Props> = ({ isDelivery, t }) => {
  return (
    <div className="mb-2.5 flex items-center gap-2.5 bg-bg-1">
      {isDelivery ? <DeliveryItem deliveryTitle={t("Index.delivery")} /> : <SelfCarriageItem />}
      <InfoIcon className="h-6 w-6 cursor-text fill-text-4" width={24} height={24} />
    </div>
  );
};
export default Index;
