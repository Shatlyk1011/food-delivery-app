export const QueryConfig = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
    mutations: {
      onError: (error: Error) => {
        /** we can use toast or notification here */
        console.error(error.message);
      },
    },
  },
};
