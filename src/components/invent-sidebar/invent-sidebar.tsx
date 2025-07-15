"use client";
import React, { useState } from "react";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { FaMoneyBills } from "react-icons/fa6";
import Image from "next/image";
import { LuBoxes } from "react-icons/lu";
import { FaCog, FaUsers } from "react-icons/fa";
import SidebarItem from "./invent-sidebar-item";
import { cn, IsPageActive } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useSidebar } from "./invent-sidebar.context";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { CiLogout } from "react-icons/ci";
import SettingMain from "../settings/settingsMain.component";

const sidebarItems = [
  {
    id: "sidebarItems_01",
    name: "dashboard",
    link: "",
    icon: TbLayoutDashboardFilled,
  },

  {
    id: "sidebarItems_02",
    name: "transactions",
    link: "transactions",
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
  const { user, logoutUser } = useAuth();
  const [isMenuOpen, toggleMenu] = useState(false);
  const [isSettingDialogOpen, toggleSettingDialog] = useState(false);
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

      <DropdownMenu open={isMenuOpen} onOpenChange={toggleMenu}>
        <DropdownMenuTrigger asChild>
          <button
            onClick={() => {
              toggleMenu(!isMenuOpen);
            }}
            className="flex gap-4  items-center  border-green-500 text-[var(--invent-gray)] mt-auto h-8"
          >
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
                {user && user.name}
              </span>
            )}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="" align="start">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="flex gap-2"
              onClick={() => {
                setTimeout(() => {
                  toggleSettingDialog(true);
                }, 0);
              }}
            >
              <FaCog />
              settings
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex gap-2"
              onClick={() => {
                logoutUser();
              }}
            >
              <CiLogout /> Logout
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <SettingMain open={isSettingDialogOpen} setOpen={toggleSettingDialog} />
    </div>
  );
};

export default InventSidebar;
