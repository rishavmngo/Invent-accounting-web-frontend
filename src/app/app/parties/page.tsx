"use client";
import PartyEntityCard from "@/components/entity-card-party/PartyEntityCard";
import { BsPerson } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import PartyForm from "@/components/party-form/PartyForm.component";
import PartyDetailsForm from "@/components/party-details-form/PartyDetailsForm.component";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { getAllPartyCardData } from "@/api/parties";
import SkeletonPartyEntityCard from "@/components/entity-card-party/SkeletonPartyEntityCard.component";

const Page = () => {
  const [isPartyFormOpen, togglePartyForm] = useState(false);
  const [isPartyDetailsFormOpen, togglePartyDetailsForm] = useState(false);
  const { ownerId } = useAuth();

  const { data: parties, isLoading } = useQuery({
    queryFn: () => {
      if (ownerId) return getAllPartyCardData(ownerId);
      return [];
    },
    queryKey: ["partyCardData", ownerId],
  });

  const handlePartyFormVisiblity = () => {
    togglePartyForm(!isPartyFormOpen);
  };

  const router = useRouter();
  const handlePartyCardClick = (id: number) => {
    router.push(`/app/parties/${id}`);
  };

  return (
    <div className="inline-flex flex-col gap-8 flex-wrap">
      <h1 className="text-[var(--invent-gray)] font-md text-2xl">Parties</h1>
      <ul className="flex flex-col gap-10 ">
        {isLoading &&
          Array.from({ length: 2 }).map((_, i) => (
            <SkeletonPartyEntityCard key={i} />
          ))}
        {!isLoading &&
          parties?.map((party) => {
            return (
              <PartyEntityCard
                key={party.id}
                name={party.name}
                onClick={() => handlePartyCardClick(party.id)}
                tabIndex={2}
                amount={100}
                payable={false}
                rating={2.5}
                lastTrade={"2024-04-12T10:34:23.000Z"}
              />
            );
          })}
      </ul>
      <Button
        tabIndex={3}
        className="self-end"
        onClick={handlePartyFormVisiblity}
      >
        <BsPerson /> Add New Party
      </Button>
      <PartyForm open={isPartyFormOpen} setOpen={togglePartyForm} />
      <PartyDetailsForm
        open={isPartyDetailsFormOpen}
        setOpen={togglePartyDetailsForm}
      />
    </div>
  );
};

export default Page;
