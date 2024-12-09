import dynamic from "next/dynamic";
import { FC, useState } from "react";

import { useAtom } from "jotai";
import atoms from "@/app/(frontend)/_providers/jotai";

//components
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "@/app/components/shared-ui/Popover";
const CreateNewAddress = dynamic(() => import("./CreateNewAddress"), { ssr: false });
import { ChevronDown } from "lucide-react";
import { HomeIcon } from "@/app/icons";
import useToast from "@/app/hooks/useToast";

interface Props {
  onChange: (address: AddressData) => void;
  t: any;
}
const Index: FC<Props> = ({ onChange, t }) => {
  const [userProfile, setUserProfile] = useAtom(atoms.userProfile);

  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);

  const toast = useToast();

  const handleChange = (address: AddressData) => {
    const { district, houseNumber, apartment } = address;
    setSelected(`${district}, ${houseNumber}/${apartment}`);
    onChange(address);
  };

  const handleOpen = () => {
    if (!userProfile) {
      toast("Actions.loginToAddAddresses", "info", { duration: 4000 });
      return;
    }
    setOpen(!open);
  };
  return (
    <Popover open={open} onOpenChange={handleOpen}>
      <PopoverTrigger className="relative z-10 flex rounded-xl">
        <div className="relative flex items-center space-x-2.5">
          <HomeIcon />
          <p className="line-clamp-1 text-base font-bold sm:text-sm">{selected || t("BucketForm.chooseAddress")}</p>
          <ChevronDown width={20} height={20} className="duration-200 peer-checked:rotate-180" />
        </div>
      </PopoverTrigger>

      <PopoverContent align="center" className="overflow-hidden rounded-[14px] p-0 shadow-xl">
        <ul className="cursor-pointer ">
          <li>{userProfile && <CreateNewAddress t={t} userProfile={userProfile} setUserProfile={setUserProfile} />}</li>
          {userProfile?.addresses?.map((address, i) => (
            <PopoverClose
              className="line-clamp-2 w-full px-4 py-[14px] text-start hover:bg-onHover md:px-5 md:py-4 sm:px-4 sm:py-3"
              key={i}
              onClick={() => handleChange(address)}
            >
              {address.district}, {address.houseNumber}/{address.apartment}
            </PopoverClose>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
};
export default Index;
