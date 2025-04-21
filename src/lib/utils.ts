import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const appPath = (path: string) =>
  `/app${path.startsWith("/") ? path : "/" + path}`;
