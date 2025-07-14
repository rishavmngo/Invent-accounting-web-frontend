"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { DialogTitle } from "../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { FaArrowLeft } from "react-icons/fa6";
import { suggestion } from "@/api/inventory";
import {
  InventoryTransactionSchema,
  InventoryTransactionT,
  Item,
} from "@/types/inventory.type";
import { Autocomplete } from "../autocomplete/autocompleteInput.component";
import { Button } from "../ui/button";
import { MdDelete } from "react-icons/md";

async function fetchitemSuggesion(query: string): Promise<Item[]> {
  const data = await suggestion(query);
  return data as Item[];
}
type TransactionSaleItemUpdateFormProps = {
  handleClose: () => void;
  itemIndex: number | null;
  items: InventoryTransactionT[];
  setItems: React.Dispatch<React.SetStateAction<InventoryTransactionT[]>>;
};
const TransactionSaleItemUpdateForm = ({
  handleClose,
  itemIndex,
  items,
  setItems,
}: TransactionSaleItemUpdateFormProps) => {
  const form = useForm({
    resolver: zodResolver(InventoryTransactionSchema),
    defaultValues:
      itemIndex != null
        ? { ...items[itemIndex] }
        : {
            item_name: "",
            item_id: null,
            quantity: "",
            description: "",
            price_per_unit: "",
          },
  });

  const onSubmit = (item: InventoryTransactionT) => {
    item.quantity = item.quantity == undefined ? 1 : item.quantity;
    item.price_per_unit =
      item.price_per_unit == undefined ? 1 : item.price_per_unit;
    setItems((prevItems) =>
      prevItems.map((old, i) => (i === itemIndex ? { ...old, ...item } : old)),
    );
    // setItems([...items, item]);
    handleClose();
  };

  const handleDeleteItem = () => {
    setItems((prevItems) =>
      prevItems.filter((_, index) => index !== itemIndex),
    );
    handleClose();
  };

  return (
    <>
      <DialogTitle className="text-2xl font-medium flex justify-between">
        <span className="flex gap-2">
          <button className="" onClick={() => handleClose()}>
            <FaArrowLeft className="text-black/80" />
          </button>
          Edit Item
        </span>

        <div className="flex gap-2">
          <button
            tabIndex={2}
            onClick={() => handleDeleteItem()}
            className="rounded-md px-2 py-1 bg-red-100 text-[var(--invent-gray)] border border-red-100 hover:border-red-300 transition-all border-2"
          >
            <MdDelete className="text-xl text-red-800" />
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
            name="item_name"
            render={({ field }) => (
              <>
                <Autocomplete
                  fetchSuggestionsAction={fetchitemSuggesion}
                  onSelectAction={(item: Item) => {
                    field.onChange(item.name);
                    form.setValue("item_id", item.id);
                  }}
                  inputKey="name"
                  setInpAction={(value) => {
                    field.onChange(value);
                  }}
                  onTypingStart={() => {
                    form.setValue("item_id", null);
                  }}
                  value={field.value as string}
                  getOptionLabelAction={(item) => <p>{item.name}</p>}
                />
              </>
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
                  <Input
                    placeholder=""
                    {...field}
                    value={field.value as string}
                  />
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
                  <Input
                    placeholder=""
                    {...field}
                    value={field.value as string}
                  />
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
          <Button type="submit" className="">
            Update item
          </Button>
        </form>
      </Form>
    </>
  );
};

export default TransactionSaleItemUpdateForm;
