"use client";
import OrdersTable from "@/app/components/profile-page-ui/OrdersTable";
import { useTranslations } from "next-intl";
import { useGetUserOrderList } from "@/app/services/useOrders";

//jotai
import { useAtomValue } from "jotai";
import atoms from "@/app/(pages)/_providers/jotai";

export default function Profile() {
  const t = useTranslations();

  const userProfile = useAtomValue(atoms.userProfile);

  const { userOrders } = useGetUserOrderList(userProfile?.id);

  return (
    <div className="mx-auto flex min-h-screen max-w-7xl flex-col space-y-4 px-8 py-8 xl:px-6 md:px-4">
      <OrdersTable t={t} userOrders={userOrders} />
    </div>
  );
}
