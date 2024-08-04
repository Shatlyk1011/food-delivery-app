"use client";
import { useGetCategories } from "@/app/services/useCategories";
//services
import { useGetRestaurantsQuery } from "@/app/services/useRestaurants";
//components
import CategoriesBar from "@/app/widgets/CategoriesBar";
import RestaurantItem from "@/app/widgets/RestaurantItem";
import RestaurantItemSkeleton from "@/app/widgets/RestaurantItem/Skeleton";
import { useTranslations } from "next-intl";
import { useState } from "react";

const restaurantItems = [
  {
    id: Math.random() * 1000,
    imgSrc: "https://images.unsplash.com/photo-1452967712862-0cca1839ff27?q=80&w=2070",
    rank: "4.4 Average (200+)",
    title: "The Gastro Galaxy",
  },
  {
    id: Math.random() * 1000,
    imgSrc: "https://images.unsplash.com/photo-1560963806-394647f30329?q=80&w=2021",
    rank: "4.4 Average (200+)",
    title: "Bistro Breeze ",
  },
  {
    id: Math.random() * 1000,
    imgSrc: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=2070",
    rank: "4.4 Average (200+)",
    title: "Café Cosmos ",
  },
  {
    id: Math.random() * 1000,
    imgSrc: "https://images.unsplash.com/photo-1520218508822-998633d997e6?q=80&w=1887",
    rank: "4.4 Average (200+)",
    title: "Deli Dreams",
  },
  {
    id: Math.random() * 1000,
    imgSrc: "https://images.unsplash.com/photo-1448907503123-67254d59ca4f?q=80&w=2069",
    rank: "4.4 Average (200+)",
    title: "Pasta Paradiso",
  },

  {
    id: Math.random() * 1000,
    imgSrc: "https://images.unsplash.com/photo-1564844536325-08c9e7f70617?q=80&w=2071",
    rank: "4.4 Average (200+)",
    title: "Taco Temple ",
  },

  {
    id: Math.random() * 1000,
    imgSrc: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=2070",
    rank: "4.4 Average (200+)",
    title: "Sushi Sanctuary",
  },
  {
    id: Math.random() * 1000,
    imgSrc: "https://images.unsplash.com/photo-1583623025817-d180a2221d0a?q=80&w=2071",
    rank: "4.4 Average (200+)",
    title: "Fish Folly ",
  },
  {
    id: Math.random() * 1000,
    imgSrc: "https://images.unsplash.com/photo-1518492104633-130d0cc84637?q=80&w=1926",
    rank: "4.4 Average (200+)",
    title: "Vegan Voyage",
  },
];

export default function Home() {
  const t = useTranslations("MainPage");

  const [filters, setFilters] = useState<RestaurantFilters>({
    deliveryTime: null,
    sort: "",
  });

  const handleFilters = (key: keyof RestaurantFilters, value: null | string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const { isFetchingNextPage, restaurants } = useGetRestaurantsQuery(filters);

  const { categories } = useGetCategories();

  // example
  // useEffect(() => {
  //   const fetchRestaurantWithDishes = async () => {
  //     console.log("called");
  //     const query = `
  //       query GetRestaurantWithDishes($id: String!) {
  //         Restaurant(id: $id) {
  //           id
  //           title
  //         }
  //       }
  //     `;

  //     const variables = {
  //       id: "66af5ea65c494c3cc1a1f26f",
  //     };

  //     try {
  //       const response = await fetch("http://localhost:3000/api/graphql", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           query,
  //           variables,
  //         }),
  //       });

  //       const result = await response.json();
  //       if (result.data && result.data.Restaurant) {
  //         console.log("result.data", result.data);
  //       } else {
  //         console.error("Error fetching restaurant with dishes:", result.errors);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching restaurant with dishes:", error);
  //     }
  //   };

  //   fetchRestaurantWithDishes();
  // }, []);
  return (
    <main className="min-h-[calc(100vh-336px)]">
      <div className="mx-auto box-content max-w-[1440px] px-8 pt-12 2xl:pt-8 xl:px-5 xl:pt-6 md:px-3 md:pt-4">
        <h1 className="mb-8 text-5xl font-bold 2xl:mb-6 2xl:text-4xl md:mb-3 md:text-2xl">{t("heading")}</h1>
        <div>
          <CategoriesBar categories={categories} handleFilters={handleFilters} />
          <div className="manual_grid_300 -mx-4 mt-8 md:-mx-2 md:mt-5">
            {isFetchingNextPage ? (
              <RestaurantItemSkeleton length={12} />
            ) : (
              restaurantItems.map((item) => <RestaurantItem item={item} key={item.id} />)
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
