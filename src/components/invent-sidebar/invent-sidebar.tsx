"use client";
import React from "react";
import { TbCashRegister, TbLayoutDashboardFilled } from "react-icons/tb";
import { RxDashboard } from "react-icons/rx";
import { FaMoneyBills } from "react-icons/fa6";
import Image from "next/image";
import { LuBoxes } from "react-icons/lu";
import {
  FaHandshake,
  FaMoneyBillWave,
  FaMoneyBillWaveAlt,
  FaUsers,
} from "react-icons/fa";
import SidebarItem from "./invent-sidebar-item";
import { cn, IsPageActive } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useSidebar } from "./invent-sidebar.context";
import { usePathname, useRouter } from "next/navigation";

const sidebarItems = [
  {
    id: "sidebarItems_01",
    name: "dashboard",
    link: "",
    icon: TbLayoutDashboardFilled,
  },

  {
    id: "sidebarItems_02",
    name: "sell",
    link: "sell",
    icon: FaMoneyBills,
  },
  {
    id: "sidebarItems_03",
    name: "inventory",
    link: "inventory",
    icon: LuBoxes,
  },
  {
    id: "sidebarItems_04",
    name: "parties",
    link: "parties",
    icon: FaUsers,
  },
];

const InventSidebar = () => {
  const { shrinked } = useSidebar();
  const pathname = usePathname();
  return (
    <div
      className={cn(
        shrinked ? "w-24 " : "w-64 ",
        "flex flex-col items-center bg-[var(--invent-sidebar-background)] h-screen font-(family-name:--font-roboto) py-8 relative transition-all duration-300 ease-in-out overflow-hidden",
      )}
    >
      <div className="flex  px-6  gap-4  mb-10 ">
        <Image src="/invent_logo.svg" alt="logo" width={38} height={80} />
        {!shrinked && (
          <h1 className="uppercase font-medium  text-2xl text-[var(--invent-gray)]">
            Invent
          </h1>
        )}
      </div>

      <ul className="">
        {sidebarItems.map((item) => (
          <SidebarItem
            key={item.id}
            name={item.name}
            icon={item.icon}
            iconSize={30}
            link={item.link}
            isShrinked={shrinked}
            active={IsPageActive(pathname, item.link)}
          />
        ))}
      </ul>

      <div className="flex gap-4  items-center  border-green-500 text-[var(--invent-gray)] mt-auto h-8">
        <Avatar>
          <AvatarImage
            src="https://i.pinimg.com/736x/15/ed/1b/15ed1bdb5985993fd31ef3b507d45e30.jpg"
            alt="@shadcn"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        {!shrinked && (
          <span
            className={cn(
              "capitalize text-xl font-medium group-hover:text-gray-50",
            )}
          >
            {"rishav raj"}
          </span>
        )}
      </div>
    </div>
  );
};

export default InventSidebar;
