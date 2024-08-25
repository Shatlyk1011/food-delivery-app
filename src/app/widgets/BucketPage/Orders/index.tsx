import { FC } from "react";
import { useRouter } from "next/navigation";

import useProductItem from "@/app/hooks/useProductItem";

//components
import SelectedItem from "@/app/components/bucket-page-ui/Orders/SelectedItem";
import ClearBucketDialog from "@/app/components/bucket-page-ui/ClearBucketDialog";
import EmptyBucket from "@/app/components/shared-ui/EmptyBucket";
import Input from "@/app/components/shared-ui/Input";

interface Props {
  t: any;
}

const Index: FC<Props> = ({ t }) => {
  const { selectedItems, increaseItem, decreaseItem, clearItems } = useProductItem();

  const { push } = useRouter();

  return (
    <div className="relative rounded-[32px] bg-bg-1 py-7 pl-8 pr-4 md:rounded-3xl md:py-6 md:pl-6 sm:p-4 sm:pl-4">
      <div className="flex justify-between">
        <h3 className="mb-2.5 text-xl font-medium sm:text-base">{t("BucketPage.orders")}</h3>
        {selectedItems?.dishes?.length > 0 && <ClearBucketDialog clearItems={clearItems} t={t} />}
      </div>
      <div className="perfect-scrollbar mr-1 max-h-[400px] overflow-hidden rounded-xl  md:pr-3 ">
        {selectedItems?.dishes?.map((item) => (
          <SelectedItem
            key={item.id}
            item={item}
            increase={() => increaseItem(item)}
            decrease={() => decreaseItem(item)}
          />
        ))}
      </div>
      {!selectedItems?.dishes?.length && (
        <div className="text-center">
          <EmptyBucket title={t("Index.noItems")} classes="!bg-[transparent] font-normal !text-base sm:!text-sm" />
          <button
            onClick={() => push("/")}
            type="button"
            className=" rounded-lg border border-primary px-8 py-2 text-xs font-medium sm:py-1"
          >
            {t("BucketPage.menuReturn")}
          </button>
        </div>
      )}
      <div className="mt-4 pr-4 text-text-1">
        <Input label="Restoran üçin teswir" placeholder="Gaýrat сделай sogan не ложи, please" />
      </div>
    </div>
  );
};
export default Index;
