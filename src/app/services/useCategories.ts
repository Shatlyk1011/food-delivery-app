import { useQuery } from "@tanstack/react-query";

import axios from "../shared/lib/axios";

export const useGetCategories = () => {
  const { data } = useQuery({
    queryFn: async () => {
      const { data } = await axios({
        // url: "/restaurants",
        // params: { "fields[0]": "title", sort: "title" },
      });
      return data;
    },
    queryKey: ["categories"],
  });

  return { categories: data?.data };
};
