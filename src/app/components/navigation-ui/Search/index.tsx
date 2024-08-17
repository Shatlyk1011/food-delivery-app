import { FC, useState } from "react";

import { SearchIcon } from "@/app/icons";

interface Props {
  handleQuery: (val: string) => void;
  searchPlaceholder: string;
  searchTitle: string;
}

const Index: FC<Props> = ({ handleQuery, searchTitle, searchPlaceholder }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    handleQuery(query);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex h-12 justify-between overflow-hidden rounded-[14px] border-2 border-primary md:h-10 md:w-full"
    >
      <label className="flex w-full items-center space-x-2.5 px-2.5 py-3 xl:space-x-1.5 xl:p-1.5">
        <SearchIcon className="fill-text-4" />
        <input
          type="text"
          placeholder={searchPlaceholder}
          className="w-full bg-white outline-none md:text-sm md:placeholder:text-sm"
          onInput={(e) => setQuery(e.currentTarget.value)}
          value={query}
        />
      </label>
      <button type="submit" className="bg-primary px-4 py-2 font-medium">
        <span className="hidden md:block">
          <SearchIcon />
        </span>
        <span className="md:hidden">{searchTitle}</span>
      </button>
    </form>
  );
};
export default Index;
