import { cn, formatDate } from "@/lib/utils";
import React from "react";
import { MdStar } from "react-icons/md";

type PartyEntityCardProps = {
  name: string;
  amount: number;
  payable: boolean;
  rating: number;
  lastTrade: string;
};

const PartyEntityCard = (props: PartyEntityCardProps) => {
  return (
    <li className="group flex flex-col gap-4 px-5 py-2 text-sm rounded-md bg-[#F5F5F5] cursor-pointer rainbow-border-wrapper ">
      <h2 className="font-medium text-xl text-[#4E4E4E]">{props.name}</h2>
      <ul className="flex gap-8 ">
        <li>
          <div className="text-[#707070] text-sm">Last traded on</div>
          <div className="font-medium text-[#464646]">
            {formatDate(props.lastTrade)}
          </div>
        </li>
        <li>
          <div className="text-[#707070] text-sm">
            {props.payable ? "You'll Give" : "You'll Get"}
          </div>
          <div
            className={cn(
              props.amount !== 0 &&
                (props.payable ? "text-red-500" : "text-green-500"),
            )}
          >
            ${props.amount}
          </div>
        </li>

        <li>
          <div className="text-[#707070] text-sm">Rating</div>
          <div className="flex items-center text-[#464646]">
            <MdStar />
            <p>{props.rating}</p>
          </div>
        </li>
      </ul>
    </li>
  );
};

export default PartyEntityCard;
