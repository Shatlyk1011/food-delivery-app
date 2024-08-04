import { useQuery } from "@tanstack/react-query";

import axios from "../shared/lib/axios";

export const useGetCategories = () => {
  const { data } = useQuery<CategoryResponse>({
    queryFn: async () => {
      const { data } = await axios({
        url: "/restaurants",
        // params: { "fields[0]": "title", sort: "title" },
      });
      console.log("datares", data);
      return data;
    },
    queryKey: ["categories"],
  });

  return { categories: data?.data };
};
