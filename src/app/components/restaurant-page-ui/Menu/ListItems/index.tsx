import { FC } from "react";

interface Props {
  listItems: WithCategories[];
}

const Index: FC<Props> = ({ listItems }) => {
  return (
    <ul className="perfect-scrollbar h-[calc(100vh-140px)] space-y-2.5">
      {listItems.map(({ category }) => (
        // ${isActive && "bg-white"}
        <li key={category} className={`cursor-pointer rounded-[14px] px-[14px] py-4 `}>
          {category}
        </li>
      ))}
    </ul>
  );
};
export default Index;
