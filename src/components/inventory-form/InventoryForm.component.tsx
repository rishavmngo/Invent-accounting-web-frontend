"use client";
import React, { useState } from "react";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { ItemForm, ItemFormSchema } from "@/types/inventory.type";
import { addItem } from "@/api/inventory";

type tabOptions = "pricing" | "stock";

type InventoryFormProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const InventoryForm = ({ open, setOpen }: InventoryFormProps) => {
  const queryClient = useQueryClient();
  const { ownerId } = useAuth();
  const [currentTab, setCurrentTab] = useState<tabOptions>("pricing");
  const form = useForm<ItemForm>({
    resolver: zodResolver(ItemFormSchema),
    defaultValues: {
      name: "",
      code: "",
      tax_rate: "none",
      category: "",
      description: "",
      hsn_code: "",
      sale_price: "",
      purchase_price: "",
      discount: "",
      min_stock_qty: "",
      location: "",
      opening_stock: "",
      as_of_date: new Date(),
      price_per_unit: "",
    },
  });
  const mutation = useMutation({
    mutationFn: addItem,
    mutationKey: ["ItemCardData"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ItemCardData"] });
    },
  });
  function onSubmit(values: ItemForm) {
    console.log("submitted!!!!");
    console.log(values);

    if (!ownerId) {
      console.log("owner id missing");
      return;
    }
    mutation.mutate({ ...values, user_id: ownerId });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="">
        <DialogTitle className="text-2xl font-medium">Add New item</DialogTitle>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 h-[600px] overflow-y-auto p-1"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[var(--invent-gray)] text-lg">
                    Item Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Oggy Pot"
                      {...field}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[var(--invent-gray)] text-lg">
                    Item Code / Barcode
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="mechanical">Mechanical</SelectItem>
                      <SelectItem value="vegetables">Vegetables</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
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
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="hsn_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[var(--invent-gray)] text-lg">
                    HSN/SAC Code
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Tabs
              className="w-full "
              value={currentTab}
              onValueChange={(value) => setCurrentTab(value as tabOptions)}
            >
              <TabsList className="w-full">
                <TabsTrigger value="pricing">Pricing</TabsTrigger>
                <TabsTrigger value="stock">Stock</TabsTrigger>
              </TabsList>
              <TabsContent value="pricing" className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="sale_price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[var(--invent-gray)] text-lg">
                        Sale Price
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder=""
                          {...field}
                          value={field.value as string}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="discount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[var(--invent-gray)] text-lg">
                        Discount
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder=""
                          {...field}
                          value={field.value as string}
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
                        Purchase Price
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder=""
                          {...field}
                          value={field.value as string}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tax_rate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>GST Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="none">None</SelectItem>
                          <SelectItem value="18">@18</SelectItem>
                          <SelectItem value="30">@30</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
              <TabsContent className="flex flex-col gap-4" value="stock">
                <FormField
                  control={form.control}
                  name="opening_stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[var(--invent-gray)] text-lg">
                        Opening Stock
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder=""
                          {...field}
                          value={field.value as string}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 grid-rows-2 gap-4">
                  <FormField
                    control={form.control}
                    name="as_of_date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="text-[var(--invent-gray)] text-lg">
                          As of Date
                        </FormLabel>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  " pl-3 text-left font-normal",
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
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            className="w-auto p-0"
                            align="start"
                          >
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() ||
                                date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </DropdownMenuContent>
                        </DropdownMenu>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="price_per_unit"
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
                  <FormField
                    control={form.control}
                    name="min_stock_qty"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[var(--invent-gray)] text-lg">
                          Min Stock Qty
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Ex: 5"
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
              </TabsContent>
            </Tabs>

            <Button type="submit">Add New Item</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default InventoryForm;
