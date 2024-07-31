"use client";
import { FC, useState } from "react";

import TagsPopover from "./TagsPopover";
interface Props {
  categories: Category[] | undefined;
  t: any;
}

const Index: FC<Props> = ({ categories, t }) => {
  const [active, setActive] = useState(0);

  return (
    <div className="flex items-center">
      <ul className="flex items-center space-x-1 text-base leading-[200%] tracking-wide">
        {categories?.map((item, idx) => (
          <li
            key={item.id}
            onClick={() => setActive(idx)}
            className={`h-12 cursor-pointer rounded-xl px-[18px] leading-[48px] transition duration-100 hover:bg-gray-1 2xl:h-10 2xl:px-3 2xl:text-sm 2xl:leading-10 md:h-9 md:leading-[36px] sm:hidden lg:[&:not(:nth-child(-n+2))]:hidden xl:[&:not(:nth-child(-n+4))]:hidden [&:not(:nth-child(-n+6))]:hidden  ${active === idx && "bg-gray-3 hover:bg-gray-3"}`}
          >
            {item.attributes.title}
          </li>
        ))}
      </ul>
      <TagsPopover active={active} setActive={setActive} categories={categories} t={t} />
    </div>
  );
};
export default Index;
