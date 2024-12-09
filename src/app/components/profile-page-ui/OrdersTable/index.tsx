import { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

//components
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/app/components/shared-ui/Collapsible";
import { ChevronDown } from "lucide-react";
import InnerTable from "./InnerTable";
import EmptyBucket from "@/app/components/shared-ui/EmptyBucket";

import { getLocaleDate } from "@/app/hooks/getLocaleData";

import { PROFILE_OUTER_HEAD, ORDER_STATUSES, STATUS_CLASSES } from "@/app/data";

interface Props {
  userOrders: UserOrder[];
  t: any;
}

const OrdersTable: FC<Props> = ({ userOrders, t }) => {
  const { locale } = useRouter();

  return (
    <section className="h-[100vh-366px] w-full">
      <h1 className="mb-4 pt-2 text-2xl font-semibold">{t("ProfilePage.history")}</h1>
      <p className="w-[75%] text-balance text-lg leading-6 xl:w-full">{t("ProfilePage.info")}</p>
      <div className="w-full overflow-auto">
        <div className="mt-4 min-w-[800px] border border-black/15 shadow-xl">
          {/* /header */}
          <ul className="flex w-full items-center bg-gray-2/70 text-base font-bold text-black/80 xl:text-sm md:text-xs [&>*]:p-4 xl:[&>*]:p-2.5 md:[&>*]:p-2">
            <li className="w-[5%]"></li>
            {PROFILE_OUTER_HEAD.map(({ title, className }) => (
              <li className={`${className}`} key={title}>
                {t(title)}
              </li>
            ))}
            <li className="flex w-[16%] items-center space-x-4">
              <p>{t("ProfilePage.status")}</p>
            </li>
          </ul>
          {/* //body */}
          <div className="w-full">
            {userOrders?.map(
              ({ restaurantName, district, apartment, totalAmount, createdAt, deliveryPrice, orderStatus, dishes }) => (
                <Collapsible key={createdAt}>
                  <div className="flex flex-col">
                    <ul className="flex items-center break-words border-b border-black/20 xl:text-sm md:text-xs [&>*]:p-4 xl:[&>*]:p-2.5 md:[&>*]:p-1.5">
                      <li className="w-[5%] ">
                        <CollapsibleTrigger asChild>
                          <button className="justify-center rounded-full p-2 duration-150 hover:bg-gray-2">
                            <ChevronDown className="h-4 w-4" />
                          </button>
                        </CollapsibleTrigger>
                      </li>
                      <li className="w-[20%]">{restaurantName}</li>
                      <li className="w-[15%] ">
                        {district} / {apartment}
                      </li>
                      <li className="w-[11%] ">{totalAmount + +deliveryPrice} TMT</li>
                      <li className={`w-[16%] text-success`}>{t("Index.delivery")}</li>
                      <li className="w-[17%] ">{getLocaleDate(createdAt, locale)}</li>
                      <li className={`flex w-[16%] items-center space-x-2 ${STATUS_CLASSES[orderStatus]}`}>
                        <p>{t(ORDER_STATUSES[orderStatus])}</p>
                        {orderStatus !== "delivered" && orderStatus !== "rejected" && (
                          <div className="relative flex h-2.5 w-2.5">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[currentColor] opacity-75"></span>
                            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[currentColor]"></span>
                          </div>
                        )}
                      </li>
                    </ul>
                    <div>
                      <CollapsibleContent asChild className="w-full ">
                        <InnerTable deliveryPrice={deliveryPrice} dishes={dishes} t={t} />
                      </CollapsibleContent>
                    </div>
                  </div>
                </Collapsible>
              ),
            )}
            {userOrders && !userOrders.length && (
              <div className="py-4 text-center">
                <EmptyBucket title={t("ProfilePage.emptyHistory")} classes="bg-white text-base " />
                <Link href={"/"} className="mt-1 rounded-full bg-gray-2 px-4 py-2  text-sm font-medium text-black/80">
                  {t("BucketPage.menuReturn")}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrdersTable;
