import { Dispatch, FC, SetStateAction } from "react";
//components
import { Popover, PopoverContent, PopoverTrigger } from "@/app/components/shared-ui/Popover";
import { PopoverClose } from "@radix-ui/react-popover";
import { ChevronRightIcon } from "@/app/icons";
interface Props {
  categories: Categories[] | undefined;
  active: number;
  setActive: Dispatch<SetStateAction<number>>;
  t: any;
}

const Index: FC<Props> = ({ categories, active, setActive, t }) => {
  return (
    <Popover>
      <PopoverTrigger className="space-x-2,5 ml-2 flex cursor-pointer items-center rounded-xl px-[18px] py-2 text-base font-medium leading-[200%] hover:bg-gray-1 2xl:h-10  2xl:px-3 2xl:py-1 2xl:text-sm 2xl:leading-8 md:text-sm">
        <p>{t("Index.categories")}</p>
        <ChevronRightIcon className="xl-5 h-6 w-6 rotate-90 xl:w-5" />
      </PopoverTrigger>
      <PopoverContent className="ml-4 w-fit rounded-xl border border-gray-2 py-3 pl-3 shadow-xl">
        <ul className="perfect-scrollbar h-80 w-52 space-y-2">
          {categories?.map(({ title }, idx) => (
            <li key={title} onClick={() => setActive(idx)} className="mr-1">
              <PopoverClose
                className={`h-12 w-full cursor-pointer rounded-xl px-[18px] text-start leading-[48px] transition duration-100 hover:bg-onHover 2xl:h-11 2xl:px-4 2xl:leading-10 md:h-10 md:text-sm md:leading-[36px] ${active === idx && "bg-accent"}`}
              >
                {title}
              </PopoverClose>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
};

export default Index;
