import { FC } from "react";

//components
import { FormControl, FormField, FormItem, FormMessage } from "@/components/shared-ui/Form/form";
import Input from "@/components/shared-ui/Input";
import AddressSelect from "./AddressSelect";

import { BUCKET_INPUTS } from "@/components/../data";

interface Props {
  form: any;
  t: any;
}

const Index: FC<Props> = ({ form, t }) => {
  const handleAddress = (address: AddressData) => {
    const { district, houseNumber, apartment } = address;

    form.setValue("district", district);
    form.setValue("houseNumber", houseNumber);
    form.setValue("apartment", apartment);
  };

  return (
    <div>
      <AddressSelect onChange={handleAddress} t={t} />
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
