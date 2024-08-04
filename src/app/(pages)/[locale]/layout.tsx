import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Provider as JotaiProvider } from "jotai";
import { Inter } from "next/font/google";

//widgets
import Footer from "@/app/widgets/Footer";
import Header from "@/app/widgets/Navigation";
import Sidebar from "@/app/widgets/Sidebar";

import TanstackQueryProvider from "@/app/(pages)/_providers/tanstack-query";

import "@/app/shared/styles/globals.scss";

const inter = Inter({ subsets: ["cyrillic"] });

interface Props {
  children: React.ReactNode;
  params: { locale: string };
}

export const metadata: Metadata = {
  title: "Food Delivery App",
};

export default async function RootLayout({ children, params: { locale } }: Props) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <JotaiProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <TanstackQueryProvider>
              <Header />
              <Sidebar />
              <div className="mt-20 w-full md:mt-16">{children}</div>
              <Footer />
            </TanstackQueryProvider>
          </NextIntlClientProvider>
        </JotaiProvider>
      </body>
    </html>
  );
}
