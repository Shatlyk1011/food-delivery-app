import axios from "../shared/lib/axios";

import { useQuery } from "@tanstack/react-query";

export const useGetCategories = () => {
  const { data } = useQuery<CategoryResponse>({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await axios({
        url: "/restaurants",
        // params: { "fields[0]": "title", sort: "title" },
      });
      console.log("datares", data);
      return data;
    },
  });

  return { categories: data?.data };
};
