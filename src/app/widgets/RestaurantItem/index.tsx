import { FC } from "react";
import Image from "next/image";

import { Link } from "@/app/(pages)/_providers/i18n/i18config";

import { StarIcon, UsdIcon } from "@/app/icons";

interface Props {
  item: any;
}

const Index: FC<Props> = ({ item }) => {
  return (
    <div className="inline-block px-4 pb-5 md:px-2 md:pb-3">
      <figure className="relative mb-2 min-h-52 cursor-pointer overflow-hidden rounded-[14px]">
        <Link href={`/restaurant/${item.title}`}>
          <Image quality={60} className="object-cover" fill={true} src={item.imgSrc} alt="image" />
        </Link>
      </figure>
      <div>
        <h5 className="mb-0.5 line-clamp-2 text-2xl font-medium">{item.title}</h5>

        <div className="flex items-center space-x-1.5">
          <StarIcon width={18} height={18} className="fill-primary" />
          <p className="text-sm">{item.rank}</p>
          <div className="flex">
            <UsdIcon width={12} height={12} />
            <UsdIcon width={12} height={12} />
            <UsdIcon width={12} height={12} className="fill-text-4" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Index;
