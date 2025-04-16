import InventSidebar from "@/components/invent-sidebar/invent-sidebar";
import { SidebarProvider } from "@/components/invent-sidebar/invent-sidebar.context";
import TopBar from "@/components/invent-sidebar/topbar/topbar.component";
import React from "react";

export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="flex">
      <SidebarProvider>
        <InventSidebar />
        <div className="flex-1 flex flex-col ">
          <TopBar />
          <div>{children}</div>
          <div>bottombar</div>
        </div>
      </SidebarProvider>
    </main>
  );
}
