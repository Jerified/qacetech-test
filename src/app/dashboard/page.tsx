// app/(dashboard)/dashboard/page.tsx
import TopBar from "@/components/TopBar";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function DashboardPage() {
  const roles = [
    { title: "Nursing Assistant", icon: "/icons/nurse.svg" },
    { title: "Web Designer", icon: "/icons/web.svg" },
    { title: "Dog Trainer",   icon: "/icons/assist.svg" },
    { title: "Marketing Coordinator", icon: "/icons/nurse.svg", active: true },
    { title: "Nursing Assistant", icon: "/icons/nurse.svg" },
    { title: "Web Designer", icon: "/icons/web.svg" },
    { title: "Dog Trainer",   icon: "/icons/assist.svg" },
    { title: "Nursing Assistant", icon: "/icons/nurse.svg" },
    { title: "Web Designer", icon: "/icons/web.svg" },
    { title: "Dog Trainer",   icon: "/icons/assist.svg" },
    { title: "Medical Assistant",  icon: "/icons/web.svg"  },
    { title: "President of Sales",  icon: "/icons/assist.svg"  },
  ];

  return (
    <>
      <TopBar />
      <div className="flex flex-col gap-2 px-6 pt-6">
        <h1 className="font-semibold text-[32px] leading-0">Hello Eric Omotolani</h1>
        <p className="font-[16px] text-[#333333]">Welcome to your dashboard</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-6 px-6">
        {roles.map((role, i) => (
          <Card
            key={i}
            className={`${
              role.active ? "bg-red-100 border border-red-200" : ""
            } hover:shadow-md transition duration-300`}
          >
            <CardContent className="p-4 flex flex-col gap-4">
            {role.icon && <Image src={role.icon} alt="icon" width={48} height={48} />}
            <div className="">
              <div className="font-semibold mb-2">{role.title}</div>
              <p className="text-xs text-gray-500">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore.
              </p>
            </div>
            </CardContent>
          </Card>
        ))}      </div>
    </>
  );
}
