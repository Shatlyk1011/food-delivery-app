import axios from "@/app/shared/lib/axios";

import { DEFAULT_LIMIT } from "@/app/shared/constants";

import { useInfiniteQuery } from "@tanstack/react-query";

const BaseParams = {
  "fields[0]": "title",
  "fields[1]": "delivery_time",
  "fields[2]": "budget_category",
  "populate[banner_url][fields][0]": "url",
  "populate[banner_url][fields][1]": "alternativeText",

  "pagination[pageSize]": DEFAULT_LIMIT,

  "filters[is_blocked][$eq]": false,
};

export const useGetRestaurantsQuery = (params: RestaurantFilters, initialData: RestaurantResponse[] | null = null) => {
  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery<RestaurantResponse[]>({
    queryKey: ["restaurant", params],
    queryFn: async ({ pageParam }) => {
      const { data } = await axios({
        url: "/restaurants",
        params: { "pagination[page]": pageParam, ...BaseParams, ...params },
      });
      return data;
    },
    initialData: initialData ? { pageParams: [], pages: [initialData] } : undefined,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.length > 0 ? allPages?.length + 1 : undefined;
    },
    initialPageParam: 1,
  });

  return { restaurants: data?.pages, fetchNextPage, isFetchingNextPage };
};
