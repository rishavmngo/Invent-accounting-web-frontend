import { formatCurrency } from "@/lib/utils";
import React from "react";
import { FiArrowDownLeft } from "react-icons/fi";
import { MdArrowOutward } from "react-icons/md";

type TransactionHomeStatCardProps = {
  get: boolean;
  amount: number;
};

const TransactionHomeStatCard = (data: TransactionHomeStatCardProps) => {
  {
    /* <span> */
  }
  {
    /*   <FiArrowDownLeft /> */
  }
  {
    /*   <p>You&apos;ll give</p> */
  }
  {
    /* </span> */
  }
  return (
    <span className="flex flex-col gap-2 items-end bg-white p-3 rounded-md">
      <span className="flex gap-4 items-center">
        {data.get ? (
          <FiArrowDownLeft className="text-[#53915E] bg-[#37E384] text-3xl rounded-full p-[2px]" />
        ) : (
          <MdArrowOutward className="text-[#C22C2C] bg-[#FFADAD] text-3xl rounded-full p-[2px]" />
        )}
        {data.get ? (
          <p className="text-gray-600 text-2xl">You&apos;ll get</p>
        ) : (
          <p className="text-gray-600 text-2xl">You&apos;ll give</p>
        )}
      </span>
      <p className="text-3xl">{formatCurrency(data.amount)}</p>
    </span>
  );
};

export default TransactionHomeStatCard;
