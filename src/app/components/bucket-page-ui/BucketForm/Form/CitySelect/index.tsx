import { FC } from "react";

//components
import { HomeIcon } from "@/app/icons";
import { ChevronDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/app/components/shared-ui/Popover";
import { PopoverClose } from "@radix-ui/react-popover";

import { CITIES } from "@/app/data";

interface Props {
  className?: string;
  t: any;
  value: string;
  onChange: (city: string) => void;
}
const Index: FC<Props> = ({ className, t, ...props }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="relative z-10 flex rounded-xl">
          <div className="relative flex items-center space-x-2.5">
            <HomeIcon />
            <p className="line-clamp-1 text-base font-bold sm:text-sm">
              {props.value || t("BucketForm.chooseAddress")}
            </p>
            <ChevronDown width={20} height={20} />
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent className="max-w-fit overflow-hidden rounded-[14px] p-0 shadow-xl">
        <ul className="cursor-pointer ">
          {CITIES.map(({ title, value }) => (
            <li key={value} onClick={() => props.onChange(title)}>
              <PopoverClose className="line-clamp-2 w-full px-6 py-5 text-start hover:bg-onHover md:px-5 md:py-4 sm:px-4 sm:py-3">
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
