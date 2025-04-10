"use client";

import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const sidebarItems = [
  { title: "Nintendo", icon: "/icons/nintendo.svg" },
  { title: "IBM", icon: "/icons/ibm.svg" },
  { title: "The Walt Disney Company", icon: "/icons/disney.svg" },
  { title: "Louis Vuitton", icon: "/icons/louis.svg" },
  { title: "MasterCard", icon: "/icons/mastercard.svg" },
  { title: "Pizza Hut", icon: "/icons/pizza.svg" },
  { title: "Bank of America", icon: "/icons/bank.svg" },
  { title: "IBM", icon: "/icons/setting.svg" },
  { title: "Logout", icon: "/icons/logout.svg" },
];

export const Sidebar = () => {
  return (
    <>
      {/* Mobile/Tablet Toggle (up to lg screens) */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Sheet>
          <SheetTrigger>
            <Menu className="h-6 w-6 text-white md:text-black" />
          </SheetTrigger>
          <SheetContent side="left" className="w-64 bg-black text-white p-0">
            <div className="py-4 px-4">
              <Image src={"/logo.png"} alt="logo" width={153} height={62} />
            </div>
            <Separator />
            <nav className="space-y-3 px-4 pt-10 flex-1 overflow-y-auto">
              {sidebarItems.map((item) => (
                <div
                  key={item.title}
                  className={`flex items-center gap-3 px-3 py-2 rounded-[8px] cursor-pointer hover:bg-red-500 hover:text-white ${
                    item.title === "Nintendo" ? "bg-[#A93636] text-white" : ""
                  }`}
                >
                  <Image src={item.icon} alt={item.title} width={24} height={24} />
                  <span className="font-medium text-[14px] whitespace-nowrap">
                    {item.title}
                  </span>
                </div>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar (lg screens and above) - Always visible */}
      <aside className="hidden lg:flex w-64 bg-black text-white flex-col fixed top-0 left-0 h-screen z-40">
        <div className="py-4 px-4">
          <Image src={"/logo.png"} alt="logo" width={153} height={62} />
        </div>
        <Separator />
        <nav className="space-y-3 px-4 pt-10 flex-1 overflow-y-auto">
          {sidebarItems.map((item) => (
            <div
              key={item.title}
              className={`flex items-center gap-3 px-3 py-2 rounded-[8px] cursor-pointer hover:bg-red-500 hover:text-white ${
                item.title === "Nintendo" ? "bg-[#A93636] text-white" : ""
              }`}
            >
              <Image src={item.icon} alt={item.title} width={24} height={24} />
              <span className="font-medium text-[14px] whitespace-nowrap">
                {item.title}
              </span>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
};