"use client";
import { createContext, ReactNode, useContext, useState } from "react";

type SidebarContextType = {
  shrinked: boolean;
  toggleExpand: () => void;
};

const SidebarContext = createContext<SidebarContextType | null>(null);

const useSidebar = () => {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }
  return context;
};

const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [shrinked, setShrinked] = useState(false);

  const toggleExpand = () => {
    setShrinked(!shrinked);
  };

  const value = {
    shrinked,
    toggleExpand,
  };
  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
};

export { SidebarContext, useSidebar, SidebarProvider };
