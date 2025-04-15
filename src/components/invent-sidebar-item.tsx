import { cn } from "@/lib/utils";
import React from "react";
import { IconType } from "react-icons";

type SidebarItemsProps = {
  name: string;
  link: string;
  icon: IconType;
  iconSize: number;
  isShrinked?: boolean;
};

const SidebarItem = (props: SidebarItemsProps) => {
  return (
    <li className=" group flex px-6 py-6 my-6  items-center  gap-4 text-[var(--invent-gray)]  h-8 hover:bg-[var(--invent-menu-select)] cursor-pointer rounded-sm">
      <props.icon
        size={props.iconSize}
        className={cn(!props.isShrinked ? "" : "", "group-hover:text-gray-50")}
      />
      {!props.isShrinked && (
        <span className={cn("capitalize text-2xl group-hover:text-gray-50")}>
          {props.name}
        </span>
      )}
    </li>
  );
};

export default SidebarItem;
