import axios from "@/app/shared/lib/axios";

import { DEFAULT_LIMIT } from "@/app/shared/constants";

import { useInfiniteQuery } from "@tanstack/react-query";

import { RESTAURANTS } from "./query";

export const useGetRestaurantsQuery = (params: any, initialData: MainPageRestaurant[] | null = null) => {
  const { data, fetchNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery<MainPageRestaurant[]>({
    queryKey: ["restaurant", params],

    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await axios({
        url: "/graphql",
        method: "POST",
        data: {
          query: RESTAURANTS,
          variables: { limit: DEFAULT_LIMIT, page: pageParam },
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
