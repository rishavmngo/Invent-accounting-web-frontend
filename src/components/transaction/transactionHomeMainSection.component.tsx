"use client";
import React, { useState } from "react";
import TransactionHomeStatCard from "./TransactionMoneyStat.component";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import TransactionMenu from "./transactionMenu.component";
import TransactionEntityCard from "./transactionEntityCard.component";
import { useQuery } from "@tanstack/react-query";
import { getAllTransaction } from "@/api/transaction";
import { useAuth } from "@/hooks/useAuth";
import TransactionSaleUpdateForm from "./transactionSaleUpdateForm.component";
import { InvoiceGenT } from "@/types/transactionGen.type";

const TransactionHomeMainSection = () => {
  const [isTrxnMenuOpen, toggleTrxnMenu] = useState(false);
  const [isTrxnUpdateFormOpen, toggleTrxnUpdateForm] = useState(false);
  const [selectedTrxn, setSelectedTrxn] = useState<InvoiceGenT | null>(null);

  const { ownerId } = useAuth();

  const { data: transactions, isLoading } = useQuery({
    queryFn: () => {
      if (ownerId) return getAllTransaction(ownerId);
      return [];
    },
    queryKey: ["transactionData", ownerId],
  });
  return (
    <section>
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

      <ul className="mt-4 flex flex-col gap-4">
        {transactions &&
          transactions.map((tran) => (
            <TransactionEntityCard
              key={tran.id}
              invId={tran.id}
              date={tran.created_at}
              customer_name={tran.customer.name}
              total_amount={tran.total_amount}
              onClick={() => {
                setSelectedTrxn(tran);
                toggleTrxnUpdateForm(true);
              }}
            />
          ))}
      </ul>
      {selectedTrxn != null && (
        <TransactionSaleUpdateForm
          open={isTrxnUpdateFormOpen}
          toggleOpen={toggleTrxnUpdateForm}
          trxn={selectedTrxn}
        />
      )}
    </section>
  );
};

export default TransactionHomeMainSection;
