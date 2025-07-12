import { z } from "zod";

export const saleFormBaseSchema = z.object({
  customer_name: z.string().optional().nullable(),
  customer_id: z.number().nullable(),
  // customer_id: z.preprocess((val) => {
  //   if (val == "" || val == undefined) return null;
  //   return Number(val);
  // }, z.number().nullable()),
  contact_number: z.string().optional(),
});

export type saleFormBaseT = z.input<typeof saleFormBaseSchema>;
