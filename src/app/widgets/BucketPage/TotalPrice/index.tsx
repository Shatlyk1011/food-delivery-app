import { FC } from "react";

interface Props {
  onSubmit: any;
  t: any;
  totalPrice: string;
  deliveryPrice: number;
  restaurantTitle: string;
}

const Index: FC<Props> = ({ t, totalPrice, deliveryPrice, onSubmit, restaurantTitle }) => {
  return (
    <div className="w-full rounded-[32px] bg-bg-1 p-8 md:rounded-3xl md:p-6 sm:p-4">
      <h5 className="mb-2.5 border-b border-gray-1 pb-2.5 text-xl font-medium leading-6 sm:text-lg">
        {t("BucketPage.summary")}
      </h5>
      <h4 className="py-1 pb-3 text-lg font-medium">{restaurantTitle}</h4>
      <ul className="mb-3 space-y-3">
        <li className="flex justify-between sm:text-sm">
          {t("BucketPage.price")}
          <span>{totalPrice}TMT</span>
        </li>
        {deliveryPrice > 0 && (
          <li className="flex justify-between sm:text-sm">
            {t("Index.delivery")}
            <span>{deliveryPrice}TMT</span>
          </li>
        )}

        <li className="flex justify-between py-2.5 font-medium">
          {t("BucketPage.totalPrice")}
          <span className="rounded-[14px] border border-primary bg-onHover px-2.5 py-1 leading-4 sm:text-sm">
            {Number(totalPrice) + Number(deliveryPrice)} TMT
          </span>
        </li>
      </ul>

      <button
        type="submit"
        onSubmit={onSubmit}
        className="h-12 w-full rounded-[14px] bg-primary px-3 text-center font-medium leading-[48px] hover:bg-accent sm:h-10 sm:leading-[40px]"
      >
        {t("BucketPage.submit")}
      </button>
    </div>
  );
};
export default Index;
