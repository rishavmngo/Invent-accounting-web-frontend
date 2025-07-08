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
