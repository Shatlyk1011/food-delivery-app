import { useQuery } from "@tanstack/react-query";

import axios from "../shared/lib/axios";

import { CITIES_QUERY } from "./query/citiesQuery";

export const useGetCities = () => {
  const { data: cities } = useQuery<City[]>({
    queryFn: async () => {
      const { data } = await axios({
        data: {
          query: CITIES_QUERY,
          variables: { limit: 30 },
        },
      });
      return await data.data.Cities.docs;
    },
    staleTime: Infinity,
    queryKey: ["cities"],
  });

  return { cities };
};
