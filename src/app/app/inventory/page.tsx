"use client";
import { BsPerson } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import InventoryEntityCard from "@/components/entity-card-inventory/InventoryEntityCard";
import { getAllItemsCardData } from "@/api/inventory";
import SkeletonInventoryEntityCard from "@/components/entity-card-inventory/SkeletonInventoryEntityCard.component";
import InventoryForm from "@/components/inventory-form/InventoryForm.component";
import Image from "next/image";

const Page = () => {
  const [isInventoryFormOpen, toggleInventoryForm] = useState(false);
  const { ownerId } = useAuth();

  const { data: items, isLoading } = useQuery({
    queryFn: () => {
      if (ownerId) return getAllItemsCardData(ownerId);
      return [];
    },
    queryKey: ["ItemCardData", ownerId],
  });

  const handlePartyFormVisiblity = () => {
    toggleInventoryForm(!isInventoryFormOpen);
  };

  const router = useRouter();
  const handlePartyCardClick = (id: number) => {
    router.push(`/app/inventory/${id}`);
  };

  return (
    <div className="inline-flex flex-col gap-8 flex-wrap">
      <h1 className="text-[var(--invent-gray)] font-md text-2xl">Items</h1>
      <ul className="flex flex-col gap-10 ">
        {isLoading &&
          Array.from({ length: 2 }).map((_, i) => (
            <SkeletonInventoryEntityCard key={i} />
          ))}
        {!isLoading && items && items.length > 0 ? (
          items?.map((item) => {
            return (
              <InventoryEntityCard
                key={item.id}
                name={item.name}
                onClick={() => handlePartyCardClick(item.id)}
                purchase_price={item.purchase_price}
                sell_price={item.sale_price}
              />
            );
          })
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

        {/* {(!items || items.length < 1) && } */}
      </ul>
      <Button
        tabIndex={3}
        className="self-end"
        onClick={handlePartyFormVisiblity}
      >
        <BsPerson /> Add New Item
      </Button>
      <InventoryForm open={isInventoryFormOpen} setOpen={toggleInventoryForm} />
    </div>
  );
};

export default Page;
