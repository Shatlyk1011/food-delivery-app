import { FC } from "react";

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
  return (
    <div>
      <FormField
        control={form.control}
        name="city"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <CitySelect {...field} onChange={field.onChange} value={field.value} className="mb-3" t={t} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
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
