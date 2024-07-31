import { FC } from "react";

//components
import { HomeIcon, PlusIcon } from "@/app/icons";
import { ChevronDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/app/components/shared-ui/Popover";
import { PopoverClose } from "@radix-ui/react-popover";

interface Props {
  handleCitySelect: () => void;
  className?: string;
  t: any;
  value: string;
  onChange: (city: string) => void;
}
const Index: FC<Props> = ({ handleCitySelect, className, t, ...props }) => {
  const addresses = [
    {
      id: 24,
      address: "Парижской коммуны, 58",
    },
    {
      id: 34,
      address: "Химик, 24",
    },
  ];
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
        <div>
          <ul className="cursor-pointer">
            <li>
              <PopoverClose
                className="flex w-full items-center justify-between space-x-2.5 border-b border-b-gray-2 px-6 py-5 text-base font-medium hover:bg-onHover md:px-5  md:py-4 sm:px-4 sm:py-3 sm:text-sm"
                onClick={handleCitySelect}
              >
                <p>{t("BucketForm.addNewAddress")}</p>
                <PlusIcon />
              </PopoverClose>
            </li>
            {addresses.map(({ address, id }) => (
              <li key={id} onClick={() => props.onChange(address)}>
                <PopoverClose className="line-clamp-2 w-full px-6 py-5 text-start hover:bg-onHover md:px-5 md:py-4 sm:px-4 sm:py-3">
                  {address}
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
