import useToast from "@/hooks/useToast";
import { FC } from "react";

interface Props {
  t: any;
  handleChange: (val: boolean) => void;
  isDelivery: boolean;
  selectedDelivery: boolean;
}

const tabs = [
  { title: "Index.delivery", value: true },
  { title: "Index.selfCare", value: false },
];

const Index: FC<Props> = ({ t, handleChange, isDelivery, selectedDelivery }) => {
  const toast = useToast();

  const handleClick = (title: string, value: boolean) => {
    if (title === "Index.selfCare") {
      toast("Actions.noDeliveryAvailable", "warning");
    } else {
      handleChange(value);
    }
  };
  return (
    <div className="space-x mx-2.5 mb-4 flex rounded-xl bg-gray-2 px-4 py-2 text-text-4 ">
      {tabs.map(({ title, value }) => (
        <button
          onClick={() => handleClick(title, value)}
          key={title}
          className={`h-10 w-full rounded-xl text-center first:mr-1 ${selectedDelivery === value && "bg-bg-1 text-text-1"}`}
        >
          {t(title)}
        </button>
      ))}
    </div>
  );
};
export default Index;
