import { FC, useState } from "react";

import { SearchIcon } from "@/icons";
import { cn } from "@/shared/lib/utils";

interface Props {
  handleQuery: (val: string) => void;
  searchPlaceholder: string;
  searchTitle: string;
  disabled: boolean;
}

const Index: FC<Props> = ({ handleQuery, searchTitle, searchPlaceholder, disabled }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    handleQuery(query);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "flex h-12 justify-between overflow-hidden rounded-[14px] border-2 border-primary md:h-10 md:w-full sm:h-8",
        disabled && "border-black/10",
      )}
    >
      <label className="flex w-full items-center space-x-2.5 px-2.5 py-3 xl:space-x-1.5 xl:p-1.5">
        <SearchIcon className={`fill-text-4 sm:h-5 sm:w-5 ${disabled && "fill-black/20"}`} />
        <input
          disabled={disabled}
          type="text"
          placeholder={searchPlaceholder}
          className="w-full bg-white outline-none disabled:placeholder:text-black/25 md:text-sm md:placeholder:text-sm"
          onInput={(e) => setQuery(e.currentTarget.value)}
          value={query}
        />
      </label>
      <button
        type="submit"
        disabled={disabled}
        className="bg-primary px-4 py-2 font-medium disabled:bg-black/10 disabled:text-black/20 sm:px-3 sm:py-1"
      >
        <span className="hidden md:block">
          <SearchIcon className={`sm:h-5 sm:w-5 ${disabled && "fill-black/30"}`} />
        </span>
        <span className="md:hidden">{searchTitle}</span>
      </button>
    </form>
  );
};
export default Index;
