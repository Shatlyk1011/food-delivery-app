import ProfileSettings from "@/app/components/profile-page-ui/ProfileSettings";
import OrdersTable from "@/app/components/profile-page-ui/OrdersTable";

export default function Profile() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-6 px-8 py-8 xl:px-6 md:px-4">
      <ProfileSettings />
      <OrdersTable />
    </div>
  );
}
