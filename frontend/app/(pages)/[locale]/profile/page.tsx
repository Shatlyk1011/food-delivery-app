"use client";
import OrdersTable from "@/components/profile-page-ui/OrdersTable";
import { useTranslations } from "next-intl";
import { useGetUserOrderList } from "@/services/useOrders";

export default function Profile() {
  const t = useTranslations();

  const { userOrders } = useGetUserOrderList();

  return (
    <div className="mx-auto flex min-h-screen max-w-7xl flex-col space-y-4 px-8 py-8 md:px-3 md:py-4 sm:px-2 sm:py-3 xl:px-6">
      <OrdersTable t={t} userOrders={userOrders} />
    </div>
  );
}
