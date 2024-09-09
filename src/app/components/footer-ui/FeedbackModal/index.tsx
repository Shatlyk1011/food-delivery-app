import { FC, useState } from "react";

//components
import { Textarea } from "@/app/components/shared-ui/Textarea";
import Button from "@/app/components/shared-ui/Button";
import { CloseIcon } from "@/app/icons";

interface Props {
  handleClose: () => void;
  submit: (form: FeedbackOrCoop) => Promise<void>;
  t: any;
}

const Index: FC<Props> = ({ handleClose, submit, t }) => {
  const [feedbackForm, setFeedbackForm] = useState<FeedbackOrCoop>({
    description: "",
    type: "feedback",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await submit(feedbackForm);
  };

  console.log("feedbackForm", feedbackForm);
  return (
    <div className="relative w-[90%] max-w-2xl rounded-[14px] bg-white px-6 py-8 xl:px-5 xl:py-6 md:px-4 md:py-5">
      <h2 className="mb-3 text-center text-3xl font-semibold xl:text-2xl md:mb-2 md:text-xl">
        {t("Footer.feedbackHeading")}
      </h2>
      <button
        onClick={handleClose}
        type="button"
        className="absolute right-5 top-4 rounded-full p-1.5 transition  hover:bg-gray-2 active:bg-gray-1 md:right-3 md:top-2 md:p-1"
      >
        <CloseIcon className=" h-5 w-5 cursor-pointer fill-text-2 md:h-4 md:w-4" />
      </button>
      <p className="text-base font-medium leading-[1.4] text-text-2 md:text-center md:text-xs">
        {t("Footer.feedbackSubHeading")}
      </p>
      <form onSubmit={handleSubmit} className="pt-6 md:pt-4">
        <Textarea
          className="h-32 resize-none"
          label={t("Footer.feedbackTitle")}
          onChange={(e) => setFeedbackForm({ ...feedbackForm, description: e.target.value })}
          placeholder={t("Footer.feedbackPlaceholder")}
        />

        <div className="mt-3 w-full text-right">
          <Button className=" text-sm font-medium md:w-full md:text-xs">{t("Footer.feedbackSend")}</Button>
        </div>
      </form>
    </div>
  );
};
export default Index;
