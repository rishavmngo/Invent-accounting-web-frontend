import React from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { MdArrowOutward } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { RiPhoneFill } from "react-icons/ri";
import { cn, formatDate } from "@/lib/utils";
type PartyDetailsFormPropsType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const PartyDetailsForm = ({ open, setOpen }: PartyDetailsFormPropsType) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="">
        <DialogTitle className="text-2xl font-medium">
          Party Details
        </DialogTitle>

        <section>
          <div className="flex flex-col gap-2 bg-[#F3F3F3] p-4 rounded-md">
            <h1 className="text-[var(--invent-gray)] text-4xl mb-6">
              Ganesh Textile
            </h1>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="bg-red-200 p-1 rounded-full">
                  <MdArrowOutward className="text-red-500" />
                </div>
                <span className="text-red-500">Payable: 100.0</span>
              </div>
              <h2>No Credit Limit</h2>
            </div>
            <div className="flex items-center gap-2">
              <RiPhoneFill />
              <span>+91 9928703838</span>
            </div>
          </div>
        </section>
        <div
          className={cn(
            "flex h-10 items-center rounded-md border border-input bg-white pl-3 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2",
          )}
        >
          <CiSearch className="h-[16px] w-[16px]" />
          <input
            type="search"
            className="w-full p-2 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        <ul>
          <li className="group flex flex-col gap-4 px-5 py-2 text-sm rounded-md bg-[#F5F5F5] cursor-pointer rainbow-border-wrapper ">
            <h2 className="font-medium text-xl text-[#4E4E4E]">Sale Order</h2>
            <ul className="flex gap-20 ">
              <li>
                <div className="text-[#707070] text-sm">Date</div>
                <div className="font-medium text-[#464646]">
                  {formatDate("2024-04-12T10:34:23.000Z")}
                </div>
              </li>
              <li>
                <div className="text-[#707070] text-sm">Total</div>
                <div>$ 100.0</div>
              </li>

              <li>
                <div className="text-[#707070] text-sm">Balance</div>
                <div className="flex items-center text-[#464646]">$ 100.0</div>
              </li>
            </ul>
          </li>
        </ul>
      </DialogContent>
    </Dialog>
  );
};

export default PartyDetailsForm;
