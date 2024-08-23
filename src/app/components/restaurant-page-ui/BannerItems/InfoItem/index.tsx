import { FC } from "react";

interface Props {
  item: {
    icon: any;
    title?: string;
    subtitle?: string;
  };
}

const Index: FC<Props> = ({ item }) => {
  return (
    <div className="flex items-center space-x-2.5 rounded-[14px] bg-bg-1/70 px-3 py-3 md:space-x-1.5 md:px-1.5 md:py-1">
      {item.icon}

      {item.title && (
        <div className="flex h-10 flex-col justify-center align-baseline text-text-1">
          <div className="text-base font-medium leading-[1] tracking-wide md:text-sm sm:h-auto sm:text-xs sm:tracking-normal">
            {item.title}
          </div>
          {item.subtitle && <div className="h-5 text-sm font-medium md:text-xs sm:h-auto">{item.subtitle}</div>}
        </div>
      )}
    </div>
  );
};
export default Index;
