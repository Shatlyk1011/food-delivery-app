import axios from "../shared/lib/axios";

import { useQuery } from "@tanstack/react-query";

export const useGetCategories = () => {
  const { data } = useQuery<CategoryResponse>({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await axios({
        url: "/categories",
        params: { "fields[0]": "title", sort: "title" },
      });
      return data;
    },
  });

  return { categories: data?.data };
};
