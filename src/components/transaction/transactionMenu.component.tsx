"use client";
import React from "react";

import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import TransactionMenuItem from "./transactionMenuItem";
import { FaCashRegister } from "react-icons/fa6";
import { TbCreditCardPay } from "react-icons/tb";

type TransactionMenuProps = {
  isTrxnMenuOpen: boolean;
  toggleTrxnMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

const TransactionMenu = (props: TransactionMenuProps) => {
  return (
    <Dialog open={props.isTrxnMenuOpen} onOpenChange={props.toggleTrxnMenu}>
      <DialogContent>
        <DialogTitle>Transaction Menu</DialogTitle>
        <div className="flex gap-12">
          <TransactionMenuItem Icon={FaCashRegister} name="Sale" />
          <TransactionMenuItem Icon={TbCreditCardPay} name="Sale Order" />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionMenu;
