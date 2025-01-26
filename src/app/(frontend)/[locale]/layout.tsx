import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Provider as JotaiProvider } from "jotai";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import NextTopLoader from "nextjs-toploader";
import { routing } from "@/i18n/routing";
import dynamic from "next/dynamic";

//widgets
import TailwindIndicator from "@/app/components/tailwind-indicator/tailwind-indicator";
import Footer from "@/app/widgets/Footer";
const Header = dynamic(() => import("@/app/widgets/Navigation"), { ssr: true });
const Sidebar = dynamic(() => import("@/app/widgets/Sidebar"), { ssr: true });

import { siteConfig } from "@/app/shared/site";
import { constructMetadata } from "@/app/shared/lib/utils";

import TanstackQueryProvider from "@/app/(frontend)/_providers/tanstack-query";

import "@/app/shared/styles/globals.scss";

const inter = Inter({ subsets: ["cyrillic"] });

export const metadata: Metadata = constructMetadata({
  title: siteConfig.name,
  description: siteConfig.description,
  image: siteConfig.ogImage,
});

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
  const messages = await getMessages();

  return (
    <html lang={locale || "en"}>
      <body className={inter.className}>
        <JotaiProvider>
          <NextIntlClientProvider messages={messages}>
            <TanstackQueryProvider>
              <Header />
              <Sidebar />
              <NextTopLoader
                color="#FBDB65"
                showSpinner={false}
                speed={300}
                zIndex={3000}
                initialPosition={0.3}
                crawlSpeed={400}
                height={6}
                easing="ease"
                crawl={true}
              />
              <div className="mt-20 w-full md:mt-16">{children}</div>
              <Footer />
              <TailwindIndicator />
            </TanstackQueryProvider>
          </NextIntlClientProvider>

          <Toaster duration={3000} richColors visibleToasts={2} theme="light" position="bottom-left" />
        </JotaiProvider>
      </body>
    </html>
  );
}
