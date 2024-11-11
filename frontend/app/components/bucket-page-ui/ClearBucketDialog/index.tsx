import { FC } from "react";

import { TrashIcon } from "@/icons";
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from "@/components/shared-ui/Dialog";

interface Props {
  clearItems: () => void;
  t: any;
}

const Index: FC<Props> = ({ t, clearItems }) => {
  return (
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
  );
};
export default Index;
