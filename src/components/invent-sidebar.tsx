"use client";
import React, { useState } from "react";
import {
  TbCashRegister,
  TbLayoutDashboardFilled,
  TbLayoutSidebarLeftExpandFilled,
  TbLayoutSidebarRightExpandFilled,
} from "react-icons/tb";
import logo from "../../public/invent_logo.svg";
import Image from "next/image";
import { LuBoxes } from "react-icons/lu";
import { FaHandshake } from "react-icons/fa";
import SidebarItem from "./invent-sidebar-item";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

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
    link: "",
    icon: TbCashRegister,
  },
  {
    id: "sidebarItems_03",
    name: "inventory",
    link: "",
    icon: LuBoxes,
  },
  {
    id: "sidebarItems_04",
    name: "parties",
    link: "",
    icon: FaHandshake,
  },
];

const InventSidebar = () => {
  const [shrinked, setShrinked] = useState<boolean>(false);
  return (
    <div
      className={cn(
        shrinked ? "w-24 " : "w-64 ",
        "flex flex-col items-center bg-[var(--invent-sidebar-background)] h-screen font-(family-name:--font-roboto) py-10 relative transition-all duration-300 ease-in-out ",
      )}
    >
      {/* <div */}
      {/*   onClick={() => setShrinked(!shrinked)} */}
      {/*   // className="absolute top-2 left-2 text-stone-400" */}
      {/*   className={cn( */}
      {/*     shrinked ? "left-1/2 transform -translate-x-1/2" : "left-2", */}
      {/*     "absolute  top-2 text-stone-400", */}
      {/*   )} */}
      {/* > */}
      {/*   {shrinked ? <RiExpandRightFill /> : <RiExpandLeftFill />} */}
      {/* </div> */}
      <div
        onClick={() => setShrinked(!shrinked)}
        className="oveflow-visible absolute top-2 -right-8 text-stone-400 "

        // className={cn(
        //   shrinked ? "left-1/2 transform -translate-x-1/2" : "right-2",
        //   "absolute  top-2 text-stone-400",
        // )}
      >
        {!shrinked ? (
          <TbLayoutSidebarRightExpandFilled size={30} />
        ) : (
          <TbLayoutSidebarLeftExpandFilled size={30} />
        )}
      </div>
      <div className="flex  px-6 py-6  gap-4  mb-20 ">
        <Image src={logo} alt="logo" width={38} height={80} />
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
          />
        ))}
      </ul>

      {/* <div className="flex gap-4 text-[var(--invent-gray)] mt-auto h-8"> */}
      {/*   <IoSettingsSharp size={30} /> */}
      {/*   {!shrinked && <span className="capitalize text-2xl">Settings</span>} */}
      {/* </div> */}

      <div className="flex gap-4  items-center  border-green-500 text-[var(--invent-gray)] mt-auto h-8">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
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
