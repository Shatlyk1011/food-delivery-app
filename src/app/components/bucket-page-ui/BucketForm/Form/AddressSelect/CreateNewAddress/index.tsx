import { useState } from "react";

//Components
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from "@/app/components/shared-ui/Dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/app/components/shared-ui/Form/form";
import Input from "@/app/components/shared-ui/Input";
import Button from "@/app/components/shared-ui/Button";
import { PlusIcon } from "@/app/icons";

import { useCreateAddress } from "@/app/services/useCreateAddress";
import { useCreateAddressFormScheme } from "@/app/hooks/formSchemes";

const ADRES_INPUTS = [
  [
    { name: "district", label: "BucketForm.district", placeholder: "Placeholder.enterDistrict" },
    { name: "houseNumber", label: "ProfilePage.houseNumber", placeholder: "Placeholder.enterHouseNumber" },
  ],
  [
    { name: "apartment", label: "ProfilePage.appartmentOffice", placeholder: "Placeholder.enterAppartmentOffice" },
    { name: "city", label: "ProfilePage.city", placeholder: "Placeholder.enterCity" },
  ],
];

interface Props {
  userProfile: UserData | null;
  setUserProfile: (user: UserData) => void;
  t: any;
}

export default function CreateNewAddress({ userProfile, setUserProfile, t }: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { form } = useCreateAddressFormScheme();
  const { createAddress, isPending } = useCreateAddress();

  const { id, addresses, phone } = userProfile;

  const handleSubmit = async (newAddress: AddressData) => {
    const updatedUser = { id, userData: { addresses: [{ ...newAddress, phoneNumber: +phone }, ...addresses] } };
    const { updateUser } = await createAddress(updatedUser);
    if (userProfile.addresses.length === updateUser.addresses.length) return;
    setUserProfile(updateUser);
    form.reset();
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger className="flex w-full items-center justify-between space-x-2.5 border-b border-b-gray-2 px-6 py-[18px] text-base font-medium hover:bg-onHover md:px-5  md:py-4 sm:px-4 sm:py-3 sm:text-sm">
        <p>{t("BucketForm.addNewAddress")}</p>
        <PlusIcon />
      </DialogTrigger>
      <DialogContent className="max-w-2xl rounded-md bg-bg-1  md:max-w-[92%]">
        <DialogTitle>
          <p className="pb-4 pr-6 text-xl font-semibold">{t("BucketForm.addNewAddress")}</p>
        </DialogTitle>
        <Form {...form}>
          <form>
            <div className="space flex w-full flex-col space-y-8 px-3">
              {ADRES_INPUTS.map((row, i) => (
                <div key={i} className="flex w-full space-x-6 sm:flex-col sm:space-x-0 sm:space-y-6">
                  {row.map(({ name, label, placeholder }) => (
                    <FormField
                      key={name}
                      control={form.control}
                      name={name as any}
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormControl>
                            <Input
                              {...field}
                              label={t(label)}
                              placeholder={t(placeholder)}
                              disabled={name === "city"}
                              type={name === "district" ? "string" : "number"}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              ))}

              <div className="flex justify-end space-x-2">
                {/* <DialogClose className="rounded-md border border-error bg-bg-1 px-4 py-2 text-error hover:bg-error hover:text-white">
                  {t("Index.delete")}
                </DialogClose> */}
                <DialogClose asChild >
                  <Button  type="button">
                    {t("Index.add")}
                  </Button>
                </DialogClose>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}