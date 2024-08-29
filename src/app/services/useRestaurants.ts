import axios from "@/app/shared/lib/axios";

import { DEFAULT_LIMIT } from "@/app/shared/constants";

import { useInfiniteQuery, useMutation } from "@tanstack/react-query";

import { RESTAURANT, RESTAURANTS } from "./query/restaurantQuery";

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

export const useGetRestaurantById = (schema?: string) => {
  const { data, mutate, isPending } = useMutation<RestaurantId, { id: string }, any>({
    mutationKey: ["restaurantId"],
    mutationFn: async (id: string): Promise<RestaurantId> => {
      const { data } = await axios({
        data: {
          query: schema || RESTAURANT,
          variables: { id },
        },
      });
      console.log("data.data.Restaurant", data.data.Restaurant);
      return data.data.Restaurant;
    },
    // ???
    onError:(err) => console.log('ID',err)
  });

  const withCategories: WithCategories[] = data?.dishes?.reduce((acc, dish) => {
    let category = dish.categories?.title || "Others"; // Default to 'Others' if no category is provided

    let categoryObj = acc.find((item) => item.title === category);

    if (!categoryObj) {
      categoryObj = { category: category, dishes: [] };
      acc.push(categoryObj);
    }

    categoryObj.dishes.push(dish);

    return acc;
  }, []);

  return { restaurantInfo: data, withCategories, getRestaurant: mutate, isPending };
};
