import { FC, useState } from "react";

//components
import { Popover, PopoverContent, PopoverTrigger } from "@/app/components/shared-ui/Popover";
import { RadioGroup, RadioGroupItem } from "@/app/components/shared-ui/RadioGroup";
import { CloseIcon, SortIcon } from "@/app/icons";
import { PopoverClose } from "@radix-ui/react-popover";

interface Props {
  handleFilters: (key: keyof Filters, value: string | null) => void;
  t: any;
}

type SortTypes = {
  title: string;
  value: SortBy;
};

const Index: FC<Props> = ({ handleFilters, t }) => {
  const [sortBy, setSortBy] = useState("");

  const sortList: SortTypes[] = [
    { title: "MainPage.trustOne", value: "" },
    { title: "MainPage.fastOne", value: "deliveryTime" },
    { title: "MainPage.budgetOne", value: "budgetCategory" },
    { title: "MainPage.expensiveOne", value: "-budgetCategory" },
  ];

  const handleSubmit = () => {
    handleFilters("sortBy", sortBy);
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex space-x-1 rounded-xl px-[18px] py-3 2xl:px-3 2xl:py-2 xl:px-2 xl:py-1">
          <SortIcon />
          <h6 className="font-normal 2xl:text-sm 2xl:leading-6 md:hidden">{t("MainPage.sortBy")}</h6>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[360px] overflow-hidden rounded-[14px] p-0 shadow-xl 2xl:mr-8 xl:mr-5 md:mr-4 md:w-[265px]">
        <div className="w-full rounded-[14px] bg-bg-1 shadow-md">
          <div>
            <div className="flex items-center justify-between border-b border-gray-2">
              <h4 className="px-5 pb-2 pt-3 text-xl font-bold tracking-wide md:px-4 md:text-sm md:tracking-normal">
                {t("MainPage.whichShow")}{" "}
              </h4>
              <PopoverClose className="mr-2 rounded-full bg-gray-1 p-[2px]">
                <CloseIcon className="h-5 w-5 md:h-4 md:w-4" />
              </PopoverClose>
            </div>
            <RadioGroup defaultValue="012" className="px-5 py-2 md:px-4 md:text-sm">
              {sortList.map(({ title, value }) => (
                <label
                  htmlFor={title}
                  key={title}
                  className="flex cursor-pointer items-center space-x-[18px] py-3 md:py-1"
                >
                  <RadioGroupItem
                    onClick={(e) => setSortBy(e.currentTarget.value)}
                    checked={value === sortBy}
                    value={value}
                    id={title}
                  />
                  <p>{t(title)}</p>
                </label>
              ))}
            </RadioGroup>
          </div>

          <div className="mt-2 border-t border-gray-2 p-5 md:p-3">
            <PopoverClose
              type="button"
              onClick={handleSubmit}
              className="h-12 w-full rounded-[14px] bg-primary text-center md:h-10 md:rounded-3xl md:text-sm md:font-bold"
            >
              {t("Index.show")}
            </PopoverClose>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
export default Index;
