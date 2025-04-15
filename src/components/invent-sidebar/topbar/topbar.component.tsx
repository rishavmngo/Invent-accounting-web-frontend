"use client";
import React from "react";
import { useSidebar } from "../invent-sidebar.context";
import {
  TbLayoutSidebarLeftExpandFilled,
  TbLayoutSidebarRightExpandFilled,
} from "react-icons/tb";

const TopBar = () => {
  const { shrinked, toggleExpand } = useSidebar();

  return (
    <div className="h-10">
      <div onClick={toggleExpand} className="text-stone-400">
        {!shrinked ? (
          <TbLayoutSidebarRightExpandFilled size={30} />
        ) : (
          <TbLayoutSidebarLeftExpandFilled size={30} />
        )}
      </div>
    </div>
  );
};

export default TopBar;
