import axios from "@/app/shared/lib/axios";

import { DEFAULT_LIMIT } from "@/app/shared/constants";

import { useInfiniteQuery } from "@tanstack/react-query";

import { RESTAURANTS } from "./query";

export const useGetRestaurantsQuery = (
  { sortBy, deliveryTime }: Filters,
  initialData: MainPageRestaurant[] | null = null,
) => {
  const { data, fetchNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery<MainPageRestaurant[]>({
    queryKey: ["restaurant", { sortBy, deliveryTime }],

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

  return { restaurants: data?.pages, fetchNextPage, isFetchingNextPage, isLoading };
};
