"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

//jotai
import { useAtom } from "jotai";
import atoms from "@/app/(pages)/_providers/jotai";

//services
import { useGetCategories } from "@/app/services/useCategories";
import { useGetRestaurantsQuery } from "@/app/services/useRestaurants";

import { defaultFilters } from "@/app/data";
import { USER_TOKEN } from "@/app/shared/constants";

//components
import RestaurantItemSkeleton from "@/app/widgets/RestaurantItem/Skeleton";
import RestaurantItem from "@/app/widgets/RestaurantItem";
import CategoriesBar from "@/app/widgets/CategoriesBar";

export default function Home() {
  const t = useTranslations();

  const [query, setQuery] = useAtom(atoms.query);
  const [filters, setFilters] = useState<Filters>(defaultFilters);

  const clearFilters = () => {
    setQuery("");
    setFilters(defaultFilters);
  };

  const handleFilters = (key: keyof Filters, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  //use "fetchNextPage" for infinite scroll
  const { isFetchingNextPage, filteredRestaurants, fetchNextPage, isLoading } = useGetRestaurantsQuery(filters, query);

  const { categories } = useGetCategories();

  // demo purpose. remove this lines in production version
  useEffect(() => {
    localStorage.removeItem(USER_TOKEN)
  }, [])

  return (
    <main className="min-h-[calc(100vh-313px)]">
      <div className="mx-auto box-content max-w-[1440px] px-8 pt-12 2xl:pt-8 xl:px-5 xl:pt-6 md:px-3 md:pt-4">
        <h1 className="mb-8 text-5xl font-bold 2xl:mb-6 2xl:text-4xl md:mb-3 md:text-2xl">{t("MainPage.heading")}</h1>
        <div>
          <CategoriesBar categories={categories} handleFilters={handleFilters} />
          <div className="manual_grid_300 -mx-4 mt-8 xl:-mx-2 xl:mt-5">
            {filteredRestaurants?.map((rests) =>
              rests?.map((item) => (
                <RestaurantItem item={item} isDeliveryFree={item.deliveryPrice === 0} key={item.id} t={t} />
              )),
            )}
            {(isFetchingNextPage || isLoading) && <RestaurantItemSkeleton length={8} />}
          </div>
          {filteredRestaurants && !filteredRestaurants[0].length && (
            <div className="w-full  gap-4 rounded-[14px] px-4 py-4 text-center">
              <p className="rounded-[14px] px-4 py-2.5 text-base font-semibold">{t("Actions.notFound")}</p>
              <button onClick={clearFilters} className="rounded-full bg-primary px-3 py-2 text-xs tracking-wide">
                {t("Index.clearFilters")}
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
