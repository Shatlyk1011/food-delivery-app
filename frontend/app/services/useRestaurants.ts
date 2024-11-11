import axios from "@/shared/lib/axios";

import { DEFAULT_DELIVERY_TIME, DEFAULT_LIMIT } from "@/shared/constants";

import { useInfiniteQuery, useMutation } from "@tanstack/react-query";

import { RESTAURANT, RESTAURANTS } from "./query/restaurantQuery";
import { useState } from "react";

export const useGetRestaurantsQuery = (
  { sortBy, deliveryTime, tag }: Filters,
  query: string,
  initialData: MainPageRestaurant[] | null = null,
) => {
  const { data, fetchNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery<MainPageRestaurant[]>({
    queryKey: ["restaurants", { sortBy, query }],

    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await axios({
        data: {
          query: RESTAURANTS,
          variables: { limit: DEFAULT_LIMIT, pageParam, sortBy, query },
        },
      });
      return await data.data.Restaurants.docs;
    },
    initialData: initialData ? { pageParams: [], pages: [initialData] } : undefined,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.length > 0 ? allPages?.length + 1 : undefined;
    },
    initialPageParam: 1,
  });

  //use memo?
  //filter by delivery time
  const filteredRestaurants = data?.pages?.map((rests, idx): MainPageRestaurant[] => {
    if (deliveryTime !== DEFAULT_DELIVERY_TIME) {
      const res = [];
      const filterByTime = rests.filter((item) => +item.workingHours.closeTime.slice(1) >= deliveryTime);
      res[idx] = filterByTime;
      return res.flat(2);
    }
    return data?.pages.flat(2);
  });
  return { filteredRestaurants, fetchNextPage, isFetchingNextPage, isLoading };
};

export const useGetRestaurantById = (schema?: string) => {
  const [isLoading, setLoading] = useState(true);
  const { data, mutate } = useMutation<RestaurantId, { id: string }, any>({
    mutationKey: ["restaurantId"],
    mutationFn: async (id: string): Promise<RestaurantId> => {
      try {
        const { data } = await axios({
          data: {
            query: schema || RESTAURANT,
            variables: { id },
          },
        });
        console.log("data.data.Restaurant", data.data.Restaurant);
        return data.data.Restaurant;
      } catch (err) {
        console.log("err", err);
      } finally {
        setLoading(false);
      }
    },
  });

  const withCategories: WithCategories[] = data?.dishes?.reduce((acc, dish) => {
    let category = dish.categories?.category || "Другие";

    let categoryObj = acc.find((item) => item.category === category);

    if (!categoryObj) {
      categoryObj = { category, dishes: [] };
      acc.push(categoryObj);
    }

    categoryObj.dishes.push(dish);

    return acc;
  }, []);

  return { restaurantInfo: data, withCategories, getRestaurant: mutate, isLoading };
};
