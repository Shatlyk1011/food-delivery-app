"use client";
import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

//jotai
import { useAtomValue } from "jotai";
import atoms from "@/app/(pages)/_providers/jotai";

//widgets
import BucketForm from "@/app/widgets/BucketPage/BucketForm";
import TotalPrice from "@/app/widgets/BucketPage/TotalPrice";
import Orders from "@/app/widgets/BucketPage/Orders";

import { Form } from "@/app/components/shared-ui/Form/form";

import { RESTAURANT_BUCKET } from "@/app/services/query/restaurantQuery";

//hooks
import { useBucketFormScheme } from "@/app/hooks/formSchemes";
import useProductItem from "@/app/hooks/useProductItem";
import { useGetRestaurantById } from "@/app/services/useRestaurants";
import { useOrderSubmit } from "@/app/services/useOrders";
import useToast from "@/app/hooks/useToast";

import { useQueryClient } from "@tanstack/react-query";

export default function Bucket() {
  const t = useTranslations();
  const queryClient = useQueryClient();
  const userProfile = useAtomValue(atoms.userProfile);
  const router = useRouter();

  const toast = useToast();

  const { form } = useBucketFormScheme();
  const { restId, selectedItems, totalPrice, clearItems, isDelivery, maxCookTime } = useProductItem();
  const { restaurantInfo, getRestaurant } = useGetRestaurantById(RESTAURANT_BUCKET);
  const { handleOrder, isSubmitPending } = useOrderSubmit();

  const clearLocalStorage = () => {
    clearItems();
    localStorage.clear();
  };

  const handleOrderSubmit = async (values: OrderForm) => {
    console.log("hmhm");
    if (restaurantInfo?.id && userProfile?.id) {
      const { apartment, district, houseNumber, phoneNumber, comment } = values;

      const res = await handleOrder({
        orderedByUser: userProfile.id,
        apartment,
        district,
        restaurantID: restaurantInfo.id,
        houseNumber,
        phoneNumber: +phoneNumber,
        isDelivery,
        city: "Turkmenabat",
        commentToCourier: comment,
        dishes: selectedItems.dishes.map(({ id, count, availableAmount }) => ({
          id,
          quantity: Math.min(count, availableAmount),
        })),
      });
      //order response
      if (res?.id) {
        router.push("/profile");
        toast("Actions.successOrder", "success", { duration: 15000, closeButton: true });
        clearLocalStorage();
      }
      console.log("res", res);
    } else if (!userProfile) {
      toast("Actions.loginToOrder", "warning");
    } else {
      // snackbar error message
      toast("Errors.somethingWentWrong", "warning");
      clearLocalStorage();
    }
  };

  useEffect(() => {
    if (restId && !restaurantInfo) {
      //fetch restaurant data and user profile again
      getRestaurant(restId);
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    }
  }, [restId]);

  return (
    <main className="min-h-[calc(100vh-336px)] w-full bg-bg-2 px-10 py-12 xl:p-8 md:px-4 md:py-6 sm:px-3 sm:py-4">
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
                  isDelivery={isDelivery}
                  deliveryTime={isDelivery ? restaurantInfo?.deliveryTime.slice(1) : maxCookTime}
                  clearLocalStorage={clearLocalStorage}
                />
              </div>
              <div className="">
                <Orders t={t} />
              </div>
            </div>

            <div className="basis-[448px] ">
              <TotalPrice
                restaurantId={restaurantInfo?.id}
                onSubmit={handleOrderSubmit}
                restaurantTitle={restaurantInfo?.title}
                t={t}
                totalPrice={totalPrice}
                deliveryPrice={isDelivery && restaurantInfo?.deliveryPrice}
                disabled={isSubmitPending}
              />
            </div>
          </form>
        </div>
      </Form>
    </main>
  );
}
