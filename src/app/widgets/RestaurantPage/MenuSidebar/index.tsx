import { FC } from "react";
import { useRouter } from "next/navigation";

//components
import ListItems from "@/app/components/restaurant-page-ui/Menu/ListItems";
import BackButton from "@/app/components/restaurant-page-ui/Menu/BackButton";

interface Props {
  menuTitle: string;
  backTitle: string;
  classes?: string;
}

const listItems = [
  { id: "21", title: "Итальянская кухня" },
  { id: "22", title: "Азиатская кухня" },
  { id: "23", title: "Мексиканская кухня", isActive: true },
  { id: "24", title: "Французская кухня" },
  { id: "25", title: "Греческая кухня" },
  { id: "26", title: "Тайская кухня" },
  { id: "27", title: "Сладкоежка" },
  { id: "28", title: "Пиццерия" },
  { id: "29", title: "Кафе" },
  { id: "30", title: "Столовая" },
  { id: "31", title: "Бистро" },
  { id: "32", title: "Фастфуд" },
  { id: "33", title: "Ресторан с эстетическим обслуживанием" },
  { id: "34", title: "Ресторан с домашней кухней" },
  { id: "35", title: "Вегетарианский ресторан" },
  { id: "36", title: "Веганский ресторан" },
  { id: "37", title: "Ресторан с панорамным видом" },
  { id: "38", title: "Ресторан с живой музыкой" },
  { id: "39", title: "Ресторан с детским меню" },
  { id: "40", title: "Ресторан для семейного обеда" },
];
const Index: FC<Props> = ({ menuTitle, backTitle, classes }) => {
  const { push } = useRouter();

  return (
    <aside className={`relative w-96 2xl:w-64 ${classes}`}>
      <div className="sticky right-0 top-24">
        <BackButton backTitle={backTitle} onClick={() => push("/")} />
        <h3 className="mt-12 px-[14px] py-4 text-xl font-medium">{menuTitle}</h3>
        <ListItems listItems={listItems} />
      </div>
    </aside>
  );
};
export default Index;
