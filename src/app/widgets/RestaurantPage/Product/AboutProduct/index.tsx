import { Dialog, DialogContent, DialogTitle } from "@/app/components/shared-ui/Dialog";

import { DEFAULT_IMAGE_PATH } from "@/app/shared/constants";

interface Props {
  dish: Dish;
  handleClose: () => void;
  t: any;
}
export default function AboutProduct({ dish, handleClose, t }: Props) {
  return (
    <Dialog open={Boolean(dish)} onOpenChange={handleClose}>
      <DialogContent className="max-h-[520px] max-w-[780px] rounded-[20px] px-6 py-6 lg:max-w-[90%] md:p-4 sm:p-3">
        <div className="box-border flex space-x-10 md:flex-col md:space-x-0 md:space-y-6">
          <figcaption className="relative my-auto min-h-[260px] min-w-[260px] flex-1 overflow-hidden rounded-xl md:h-[180px]">
            <img
              className="absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover md:object-contain"
              src={dish.image?.url || DEFAULT_IMAGE_PATH}
              alt={dish.image?.alt || ""}
            />
          </figcaption>
          <div className="flex w-full flex-col">
            <DialogTitle className="text-2xl font-medium md:text-base xl:text-lg">{dish.title}</DialogTitle>
            <div className="mb-1 text-base leading-5 text-text-4 md:text-sm">
              {dish.gram} {t("Index.gr")}
            </div>
            <h4 className="mb-3 mt-2 text-xl font-medium md:text-base xl:text-lg">{dish.price}$</h4>
            <div className="border-t border-text-4/60">
              <p className="pb-1 pt-2 text-sm text-text-3">{t("Index.description")}</p>
              <p className="text-base leading-[1.4]">{dish.description}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
