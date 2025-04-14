import type { Metadata } from "next";
import "./globals.css";
import InventSidebar from "@/components/invent-sidebar";
import { Roboto } from "next/font/google";
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"], // Add weights you need
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Invent",
  description: "Your business manager",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} antialiased flex`}>
        <InventSidebar />
        <main>{children}</main>
      </body>
    </html>
  );
}
