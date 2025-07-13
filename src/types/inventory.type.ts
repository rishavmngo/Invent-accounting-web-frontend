import { z } from "zod";

import { BaseSchema, optionalNumberFromString } from ".";
export const ItemInputSchema = z.object({
  user_id: z.number(),
  name: z.string().min(1, "Name is required"),
  code: z.string().optional(),
  category: z.string().optional(),
  description: z.string().optional(),
  hsn_code: z.string().optional(),
  sale_price: optionalNumberFromString(),
  purchase_price: optionalNumberFromString(),
  discount: optionalNumberFromString(),
  tax_rate: z.string().optional(),
  min_stock_qty: optionalNumberFromString(),
  location: z.string().optional(),
});
export type ItemInput = z.input<typeof ItemInputSchema>;

export const ItemSchema = BaseSchema.merge(ItemInputSchema).extend({
  quantity: z.number(),
});

export const ItemUpdateFormSchema = ItemSchema.omit({
  quantity: true,
  min_stock_qty: true,
  location: true,
});

export type ItemUpdateForm = z.infer<typeof ItemUpdateFormSchema>;

export type Item = z.infer<typeof ItemSchema>;

export const ItemFormApiSchema = ItemInputSchema.extend({
  opening_stock: optionalNumberFromString(),
  as_of_date: z.date().optional(),
  // as_of_date: zodDate.optional(),
  price_per_unit: optionalNumberFromString(),
});

export type ItemFormApiData = z.input<typeof ItemFormApiSchema>;

export const ItemFormSchema = ItemFormApiSchema.omit({ user_id: true });
export type ItemForm = z.input<typeof ItemFormSchema>;

export const ItemStockSchemaBase = z.object({
  id: z.number(),
  type: z.string(),
  description: z.string().optional(),
  location: z.string().optional(),
  as_of_date: z.date().optional(),
});

export const ItemStockSchema = ItemStockSchemaBase.extend({
  item_id: z.number(),
  quantity: z.number(),
  purchase_price: z.number(),
});

export const ItemStockCreationSchema = ItemStockSchemaBase.omit({
  id: true,
}).extend({
  quantity: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z
      .number({
        required_error: "Quantity is required",
        invalid_type_error: "Please Enter a valid number",
      })
      .min(0, "Quantity must be 0 or greater"),
  ),

  purchase_price: z.preprocess(
    (val) => {
      if (val === "" || val === undefined || val === null) return undefined;
      return Number(val);
    },
    z
      .number({
        invalid_type_error: "Please Enter a valid number",
      })
      .min(0, "Price must be 0 or greater")
      .optional(),
  ),
  item_id: z.number().optional(),
});

export type ItemStockCreationT = z.input<typeof ItemStockCreationSchema>;

export type ItemStock = z.infer<typeof ItemStockSchema>;

export const InventoryTransactionSchema = z.object({
  item_name: z.string(),
  item_id: z.number().nullable(),
  quantity: z.preprocess((value) => {
    if (value == "") return 1;
    return Number(value);
  }, z.number().optional()),
  price_per_unit: z.preprocess((value) => {
    if (value == "") return undefined;
    return Number(value);
  }, z.number().optional()),
  description: z.string().optional(),
  discount: z.number().optional().nullable(),
});

export type InventoryTransactionT = z.infer<typeof InventoryTransactionSchema>;
