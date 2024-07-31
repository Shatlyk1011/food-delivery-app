import { FC } from "react";

interface Props {
  listItems: { title: string; id: string; isActive?: boolean }[];
}

const Index: FC<Props> = ({ listItems }) => {
  return (
    <ul className="perfect-scrollbar h-[calc(100vh-140px)] space-y-2.5">
      {listItems.map(({ id, title, isActive }) => (
        <li key={id} className={`cursor-pointer rounded-[14px] px-[14px] py-4 ${isActive && "bg-white"}`}>
          {title}
        </li>
      ))}
    </ul>
  );
};
export default Index;
