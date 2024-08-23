import axios from "@/app/shared/lib/axios";

import { DEFAULT_LIMIT } from "@/app/shared/constants";

import { useInfiniteQuery, useMutation } from "@tanstack/react-query";

import { RESTAURANT, RESTAURANTS } from "./query";

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
  const filteredRestaurants = data?.pages?.map((rests, idx) => {
    if (deliveryTime !== 0) {
      const res = [];
      const filterByTime = rests.filter((item) => +item.workingHours.closeTime.slice(1) >= deliveryTime);
      res[idx] = filterByTime;

      return res.flat(2);
    }
    return data?.pages.flat(2);
  });
  return { filteredRestaurants, fetchNextPage, isFetchingNextPage, isLoading };
};

export const useGetRestaurantById = () => {
  const { data, mutate } = useMutation<any, any, any, any>({
    mutationFn: async (id: string) => {
      const { data } = await axios({
        data: {
          query: RESTAURANT,
          variables: { id },
        },
      });
      console.log("id", data);
      return data.data.Restaurant;
    },
  });

  return { data, getRestaurant: mutate };
};
