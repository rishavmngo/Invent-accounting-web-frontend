"use client";
import { store } from "@/state/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./globals.css";
import { Roboto } from "next/font/google";
import { Provider } from "react-redux";
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"], // Add weights you need
  variable: "--font-roboto",
  display: "swap",
});

// export const metadata: Metadata = {
//   title: "Invent",
//   description: "Your business manager",
// };
const queryClient = new QueryClient();
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} antialiased`}>
        <main>
          <Provider store={store}>
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
          </Provider>
        </main>
      </body>
    </html>
  );
}
