import { FC, useState } from "react";

import { useAtomValue } from "jotai";
import atoms from "@/app/(pages)/_providers/jotai";

//components
import { FormControl, FormField, FormItem, FormMessage } from "@/app/components/shared-ui/Form/form";
import Input from "@/app/components/shared-ui/Input";
import CitySelect from "./CitySelect";

import { BUCKET_INPUTS } from "@/app/components/../data";

interface Props {
  form: any;
  t: any;
}

const Index: FC<Props> = ({ form, t }) => {
  const userProfile = useAtomValue(atoms.userProfile);
  const handleAddress = (address: AddressData) => {
    const { district, houseNumber, apartment } = address;
    form.setValue("district", district);
    form.setValue("houseNumber", houseNumber);
    form.setValue("apartment", apartment);
  };

  return (
    <div>
      <CitySelect userProfile={userProfile} onChange={handleAddress} t={t} />
      <div className="my-3 grid grid-cols-4 grid-rows-3 gap-3 md:grid-rows-4">
        {BUCKET_INPUTS.map(({ name, placeholder, styles, maxLength, type }) => (
          <FormField
            key={name}
            control={form.control}
            name={name as any}
            render={({ field }) => (
              <FormItem className={`basis-[23%] ${styles}`}>
                <FormControl>
                  <Input
                    {...field}
                    maxLength={maxLength}
                    type={type}
                    placeholder={t(placeholder)}
                    className="rounded-xl placeholder:font-[inherit] placeholder:text-sm placeholder:text-text-4 sm:rounded-[10px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
      </div>
    </div>
  );
};
export default Index;
