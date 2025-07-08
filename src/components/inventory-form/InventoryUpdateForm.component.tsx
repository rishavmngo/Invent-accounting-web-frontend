"use client";
import React from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import {
  Item,
  ItemSchema,
  ItemUpdateForm,
  ItemUpdateFormSchema,
} from "@/types/inventory.type";
import { updateItem } from "@/api/inventory";

type InventoryUpdateFormProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  item: ItemUpdateForm;
  id: number;
};

function sanitizeItem(item: any): ItemUpdateForm {
  const fieldsToSanitize = ["sale_price", "purchase_price", "discount"];

  const cleaned = { ...item };

  for (const key of fieldsToSanitize) {
    if (cleaned[key] === null) {
      cleaned[key] = undefined;
    }
  }

  return cleaned;
}

function replaceUndefinedWithNull<T extends Record<string, any>>(obj: T): T {
  const result: Record<string, any> = {};

  for (const key in obj) {
    if (Object.hasOwn(obj, key)) {
      result[key] = obj[key] === undefined ? null : obj[key];
    }
  }

  return result as T;
}

const InventoryUpdateForm = ({
  open,
  setOpen,
  item,
  id,
}: InventoryUpdateFormProps) => {
  console.log("edit", item);
  const queryClient = useQueryClient();
  const { ownerId } = useAuth();
  const form = useForm({
    resolver: zodResolver(ItemUpdateFormSchema),
    defaultValues: sanitizeItem(item),
  });
  const mutation = useMutation({
    mutationFn: updateItem,
    mutationKey: ["ItemCardData"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ItemCardData"] });
    },
  });
  function onSubmit(values: ItemUpdateForm) {
    console.log("submitted!!!!");
    console.log(values);

    if (!ownerId) {
      console.log("owner id missing");
      return;
    }
    mutation.mutate({
      ...replaceUndefinedWithNull(values),
      user_id: ownerId,
      id: id,
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="">
        <DialogTitle className="text-2xl font-medium">
          Update {item?.name}
        </DialogTitle>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 h-[600px] overflow-y-scroll p-1"
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
                      placeholder="e.g:- Oggy Pot"
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

            <Button type="submit">Update Item</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default InventoryUpdateForm;
