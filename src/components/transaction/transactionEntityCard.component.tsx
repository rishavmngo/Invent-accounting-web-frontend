import { format } from "date-fns";
import React from "react";

type TransactionEntityCardProps = {
  customer_name: string;
  total_amount?: number;
  sell_price?: number;
  invId: number;
  date: Date | null;
} & React.HTMLAttributes<HTMLLIElement>;

const TransactionEntityCard = ({
  customer_name,
  total_amount,
  invId,
  date,
  ...props
}: TransactionEntityCardProps) => {
  return (
    <li
      {...props}
      tabIndex={2}
      className="group flex flex-col gap-4 px-5 py-2 text-sm rounded-md bg-[#F5F5F5] cursor-pointer rainbow-border-wrapper "
    >
      <div className="flex justify-between">
        <h2 className="font-medium text-xl text-[#4E4E4E]">{customer_name}</h2>
        <span className="flex flex-col items-end text-gray-500">
          <p>#{invId}</p>
          <p>{date && format(new Date(date), "do LLL, y")}</p>
        </span>
      </div>
      <ul className="flex gap-8 ">
        <li>
          <div className="text-[#707070] text-sm">In Stock</div>
          <div className="font-medium text-[#464646]">30</div>
        </li>
        <li>
          <div className="text-[#707070] text-sm">Total</div>
          <div className="">{total_amount}</div>
        </li>

        {/* <li> */}
        {/*   <div className="text-[#707070] text-sm">Date</div> */}
        {/*   <div className="flex items-center text-[#464646]"> */}
        {/*   </div> */}
        {/* </li> */}
      </ul>
    </li>
  );
};

export default TransactionEntityCard;
