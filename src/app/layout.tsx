import { ReactNode } from "react";
import { Sidebar } from "@/components/Sidebar";
import generalSans from "./styles/font";
import "./globals.css";

export const metadata = {
  title: "Dashboard",
  description: "Your App Description",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={generalSans.className}>
      <body className="font-sans antialiased bg-[#F9F9F9] flex">
        <div className="min-h-screen">
          <Sidebar />
        </div>
        <main className="min-h-screen w-full px-4 py-6 lg:ml-64">
          {children}
        </main>
      </body>
    </html>
  );
}