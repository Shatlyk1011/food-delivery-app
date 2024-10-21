import { FC } from "react";

import { BackIcon } from "@/app/icons";

interface Props {
  backTitle: string;
  onClick: () => void;
}

const Index: FC<Props> = ({ backTitle, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="z-[11] flex w-full items-center rounded-xl bg-bg-1 px-[14px] py-4 transition hover:bg-opacity-70"
    >
      <BackIcon />
      <p className="ml-2 text-base font-medium">{backTitle}</p>
    </button>
  );
};
export default Index;
