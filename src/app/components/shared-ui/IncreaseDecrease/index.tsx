import { MinusIcon, PlusIcon } from "@/app/icons";
import { FC } from "react";

interface Props {
  count: string;
  className?: string;
  increase?: () => void;
  decrease?: () => void;
}

const Index: FC<Props> = ({ count, decrease, increase, className }) => {
  return (
    <div
      className={`max-w-22 flex h-8 w-full rounded-[14px] bg-gray-2/80 p-1 px-2 md:h-7 md:p-[2px] sm:rounded-xl ${className}`}
    >
      <button type="button" onClick={decrease}>
        <MinusIcon width={20} height={20} />
      </button>
      <p className="min-w-4 text-center md:text-sm">{count ?? 1}</p>
      <button type="button" onClick={increase}>
        <PlusIcon width={20} height={20} />
      </button>
    </div>
  );
};
export default Index;
