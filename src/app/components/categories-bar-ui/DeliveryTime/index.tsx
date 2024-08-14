"use client";
import { FC, useState } from "react";

//components
import { CheckIcon, ChevronRightIcon } from "@/app/icons";
import { Popover, PopoverContent, PopoverTrigger } from "@/app/components/shared-ui/Popover";
import { PopoverClose } from "@radix-ui/react-popover";

import getTimesTillMidnight from "@/app/hooks/getTimesTillMidnight";

interface Props {
  handleFilters: (key: keyof Filters, value: any) => void;
  t: any;
}

const Index: FC<Props> = ({ t, handleFilters }) => {
  const [active, setActive] = useState(0);

  const deliveryTimes = [t("Index.now"), ...getTimesTillMidnight()];

  const handleSelect = (time: string, idx: number) => {
    const convertedTime = idx === 0 ? 0 : +time.replace(":", "");
    setActive(idx);
    handleFilters("deliveryTime", convertedTime);
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="z-10 flex items-center rounded-xl px-[18px] py-3 2xl:px-3 2xl:py-2 xl:px-2 xl:py-1 md:space-x-1">
          <h6 className="font-medium 2xl:text-sm 2xl:leading-8 xl:leading-4">{t("Index.delivery")}</h6>
          <p className="flex items-center justify-center space-x-1 2xl:text-sm 2xl:leading-8 md:hidden">
            : <span className="pl-4">{deliveryTimes[active]}</span>
          </p>
          <ChevronRightIcon className="h-6 w-6 rotate-90 xl:h-5 xl:w-5" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="mr-4 h-96 overflow-hidden rounded-[14px] border border-gray-2 p-0 shadow-xl md:h-80 md:w-64">
        <div className="h-full w-full bg-bg-1 pb-3 pl-4 pt-6 shadow-md md:px-3 md:py-5">
          <ul className="perfect-scrollbar flex h-full w-full flex-col space-y-3 text-start">
            {deliveryTimes.map((time, idx) => (
              <li onClick={() => handleSelect(time, idx)} key={time} className="mr-1">
                <PopoverClose
                  className={`flex w-full items-center justify-between rounded-[14px] px-3 py-[14px] transition-all duration-150 hover:bg-onHover ${active === idx && "bg-accent font-medium hover:bg-accent md:py-[10px] md:text-sm"}`}
                >
                  <p>{time}</p>
                  {active === idx && <CheckIcon />}
                </PopoverClose>
              </li>
            ))}
          </ul>
        </div>
      </PopoverContent>
    </Popover>
  );
};
export default Index;
