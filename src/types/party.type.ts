import { z } from "zod";

export const PartySchema = z.object({
  id: z.number(),
  name: z.string(),
  contact_number: z.string().optional(),
  billing_address: z.string().optional(),
  email_address: z.string().email().or(z.literal("")).optional(),
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

export const PartyApiDataSchema = NewPartySchema.extend({
  user_id: z.number(),
});

export type PartyApiData = z.infer<typeof PartyApiDataSchema>;
export const PartyFormSchema = NewPartySchema.extend({
  opening_balance: z.preprocess((val) => {
    if (typeof val === "string") {
      const trimmed = val.trim();
      return trimmed === "" ? undefined : Number(trimmed);
    }
    return val;
  }, z.number().optional()),
  as_of_date: z.date().optional(),
  receivable: z.boolean().optional(),
});

export type PartyFormT = z.input<typeof PartyFormSchema>;
