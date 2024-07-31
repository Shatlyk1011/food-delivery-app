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
        <div className="h-10 text-text-1 md:h-10">
          <div className="h-6 text-xl font-medium md:h-6 md:text-base">{item.title}</div>
          <div className="h-5 text-sm font-normal md:text-xs ">{item.subtitle}</div>
        </div>
      )}
    </div>
  );
};
export default Index;
