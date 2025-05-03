import React from "react";
import { Skeleton } from "../ui/skeleton";

const SkeletonPartyEntityCard = () => {
  return (
    <li className=" flex flex-col gap-4 px-5 py-2 text-sm rounded-md ">
      <Skeleton className="w-30 h-5" />
      <ul className="flex gap-8">
        <li className="flex flex-col gap-2">
          <Skeleton className="w-15 h-5" />
          <Skeleton className="w-15 h-5" />
        </li>
        <li className="flex flex-col gap-2">
          <Skeleton className="w-15 h-5" />
          <Skeleton className="w-15 h-5" />
        </li>

        <li className="flex flex-col gap-2">
          <Skeleton className="w-15 h-5" />
          <Skeleton className="w-15 h-5" />
        </li>
      </ul>
    </li>
  );
};

export default SkeletonPartyEntityCard;
