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

export const IsPageActive = (pathname: string, path: string) => {
  if (!pathname.startsWith("/app")) return false;

  const pathAfterApp = pathname.replace(/^\/app\/?/, ""); // e.g. "parties/abc123" or ""
  const firstSegment = pathAfterApp.split("/")[0];

  return firstSegment === path;
};
