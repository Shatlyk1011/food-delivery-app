import dynamic from "next/dynamic";
import { FC } from "react";

//components
const BucketFormComponent = dynamic(() => import("@/app/components/bucket-page-ui/BucketForm/Form"), { ssr: false });
import DeliveryItem from "@/app/components/shared-ui/DeliveryItem";
import Link from "next/link";

interface Props {
  form: any;
  deliveryTime: string | number;
  isDelivery: boolean;
  clearLocalStorage: () => void;
  t: any;
}

const Index: FC<Props> = ({ form, deliveryTime, isDelivery, clearLocalStorage, t }) => {
  return (
    <div>
      <h2 className="le/ading-6 mb-2.5 text-2xl font-bold md:text-base">{t("BucketForm.fillForm")}</h2>
      <h3 className={`mb-2.5 text-base font-medium leading-5 md:text-sm `}>
        {t("Index.orderType")}: &nbsp;
        <span className={isDelivery ? "text-warning" : "text-success"}>
          {isDelivery ? t("Index.delivery") : t("Index.selfCare")}
        </span>
      </h3>
      <BucketFormComponent form={form} t={t} />

      <div className="mt-8">
        <h4 className="mb-2.5 text-2xl font-medium leading-7">
          {t(isDelivery ? "BucketForm.deliveryTime" : "Index.selfCare")}
        </h4>
        <div className="flex items-center space-x-2.5 ">
          {!isNaN(+deliveryTime) ? (
            <DeliveryItem
              t={t}
              isDelivery={isDelivery}
              deliveryTime={+deliveryTime}
              deliveryTitle={isDelivery ? t("BucketForm.deliveryTime") : t("Index.selfCareDetailed")}
            />
          ) : (
            <Link
              href="/"
              onClick={clearLocalStorage}
              className="border-b border-[transparent] text-sm font-medium text-text-3 transition hover:border-[currentColor]"
            >
              {t("Actions.chooseRestaurant")}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
export default Index;
