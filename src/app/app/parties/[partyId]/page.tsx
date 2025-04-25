"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { MdArrowOutward, MdPhone } from "react-icons/md";

const Page = () => {
  const router = useRouter();
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
      </div>
      <div className="bg-[#E6E6E6] p-6 rounded-md h-[180px] flex justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold text-[var(--invent-gray)]">
            Ganesh Textiles
          </h1>
          <div>
            <p className=" text-[#5D5D5D]">MG Road Bihar Sharif, Nalanda</p>
            <span className=" flex gap-2 items-center text-[#5D5D5D]">
              <MdPhone /> <p>+91 9338432319</p>
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
    </section>
  );
};

export default Page;
