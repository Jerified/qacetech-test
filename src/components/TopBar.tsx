import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const TopBar = () => {
  return (
    <div className="flex flex-wrap justify-between items-center gap-4 py-4 px-6 border-b bg-white">
      <div className="flex-1 min-w-[150px] max-w-md">
        <Input
          placeholder="Search Parameter & Params"
          className="text-sm w-full"
        />
      </div>

      {/* Right Section */}
      <div className="flex flex-wrap justify-end items-center gap-4 w-full sm:w-auto">
        <div className="text-[13px] flex flex-col sm:flex-row items-start sm:items-center text-center sm:text-left">
          <div>Thur, Dec 11, 2024 15:32</div>
          <div className="hidden sm:block w-px h-4 bg-gray-300 mx-2"></div>
          <div className="font-semibold">
            Business Date: Thur, Dec 11, 2024 15:32
          </div>
        </div>

        {/* Notification Icon */}
        <div className="rounded-full bg-[#F4F4F4] px-2 py-1">
          <button className="relative">
            <Image
              src="/icons/notification.svg"
              alt="Notification"
              width={20}
              height={20}
            />
            <span className="absolute top-0 right-1 animate-pulse block size-[6px] rounded-full bg-red-500"></span>
          </button>
        </div>

        <Button
          variant="outline"
          className="flex items-center gap-1 text-xs md:text-sm bg-[#F4F4F4] !rounded-[80px]"
        >
          <Image
            src="/icons/buliding.svg"
            alt="building"
            width={20}
            height={20}
          />
          <span className="hidden sm:inline">Ikoyi Branch</span>
          <ChevronDown size={16} />
        </Button>

        {/* User Dropdown */}
        <Button
          variant="outline"
          className="flex items-center gap-2 text-xs md:text-sm bg-[#F4F4F4] !rounded-[80px]"
        >
          <Avatar className="w-6 h-6">
            <AvatarImage src="/icons/user-square.svg" alt="Avatar" />
            <AvatarFallback>EA</AvatarFallback>
          </Avatar>
          <span className="hidden sm:inline">Eric Alawoya</span>
          <ChevronDown size={16} />
        </Button>
      </div>
    </div>
  );
};

export default TopBar;
