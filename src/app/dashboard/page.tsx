// app/(dashboard)/dashboard/page.tsx
import TopBar from "@/components/TopBar";
import { Card, CardContent } from "@/components/ui/card";

export default function DashboardPage() {
  const roles = [
    { title: "Nursing Assistant" },
    { title: "Web Designer" },
    { title: "Dog Trainer" },
    { title: "Marketing Coordinator", active: true },
    { title: "Medical Assistant" },
    { title: "President of Sales" },
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
            <CardContent className="p-4">
              <div className="font-semibold mb-2">{role.title}</div>
              <p className="text-xs text-gray-500">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore.
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
