import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const appPath = (path: string) =>
  `/app${path.startsWith("/") ? path : "/" + path}`;

export const formatDate = (isoDate: string): string => {
  return format(new Date(isoDate), "dd MMM, yy");
};
