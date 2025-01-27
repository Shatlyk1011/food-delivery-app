"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FC, ReactNode, useState } from "react";

import { QueryConfig } from "./config";

interface Props {
  children: ReactNode;
}

const TanstackQueryProvider: FC<Props> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient(QueryConfig));
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
export default TanstackQueryProvider;
