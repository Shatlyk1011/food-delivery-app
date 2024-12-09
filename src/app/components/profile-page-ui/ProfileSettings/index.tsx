"use client";
import { useProfileFormScheme } from "@/app/hooks/formSchemes";
//components
import Button from "@/app/components/shared-ui/Button";
import Input from "@/app/components/shared-ui/Input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/app/components/shared-ui/Form/form";

import AddressSettings from "./AddressSettings";

const PROFILE_INPUTS = [
  { name: "name", label: "ProfilePage.yourName", placeholder: "Placeholder.name" },
  { name: "phoneNumber", label: "ProfilePage.phoneNumber", placeholder: "Placeholder.phone" },
];

export default function AccountSettings({ t }: { t: any }) {
  const { form } = useProfileFormScheme();

  return (
    <>
      <h1 className="text-2xl">{t("ProfilePage.yourProfile")}</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(() => { })}>
          <div className="space-y-8 rounded-2xl border-2 border-gray-1 p-8 lg:p-6 sm:space-y-6">
            <div className="flex w-full space-x-8 md:space-x-6 sm:flex-col sm:space-x-0 sm:space-y-6">
              {PROFILE_INPUTS.map(({ name, label, placeholder }) => (
                <FormField
                  name={name}
                  key={label}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          {...field}
                          label={`${t(label)} *`}
                          className="border-none bg-gray-3"
                          placeholder={t(placeholder)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>

            <div className="flex w-full space-x-12 md:space-x-6 sm:flex-col sm:space-x-0 sm:space-y-6">
              <AddressSettings t={t} />
              <FormField
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        {...field}
                        label={t("ProfilePage.yourEmail")}
                        className="w-full border-none bg-gray-3"
                        placeholder={t("Placeholder.email")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit">{t("Index.save")}</Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
}
