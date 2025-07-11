"use client";
import { formatCurrency, formatDate } from "@/lib/utils";
import React, { useState } from "react";
import { FaLongArrowAltDown, FaLongArrowAltUp } from "react-icons/fa";
import { FaBoxOpen } from "react-icons/fa6";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CiMenuKebab } from "react-icons/ci";
import { MdDelete, MdEdit } from "react-icons/md";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteStock } from "@/api/inventory";
import { ItemStock } from "@/types/inventory.type";
type StockTransactionCardProps = {
  stock: ItemStock;
};

const StockTransactionCard = ({ stock }: StockTransactionCardProps) => {
  const [isDeleteDialogOpen, toggleDeleteDialogOpen] = useState(false);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteStock,
    mutationKey: ["ItemStockCardData"],
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey.includes("ItemCardData") ||
          query.queryKey.includes("ItemStockCardData"),
      });
    },
  });

  const handleStockDelete = () => {
    mutation.mutate({ itemId: stock.item_id, itemStockId: stock.id });
  };

  return (
    <li className="group flex flex-col gap-4 px-5 py-2 text-sm rounded-md bg-[#F5F5F5] ">
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <h2 className="font-medium text-xl text-[#4E4E4E]">{stock.type}</h2>
          {stock.type == "reduce" ? (
            <span className=" bg-[#f6cccc] p-2 text-[#7d5d5d] flex gap-2 items-center rounded-full">
              <FaBoxOpen className="text-xl " />
              <FaLongArrowAltDown className="" />
            </span>
          ) : (
            <span className=" bg-[#daf6cc] p-2 text-[#5d7d5d] flex gap-2 items-center rounded-full">
              <FaBoxOpen className="text-xl " />
              <FaLongArrowAltUp className="" />
            </span>
          )}
        </div>
        {stock.type != "opening_stock" && (
          <div className="flex gap-4 items-center">
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <CiMenuKebab />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full" align="start">
                <DropdownMenuLabel>Modify stock</DropdownMenuLabel>
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <MdEdit /> Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-red-600"
                    onClick={() => {
                      toggleDeleteDialogOpen(true);
                    }}
                  >
                    <MdDelete className="text-red-800" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
      <ul className="flex gap-20 ">
        <li>
          <div className="text-[#707070] text-sm">Date</div>
          <div className="font-medium text-[#464646]">
            {formatDate(stock.as_of_date ? stock.as_of_date.toString() : "-")}
          </div>
        </li>
        <li>
          <div className="text-[#707070] text-sm">Quantity</div>
          <div>{stock.quantity}</div>
        </li>

        <li>
          <div className="text-[#707070] text-sm">Price per unit</div>
          <div className="flex items-center text-[#464646]">
            {formatCurrency(stock.purchase_price ? stock.purchase_price : 0)}
          </div>
        </li>
      </ul>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={toggleDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure?
              {/* <span className="font-bold">{data?.name}</span>&quot; ? */}
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter className="">
            <div className="flex gap-6">
              <Button
                className=""
                onClick={() => toggleDeleteDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="outline"
                className="border-red-400 text-red-400 hover:bg-red-400 hover:text-white"
                onClick={() => handleStockDelete()}
              >
                Confirm
              </Button>
            </div>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </li>
  );
};

export default StockTransactionCard;
