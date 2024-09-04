"use client";
import { useTranslations } from "next-intl";
//widgets
import Overlap from "./Overlap";
//components
import { CloseIcon, LogoIcon } from "@/app/icons";
import useSidebar from "@/app/hooks/useSidebar";

const Index = () => {
  const {
    isSidebarOpen,
    overlap,
    overlapList,
    sidebarList,
    handleCitySelect,
    handleLanguageChange,
    handleClose,
    closeOverlap,
  } = useSidebar();

  const t = useTranslations();

  return (
    <>
      <div
        className={`fixed top-0 z-[1000] h-full w-64 bg-gray-3 transition-all duration-500 ${isSidebarOpen ? "left-0" : "left-[-100%]"}`}
      >
        <header className="flex h-16 w-full items-center border-b border-gray-1 p-4">
          <button className="cursor-pointer" onClick={handleClose}>
            <CloseIcon className="h-6 w-6" />
          </button>
          <div className="mx-auto flex items-center justify-center space-x-2">
            <LogoIcon width={96} height={48} />
          </div>
        </header>

        <ul className="flex flex-col text-base *:border-b *:border-gray-1 *:p-4 *:hover:cursor-pointer">
          {sidebarList.map(({ title, icon, onClick, miniDishesCount }, index) => (
            <li key={index} className="flex items-center space-x-4 hover:bg-gray-2" onClick={onClick}>
              {icon}
              <span>{title}</span>
              {miniDishesCount}
            </li>
          ))}
        </ul>
      </div>

      <Overlap
        overlap={overlap}
        overlapList={overlapList}
        closeOverlap={closeOverlap}
        handleCitySelect={handleCitySelect}
        handleLanguageChange={handleLanguageChange}
        t={t}
      />

      <div
        onClick={handleClose}
        className={`fixed inset-0 z-50 h-full w-full backdrop-blur-sm duration-300 ${isSidebarOpen ? "visible bg-bg-cover/40" : "invisible bg-opacity-0"}`}
      ></div>
    </>
  );
};

export default Index;
