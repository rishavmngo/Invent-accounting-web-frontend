"use client";
import { deleteItem, getItemById } from "@/api/inventory";
import { useAuth } from "@/hooks/useAuth";
import { formatCurrency } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaBoxOpen } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { MdDelete, MdEdit } from "react-icons/md";
import InventoryUpdateForm from "../inventory-form/InventoryUpdateForm.component";
import { ItemUpdateForm } from "@/types/inventory.type";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import InventoryStockSection from "../inventory-stock-section/InventoryStock.component";

type InventoryDetailsPageProps = {
  itemId: number;
};

const InventoryDetailsPage = ({ itemId }: InventoryDetailsPageProps) => {
  const queryClient = useQueryClient();
  const [isItemDeleteDialogOpen, toggleItemDeleteDialogOpen] =
    useState<boolean>(false);
  const [isInventoryUpdateFormOpen, toggleInventoryUpdateForm] =
    useState<boolean>(false);
  const router = useRouter();
  const { ownerId } = useAuth();

  const itemid = Number(itemId);

  console.log(ownerId, itemid);
  const { data } = useQuery({
    queryKey: ["ItemCardData", ownerId, itemid],
    queryFn: () => {
      if (!ownerId || !itemid) return null;
      return getItemById(ownerId, itemid);
    },
    enabled: !!ownerId && !!itemid,
  });

  const mutation = useMutation({
    mutationFn: deleteItem,
    mutationKey: ["ItemCardData"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ItemCardData"] });
    },
  });

  const handleItemDelete = () => {
    mutation.mutate({ id: itemid, user_id: ownerId });
    router.back();
  };

  console.log(data);
  return (
    <section className="">
      <AlertDialog open={isItemDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Do you want to delete item &quot;
              <span className="font-bold">{data?.name}</span>&quot; ?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter className="">
            <div className="flex gap-6">
              <Button
                className="bg-white-500 text-black hover:text-white "
                onClick={() => toggleItemDeleteDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-red-400 hover:bg-red-500"
                onClick={() => handleItemDelete()}
              >
                Confirm
              </Button>
            </div>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className="flex  items-center mb-8 justify-between">
        <div>
          <button
            onClick={() => router.back()}
            className=" text-[var(--invent-gray)] hover:bg-[#E6E6E6] rounded-sm  p-1 cursor-pointer"
          >
            <FaArrowLeft />
          </button>

          <span className="text-xl font-bold text-[var(--invent-gray)] ">
            Item Details
          </span>
        </div>
        <div className="flex gap-2">
          <button
            tabIndex={2}
            onClick={() => toggleItemDeleteDialogOpen(true)}
            className="rounded-md px-2 py-1 bg-red-100 text-[var(--invent-gray)] border border-red-100 hover:border-red-300 transition-all border-2"
          >
            <MdDelete className="text-xl text-red-800" />
          </button>
          <button
            tabIndex={3}
            onClick={() => toggleInventoryUpdateForm(true)}
            className="ml-auto flex gap-2 items-center rounded-md px-2 py-1 bg-[#E6E6E6] text-[var(--invent-gray)] border hover:border-[var(--invent-gray)] transition-all border-2"
          >
            <MdEdit />
            Edit
          </button>
        </div>
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
        </div>
      </div>
      {ownerId && <InventoryStockSection ownerId={ownerId} itemId={itemid} />}
      {data && (
        <InventoryUpdateForm
          key={data?.id}
          id={data?.id}
          open={isInventoryUpdateFormOpen}
          setOpen={toggleInventoryUpdateForm}
          item={data as ItemUpdateForm}
        />
      )}
    </section>
  );
};

export default InventoryDetailsPage;
