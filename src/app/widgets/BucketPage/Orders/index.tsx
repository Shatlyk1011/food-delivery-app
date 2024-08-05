import { FC, useState } from "react";

import useProductItem from "@/app/hooks/useProductItem";

import SelectedItem from "@/app/components/bucket-page-ui/Orders/SelectedItem";
import EmptyBucket from "@/app/components/shared-ui/EmptyBucket";
import { useRouter } from "next/navigation";
import { TrashIcon } from "@/app/icons";
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from "@/app/components/shared-ui/Dialog";

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
        <Dialog>
          <DialogTrigger
            type="button"
            className="flex items-center space-x-1 text-sm text-text-4 transition hover:text-text-2"
          >
            <TrashIcon width={24} height={24} />
            <p>{t("BucketPage.clearTrash")}</p>
          </DialogTrigger>
          <DialogContent className="max-w-96 rounded-[24px] p-8 pt-6">
            <DialogTitle className="mb-3 text-xl font-semibold leading-[1]">{t("BucketPage.clearTrash")}?</DialogTitle>

            <div className="flex space-x-3">
              <DialogClose className="h-[56px] flex-1 rounded-2xl bg-gray-1/90  px-4 text-sm font-medium transition hover:bg-gray-1">
                {t("BucketPage.noClear")}
              </DialogClose>
              <DialogClose
                onClick={clearItems}
                className="h-[56px] flex-1 rounded-2xl bg-primary/90  px-4 text-sm font-medium transition hover:bg-primary"
              >
                {t("BucketPage.yesClear")}
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
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
    </div>
  );
};
export default Index;
