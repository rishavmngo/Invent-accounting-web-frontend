import { formatCurrency, formatDate } from "@/lib/utils";
import React from "react";
import { FaLongArrowAltUp } from "react-icons/fa";
import { FaBoxOpen, FaPlus } from "react-icons/fa6";

type StockTransactionCardProps = {
  quantity: number;
  date: string;
  type: string;
  pricePerUnit: number;
};

const StockTransactionCard = ({
  type,
  date,
  quantity,
  pricePerUnit,
}: StockTransactionCardProps) => {
  return (
    <li className="group flex flex-col gap-4 px-5 py-2 text-sm rounded-md bg-[#F5F5F5] cursor-pointer rainbow-border-wrapper ">
      <div className="flex justify-between">
        <h2 className="font-medium text-xl text-[#4E4E4E]">Add Stock</h2>
        <span className=" bg-[#daf6cc] p-2 text-[#5d7d5d] flex gap-2 items-center rounded-full">
          <FaBoxOpen className="text-xl " />
          {/* <FaPlus /> */}
          <FaLongArrowAltUp className="" />
        </span>
      </div>
      <ul className="flex gap-20 ">
        <li>
          <div className="text-[#707070] text-sm">Date</div>
          <div className="font-medium text-[#464646]">{formatDate(date)}</div>
        </li>
        <li>
          <div className="text-[#707070] text-sm">Quantity</div>
          <div>{quantity}</div>
        </li>

        <li>
          <div className="text-[#707070] text-sm">Price per unit</div>
          <div className="flex items-center text-[#464646]">
            {formatCurrency(pricePerUnit)}
          </div>
        </li>
      </ul>
    </li>
  );
};

export default StockTransactionCard;
