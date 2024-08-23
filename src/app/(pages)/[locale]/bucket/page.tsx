"use client";
import { useEffect } from "react";
import { useTranslations } from "next-intl";

//widgets
import BucketForm from "@/app/widgets/BucketPage/BucketForm";
import TotalPrice from "@/app/widgets/BucketPage/TotalPrice";
import Orders from "@/app/widgets/BucketPage/Orders";

import { Form } from "@/app/components/shared-ui/Form/form";

//hooks
import { useBucketFormScheme } from "@/app/hooks/formSchemes";
import useProductItem from "@/app/hooks/useProductItem";
import { useGetRestaurantById } from "@/app/services/useRestaurants";

export default function Bucket() {
  const { form, onSubmit } = useBucketFormScheme();
  const { restId, totalPrice, isDelivery } = useProductItem();
  const { restaurantInfo, getRestaurant } = useGetRestaurantById();

  useEffect(() => {
    getRestaurant(restId);
  }, []);
  const t = useTranslations();

  return (
    <main className="min-h-[calc(100vh-336px)] w-full bg-bg-2 px-10 py-12 xl:p-8 md:px-4 md:py-6 sm:px-3 sm:py-4">
      <Form {...form}>
        <div className="mx-auto max-w-[1140px] xl:max-w-[720px]">
          <form
            className="flex justify-between space-x-10 xl:flex-col xl:space-x-0 xl:space-y-8 md:space-y-6 sm:space-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="flex basis-[600px] flex-col justify-between space-y-8 xl:basis-full md:space-y-6 sm:space-y-4">
              <div className="rounded-[32px] bg-bg-1 p-8 shadow-sm md:rounded-3xl md:p-6 sm:p-4 ">
                <BucketForm
                  form={form}
                  t={t}
                  isDelivery={isDelivery}
                  deliveryPrice={restaurantInfo && restaurantInfo?.deliveryPrice}
                />
              </div>
              <div className="">
                <Orders t={t} />
              </div>
            </div>

            <div className="basis-[448px] ">
              <TotalPrice
                onSubmit={onSubmit}
                t={t}
                totalPrice={totalPrice}
                delivery={isDelivery ? restaurantInfo && restaurantInfo?.deliveryPrice : 0}
              />
            </div>
          </form>
        </div>
      </Form>
    </main>
  );
}
