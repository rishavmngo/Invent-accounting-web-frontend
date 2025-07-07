"use client";
import { getItemById } from "@/api/inventory";
import { useAuth } from "@/hooks/useAuth";
import { cn, formatCurrency, formatDate } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { CiSearch } from "react-icons/ci";
import { FaBoxOpen } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import StockTransactionCard from "../inventory-transactions/stock-transaction-card";

type InventoryDetailsPageProps = {
  itemId: number;
};

const InventoryDetailsPage = ({ itemId }: InventoryDetailsPageProps) => {
  const router = useRouter();
  const { ownerId } = useAuth();

  const itemid = Number(itemId);

  console.log(ownerId, itemid);
  const { data } = useQuery({
    queryKey: ["item", ownerId, itemid],
    queryFn: () => {
      if (!ownerId || !itemid) return null;
      return getItemById(ownerId, itemid);
    },
    enabled: !!ownerId && !!itemid,
  });

  console.log(data);
  return (
    <section className="">
      <div className="flex gap-5 items-center mb-8">
        <button
          onClick={() => router.back()}
          className=" text-[var(--invent-gray)] hover:bg-[#E6E6E6] rounded-sm  p-1 cursor-pointer"
        >
          <FaArrowLeft />
        </button>
        <span className="text-xl font-bold text-[var(--invent-gray)] ">
          Item Details
        </span>
        <button
          tabIndex={2}
          className="ml-auto flex gap-2 items-center rounded-md px-2 py-1 bg-[#E6E6E6] text-[var(--invent-gray)] border hover:border-[var(--invent-gray)] transition-all border-2"
        >
          <MdEdit />
          Edit
        </button>
      </div>
      <div className="bg-[#E6E6E6] p-6 rounded-md h-[180px] flex justify-between">
        <div className="flex flex-col gap-2 items-start">
          <div className=" inline-flex items-center gap-2 py-1 px-2 bg-white rounded-md">
            <div className="bg-black p-1 rounded-full">
              <FaBoxOpen className="text-white" />
            </div>
            <span className="">{data?.quantity} Pcs</span>
          </div>

          <h1 className="text-4xl font-bold text-[var(--invent-gray)]">
            {data?.name}
          </h1>

          <div>
            <p className=" text-[#5D5D5D]">{data?.description}</p>
            <span className=" flex gap-2 items-center text-[#5D5D5D]">
              <p>{data?.category}</p>
            </span>
          </div>
        </div>
        <div className="flex flex-col justify-between items-end">
          <div className="flex flex-col gap-6 bg-white p-2 rounded-md">
            <span>
              <p className="text-[#5D5D5D]">Sale Price</p>
              <p className="">
                {formatCurrency(data?.sale_price ? data.sale_price : 0)}
              </p>
            </span>
            <span>
              <p className="text-[#5D5D5D]">Purchase Price</p>
              <p className="">
                {formatCurrency(data?.purchase_price ? data.purchase_price : 0)}
              </p>
            </span>
          </div>
          {/* <div className="bg-[var(--invent-gray)] px-4 py-2 rounded-md"> */}
          {/*   <span className="text-white">No Credit Limit Set</span> */}
          {/* </div> */}
        </div>
      </div>

      <div className="w-[420px] mt-10">
        <div
          className={cn(
            "flex h-10 items-center rounded-md border border-input bg-white pl-3 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2 mb-15 ",
          )}
        >
          <CiSearch className="h-[24px] w-[24px]" />
          <input
            type="search"
            placeholder="Search stock transactions"
            className="w-full p-2 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        <ul className="flex flex-col gap-4">
          <StockTransactionCard
            type={"add"}
            date={new Date().toString()}
            quantity={10}
            pricePerUnit={100}
          />
        </ul>
      </div>
    </section>
  );
};

export default InventoryDetailsPage;
