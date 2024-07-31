import { FC } from "react";
//jotai
import atoms from "@/app/(pages)/_providers/jotai";
import { useAtom } from "jotai";
//components
import { PopoverClose } from "@radix-ui/react-popover";
import { Popover, PopoverContent, PopoverTrigger } from "@/app/components/shared-ui/Popover";
import { LocationIcon } from "@/app/icons";
interface Props {
  cities: TitleValue[];
  regionsTitle: string;
  regionTitle: string;
}

const Index: FC<Props> = ({ cities, regionsTitle, regionTitle }) => {
  const [selectedCity, setSelectedCity] = useAtom(atoms.selectedCity);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="flex h-12 space-x-2.5 rounded-xl bg-primary px-[18px] py-3 outline-none focus:ring-2 focus:ring-text-1 xl:h-full xl:p-2.5 md:hidden"
        >
          <LocationIcon className="h-6 w-6 xl:h-5 xl:w-5" />
          <p className="font-medium xl:hidden">{selectedCity ? `${regionTitle}: ${selectedCity}` : regionsTitle}</p>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <ul>
          {cities.map(({ title, value }) => (
            <li key={value}>
              <PopoverClose
                className="h-12 w-full cursor-pointer px-4 py-3 text-start hover:bg-onHover"
                role="listitem"
                onClick={() => setSelectedCity(title)}
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
