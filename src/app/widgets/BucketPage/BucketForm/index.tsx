import { FC } from "react";

//components
import BucketFormComponent from "@/app/components/bucket-page-ui/BucketForm/Form";
import DeliveryItem from "@/app/components/shared-ui/DeliveryItem";

interface Props {
  t: any;
  form: any;
  isDelivery: boolean;
  deliveryTime: string;
  deliveryPrice: number;
}

const Index: FC<Props> = ({ form, isDelivery, deliveryPrice, t, deliveryTime }) => {
  return (
    <div>
      <h2 className="mb-2.5 text-2xl font-bold leading-6 md:text-base">{t("BucketForm.fillForm")}</h2>
      <h3
        className={`mb-2.5 text-base font-medium leading-5 md:text-sm ${isDelivery ? "text-warning" : "text-success"}`}
      >
        {isDelivery ? (
          <p>
            {t("Index.delivery")} {deliveryPrice} TMT
          </p>
        ) : (
          <p>
            {t("Index.selfCare")} {deliveryTime + t("Index.min")}
          </p>
        )}
      </h3>
      <BucketFormComponent form={form} t={t} />

      <div className="mt-8">
        <h4 className="mb-2.5 text-2xl font-medium leading-7">
          {t(isDelivery ? "BucketForm.deliveryTime" : "Index.selfCare")}
        </h4>
        <div className="flex items-center space-x-2.5 ">
          <DeliveryItem
            t={t}
            isDelivery={isDelivery}
            deliveryTime={Number(deliveryTime)}
            deliveryTitle={isDelivery ? t("BucketForm.deliveryTime") : t("Index.selfCare")}
          />
        </div>
      </div>
    </div>
  );
};
export default Index;
