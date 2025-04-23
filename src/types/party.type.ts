import { z } from "zod";

export const PartySchema = z.object({
  id: z.number(),
  name: z.string(),
  contact_number: z.string().optional(),
  billing_address: z.string().optional(),
  email_address: z.string().email().optional(),
  state: z.string().optional(),
  gst_type: z.string().optional(),
  gstin: z.string().length(15).optional(),
  credit_limit: z.number().optional(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
});

export type Party = z.infer<typeof PartySchema>;

export const NewPartySchema = PartySchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export type NewParty = z.infer<typeof NewPartySchema>;

export const PartyFormSchema = NewPartySchema.extend({
  opening_balance: z.number().optional(),
  as_of_date: z.date().optional(),
  receivable: z.boolean().optional(),
});

export type PartyFormT = z.infer<typeof PartyFormSchema>;
