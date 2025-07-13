import { z } from "zod";

export const saleFormBaseSchema = z.object({
  customer_name: z.string().optional().nullable(),
  customer_id: z.number().nullable(),
  contact_number: z.string().optional(),
  total_amount: z.number().optional().nullable(),
  paid_amount: z.number().optional().nullable(),
  full_paid: z.boolean().default(false),
  due_date: z.date().optional().nullable(),
});

export type saleFormBaseT = z.input<typeof saleFormBaseSchema>;
