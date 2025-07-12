"use client";
import React, { useState } from "react";

import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import TransactionMenuItem from "./transactionMenuItem";
import { FaCashRegister } from "react-icons/fa6";
import { TbCreditCardPay, TbShoppingBagEdit } from "react-icons/tb";
import { Separator } from "../ui/separator";
import { FaShoppingBag } from "react-icons/fa";
import TransactionSaleForm from "./transactionSaleForm.component";

type TransactionMenuProps = {
  isTrxnMenuOpen: boolean;
  toggleTrxnMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

const TransactionMenu = (props: TransactionMenuProps) => {
  const [isSaleFormOpen, toggleSaleFormOpen] = useState(false);
  return (
    <>
      <Dialog open={props.isTrxnMenuOpen} onOpenChange={props.toggleTrxnMenu}>
        <DialogContent>
          <DialogTitle className="text-black/80">Transaction Menu</DialogTitle>
          <div className="">
            <p className="text-black/80 mb-6 mt-2 font-medium">
              Sale Transactions
            </p>
            <div className="grid grid-cols-3 mb-2">
              <TransactionMenuItem
                Icon={FaCashRegister}
                name="Sale"
                onClick={() => {
                  toggleSaleFormOpen(true);
                  props.toggleTrxnMenu(false);
                }}
              />
              <TransactionMenuItem Icon={TbCreditCardPay} name="Sale Order" />
            </div>

            <Separator />
            <p className="text-black/80 mb-6 mt-2 font-medium">
              Purchase Transactions
            </p>
            <div className="grid grid-cols-3 mb-2">
              <TransactionMenuItem Icon={FaShoppingBag} name="Purchase" />
              <TransactionMenuItem
                Icon={TbShoppingBagEdit}
                name="Purchase Order"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <TransactionSaleForm
        open={isSaleFormOpen}
        toggleOpen={toggleSaleFormOpen}
      />
    </>
  );
};

export default TransactionMenu;
