"use client";
import PartyEntityCard from "@/components/entity-card-party/PartyEntityCard";
import { BsPerson } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import PartyForm from "@/components/party-form/PartyForm.component";

const Page = () => {
  const [isPartyFormOpen, togglePartyForm] = useState(false);

  const handlePartyFormVisiblity = () => {
    togglePartyForm(!isPartyFormOpen);
  };

  return (
    <div className="ml-10  inline-flex flex-col gap-8 flex-wrap">
      <h1 className="text-[var(--invent-gray)] font-md text-2xl">Parties</h1>
      <ul className="flex flex-col gap-10 ">
        <PartyEntityCard
          name="Geeta Textile"
          amount={100}
          payable={false}
          rating={2.5}
          lastTrade={"2024-04-12T10:34:23.000Z"}
        />

        <PartyEntityCard
          name="Ganesh Steel"
          amount={100}
          payable={true}
          rating={4}
          lastTrade={"2025-02-08T10:34:23.000Z"}
        />
        <PartyEntityCard
          name="atoz furniture"
          amount={0}
          payable={true}
          rating={4}
          lastTrade={"2025-02-08T10:34:23.000Z"}
        />
      </ul>
      <Button className="self-end" onClick={handlePartyFormVisiblity}>
        <BsPerson /> Add New Party
      </Button>
      <PartyForm open={isPartyFormOpen} setOpen={togglePartyForm} />
    </div>
  );
};

export default Page;
