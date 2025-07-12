"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DialogClose, DialogTitle } from "../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { FaArrowLeft } from "react-icons/fa6";

type TransactionSaleItemAddFormProps = {
  handleClose: () => void;
};
const TransactionSaleItemAddForm = ({
  handleClose,
}: TransactionSaleItemAddFormProps) => {
  const form = useForm({
    resolver: zodResolver(
      z.object({
        item_name: z.string(),
        quantity: z.number().optional(),
        price_per_unit: z.number().optional(),
        description: z.string().optional(),
        discount: z.number().optional(),
      }),
    ),
    defaultValues: {
      item_name: "",
    },
  });

  return (
    <>
      <DialogTitle className="text-2xl font-medium flex gap-8">
        <button className="" onClick={() => handleClose()}>
          <FaArrowLeft className="text-black/80" />
        </button>
        Add Item
      </DialogTitle>
      <Form {...form}>
        <form
          // onSubmit={form.handleSubmit(onSub)}
          className="flex flex-col gap-4 h-[600px] overflow-y-auto p-1"
        >
          <FormField
            control={form.control}
            name="item_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[var(--invent-gray)] text-lg">
                  Item Name
                </FormLabel>
                <FormControl>
                  <Input placeholder="Ex: ram" {...field} value={field.value} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[var(--invent-gray)] text-lg">
                  Quantity
                </FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} value={field.value} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price_per_unit"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[var(--invent-gray)] text-lg">
                  Rate (Price/Unit)
                </FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} value={field.value} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[var(--invent-gray)] text-lg">
                  Description
                </FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} value={field.value} />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </>
  );
};

export default TransactionSaleItemAddForm;
