import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface StatusBadgeProps {
  status: string;
  onClick?: () => void;
}

export const StatusBadge = ({ status, onClick }: StatusBadgeProps) => {
  const isActive = status.toLowerCase() === "active";

  return (
    <Badge
      className={`rounded-full px-3 py-1 text-xs inline-flex items-center gap-1 cursor-pointer ${
        isActive
          ? "bg-[#A9363612] border border-[#A93636] text-[#1C1C1C] font-normal text-sm"
          : "bg-[#E8E8E8] border border-[#494949] text-[#1C1C1C] font-normal text-sm"
      }`}
      onClick={onClick}
    >
      <Image
        src={isActive ? "/icons/tick-circle.svg" : "/icons/pause.svg"}
        alt={isActive ? "Active" : "Paused"}
        width={16}
        height={16}
      />
      {status}
    </Badge>
  );
};