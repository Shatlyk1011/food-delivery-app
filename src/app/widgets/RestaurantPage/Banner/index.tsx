import Image from "next/image";
import { FC } from "react";

import BannerItems from "@/app/components/restaurant-page-ui/BannerItems";

interface Props {}

const Index: FC<Props> = () => {
  return (
    <div className="relative z-10 h-80 max-w-full overflow-hidden rounded-2xl md:h-60 ">
      <div className="absolute left-0 top-0 z-10 h-full w-full bg-gradient-to-tr from-black/20 to-black/0"></div>
      <Image
        className="absolute z-0 object-cover object-top"
        src="/images/los-pollos.webp"
        fill={true}
        alt="hello world"
      />

      <div className="absolute bottom-10 left-9 z-20 md:bottom-6 md:left-5">
        <BannerItems />
      </div>
    </div>
  );
};
export default Index;
