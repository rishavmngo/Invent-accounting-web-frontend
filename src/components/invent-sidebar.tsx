import React from "react";
import { TbCashRegister, TbLayoutDashboardFilled } from "react-icons/tb";
import logo from "../../public/invent_logo.svg";
import Image from "next/image";
import { LuBoxes } from "react-icons/lu";
import { FaHandshake } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";

const InventSidebar = () => {
  return (
    <div className="w-64 flex flex-col bg-[var(--invent-sidebar-background)] h-screen font-(family-name:--font-roboto)">
      <div className="flex items-center gap-3 border-2 border-solid border-black mb-20">
        <Image src={logo} alt="logo" width={35} height={80} />
        <h1 className="uppercase font-medium  text-2xl text-[var(--invent-gray)]">
          Invent
        </h1>
      </div>

      <ul className="">
        <li className="flex gap-4 text-[var(--invent-gray)]">
          <TbLayoutDashboardFilled size={30} />
          <span className="capitalize text-2xl">dashboard</span>
        </li>

        <li className="flex gap-4 text-[var(--invent-gray)]">
          <TbCashRegister size={30} />
          <span className="capitalize text-2xl">sell</span>
        </li>
        <li className="flex gap-4 text-[var(--invent-gray)]">
          <LuBoxes size={30} />
          <span className="capitalize text-2xl">inventory</span>
        </li>
        <li className="flex gap-4 text-[var(--invent-gray)]">
          <FaHandshake size={30} />
          <span className="capitalize text-2xl">Parties</span>
        </li>
      </ul>

      <div className="flex gap-4 text-[var(--invent-gray)] mt-auto">
        <IoSettingsSharp size={30} />
        <span className="capitalize text-2xl">Settings</span>
      </div>
    </div>
  );
};

export default InventSidebar;
