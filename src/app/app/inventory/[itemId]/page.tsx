import InventoryDetailsPage from "@/components/inventoryDetailsPage/inventoryDetailsPage";
import React from "react";

interface ItemDetailPageProps {
  params: Promise<{
    itemId: number;
  }>;
}
const Page = async ({ params }: ItemDetailPageProps) => {
  const { itemId } = await params;
  // console.log("PartyId is ", partyId);
  return <InventoryDetailsPage itemId={itemId} />;
};

export default Page;
