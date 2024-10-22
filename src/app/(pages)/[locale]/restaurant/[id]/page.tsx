"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";

//atoms
import { useAtom, useAtomValue } from "jotai";
import atoms from "@/app/(pages)/_providers/jotai";

//hooks
import useProductItem from "@/app/hooks/useProductItem";
import { useGetRestaurantById } from "@/app/services/useRestaurants";
import { isRestaurantOpen } from "@/app/hooks/getTimesTillMidnight";

//widgets
import Banner from "@/app/widgets/RestaurantPage/Banner";
import MenuSidebar from "@/app/widgets/RestaurantPage/MenuSidebar";
import Product from "@/app/widgets/RestaurantPage/Product";
const Cart = dynamic(() => import("@/app/widgets/RestaurantPage/Cart"), { ssr: false });
const ClearCartModal = dynamic(() => import("@/app/widgets/RestaurantPage/ClearCartModal"), { ssr: false });

import ProductSkeleton from "@/app/widgets/RestaurantPage/Product/Skeleton";
import { CakeIcon } from "@/app/icons";

const AboutProduct = dynamic(() => import("@/app/widgets/RestaurantPage/Product/AboutProduct"));

export default function RestaurantId({ params: { id } }) {
  const t = useTranslations();
  const [isClearModal, setIsClearModal] = useAtom(atoms.isClearBucketModal);
  const selectedItems = useAtomValue(atoms.selectedItems);

  const { restaurantInfo, withCategories, getRestaurant, isLoading } = useGetRestaurantById();

  const isRestaurantAvailable = isRestaurantOpen(
    restaurantInfo?.workingHours?.openTime,
    restaurantInfo?.workingHours?.closeTime,
  );

  const { addItem, clearItems, handleUnavailableWarning } = useProductItem(isRestaurantAvailable);

  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const closeModal = () => {
    setIsClearModal(false);
  };
  const handleClear = () => {
    clearItems();
    closeModal();
  };

  useEffect(() => {
    getRestaurant(id);
  }, []);

  return (
    <main className="box-content bg-bg-2">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex justify-between px-4 py-8 2xl:py-6 lg:px-2.5 lg:py-4 md:px-2 md:py-2.5">
          <div className="flex flex-1 space-x-8 2xl:space-x-4 md:space-x-0">
            <MenuSidebar
              menuTitle={t("RestaurantPage.menu")}
              backTitle={t("Index.back")}
              classes="md:hidden"
              withCategories={withCategories || []}
            />

            <div className="basis-[80%] md:basis-full">
              {restaurantInfo === null && (
                <p className="px-3 py-20 text-center text-2xl font-medium md:text-xl sm:text-lg">
                  Что то пошло не так, возможно этот ресторан закрылся
                </p>
              )}
              {restaurantInfo && (
                <Banner
                  bannerImageUrl={restaurantInfo?.bannerImage?.url}
                  t={t}
                  bannerInfo={{
                    deliveryTime: restaurantInfo?.deliveryTime,
                    title: restaurantInfo?.title,
                    address: restaurantInfo?.address,
                    workingHours: restaurantInfo?.workingHours,
                  }}
                />
              )}
              <div className="w-full">
                {restaurantInfo && restaurantInfo.freeAfterAmount > 0 && restaurantInfo.deliveryPrice !== 0 && (
                  <div className="mt-5 flex items-center space-x-2.5 rounded-2xl bg-[#FFD166]/10 px-4 py-3 text-text-4 md:px-3 md:py-2.5 md:text-xs">
                    <CakeIcon className="h-10 w-10 fill-primary md:h-8 md:w-8" />
                    <p>{t("RestaurantPage.freeDeliveryAfter", { price: restaurantInfo?.freeAfterAmount })}</p>
                  </div>
                )}
                {isLoading ? (
                  <div className="manual_grid_220 mt-2 2xl:mt-4 md:w-full">
                    <ProductSkeleton length={12} />
                  </div>
                ) : (
                  withCategories?.map(({ dishes, category }) => {
                    const { title, deliveryPrice } = restaurantInfo;
                    return (
                      <div key={category} className="mt-5">
                        <p className="ml-1 text-2xl font-semibold capitalize">{category}</p>
                        <div className="manual_grid_220 mt-2 2xl:mt-4 md:w-full">
                          {dishes?.map((d) => {
                            const isDishDisabled = d.availableAmount === 0;
                            return (
                              <Product
                                key={d.id}
                                isDishDisabled={isDishDisabled}
                                dish={d}
                                handleDish={() => setSelectedDish(d)}
                                addItem={() => addItem(d, { id, name: title, deliveryPrice })}
                                btnTitle={isDishDisabled ? t("Index.availableLater") : t("Index.add")}
                              />
                            );
                          })}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
          <aside className="right-32 top-48 ml-8 w-80 2xl:ml-4 xl:hidden">
            <div className="sticky right-0 top-24">
              <Cart
                t={t}
                restaurantInfo={{
                  title: selectedItems.dishes.at(-1)?.restaurant.title || restaurantInfo?.title,
                  deliveryPrice: restaurantInfo?.deliveryPrice,
                  deliveryTime: restaurantInfo?.deliveryTime,
                  address: restaurantInfo?.address,
                }}
                isDelivery={restaurantInfo?.isDelivery}
              />
            </div>
          </aside>
        </div>
        {selectedDish && <AboutProduct dish={selectedDish} handleClose={() => setSelectedDish(null)} t={t} />}
      </div>
      {!isRestaurantAvailable && (
        <button
          type="button"
          onClick={handleUnavailableWarning}
          className="fixed left-0 top-0 z-[10] h-screen w-full bg-white/30"
        ></button>
      )}
      {isClearModal && (
        <ClearCartModal
          t={t}
          handleClear={handleClear}
          close={closeModal}
          selectedRest={selectedItems.dishes.at(-1)?.restaurant.title}
          currentRest={restaurantInfo.title}
        />
      )}
    </main>
  );
}
