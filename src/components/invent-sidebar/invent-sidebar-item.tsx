import { appPath, cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";

type SidebarItemsProps = {
  name: string;
  link: string;
  icon: IconType;
  iconSize: number;
  isShrinked?: boolean;
  active: boolean;
};

const SidebarItem = (props: SidebarItemsProps) => {
  return (
    <Link href={appPath(props.link)}>
      <li
        className={cn(
          "group flex px-6 py-6 my-6  items-center  gap-4 text-[var(--invent-gray)]  h-8 hover:bg-[var(--invent-menu-select)] cursor-pointer rounded-sm",
          props.active ? "bg-[var(--invent-menu-select)]" : "",
        )}
      >
        <props.icon
          size={props.iconSize}
          className={cn(
            !props.isShrinked ? "" : "",
            "group-hover:text-gray-50",
            props.active ? "text-gray-50" : "",
          )}
        />
        <span
          className={cn(
            "capitalize text-2xl group-hover:text-gray-50 transition-transform transition-opacity ",

            props.active ? "text-gray-50" : "",
            props.isShrinked
              ? "hidden opacity-0  pointer-events-none delay-0"
              : "block opacity-100  pointer-events-auto delay-200",
          )}
        >
          {props.name}
        </span>
      </li>
    </Link>
  );
};

export default SidebarItem;
