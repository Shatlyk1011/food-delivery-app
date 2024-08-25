import { FC } from "react";
import { useRouter } from "next/navigation";

//components
import ListItems from "@/app/components/restaurant-page-ui/Menu/ListItems";
import BackButton from "@/app/components/restaurant-page-ui/Menu/BackButton";

interface Props {
  menuTitle: string;
  backTitle: string;
  withCategories: WithCategories[];
  classes?: string;
}

const Index: FC<Props> = ({ menuTitle, backTitle, withCategories, classes }) => {
  const { push } = useRouter();

  return (
    <aside className={`relative w-96 2xl:w-64 ${classes}`}>
      <div className="sticky right-0 top-24">
        <BackButton backTitle={backTitle} onClick={() => push("/")} />
        <h3 className="mt-12 px-[14px] py-4 text-xl font-medium">{menuTitle}</h3>
        <ListItems listItems={withCategories} />
      </div>
    </aside>
  );
};
export default Index;
