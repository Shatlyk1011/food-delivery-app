import { useTranslations } from "next-intl";
import { FC } from "react";

import { LocationIcon, MessageIcon, PhoneIcon } from "@/app/icons";

interface Props {}

const contacts = [
  {
    icon: <PhoneIcon className="h-8 w-8 2xl:h-7 2xl:w-7" />,
    title: "MainPage.phone",
    subtitle: "8 800 555 35 35",
  },
  {
    icon: <MessageIcon className="h-8 w-8 2xl:h-7 2xl:w-7" />,
    title: "MainPage.email",
    subtitle: "hermanos@gmail.com",
  },
  {
    icon: <LocationIcon className="h-8 w-8 2xl:h-7 2xl:w-7" />,
    title: "MainPage.address",
    subtitle: "Albuquerque, 87105",
  },
];

const Index: FC<Props> = () => {
  const t = useTranslations();

  const links = ["MainPage.about", "MainPage.advertisement", "MainPage.collab", "MainPage.feedback"];

  return (
    <footer className="z-[2000] h-auto w-full bg-gray-3 px-40 py-14 shadow-2xl 2xl:px-20 xl:px-10 lg:px-5 lg:py-7 md:mt-4">
      <div className="mx-auto flex max-w-[1440px] flex-col space-y-8 md:pt-1">
        <div className="flex flex-wrap justify-between gap-x-6 lg:items-center lg:justify-evenly lg:gap-y-6">
          {contacts.map(({ icon, title, subtitle }) => (
            <div key={title} className="flex space-x-3">
              {icon}
              <div>
                <p className="text-text-4 xl:text-sm">{t(title as any)}</p>
                <p className="xl:text-md">{subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-2 py-6">
          <div className="flex gap-y-2 xl:flex-col">
            <ul className="flex flex-wrap gap-x-8 gap-y-2 xl:mb-4 xl:justify-center sm:flex-col sm:items-center">
              {links.map((link) => (
                <li aria-label="button" className="cursor-pointer transition hover:text-black/75" key={link}>
                  {t(link as any)}
                </li>
              ))}
            </ul>
            <div className="flex-1 text-end xl:text-center">© 2023-2024. {t("MainPage.rights")}</div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Index;
