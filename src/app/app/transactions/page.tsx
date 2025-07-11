import TransactionHomeMainSection from "@/components/transaction/transactionHomeMainSection.component";
import React from "react";
const page = () => {
  return (
    <div className="inline-flex flex-col gap-8 flex-wrap">
      <h1 className="text-[var(--invent-gray)] font-md text-2xl">
        Transactions
      </h1>
      <TransactionHomeMainSection />
    </div>
  );
};

export default page;
