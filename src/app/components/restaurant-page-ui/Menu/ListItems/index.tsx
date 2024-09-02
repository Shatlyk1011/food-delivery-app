import { FC } from "react";

interface Props {
  listItems: WithCategories[];
}

const Index: FC<Props> = ({ listItems }) => {
  return (
    <ul className="perfect-scrollbar h-[calc(100vh-140px)] space-y-2.5">
      {listItems.map(({ title }) => (
        // ${isActive && "bg-white"}
        <li key={title} className={`cursor-pointer rounded-[14px] px-[14px] py-4 `}>
          {title}
        </li>
      ))}
    </ul>
  );
};
export default Index;
