"use client";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import React, { useState } from "react";
import SettingsAccount from "./settingsAccount.component";
import SettingsInvoice from "./settingsInvoice.component";

type SettingMainProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type settingSectionItemT = "account" | "invoice" | "plans" | "others";
// const SettingItem = () => {};
type SettingSectionT = {
  id: settingSectionItemT;
  name: string;
};

const SettingSections: SettingSectionT[] = [
  {
    id: "account",
    name: "Account",
  },

  {
    id: "invoice",
    name: "Invoice",
  },
  {
    id: "plans",
    name: "Plans",
  },
  {
    id: "others",
    name: "Other",
  },
];

const SettingMain = ({ open, setOpen }: SettingMainProps) => {
  const [currentSection, setCurrentSection] =
    useState<settingSectionItemT>("account");
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="w-[40vw] sm:max-w-full h-[60vh] p-0 overflow-hidden
    fixed top-1/2 left-1/2 -translate-y-1/2"
      >
        <div className="flex flex-col h-full">
          <DialogHeader className="p-6 border-b">
            <DialogTitle>Settings</DialogTitle>
          </DialogHeader>

          <div className="flex flex-1 h-full">
            <aside className="w-48 border-r bg-muted p-4">
              <ul className="space-y-2 text-sm">
                {SettingSections.map((item) => (
                  <li
                    key={item.id}
                    onClick={() => setCurrentSection(item.id)}
                    className={cn(
                      "font-medium px-3 py-2 hover:bg-gray-200 rounded-md cursor-pointer",
                      item.id == currentSection
                        ? "bg-[#FF989A] text-gray-100 hover:bg-[#FF989A]"
                        : "",
                    )}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            </aside>

            <main className="flex-1 p-6 overflow-y-auto">
              {currentSection === "account" && <SettingsAccount />}
              {currentSection === "invoice" && <SettingsInvoice />}
            </main>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingMain;
