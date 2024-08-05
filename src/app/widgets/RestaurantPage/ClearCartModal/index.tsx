import { FC } from "react";

interface Props {
  t: any;
  handleClear: () => void;
  close: () => void;
  selectedRest: string;
  currentRest: string;
}

const Index: FC<Props> = ({ t, handleClear, close, selectedRest, currentRest }) => {
  return (
    <div className="fixed left-0 top-0 z-[100] flex h-screen w-full  items-center justify-center ">
      <div className=" z-[1001] max-w-sm rounded-[24px] bg-white p-8 pt-6 ">
        <h2 className="mb-3 text-2xl font-semibold leading-[1.25]">
          {t("RestaurantPage.currentRestaurant")}: {selectedRest}
        </h2>
        <p className="mb-6 text-base font-medium leading-[1.4] text-text-2">
          {t("RestaurantPage.changeRestaurant1")} {currentRest} {t("RestaurantPage.changeRestaurant2")}
        </p>

        <div className="flex space-x-3">
          <button
            type="button"
            onClick={close}
            className="h-[56px] flex-1 rounded-2xl bg-gray-1/90  px-4 text-base font-medium transition hover:bg-gray-1"
          >
            {t("Index.cancel")}
          </button>
          <button
            onClick={handleClear}
            type="button"
            className="h-[56px] flex-1 rounded-2xl bg-primary/90  px-4 text-base font-medium transition hover:bg-primary"
          >
            {t("Index.continue")}
          </button>
        </div>
      </div>
      <div onClick={close} className="absolute left-0 top-0 z-[1000] h-screen w-full bg-black/50 "></div>
    </div>
  );
};
export default Index;
