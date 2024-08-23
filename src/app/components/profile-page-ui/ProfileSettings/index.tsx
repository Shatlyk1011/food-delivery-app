"use client";
import { useProfileFormScheme } from "@/app/hooks/formSchemes";
//Components
import Button from "@/app/components/shared-ui/Button";
import Input from "@/app/components/shared-ui/Input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/app/components/shared-ui/Form/form";

import AddressSettings from "./AdresSettings";

const PROFILE_INPUTS = [
  { name: "name", label: "Ваше имя", placeholder: "Введите ваше имя" },
  { name: "phoneNumber", label: "Номер телефона", placeholder: "Введите номер телефона" },
];

export default function AccountSettings() {
  const { form, onSubmit } = useProfileFormScheme();
  return (
    <>
      <h1 className="text-2xl">Ваш профиль</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-8 rounded-2xl border-2 border-gray-1 p-8 lg:p-6 sm:space-y-6">
            <div className="flex w-full space-x-12 md:space-x-6 sm:flex-col sm:space-x-0 sm:space-y-6">
              {PROFILE_INPUTS.map(({ name, label, placeholder }) => (
                <FormField
                  name={name}
                  key={label}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          {...field}
                          label={`${label} *`}
                          className="border-none bg-gray-3"
                          placeholder={placeholder}
                          required={true}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>

            <div className="flex w-full space-x-12 md:space-x-6 sm:flex-col sm:space-x-0 sm:space-y-6">
              <AddressSettings />
              <FormField
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        {...field}
                        label="Ваш email"
                        className="w-full border-none bg-gray-3"
                        placeholder={"Введите ваш email"}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit">Сохранить</Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
}
