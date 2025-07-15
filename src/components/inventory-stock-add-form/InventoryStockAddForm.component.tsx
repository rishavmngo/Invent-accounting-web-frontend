"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dialog, DialogContent } from "../ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import {
  ItemStockCreationSchema,
  ItemStockCreationT,
} from "@/types/inventory.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adjustStock } from "@/api/inventory";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

type InventoryStockAddFormProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  itemId: number;
  ownerId: number;
};

const InventoryStockAddForm = ({
  open,
  setOpen,
  itemId,
  ownerId,
}: InventoryStockAddFormProps) => {
  const queryClient = useQueryClient();
  const form = useForm({
    resolver: zodResolver(ItemStockCreationSchema),
    defaultValues: {
      type: "add",
      description: "",
      purchase_price: "",
      location: "",
      as_of_date: new Date(),
      quantity: "",
    },
  });

  const type = form.watch("type");

  const mutation = useMutation({
    mutationFn: adjustStock,
    mutationKey: ["ItemStockCardData"],

    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey.includes("ItemCardData") ||
          query.queryKey.includes("ItemStockCardData"),
      });
    },
  });

  function onSubmit(values: ItemStockCreationT) {
    console.log("submitted!!!!");
    console.log(values);

    if (!ownerId) {
      console.log("owner id missing");
      return;
    }
    // values.as_of_date = new Date(values.as_of_date)
    values.item_id = itemId;
    mutation.mutate({ ...values });
    setOpen(false);
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="">
        <DialogTitle className="text-2xl font-medium">Adjust Stock</DialogTitle>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 max-h-[600px] overflow-y-auto p-1"
          >
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <RadioGroup
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                  className="flex gap-8"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="add" id="add" />
                    <Label htmlFor="add">Add</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="reduce" id="reduce" />
                    <Label htmlFor="reduce">Reduce</Label>
                  </div>
                </RadioGroup>
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
                      type="text"
                      placeholder="Ex: 10"
                      {...field}
                      value={field.value as string}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="purchase_price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[var(--invent-gray)] text-lg">
                    At Price/Unit
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Ex: 2,000"
                      {...field}
                      value={field.value as string}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-6">
              <FormField
                control={form.control}
                name="as_of_date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-[var(--invent-gray)] text-lg">
                      Adjustment Date
                    </FormLabel>
                    <Popover modal={true}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          captionLayout="dropdown"
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[var(--invent-gray)] text-lg">
                      Item Location
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder=""
                        {...field}
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[var(--invent-gray)] text-lg">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="mt-8">
              {type == "add" ? "Add Stock" : "Reduce Stock"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default InventoryStockAddForm;
