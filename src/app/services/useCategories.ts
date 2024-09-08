import { useQuery } from "@tanstack/react-query";

import axios from "../shared/lib/axios";

import { CATEGORIES } from "./query/restaurantQuery";

export const useGetCategories = (type: CategoryTypes = "restaurant") => {
  const { data: categories } = useQuery<Categories[]>({
    queryFn: async () => {
      const { data } = await axios({
        data: {
          query: CATEGORIES,
          variables: { type, limit: 30 },
        },
      });
      return await data.data.Categories.docs;
    },
    staleTime: Infinity,
    queryKey: ["categories"],
  });

  return { categories };
};
