import { FC } from "react";

import { SearchIcon } from "@/app/icons";

interface Props {
  searchTitle: string;
  searchPlaceholder: string;
}

const Index: FC<Props> = ({ searchTitle, searchPlaceholder }) => {
  return (
    <div className="flex h-12 justify-between overflow-hidden rounded-[14px] border-2 border-primary md:h-10 md:w-full">
      <label className="flex w-full items-center space-x-2.5 px-2.5 py-3 xl:space-x-1.5 xl:p-1.5">
        <SearchIcon className="fill-text-4" />
        <input
          type="text"
          placeholder={searchPlaceholder}
          className="w-full bg-white outline-none md:text-sm md:placeholder:text-sm"
        />
      </label>
      <button className="bg-primary px-4 py-2 font-medium md:hidden">{searchTitle}</button>
      <button className="hidden bg-primary px-4 py-2 font-medium md:block md:px-3">
        <SearchIcon />
      </button>
    </div>
  );
};
export default Index;
