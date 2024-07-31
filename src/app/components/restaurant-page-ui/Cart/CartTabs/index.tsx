import { FC } from "react";

interface Props {
  t: any;
  handleChange: (val: boolean) => void;
  isDelivery: boolean;
}

const Index: FC<Props> = ({ t, handleChange, isDelivery }) => {
  const tabs = [
    { title: "Index.delivery", value: true },
    { title: "Index.selfCare", value: false },
  ];
  return (
    <div className="space-x mx-2.5 mb-4 flex rounded-xl bg-gray-2 px-4 py-2 text-text-4 ">
      {tabs.map(({ title, value }, idx) => (
        <button
          onClick={() => handleChange(value)}
          key={title}
          className={`h-10 w-full rounded-xl text-center first:mr-1 ${isDelivery === value && "bg-bg-1 text-text-1"}`}
        >
          {t(title)}
        </button>
      ))}
    </div>
  );
};
export default Index;
