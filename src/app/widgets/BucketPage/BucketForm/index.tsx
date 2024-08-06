import { FC } from "react";

//components
import BucketFormComponent from "@/app/components/bucket-page-ui/BucketForm/Form";
import { ClockIcon } from "@/app/icons";

interface Props {
  form: any;
  isDelivery: boolean;
  deliveryPrice: number;
  t: any;
}

const Index: FC<Props> = ({ form, isDelivery, deliveryPrice, t }) => {
  return (
    <div className="">
      <h2 className="mb-2.5 text-2xl font-bold leading-6 md:text-base">{t("BucketForm.fillForm")}</h2>
      <h3
        className={`mb-2.5 text-base font-medium leading-5 md:text-sm ${isDelivery ? "text-warning" : "text-success"}`}
      >
        {isDelivery ? (
          <p>
            {t("Index.delivery")} {deliveryPrice} TMT
          </p>
        ) : (
          <p>{t("Index.selfCare")} 45min</p>
        )}
      </h3>
      <BucketFormComponent form={form} t={t} />

      <div className="mt-8">
        <h4 className="mb-2.5 text-2xl font-medium leading-7">{t("BucketForm.deliveryTime")}</h4>
        <div className="flex items-center space-x-2.5 ">
          <ClockIcon width={20} height={20} />
          <p className="text-base font-medium">
            {t("BucketForm.deliveryTime")}: 55-65 {t("Index.min")}
          </p>
        </div>
      </div>
    </div>
  );
};
export default Index;
