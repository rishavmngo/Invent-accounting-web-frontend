"use client";
import PartyEntityCard from "@/components/entity-card-party/PartyEntityCard";
import { BsPerson } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import PartyForm from "@/components/party-form/PartyForm.component";
import PartyDetailsForm from "@/components/party-details-form/PartyDetailsForm.component";

const Page = () => {
  const [isPartyFormOpen, togglePartyForm] = useState(false);
  const [isPartyDetailsFormOpen, togglePartyDetailsForm] = useState(true);

  const handlePartyFormVisiblity = () => {
    togglePartyForm(!isPartyFormOpen);
  };

  const handlePartyDetailsFormVisiblity = () => {
    togglePartyDetailsForm(!isPartyDetailsFormOpen);
  };
  return (
    <div className="ml-10  inline-flex flex-col gap-8 flex-wrap">
      <h1 className="text-[var(--invent-gray)] font-md text-2xl">Parties</h1>
      <ul className="flex flex-col gap-10 ">
        <PartyEntityCard
          name="Geeta Textile"
          onClick={handlePartyDetailsFormVisiblity}
          tabIndex={2}
          amount={100}
          payable={false}
          rating={2.5}
          lastTrade={"2024-04-12T10:34:23.000Z"}
        />

        <PartyEntityCard
          name="Ganesh Steel"
          onClick={handlePartyDetailsFormVisiblity}
          tabIndex={2}
          amount={100}
          payable={true}
          rating={4}
          lastTrade={"2025-02-08T10:34:23.000Z"}
        />
        <PartyEntityCard
          name="atoz furniture"
          onClick={handlePartyDetailsFormVisiblity}
          tabIndex={2}
          amount={0}
          payable={true}
          rating={4}
          lastTrade={"2025-02-08T10:34:23.000Z"}
        />
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
