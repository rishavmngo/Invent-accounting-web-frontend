import { z } from "zod";

export const BaseSchema = z.object({
  id: z.number(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
});

export const zodDate = z.preprocess((arg) => {
  if (typeof arg === "string" || arg instanceof Date) {
    const parsed = new Date(arg);
    if (!isNaN(parsed.getTime())) {
      return parsed;
    }
  }
  return undefined;
}, z.date());
export const optionalNumberFromString = () =>
  z.preprocess((val) => {
    if (typeof val === "string") {
      const trimmed = val.trim();
      return trimmed === "" ? undefined : Number(trimmed);
    }
    return val;
  }, z.number().optional());
