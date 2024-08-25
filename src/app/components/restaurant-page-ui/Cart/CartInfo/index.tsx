import { FC } from "react";

//components
import DeliveryItem from "@/app/components/shared-ui/DeliveryItem";
import { InfoIcon } from "@/app/icons";

interface Props {
  isDelivery: boolean;
  t: any;
  deliveryPrice: number;
  deliveryTime: number;
}

const Index: FC<Props> = ({ isDelivery, t, deliveryPrice, deliveryTime }) => {
  return (
    <div className="mb-2.5 flex items-center gap-2.5 bg-bg-1">
      {isDelivery ? (
        <DeliveryItem
          t={t}
          isDelivery={isDelivery}
          deliveryPrice={deliveryPrice + "TMT"}
          deliveryTitle={t("Index.delivery")}
        />
      ) : (
        <DeliveryItem t={t} isDelivery={isDelivery} deliveryTime={deliveryTime} deliveryTitle={t("Index.selfCare")} />
      )}
      <InfoIcon className="h-6 w-6 cursor-text fill-text-4" width={24} height={24} />
    </div>
  );
};
export default Index;
