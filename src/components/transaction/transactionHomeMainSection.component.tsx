"use client";
import React, { useState } from "react";
import TransactionHomeStatCard from "./TransactionMoneyStat.component";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import TransactionMenu from "./transactionMenu.component";

const TransactionHomeMainSection = () => {
  const [isTrxnMenuOpen, toggleTrxnMenu] = useState(false);
  return (
    <section className="flex flex-col gap-8 bg-[#404040] p-5 rounded-md">
      <div className="">
        <span className="flex gap-4">
          <TransactionHomeStatCard get={true} amount={1800} />
          <TransactionHomeStatCard get={false} amount={400000} />
        </span>
      </div>
      <div>
        <span
          className="inline-flex gap-2 items-center bg-white py-2 px-2 rounded-md cursor-pointer hover:bg-gray-200"
          onClick={() => toggleTrxnMenu(true)}
        >
          <FaMoneyBillTransfer size="2em" className="text-[#F25C48]" />
          <p className="text-gray-800 text-2xl">Add Trxn</p>
        </span>
      </div>
      <TransactionMenu
        isTrxnMenuOpen={isTrxnMenuOpen}
        toggleTrxnMenu={toggleTrxnMenu}
      />
    </section>
  );
};

export default TransactionHomeMainSection;
