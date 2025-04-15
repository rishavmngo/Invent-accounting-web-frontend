import type { Metadata } from "next";
import "./globals.css";
import { Roboto } from "next/font/google";
import InventSidebar from "@/components/invent-sidebar/invent-sidebar";
import { SidebarProvider } from "@/components/invent-sidebar/invent-sidebar.context";
import TopBar from "@/components/invent-sidebar/topbar/topbar.component";
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
        <SidebarProvider>
          <InventSidebar />
          <div className="flex-1 flex flex-col ">
            <TopBar />
            <main>{children}</main>
            <div>bottombar</div>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
