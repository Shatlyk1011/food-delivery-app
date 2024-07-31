import { FC } from "react";

//components
import { ClockIcon, StarIcon, InfoIcon } from "@/app/icons";
import InfoItem from "./InfoItem";

interface Props {}

const Index: FC<Props> = () => {
  const items = [
    {
      icon: <ClockIcon className="md:h-5 md:w-5" />,
      title: "60 nim",
      subtitle: "sho sho",
    },
    {
      icon: <StarIcon className="md:h-5 md:w-5" />,
      title: "4.8",
      subtitle: "16",
    },
    {
      icon: <InfoIcon className="md:h-5 md:w-5" />,
    },
  ];
  return (
    <div className="">
      <h3 className="mb-3 text-5xl font-medium leading-10 tracking-tight text-white lg:text-4xl md:text-3xl">
        Los Pollos
      </h3>

      <div className="flex space-x-2.5">
        {items.map((item, index) => (
          <InfoItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
};
export default Index;
