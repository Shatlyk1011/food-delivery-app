import axios from "@/app/shared/lib/axios";

import { DEFAULT_LIMIT } from "@/app/shared/constants";

import { useInfiniteQuery } from "@tanstack/react-query";

import { RESTAURANTS } from "./query";

export const useGetRestaurantsQuery = (
  { sortBy, deliveryTime, tag }: Filters,
  initialData: MainPageRestaurant[] | null = null,
) => {
  const { data, fetchNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery<MainPageRestaurant[]>({
    queryKey: ["restaurant", { sortBy }],

    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await axios({
        data: {
          query: RESTAURANTS,
          variables: { limit: DEFAULT_LIMIT, pageParam, sortBy },
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

  const filteredRestaurants = data?.pages?.map((rests, idx) => {
    if (deliveryTime !== 0) {
      console.log("deliveryTime", deliveryTime);
      const res = [];
      const filterByTime = rests.filter((item) => +item.workingHours.closeTime.slice(1) >= deliveryTime);
      res[idx] = filterByTime;

      return res.flat(2);
    }
    return data?.pages.flat(2);
  });
  return { filteredRestaurants, fetchNextPage, isFetchingNextPage, isLoading };
};
