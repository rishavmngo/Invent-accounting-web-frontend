"use client";
import React, { SetStateAction, useState } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { IoMdAddCircle } from "react-icons/io";
import TransactionSaleItemAddForm from "./transactionSaleItemAddForm.component";

type TransactionSaleFormProps = {
  open: boolean;
  toggleOpen: React.Dispatch<SetStateAction<boolean>>;
};
const TransactionSaleForm = (props: TransactionSaleFormProps) => {
  const [formStage, setFormStage] = useState<"saleMain" | "addItem">(
    "saleMain",
  );
  const form = useForm({
    resolver: zodResolver(
      z.object({
        customer_name: z.string(),
        contact_number: z.number().optional(),
      }),
    ),
    defaultValues: {
      customer_name: "",
    },
  });

  const handleSecondFormClose = () => {
    setFormStage("saleMain");
  };
  return (
    <Dialog open={props.open} onOpenChange={props.toggleOpen}>
      here
      <DialogContent hideClose={formStage != "saleMain"}>
        {formStage == "saleMain" ? (
          <>
            <DialogTitle className="text-2xl font-medium">Sale</DialogTitle>
            <Form {...form}>
              <form
                // onSubmit={form.handleSubmit(onSub)}
                className="flex flex-col gap-4 h-[600px] overflow-y-auto p-1"
              >
                <FormField
                  control={form.control}
                  name="customer_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[var(--invent-gray)] text-lg">
                        Customer
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ex: ram"
                          {...field}
                          value={field.value}
                        />
                      </FormControl>
                    </FormItem>
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
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    setFormStage("addItem");
                  }}
                >
                  <IoMdAddCircle />
                  Add Items
                </Button>
              </form>
            </Form>
          </>
        ) : (
          <TransactionSaleItemAddForm handleClose={handleSecondFormClose} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TransactionSaleForm;
