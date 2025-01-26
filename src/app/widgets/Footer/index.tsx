"use client";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { FC, useState } from "react";

import { LocationIcon, MessageIcon, PhoneIcon } from "@/app/icons";

import { useCreateFeedbackOrCoop } from "@/app/services/useFeedbackAndCoop";

//components
import Spinner from "@/app/components/shared-ui/Spinner";
const CooperationModal = dynamic(() => import("@/app/components/footer-ui/CooperationModal"), {
  loading: () => <Spinner />,
});

const FeedbackModal = dynamic(() => import("@/app/components/footer-ui/FeedbackModal"), {
  loading: () => <Spinner />,
});

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

const defaultStates = { cooperationModal: false, feedbackModal: false };

const Index: FC<Props> = () => {
  const t = useTranslations();

  const [modals, setModals] = useState(defaultStates);

  const { createFeedbackOrCoop, isPending } = useCreateFeedbackOrCoop();

  const links = [
    { title: "MainPage.about" },
    { title: "MainPage.advertisement" },
    { title: "MainPage.collab", fn: () => setModals((prev) => ({ ...prev, cooperationModal: true })) },
    { title: "MainPage.feedback", fn: () => setModals((prev) => ({ ...prev, feedbackModal: true })) },
  ];

  return (
    <footer className="z-[2000] h-auto w-full bg-gray-3 px-40 py-10 shadow-2xl 2xl:px-20 xl:px-10 lg:px-5 lg:py-6 md:mt-4">
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
              {links.map(({ title, fn }) => (
                <li
                  aria-label="button"
                  onClick={fn}
                  className="cursor-pointer transition hover:text-black/75"
                  key={title}
                >
                  {t(title)}
                </li>
              ))}
            </ul>
            <div className="flex-1 text-end xl:text-center">© 2023-2024. {t("MainPage.rights")}</div>
          </div>
        </div>
      </div>

      {(modals.cooperationModal || modals.feedbackModal) && (
        <div className="fixed left-0 top-0 z-50 flex h-screen w-full items-center justify-center bg-bg-cover">
          {modals.cooperationModal && (
            <CooperationModal
              submit={createFeedbackOrCoop}
              handleClose={() => setModals(defaultStates)}
              disabled={isPending}
              t={t}
            />
          )}
          {modals.feedbackModal && (
            <FeedbackModal
              submit={createFeedbackOrCoop}
              handleClose={() => setModals(defaultStates)}
              disabled={isPending}
              t={t}
            />
          )}
        </div>
      )}
    </footer>
  );
};
export default Index;
