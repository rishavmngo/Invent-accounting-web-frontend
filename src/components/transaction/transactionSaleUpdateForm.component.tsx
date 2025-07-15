"use client";
import React, { SetStateAction, useEffect, useState } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { IoMdAddCircle } from "react-icons/io";
import TransactionSaleItemAddForm from "./transactionSaleItemAddForm.component";
import { Autocomplete } from "../autocomplete/autocompleteInput.component";
import { suggestion } from "@/api/parties";
import { Party } from "@/types/party.type";
import { InventoryTransactionT } from "@/types/inventory.type";
import { formatCurrency } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addSale, downloadInvoice } from "@/api/transaction";
import TransactionSaleItemUpdateForm from "./TransactionSaleItemUpdateForm.component";
import {
  InvoiceGenT,
  InvoiceSchemaUpdate,
  ItemGenT,
} from "@/types/transactionGen.type";
import { FaFileDownload } from "react-icons/fa";
import { LoadingSpinner } from "../loading-spinner.component";

async function fetchPartySuggesion(query: string): Promise<Party[]> {
  const data = await suggestion(query);
  return data as Party[];
}

function formulaTotalAmount(item: InventoryTransactionT): number {
  let quantity = 1;
  let price = 1;
  if (item.quantity) {
    quantity = item.quantity;
  }

  if (item.price_per_unit) {
    price = item.price_per_unit;
  }

  return quantity * price;
}

function calculateTotalAmount(items: InventoryTransactionT[]) {
  let amt = 0;
  items.forEach((item) => {
    amt += formulaTotalAmount(item);
  });

  return amt;
}

function transform(items: ItemGenT[]): InventoryTransactionT[] {
  return items.map((item) => {
    return {
      item_id: item.item_id,
      item_name: item.name,
      quantity: item.quantity,
      price_per_unit: item.price_per_unit,
      discount: item.discount,
    } as InventoryTransactionT;
  });
}

type TransactionSaleUpdateFormProps = {
  open: boolean;
  toggleOpen: React.Dispatch<SetStateAction<boolean>>;
  trxn: InvoiceGenT;
};
const TransactionSaleUpdateForm = ({
  trxn,
  open,
  toggleOpen,
}: TransactionSaleUpdateFormProps) => {
  const queryClient = useQueryClient();
  const [formStage, setFormStage] = useState<
    "saleMain" | "addItem" | "updateItem"
  >("saleMain");

  const [items, setItems] = useState<InventoryTransactionT[]>([]);
  const [isDownloadComplete, toggleDownloadComplete] = useState<boolean>(true);

  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const { ownerId } = useAuth();
  const form = useForm({
    resolver: zodResolver(InvoiceSchemaUpdate),
    defaultValues: {
      customer_name: trxn.customer.name,
      customer_id: trxn.customer.id,
      total_amount: trxn.total_amount,
      contact_number: trxn.customer.contact_number,
    },
  });
  const handleSecondFormClose = () => {
    setFormStage("saleMain");
  };

  useEffect(() => {
    form.reset({
      customer_name: trxn.customer.name,
      customer_id: trxn.customer.id,
      total_amount: trxn.total_amount,
      contact_number: trxn.customer.contact_number,
    });
    setItems([...transform(trxn.items)]);
  }, [trxn, form]);

  const mutation = useMutation({
    mutationFn: addSale,
    mutationKey: ["transactionData"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactionData"] });
    },
  });
  const onSubmit = (data: InvoiceGenT) => {
    data.total_amount = calculateTotalAmount(items);

    const sale = { data: data, items: items, ownerId: ownerId };
    console.log(sale);

    mutation.mutate(sale);
  };
  const handleDownload = async () => {
    toggleDownloadComplete(false);

    if (!ownerId) return;

    try {
      await downloadInvoice({ ownerId: ownerId, invoiceId: trxn.id });
      toggleDownloadComplete(true);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Dialog open={open} onOpenChange={toggleOpen}>
      <DialogContent hideClose={formStage != "saleMain"}>
        {formStage == "saleMain" && (
          <>
            <DialogTitle className="flex justify-between mr-8">
              <div>
                <p className="text-2xl font-medium">Update Sale</p>
              </div>
              <div>
                <button
                  className="flex gap-2 items-center hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md"
                  onClick={() => handleDownload()}
                >
                  <FaFileDownload /> invoice
                  {!isDownloadComplete && <LoadingSpinner />}
                </button>
              </div>
            </DialogTitle>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4 h-[600px] overflow-y-auto p-1"
              >
                <FormField
                  control={form.control}
                  name="customer_name"
                  render={({ field }) => (
                    <>
                      <FormLabel className="text-[var(--invent-gray)] text-lg">
                        Customer name
                      </FormLabel>
                      <Autocomplete
                        fetchSuggestionsAction={fetchPartySuggesion}
                        onSelectAction={(party: Party) => {
                          field.onChange(party.name);
                          form.setValue("customer_id", party.id);
                        }}
                        inputKey="name"
                        setInpAction={(value) => {
                          field.onChange(value);
                        }}
                        onTypingStart={() => {
                          form.setValue("customer_id", null);
                        }}
                        value={field.value as string}
                        getOptionLabelAction={(party) => <p>{party.name}</p>}
                      />
                    </>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contact_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[var(--invent-gray)] text-lg">
                        Phone Number
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} value={field.value} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <ul className="flex flex-col gap-4 max-h-[800px] overflow-y-auto">
                  {items.map((item, index) => {
                    return (
                      <li
                        key={index + " " + item.item_id}
                        onClick={() => {
                          setCurrentIndex(index);
                          setFormStage("updateItem");
                        }}
                        className="bg-gray-100 p-2 rounded-md flex flex-col gap-4 "
                      >
                        <div className="flex justify-between">
                          <span className="flex gap-1 items-center">
                            <span className="px-1 text-black/70 bg-white rounded-md">
                              #{index + 1}
                            </span>
                            <p className="font-medium text-xl">
                              {item.item_name}
                            </p>
                          </span>
                          <span className="font-medium">
                            {formatCurrency(
                              item.price_per_unit ? item.price_per_unit : 0,
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <p>Item Subtotal</p>
                          <span>
                            {item.quantity} X {item.price_per_unit} ={" "}
                            {formatCurrency(formulaTotalAmount(item))}
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    setFormStage("addItem");
                  }}
                >
                  <IoMdAddCircle />
                  Add Items
                </Button>
                {items.length > 0 && (
                  <div className="bg-gray-100 p-2 rounded-md flex justify-between gap-4">
                    <span className="font-semibold">Total Amount</span>
                    <span className="font-semibold">
                      {formatCurrency(calculateTotalAmount(items))}
                    </span>
                  </div>
                )}

                <Button type="submit" className="mt-auto">
                  Update
                </Button>
              </form>
            </Form>
          </>
        )}

        {formStage == "addItem" && (
          <TransactionSaleItemAddForm
            handleClose={handleSecondFormClose}
            items={items}
            setItems={setItems}
          />
        )}

        {formStage == "updateItem" && (
          <TransactionSaleItemUpdateForm
            itemIndex={currentIndex}
            handleClose={handleSecondFormClose}
            items={items}
            setItems={setItems}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TransactionSaleUpdateForm;
