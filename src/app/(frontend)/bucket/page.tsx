"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

//jotai
import { useAtomValue } from "jotai";
import atoms from "@/app/(frontend)/_providers/jotai";

//widgets
import BucketForm from "@/app/widgets/BucketPage/BucketForm";
import TotalPrice from "@/app/widgets/BucketPage/TotalPrice";
import Orders from "@/app/widgets/BucketPage/Orders";

import { Form } from "@/app/components/shared-ui/Form/form";

import { RESTAURANT_BUCKET } from "@/app/services/query/restaurantQuery";

import { DISHES } from "@/app/shared/constants";

//hooks
import { isRestaurantOpen } from "@/app/hooks/getTimesTillMidnight";
import { useGetRestaurantById } from "@/app/services/useRestaurants";
import { useBucketFormScheme } from "@/app/hooks/formSchemes";
import { useOrderSubmit } from "@/app/services/useOrders";
import useProductItem from "@/app/hooks/useProductItem";
import useToast from "@/app/hooks/useToast";

export default function Bucket() {
  const t = useTranslations();
  const queryClient = useQueryClient();
  const userProfile = useAtomValue(atoms.userProfile);
  const router = useRouter();

  const toast = useToast();

  const { form } = useBucketFormScheme();
  const { restId, selectedItems, totalPrice, clearItems, handleUnavailableWarning } = useProductItem();
  const { restaurantInfo, getRestaurant } = useGetRestaurantById(RESTAURANT_BUCKET);
  const { handleOrder } = useOrderSubmit();
  const [isLoading, setLoading] = useState(false);

  const isRestaurantAvailable = isRestaurantOpen(
    restaurantInfo?.workingHours?.openTime,
    restaurantInfo?.workingHours?.closeTime,
  );

  const clearLocalStorage = () => {
    clearItems();
    localStorage.removeItem(DISHES);
  };

  const handleOrderSubmit = async (values: OrderForm) => {
    if (!isRestaurantAvailable) {
      handleUnavailableWarning();
      return;
    }
    if (restaurantInfo?.id && userProfile?.id && selectedItems?.dishes.length) {
      const { apartment, commentToCourier, district, entrance, houseNumber, phoneNumber, commentToRestaurant } = values;
      try {
        setLoading(true);
        const res = await handleOrder({
          orderedByUser: userProfile.id,
          apartment,
          district,
          restaurantID: restaurantInfo.id,
          houseNumber,
          phoneNumber: +phoneNumber,
          isDelivery: true,
          city: "Turkmenabat",
          commentToCourier,
          commentToRestaurant,
          entrance,
          dishes: selectedItems.dishes.map(({ id, count, availableAmount }) => ({
            id,
            quantity: Math.min(count, availableAmount),
          })),
        });
        //order response
        if (res?.id) {
          router.replace("/profile");
          toast("Actions.successOrder", "success", { duration: 15000, closeButton: true });
          clearLocalStorage();
        }
        console.log("res", res);
      } catch (err) {
        console.log("error", err);
      } finally {
        setLoading(false);
      }
    } else if (!userProfile || !userProfile.id) {
      toast("Actions.loginToOrder", "warning");
    } else if (!selectedItems?.dishes.length) {
      toast("Index.emptyBucket", "info");
    } else {
      toast("Errors.somethingWentWrong", "warning");
      clearLocalStorage();
    }
  };

  useEffect(() => {
    if (!selectedItems?.dishes.length) {
      router.replace("/");
      toast("Index.emptyBucket", "info");
    }
  }, [selectedItems?.dishes]);

  useEffect(() => {
    if (restId && !restaurantInfo) {
      //fetch restaurant data and user profile again
      getRestaurant(restId);
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    }
  }, [restId]);

  return (
    <main className="min-h-[calc(100vh-313px)] w-full bg-bg-2 px-10 py-12 xl:p-8 md:px-4 md:py-6 sm:px-3 sm:py-4">
      <Form {...form}>
        <div className="mx-auto max-w-[1140px] xl:max-w-[720px]">
          <form
            className="flex justify-between space-x-10 xl:flex-col xl:space-x-0 xl:space-y-8 md:space-y-6 sm:space-y-4"
            onSubmit={form.handleSubmit(handleOrderSubmit)}
          >
            <div className="flex basis-[600px] flex-col justify-between space-y-8 xl:basis-full md:space-y-6 sm:space-y-4">
              <div className="rounded-[32px] bg-bg-1 p-8 shadow-sm md:rounded-3xl md:p-6 sm:p-4 ">
                <BucketForm
                  form={form}
                  t={t}
                  isDelivery={true}
                  deliveryTime={restaurantInfo?.deliveryTime.slice(1) || ""}
                  clearLocalStorage={clearLocalStorage}
                />
              </div>
              <div className="">
                <Orders t={t} />
              </div>
            </div>

            <div className="basis-[448px] ">
              {restaurantInfo && (

                <TotalPrice
                  restaurantId={restaurantInfo?.id}
                  restaurantTitle={restaurantInfo?.title}
                  totalPrice={totalPrice}
                  deliveryPrice={totalPrice >= restaurantInfo?.freeAfterAmount ? 0 : restaurantInfo?.deliveryPrice}
                  disabled={isLoading}
                  t={t}
                />
              )}
            </div>
          </form>
        </div>
      </Form>
    </main>
  );
}
