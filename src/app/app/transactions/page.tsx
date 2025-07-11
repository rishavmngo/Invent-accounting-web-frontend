import TransactionHomeStatCard from "@/components/transaction/TransactionMoneyStat.component";
import React from "react";
import { FaMoneyBillTransfer } from "react-icons/fa6";
const page = () => {
  return (
    <div className="inline-flex flex-col gap-8 flex-wrap">
      <h1 className="text-[var(--invent-gray)] font-md text-2xl">
        Transactions
      </h1>
      <div className="flex flex-col gap-8 bg-[#404040] p-5 rounded-md">
        <div className="">
          <span className="flex gap-4">
            <TransactionHomeStatCard get={true} amount={1800} />
            <TransactionHomeStatCard get={false} amount={400000} />
          </span>
        </div>
        <div>
          <span className="inline-flex gap-2 items-center bg-white py-2 px-2 rounded-md cursor-pointer hover:bg-gray-200">
            <FaMoneyBillTransfer size="2em" className="text-[#F25C48]" />
            <p className="text-gray-800 text-2xl">Add Trxn</p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default page;
