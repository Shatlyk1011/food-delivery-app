//Components
import { Popover, PopoverContent, PopoverTrigger } from "@/components/shared-ui/Popover";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/shared-ui/Dialog";
import Input from "@/components/shared-ui/Input";
import Button from "@/components/shared-ui/Button";

import { TrashIcon } from "@/icons";

const ADRES_INPUTS = [
  [
    { label: "ProfilePage.city", placeholder: "Placeholder.enterCity" },
    { label: "BucketForm.district", placeholder: "Placeholder.enterDistrict" },
  ],
  [
    { label: "ProfilePage.streetHouse", placeholder: "Placeholder.enterStreetHouse" },
    { label: "ProfilePage.appartmentOffice", placeholder: "Placeholder.enterAppartmentOffice" },
  ],
];

export default function AddressSettings({ t }: { t: any }) {
  return (
    <Popover>
      <div className="block w-full">
        <p className="mb-2">{t("ProfilePage.deliveryAddress")}</p>
        <PopoverTrigger className="peer h-10 w-full rounded-md bg-gray-3 px-3 py-2 text-start text-sm text-[#72839cd0]">
          {t("ProfilePage.chooseAddress")}
        </PopoverTrigger>
      </div>
      <PopoverContent
        align="start"
        className="w-full max-w-md space-y-1 rounded-md bg-gray-3 p-1 text-sm shadow-none sm:max-w-72 xl:max-w-96"
      >
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <Dialog key={i}>
              <DialogTrigger className="w-full">
                <button className="flex w-full items-center justify-between rounded-sm px-3 py-1 text-start text-[#425672] hover:bg-[#e7ebf0ef]">
                  Turkmenabat, Bahar 8dom 14kw
                  <button className="rounded-lg p-1 hover:bg-gray-3">
                    <TrashIcon className="h-6 fill-error" />
                  </button>
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl rounded-md bg-bg-1 px-6 py-8 md:max-w-[92%]">
                <DialogTitle>
                  <p className="pb-4 pr-6 text-lg font-semibold">{t("ProfilePage.changeAddressSettings")}</p>
                </DialogTitle>
                <div className="space flex w-full flex-col space-y-8 px-3">
                  {ADRES_INPUTS.map((row, i) => (
                    <div key={i} className="flex space-x-2.5 sm:flex-col sm:space-x-0 sm:space-y-6">
                      {row.map(({ label, placeholder }) => (
                        <Input key={label} label={t(label)} placeholder={t(placeholder)} />
                      ))}
                    </div>
                  ))}
                  <div className="flex justify-end space-x-2">
                    <Button className="border border-error bg-bg-1 text-error hover:bg-error hover:text-white">
                      {t("Index.delete")}
                    </Button>
                    <Button>{t("Index.save")}</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
      </PopoverContent>
    </Popover>
  );
}
