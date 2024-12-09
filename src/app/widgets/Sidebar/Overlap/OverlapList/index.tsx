import { FC } from "react";

interface Props {
  overlap: string;
  overlapList: { title: string; value?: string }[];
  handleLanguageChange: (locale: "ru" | "tk") => void;
  handleCitySelect: (str: string) => void;
}

const Index: FC<Props> = ({ overlap, overlapList, handleLanguageChange, handleCitySelect }) => {
  return (
    <ul className="flex flex-col text-base *:border-b *:border-gray-1 *:p-4 *:hover:cursor-pointer">
      {overlapList.map(({ title, value }) => (
        <li
          key={title}
          className="flex items-center space-x-4 hover:bg-gray-2"
          onClick={() =>
            overlap === "language" ? handleLanguageChange(value as "ru" | "tk") : handleCitySelect(title)
          }
        >
          {title}
        </li>
      ))}
    </ul>
  );
};

export default Index;
