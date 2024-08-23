import { FC } from "react";

//components
import { ClockIcon, StarIcon, InfoIcon } from "@/app/icons";
import InfoItem from "./InfoItem";

interface Props {
  bannerInfo: { title: string; deliveryTime: string };
  t: any;
}

const Index: FC<Props> = ({ bannerInfo, t }) => {
  const { title, deliveryTime } = bannerInfo;

  const items = [
    {
      icon: <ClockIcon className="md:h-5 md:w-5" />,
      title: `${deliveryTime.slice(1)} ${t("Index.min")}`,
      subtitle: t("Index.delivery"),
    },
    {
      icon: <StarIcon className="md:h-5 md:w-5" />,
      title: t("Index.noReview"),
      //length of reviews
      subtitle: null,
    },
    {
      icon: <InfoIcon className="md:h-5 md:w-5" />,
    },
  ];
  return (
    <div className="">
      <h3 className="mb-3 text-5xl font-medium leading-10 tracking-tight text-white lg:text-4xl md:text-3xl">
        {title}
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
