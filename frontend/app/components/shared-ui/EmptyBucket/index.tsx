import { cn } from "@/shared/lib/utils";
import { FC } from "react";

interface Props {
  title: string;
  classes?: string;
}

const Index: FC<Props> = ({ title, classes }) => {
  return (
    <div className={cn("rounded-md bg-gray-2 py-2 text-center text-sm font-medium", classes)}>
      <p>{title}</p>
    </div>
  );
};
export default Index;
