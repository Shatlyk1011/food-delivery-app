import { Dialog, DialogContent, DialogTrigger } from "@/app/components/shared-ui/Dialog";
import Image from "next/image";

interface Props {
  dish: Dish;
}
export default function AboutProduct({ dish }: Props) {
  return (
    <Dialog>
      <DialogTrigger>
        <Image
          className="duration-200 hover:brightness-105"
          objectFit="cover"
          src={dish.image.url}
          fill={true}
          alt={dish.image.alt}
        />
      </DialogTrigger>
      <DialogContent className="max-h-[520px] max-w-[780px] rounded-[20px] p-8 lg:max-w-[90%] md:p-4">
        <div className="box-border flex space-x-[60px] md:flex-col md:space-x-0 md:space-y-6">
          <figcaption className="relative my-auto min-h-[240px] min-w-[240px] flex-1 md:min-h-[180px]">
            <Image objectFit="contain" src={dish.image.url} alt={dish.image.alt} fill={true} />
          </figcaption>
          <div className="flex w-full flex-col">
            <h4 className="text-2xl font-medium xl:text-lg md:text-base">
              {dish.title} - {dish.price}TMT
            </h4>
            <div className="mb-1 text-base leading-5 text-text-4 md:text-sm">{dish.gram}gr</div>
            <h4 className="mb-5 mt-2 text-xl font-medium xl:text-lg md:text-base">{dish.price}TMT</h4>
            <div className="border- border-t">
              <p className="pb-1 pt-2 text-sm text-text-4">Описание</p>
              {dish.description}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
