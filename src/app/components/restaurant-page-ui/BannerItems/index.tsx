import { FC } from "react";

//components
import { ClockIcon, StarIcon, InfoIcon } from "@/app/icons";
import InfoItem from "./InfoItem";
import { Popover, PopoverContent, PopoverTrigger } from "@/app/components/shared-ui/Popover";

interface Props {
  bannerInfo: BannerInfo;
  t: any;
}

const Index: FC<Props> = ({ bannerInfo, t }) => {
  const { title, deliveryTime, address, workingHours } = bannerInfo;

  const convertTimeFormat = (timeString: string) => {
    return timeString.slice(1, 3) + ":" + timeString.slice(3);
  };

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
        <Popover>
          <PopoverTrigger type="button" aria-label="button" className="rounded-[14px] bg-bg-1/85 px-3 py-3">
            <InfoIcon />
          </PopoverTrigger>
          <PopoverContent className="font-base px-5 py-3 text-base font-medium tracking-wide">
            <div>
              {t("MainPage.workingHours")}:{" "}
              <span className="font-normal">
                {convertTimeFormat(workingHours.openTime)} - {convertTimeFormat(workingHours.closeTime)}
              </span>
            </div>
            <div className="line-clamp-[10]">
              {t("MainPage.address")}: <span className="font-normal">{address}</span>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
export default Index;
