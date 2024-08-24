"use client";
import ProfileSettings from "@/app/components/profile-page-ui/ProfileSettings";
import OrdersTable from "@/app/components/profile-page-ui/OrdersTable";
import { useTranslations } from "next-intl";

export default function Profile() {
  const t = useTranslations();
  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-6 px-8 py-8 xl:px-6 md:px-4">
      <ProfileSettings t={t} />
      <OrdersTable t={t} />
    </div>
  );
}
