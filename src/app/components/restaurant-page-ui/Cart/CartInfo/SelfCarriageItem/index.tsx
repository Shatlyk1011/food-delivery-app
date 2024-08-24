import { WalkIcon } from "@/app/icons";
import { FC } from "react";

interface Props {
  text?: string;
  deliveryTime: number;
}

const Index: FC<Props> = ({ text, deliveryTime }) => {
  return (
    <div className="flex flex-1 items-center gap-2.5 bg-bg-1">
      <div className="h-12 w-12 rounded-[14px] bg-bg-2 p-3">
        <WalkIcon />
      </div>

      <p className={`text-sm font-medium`}>Self Care, {deliveryTime}min</p>
    </div>
  );
};
export default Index;
