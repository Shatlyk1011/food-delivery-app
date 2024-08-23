"use client";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

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

const foodDescriptions = [
  "A delightful blend of fresh vegetables and herbs, seasoned to perfection.",
  "Rich, creamy, and full of flavor - our signature pasta sauce.",
  "Juicy, succulent chicken marinated in a tangy lemon herb dressing.",
  "Freshly baked bread with a crispy exterior and soft, fluffy interior.",
  "Light and refreshing, this salad is a burst of flavors.",
  "Indulge in our rich, velvety chocolate cake, a true dessert lover's dream.",
  "Our pizza crust is hand-tossed and perfectly charred, topped with your favorite ingredients.",
  "A hearty bowl of soup, packed with nutrients and comfort.",
  "Sweet and tart, our key lime pie is a must-try!",
  "Creamy mashed potatoes, made from scratch every day.",
];
function getRandomDescription() {
  const index = Math.floor(Math.random() * foodDescriptions.length);
  return foodDescriptions[index];
}

const dishes = [
  {
    id: 1,
    description: getRandomDescription(),
    gramm: 500,
    price: 969,
    imgSrc: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?q=80&w=2070",
  },
  {
    id: 2,
    description: getRandomDescription(),
    gramm: 400,
    price: 599,
    imgSrc: "https://images.unsplash.com/photo-1461648704997-bc28bf991386?q=80&w=2070",
  },
  {
    id: 3,
    description: getRandomDescription(),
    gramm: 800,
    price: 559,
    imgSrc: "https://images.unsplash.com/photo-1529694157872-4e0c0f3b238b?q=80&w=2070",
  },
  {
    id: 4,
    description: getRandomDescription(),
    gramm: 660,
    price: 369,
    imgSrc: "https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?q=80&w=2070",
  },
  {
    id: 5,
    description: getRandomDescription(),
    gramm: 765,
    price: 259,
    imgSrc: "https://images.unsplash.com/photo-1527324688151-0e627063f2b1?q=80&w=2070",
  },
  {
    id: 6,
    description: getRandomDescription(),
    gramm: 400,
    price: 199,
    imgSrc: "https://images.unsplash.com/photo-1670398564097-0762e1b30b3a?q=80&w=2071",
  },
  {
    id: 7,
    description: getRandomDescription(),
    gramm: 1000,
    price: 299,
    imgSrc: "https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=2080",
  },
  {
    id: 8,
    description: getRandomDescription(),
    gramm: 320,
    price: 700,
    imgSrc: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069",
  },
];

export default function Home({ params: { id } }) {
  const t = useTranslations();
  const [isLoading, setIsLoading] = useState(true);
  const [isClearModal, setIsClearModal] = useAtom(atoms.isClearBucketModal);
  const selectedItems = useAtomValue(atoms.selectedItems);

  const { data, getRestaurant } = useGetRestaurantById();

  const { addItem, clearItems } = useProductItem();

  const closeModal = () => {
    setIsClearModal(false);
  };
  const handleClear = () => {
    clearItems();
    closeModal();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    getRestaurant(id);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="box-content bg-bg-2">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex justify-between px-4 py-8 2xl:py-6 md:px-3 md:py-4">
          <div className="flex flex-1 space-x-8 2xl:space-x-4 md:space-x-0">
            <MenuSidebar menuTitle={t("RestaurantPage.menu")} backTitle={t("Index.back")} classes="md:hidden" />
            <div className="basis-[80%] md:basis-full">
              <Banner />
              <div className="manual_grid_220 mt-6 2xl:mt-4 md:w-full">
                {isLoading ? (
                  <ProductSkeleton length={12} />
                ) : (
                  dishes.map((item) => (
                    <Product
                      key={Math.random() + 1000}
                      item={item}
                      //restraurant id and dish id
                      addItem={() => addItem(item, { id, name: "Los Pollas", deliveryPrice: 14, isDelivery: true })}
                      addTitle={t("Index.add")}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
          <aside className="right-32 top-48 ml-8 w-80 2xl:ml-4  xl:hidden">
            <div className="sticky right-0 top-24">
              <Cart t={t} restaurantTitle={selectedItems.restaurantInfo?.name || "backend name"} />
            </div>
          </aside>
        </div>
      </div>
      {isClearModal && (
        <ClearCartModal
          t={t}
          handleClear={handleClear}
          close={closeModal}
          selectedRest={selectedItems.restaurantInfo.name}
          currentRest={"Los Pollos2"}
        />
      )}
    </main>
  );
}
