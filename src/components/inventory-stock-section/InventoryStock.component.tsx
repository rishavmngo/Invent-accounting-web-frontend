import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import StockTransactionCard from "../inventory-transactions/stock-transaction-card";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { getAllItemStock } from "@/api/inventory";
import { Button } from "../ui/button";
import { IoMdAddCircle } from "react-icons/io";
import { FaSortAmountUp } from "react-icons/fa";
import Image from "next/image";
import InventoryStockAddForm from "../inventory-stock-add-form/InventoryStockAddForm.component";
type InventoryStockSectionProps = {
  ownerId: number;
  itemId: number;
};

const InventoryStockSection = ({
  ownerId,
  itemId,
}: InventoryStockSectionProps) => {
  const [isAddFormOpen, toggleAddForm] = useState(false);
  const { data } = useQuery({
    queryKey: ["ItemStockCardData", ownerId, itemId],
    queryFn: () => {
      if (!ownerId || !itemId) return null;
      return getAllItemStock(itemId);
    },
    enabled: !!ownerId && !!itemId,
  });
  return (
    <div className="w-[500px] mt-10">
      <InventoryStockAddForm open={isAddFormOpen} setOpen={toggleAddForm} />
      <div
        className={cn(
          "flex h-10 items-center rounded-md border border-input bg-white pl-3 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2 mb-10 ",
        )}
      >
        <CiSearch className="h-[24px] w-[24px]" />
        <input
          type="search"
          placeholder="Search stock transactions"
          className="w-full p-2 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>

      <div className="flex justify-between mb-2">
        <div>
          <Button onClick={() => toggleAddForm(true)}>
            Adjust Stock <IoMdAddCircle />
          </Button>
        </div>
        <div>
          <Button>
            <FaSortAmountUp />
          </Button>
        </div>
      </div>
      <ul className="flex flex-col gap-4 overflow-y-auto h-[450px] p-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent hover:scrollbar-thumb-gray-500">
        {data && data.length > 0 ? (
          data.map((stock) => (
            <StockTransactionCard
              key={stock.id}
              type={stock.type}
              date={stock.as_of_date ? stock.as_of_date.toString() : "-"}
              quantity={stock.quantity}
              pricePerUnit={stock.purchase_price ? stock.purchase_price : 0}
            />
          ))
        ) : (
          <div className="flex flex-col items-center">
            <Image
              src="/box.svg"
              className="opacity-50"
              alt="box-empty"
              width={98}
              height={140}
            />
            <p className="text-gray-200">Empty!</p>
          </div>
        )}
      </ul>
    </div>
  );
};

export default InventoryStockSection;
