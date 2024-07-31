"use client";
import { FC, useState } from "react";

//components
import { FormControl, FormField, FormItem, FormMessage } from "@/app/components/shared-ui/Form/form";
import ModalWrapper from "@/app/components/shared-ui/ModalWrapper";
import SelectAddressModal from "../../SelectAddressModal";
import Input from "@/app/components/shared-ui/Input";
import CitySelect from "./CitySelect";

import { BUCKET_INPUTS } from "@/app/components/../data";

interface Props {
  form: any;
  t: any;
}

const Index: FC<Props> = ({ form, t }) => {
  const [showCitySelect, setShowCitySelect] = useState(false);

  const handleCitySelect = (newAddress: string) => {
    setShowCitySelect(!showCitySelect);
  };

  return (
    <div>
      <FormField
        control={form.control}
        name="city"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <CitySelect
                {...field}
                className="mb-3"
                handleCitySelect={() => setShowCitySelect(!showCitySelect)}
                t={t}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="my-3 grid grid-cols-4 grid-rows-3 gap-3 md:grid-rows-4">
        {BUCKET_INPUTS.map(({ name, placeholder, styles, type }) => (
          <FormField
            key={name}
            control={form.control}
            name={name as any}
            render={({ field }) => (
              <FormItem className={`basis-[23%] ${styles}`}>
                <FormControl>
                  <Input
                    {...field}
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

        {showCitySelect && (
          <ModalWrapper>
            <SelectAddressModal handleCitySelect={handleCitySelect} t={t} />
          </ModalWrapper>
        )}
      </div>
    </div>
  );
};
export default Index;
