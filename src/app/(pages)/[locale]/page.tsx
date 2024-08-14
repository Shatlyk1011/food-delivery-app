"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

//services
import { useGetCategories } from "@/app/services/useCategories";
import { useGetRestaurantsQuery } from "@/app/services/useRestaurants";

//components
import CategoriesBar from "@/app/widgets/CategoriesBar";
import RestaurantItem from "@/app/widgets/RestaurantItem";
import RestaurantItemSkeleton from "@/app/widgets/RestaurantItem/Skeleton";

export default function Home() {
  const t = useTranslations();

  const [filters, setFilters] = useState<Filters>({
    deliveryTime: 0,
    sortBy: null,
    tag: "all",
  });

  const handleFilters = (key: keyof Filters, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const { isFetchingNextPage, filteredRestaurants, fetchNextPage, isLoading } = useGetRestaurantsQuery(filters);

  const { categories } = useGetCategories();

  return (
    <main className="min-h-[calc(100vh-336px)]">
      <div className="mx-auto box-content max-w-[1440px] px-8 pt-12 2xl:pt-8 xl:px-5 xl:pt-6 md:px-3 md:pt-4">
        <h1 className="mb-8 text-5xl font-bold 2xl:mb-6 2xl:text-4xl md:mb-3 md:text-2xl">{t("MainPage.heading")}</h1>
        <div>
          <CategoriesBar categories={categories} handleFilters={handleFilters} />
          <div className="manual_grid_300 -mx-4 mt-8 xl:-mx-2 xl:mt-5">
            {filteredRestaurants?.map((rests) =>
              rests?.map((item) => <RestaurantItem item={item} key={item.id} t={t} />),
            )}
            {(isFetchingNextPage || isLoading) && <RestaurantItemSkeleton length={8} />}
          </div>
        </div>
      </div>
    </main>
  );
}
