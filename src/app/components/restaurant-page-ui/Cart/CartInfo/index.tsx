import { FC } from "react";

//components
import DeliveryItem from "@/app/components/shared-ui/DeliveryItem";
import { InfoIcon } from "@/app/icons";
import { Popover, PopoverContent, PopoverTrigger } from "@/app/components/shared-ui/Popover";

interface Props {
  selfCareTime: number;
  isDelivery: boolean;
  t: any;
  restaurantInfo: CartInfo;
}

const Index: FC<Props> = ({ isDelivery, t, restaurantInfo, selfCareTime }) => {
  const { address, deliveryTime, deliveryPrice } = restaurantInfo;
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
        <DeliveryItem t={t} isDelivery={isDelivery} deliveryTime={selfCareTime} deliveryTitle={t("Index.selfCare")} />
      )}
      <Popover>
        <PopoverTrigger className="cursor-pointer rounded-[14px] bg-bg-1/85 px-3 py-3">
          <InfoIcon className="h-6 w-6 fill-text-4" width={24} height={24} />
        </PopoverTrigger>
        <PopoverContent className="font-base px-5 py-3 text-base tracking-wide">
          {isDelivery ? (
            <p>
              <span className="font-medium text-text-1/80">{t("Index.deliveryDetailed")}:</span>{" "}
              {`${deliveryTime?.slice(1)} ${t("Index.min")}`}
            </p>
          ) : (
            <p>
              <span className="font-medium text-text-1/80">{t("Index.selfCareTitle")}:</span> {address}
            </p>
          )}
        </PopoverContent>
      </Popover>
      {/* <InfoIcon className="h-6 w-6 cursor-text fill-text-4" width={24} height={24} /> */}
    </div>
  );
};
export default Index;
