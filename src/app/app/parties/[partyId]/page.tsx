import PartyDetailsPage from "@/components/partyDetailsPage/PartyDetailsPage.component";
import React from "react";

interface PartyDetailPageProps {
  params: Promise<{
    partyId: number;
  }>;
}
const Page = async ({ params }: PartyDetailPageProps) => {
  const { partyId } = await params;
  // console.log("PartyId is ", partyId);
  return <PartyDetailsPage partyId={partyId} />;
};

export default Page;
