import { FC, useState } from "react";

//components
import Input from "@/app/components/shared-ui/Input";
import Button from "@/app/components/shared-ui/Button";
import { Textarea } from "@/app/components/shared-ui/Textarea";
import { CloseIcon } from "@/app/icons";

interface Props {
  handleClose: () => void;
  submit: (form: FeedbackOrCoop) => Promise<FeedbackOrCoopResponse>;
  disabled: boolean;
  t: any;
}

const Index: FC<Props> = ({ handleClose, submit, disabled, t }) => {
  const [coopForm, setCoopForm] = useState<FeedbackOrCoop>({
    name: "",
    phoneNumber: "",
    description: "",
    type: "cooperation",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await submit(coopForm);
    if (res.id) handleClose();
  };

  return (
    <div className="relative w-[90%] max-w-2xl rounded-[14px] bg-white px-6 py-7 md:px-4 md:py-5 xl:px-5 xl:py-6">
      <h2 className="mb-3 text-center text-3xl font-semibold md:mb-2 md:text-xl xl:text-2xl">
        {t("Footer.coopHeading")}
      </h2>
      <button
        onClick={handleClose}
        type="button"
        className="absolute right-5 top-4 rounded-full p-1.5 transition  hover:bg-gray-2 active:bg-gray-1 md:right-3 md:top-2 md:p-1"
      >
        <CloseIcon className=" h-5 w-5 cursor-pointer fill-text-2 md:h-4 md:w-4" />
      </button>
      <p className="text-base font-medium leading-[1.4] text-text-2 md:text-center md:text-xs">
        {t("Footer.coopSubHead")}
      </p>
      <form onSubmit={handleSubmit} className="pt-6 md:pt-4">
        <div className="mb-4 flex space-x-6 md:flex-wrap md:space-x-0 md:space-y-3">
          <Input
            label={`${t("ProfilePage.yourName")} *`}
            value={coopForm.name}
            onChange={(e) => setCoopForm({ ...coopForm, name: e.target.value })}
            required
          />
          <Input
            label={t("ProfilePage.phoneNumber")}
            value={coopForm.phoneNumber}
            onChange={(e) => setCoopForm({ ...coopForm, phoneNumber: e.target.value })}
            type="text"
            maxLength={8}
          />
        </div>
        <Textarea
          className="h-32 resize-none"
          label={t("Footer.coopTellAbout")}
          onChange={(e) => setCoopForm({ ...coopForm, description: e.target.value })}
          minLength={16}
          maxLength={200}
          required
        />

        <p className="mt-3 text-xs text-text-3 md:text-[10px]">
          <em>{t("Footer.coopRestriction")}</em>
        </p>
        <div className="w-full text-right">
          <Button
            className="mt-2 text-sm font-medium disabled:bg-bg-2 disabled:text-text-1/70 md:w-full md:text-xs"
            disabled={disabled}
          >
            {t("Footer.coopSend")}
          </Button>
        </div>
      </form>
    </div>
  );
};
export default Index;
