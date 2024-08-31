import { FC } from "react";

//components
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/app/components/shared-ui/Collapsible";
import { ChevronDown } from "lucide-react";
import InnerTable from "./InnerTable";

import { getLocaleDate } from "@/app/hooks/getLocaleData";

import { PROFILE_OUTER_HEAD, ORDER_STATUSES, STATUS_CLASSES } from "@/app/data";

interface Props {
  userOrders: UserOrder[];
  t: any;
}

const OrdersTable: FC<Props> = ({ userOrders, t }) => {
  return (
    <section className="perfect-scrollbar h-[100vh-366px] ">
      <h1 className="mb-4 pt-2 text-2xl font-semibold">{t("ProfilePage.history")}</h1>
      <p className="w-[75%] text-balance text-lg leading-6">
        Здесь хранятся история ваших заказов, и текущий статус активных заказов. Стадию вашего заказа можете посмотреть
        в ячейке "Статус". Данные обновляются в режиме реального времени.
      </p>

      <div className="mt-4 border border-black/15 shadow-xl">
        {/* /header */}
        <ul className="flex w-full items-center bg-gray-2/70 text-base font-bold text-black/80 [&>*]:p-4">
          <li className="w-[5%] "></li>
          {PROFILE_OUTER_HEAD.map(({ title, className }) => (
            <li className={` ${className}`} key={title}>
              {t(title)}
            </li>
          ))}
          <li className="flex w-[16%] items-center space-x-4">
            <p>{t("ProfilePage.status")}</p>
          </li>
        </ul>
        {/* //body */}
        <div className="overflow-x-scroll">
          {userOrders?.map(
            ({ restaurantName, district, apartment, totalAmount, createdAt, isDelivery, orderStatus, dishes }, i) => (
              <Collapsible key={createdAt}>
                <div className="flex flex-col">
                  <ul className="flex items-center border-b border-black/20 [&>*]:p-4">
                    <li className="w-[5%] ">
                      <CollapsibleTrigger asChild>
                        <button className="justify-center rounded-full p-2 duration-150 hover:bg-gray-2">
                          <ChevronDown className="h-4 w-4" />
                        </button>
                      </CollapsibleTrigger>
                    </li>
                    <li className="w-[20%] ">{restaurantName}</li>
                    <li className="w-[16%] ">
                      {district} / {apartment}
                    </li>
                    <li className="w-[11%] ">{totalAmount} TMT</li>
                    <li className={`w-[16%] ${isDelivery ? "text-success" : "text-warning"}`}>
                      {isDelivery ? t("Index.delivery") : t("Index.selfCare")}
                    </li>
                    <li className="w-[16%] ">{getLocaleDate(createdAt)}</li>
                    <li className={`flex w-[16%] items-center space-x-2 ${STATUS_CLASSES[orderStatus]}`}>
                      <p>{t(ORDER_STATUSES[orderStatus])}</p>
                      {orderStatus !== "delivered" && orderStatus !== "rejected" && (
                        <div className="relative flex h-2.5 w-2.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[currentColor] opacity-75"></span>
                          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[currentColor]"></span>
                        </div>
                      )}
                    </li>
                    {/* <li className="w-[16%] ">{t(ORDER_STATUSES[orderStatus])}</li> */}
                  </ul>
                  <div>
                    <CollapsibleContent asChild className="w-full ">
                      <InnerTable dishes={dishes} t={t} />
                    </CollapsibleContent>
                  </div>
                </div>
              </Collapsible>
            ),
          )}
        </div>
      </div>
    </section>
  );
};

export default OrdersTable;
