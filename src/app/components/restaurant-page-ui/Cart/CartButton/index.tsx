"use client";
import { FC } from "react";
import { useRouter } from "next/navigation";

interface Props {
  submitTitle: string;
  total: string;
}

const Index: FC<Props> = ({ submitTitle, total }) => {
  const router = useRouter();

  return (
    <button
      className="flex h-14 w-full items-center justify-between rounded-[14px] bg-primary px-[18px] py-2.5 text-lg transition hover:bg-primary/85 2xl:text-base"
      type="button"
      onClick={() => router.push("/bucket")}
    >
      {submitTitle} <span className="text-lg font-medium 2xl:text-base ">{total}$</span>
    </button>
  );
};
export default Index;
