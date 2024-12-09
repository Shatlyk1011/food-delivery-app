import { FC } from "react";

import { BackIcon } from "@/app/icons";

import OverlapList from "./OverlapList";

interface Props {
  overlap: string;
  closeOverlap: (str: string) => void;
  overlapList: { title: string; value?: string }[];
  handleLanguageChange: (locale: "ru" | "tk") => void;
  handleCitySelect: (str: string) => void;
  t: any;
}

const Index: FC<Props> = ({ overlap, closeOverlap, handleCitySelect, handleLanguageChange, overlapList, t }) => {
  return (
    <div
      className={`fixed top-0 z-[1010] h-full w-64 bg-gray-3 transition-all duration-500 ${overlap ? "left-0" : "left-[-100%]"}`}
    >
      <header className="flex h-16 w-full items-center border-b border-gray-1 p-4">
        <button className="cursor-pointer" onClick={() => closeOverlap("")}>
          <BackIcon className="h-6 w-6" />
        </button>
        <span className="w-full text-center">
          {overlap === "language" ? t("Index.language") : t("Index.chooseCity")}
        </span>
      </header>
      <OverlapList
        overlap={overlap}
        overlapList={overlapList}
        handleCitySelect={handleCitySelect}
        handleLanguageChange={handleLanguageChange}
      />
    </div>
  );
};

export default Index;
