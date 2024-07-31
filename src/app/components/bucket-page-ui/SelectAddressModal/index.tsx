"use client";
import { SearchIcon } from "@/app/icons";
import { FC, useState } from "react";

interface Props {
  handleCitySelect: (newAddress: string) => void;
  t: any;
}

const Index: FC<Props> = ({ handleCitySelect, t }) => {
  const [value, setValue] = useState("");
  return (
    <div className="mx-auto w-[90%] max-w-[940px] rounded-[14px] bg-bg-1 p-6 py-7 md:p-5 md:py-6 sm:p-4 sm:py-5">
      <h3 className="mb-[14px] text-2xl font-medium leading-6 sm:text-xl">{t("BucketForm.enterAddress")}</h3>
      <p className="mb-9 text-base font-medium text-text-2 sm:text-sm">{t("BucketForm.enterAddressSub")}</p>

      <form className="mb-6">
        <div className="flex space-x-2">
          <div className="flex w-full items-center rounded-2xl  bg-gray-2 px-4">
            <SearchIcon />
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              type="text"
              className="w-full bg-[transparent] py-2 pl-2.5 placeholder:font-medium placeholder:text-text-3 sm:py-1 sm:placeholder:text-sm "
              placeholder={t("BucketForm.enterHome")}
            />
          </div>
          <button
            type="button"
            className="h-12 w-40 rounded-[18px] bg-primary py-3 sm:h-10 sm:w-28 sm:py-2"
            onClick={() => handleCitySelect(value)}
          >
            OK
          </button>
        </div>
      </form>

      <div className="flex min-h-64 w-full items-center justify-center rounded-md bg-gray-2 text-2xl">map area</div>
    </div>
  );
};
export default Index;
