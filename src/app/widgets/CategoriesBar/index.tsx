"use client";
import { FC } from "react";
import { useTranslations } from "next-intl";

//components
import DeliveryTime from "@/app/components/categories-bar-ui/DeliveryTime";
import Sort from "@/app/components/categories-bar-ui/Sort";
import Tags from "@/app/components/categories-bar-ui/Tags";

interface Props {
  categories: Categories[] | undefined;
  handleFilters: (key: keyof Filters, value: any) => void;
}
const Index: FC<Props> = ({ categories, handleFilters }) => {
  const t = useTranslations();

  return (
    <nav className="flex h-16 items-center justify-between rounded-[14px] bg-gray-2 pl-2 pr-4 shadow-sm 2xl:h-14  md:h-12 sm:pl-0 sm:pr-2">
      <Tags categories={categories} t={t} />
      <div className="flex items-center">
        <DeliveryTime t={t} handleFilters={handleFilters} />
        <Sort t={t} handleFilters={handleFilters} />
      </div>
    </nav>
  );
};
export default Index;
