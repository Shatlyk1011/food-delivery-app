"use client";
import { useEffect } from "react";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";

//atoms
import { useAtom, useAtomValue } from "jotai";
import atoms from "@/app/(pages)/_providers/jotai";

//hooks
import useProductItem from "@/app/hooks/useProductItem";
import { useGetRestaurantById } from "@/app/services/useRestaurants";

//widgets
import Banner from "@/app/widgets/RestaurantPage/Banner";
import MenuSidebar from "@/app/widgets/RestaurantPage/MenuSidebar";
import Product from "@/app/widgets/RestaurantPage/Product";
const Cart = dynamic(() => import("@/app/widgets/RestaurantPage/Cart"), { ssr: false });
const ClearCartModal = dynamic(() => import("@/app/widgets/RestaurantPage/ClearCartModal"), { ssr: false });

import ProductSkeleton from "@/app/widgets/RestaurantPage/Product/Skeleton";

export default function Home({ params: { id } }) {
  const t = useTranslations();
  const [isClearModal, setIsClearModal] = useAtom(atoms.isClearBucketModal);
  const selectedItems = useAtomValue(atoms.selectedItems);

  const { restaurantInfo, withCategories, getRestaurant, isPending } = useGetRestaurantById();
  const { addItem, clearItems } = useProductItem();

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
        <div className="flex justify-between px-4 py-8 2xl:py-6 md:px-3 md:py-4">
          <div className="flex flex-1 space-x-8 2xl:space-x-4 md:space-x-0">
            <MenuSidebar
              menuTitle={t("RestaurantPage.menu")}
              backTitle={t("Index.back")}
              classes="md:hidden"
              withCategories={withCategories || []}
            />
            <div className="basis-[80%] md:basis-full">
              {restaurantInfo && (
                <Banner
                  bannerUrl={restaurantInfo?.bannerImage?.url}
                  t={t}
                  bannerInfo={{ deliveryTime: restaurantInfo?.deliveryTime, title: restaurantInfo?.title }}
                />
              )}
              <div className="w-full">
                {isPending ? (
                  <ProductSkeleton length={12} />
                ) : (
                  withCategories?.map(({ dishes, category }) => {
                    const { title, deliveryPrice, isDelivery } = restaurantInfo;
                    return (
                      <div key={category} className="mt-5">
                        <p className="ml-1 text-2xl font-medium capitalize">{category}</p>
                        <div className="manual_grid_220 mt-2 2xl:mt-4 md:w-full">
                          {dishes?.map((d) => (
                            <Product
                              key={d.id}
                              dish={d}
                              addItem={() => addItem(d, { id, name: title, deliveryPrice, isDelivery })}
                              addTitle={t("Index.add")}
                            />
                          ))}
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
                }}
                isDelivery={restaurantInfo?.isDelivery}
              />
            </div>
          </aside>
        </div>
      </div>
      {isClearModal && (
        <ClearCartModal
          t={t}
          handleClear={handleClear}
          close={closeModal}
          selectedRest={selectedItems.dishes.at(-1).restaurant.title}
          currentRest={restaurantInfo.title}
        />
      )}
    </main>
  );
}
