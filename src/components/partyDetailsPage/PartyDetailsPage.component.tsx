"use client";
import { getPartyById } from "@/api/parties";
import { useAuth } from "@/hooks/useAuth";
import { cn, formatDate } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { CiSearch } from "react-icons/ci";
import { FaArrowLeft } from "react-icons/fa6";
import { MdArrowOutward, MdEdit, MdPhone } from "react-icons/md";

type PartyDetailsPageProps = {
  partyId: number;
};

const PartyDetailsPage = ({ partyId }: PartyDetailsPageProps) => {
  const router = useRouter();
  const { ownerId } = useAuth();

  const partyid = Number(partyId);

  console.log(ownerId, partyid);
  const { data } = useQuery({
    queryKey: ["party", ownerId, partyid],
    queryFn: () => {
      if (!ownerId || !partyid) return null;
      return getPartyById(ownerId, partyid);
    },
    enabled: !!ownerId && !!partyid,
  });

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
          Party Details
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
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold text-[var(--invent-gray)]">
            {data?.name}
          </h1>
          <div>
            <p className=" text-[#5D5D5D]">{data?.billing_address}</p>
            <span className=" flex gap-2 items-center text-[#5D5D5D]">
              <MdPhone /> <p>{data?.contact_number}</p>
            </span>
          </div>
        </div>
        <div className="flex flex-col justify-between items-end">
          <div className="flex items-center gap-2 p-2 bg-white rounded-md">
            <div className="bg-red-200 p-1 rounded-full">
              <MdArrowOutward className="text-red-700" />
            </div>
            <span className="text-red-700">Payable: 100000.0</span>
          </div>
          <div className="bg-[var(--invent-gray)] px-4 py-2 rounded-md">
            <span className="text-white">No Credit Limit Set</span>
          </div>
        </div>
      </div>

      <div className="w-[400px] mt-10">
        <div
          className={cn(
            "flex h-10 items-center rounded-md border border-input bg-white pl-3 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2 mb-15 ",
          )}
        >
          <CiSearch className="h-[24px] w-[24px]" />
          <input
            type="search"
            placeholder="Search transactions"
            className="w-full p-2 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        <ul className="flex flex-col gap-4">
          <li className="group flex flex-col gap-4 px-5 py-2 text-sm rounded-md bg-[#F5F5F5] cursor-pointer rainbow-border-wrapper ">
            <h2 className="font-medium text-xl text-[#4E4E4E]">Sale Order</h2>
            <ul className="flex gap-20 ">
              <li>
                <div className="text-[#707070] text-sm">Date</div>
                <div className="font-medium text-[#464646]">
                  {formatDate("2024-04-12T10:34:23.000Z")}
                </div>
              </li>
              <li>
                <div className="text-[#707070] text-sm">Total</div>
                <div>$ 100.0</div>
              </li>

              <li>
                <div className="text-[#707070] text-sm">Balance</div>
                <div className="flex items-center text-[#464646]">$ 100.0</div>
              </li>
            </ul>
          </li>

          <li className="group flex flex-col gap-4 px-5 py-2 text-sm rounded-md bg-[#F5F5F5] cursor-pointer rainbow-border-wrapper ">
            <h2 className="font-medium text-xl text-[#4E4E4E]">Sale Order</h2>
            <ul className="flex gap-20 ">
              <li>
                <div className="text-[#707070] text-sm">Date</div>
                <div className="font-medium text-[#464646]">
                  {formatDate("2024-04-12T10:34:23.000Z")}
                </div>
              </li>
              <li>
                <div className="text-[#707070] text-sm">Total</div>
                <div>$ 100.0</div>
              </li>

              <li>
                <div className="text-[#707070] text-sm">Balance</div>
                <div className="flex items-center text-[#464646]">$ 100.0</div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default PartyDetailsPage;
