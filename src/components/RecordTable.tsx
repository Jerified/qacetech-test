"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "./StatusBadge";
import { ChevronDown, Search, RefreshCw, Download } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Image from "next/image";
import { allRecords } from "@/lib/data";
import { Record } from "@/lib/type";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RecordTableProps {
  activeTab: "individual" | "corporate";
}

export const RecordTable = ({ activeTab }: RecordTableProps) => {
  const [activeTableTab, setActiveTableTab] = useState<
    "all-records" | "request"
  >("all-records");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchParam, setSearchParam] = useState<string>("name");
  const [filteredRecords, setFilteredRecords] = useState<Record[]>(allRecords);

  const handleRefresh = () => {
    setFilteredRecords(allRecords);
    setSearchQuery("");
  };

  const handleDownload = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Name,ID,Category,Amount,Alias,Status,Date\n" +
      filteredRecords.map((r) => Object.values(r).join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "records.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    let result = allRecords.filter((record) =>
      activeTab === "individual"
        ? record.category === "Individual"
        : record.category === "Corporate"
    );

    if (searchQuery) {
      result = result.filter((record) => {
        const value = record[searchParam as keyof Record]
          ?.toString()
          .toLowerCase();
        return value?.includes(searchQuery.toLowerCase());
      });
    }

    setFilteredRecords(result);
  }, [activeTab, searchQuery, searchParam]);

  return (
    <Tabs
      value={activeTableTab}
      onValueChange={(value) =>
        setActiveTableTab(value as "all-records" | "request")
      }
      className="bg-white border rounded-lg p-4 mt-6"
    >
      <div className="flex justify-between items-center border-b pb-6">
        <div className="flex flex-col md:flex-row gap-10 items-center justify-center">
          <TabsList className="flex items-center">
            <TabsTrigger value="all-records">All Records</TabsTrigger>
            <TabsTrigger value="request">Request</TabsTrigger>
          </TabsList>
          <div className="mt-4 flex items-center gap-8 text-sm">
            <div className="border border-[#E8E8E8] h-[62px]" />
            <div className="text-xs font-medium">
              All{" "}
              <div className="text-[28px] font-semibold">
                {filteredRecords.length}
              </div>
            </div>
            <div className="border border-[#E8E8E8] h-[62px]" />
            <div className="text-xs font-medium text-[#A93636]">
              Active{" "}
              <div className="text-[28px] font-semibold text-black">
                {filteredRecords.filter((r) => r.status === "Active").length}
              </div>
            </div>
            <div className="border border-[#E8E8E8] h-[62px]" />
            <div className="text-xs font-medium">
              Liquidated{" "}
              <div className="text-[28px] font-semibold">
                {
                  filteredRecords.filter((r) => r.status === "Liquidated")
                    .length
                }
              </div>
            </div>
          </div>
        </div>
        <button className="flex gap-2.5 items-center rounded-[8px] border border-[#A93636] text-[#A93636] py-1.5 px-3 text-xs font-medium">
          Created by: System-wide
          <ChevronDown size={18} />
        </button>
      </div>
      <div className="lg:flex  lg:flex-row items-center lg:justify-between">
        <div className="flex flex-col md:flex-row items-center gap-2 my-4">
          <div className="flex gap-2 items-center border border-[#D2D2D2] bg-[#FAF8F7] py-2 px-4 rounded-[8px] cursor-pointer w-full h-[38px] ">
            <Select
              value={searchParam}
              onValueChange={(value) => setSearchParam(value)}
            >
              <SelectTrigger className=" text-sm text-muted-foreground bg-transparent outline-none border-none shadow-none focus:ring-0 focus:ring-offset-0">
                <SelectValue placeholder="Table Search Query" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="id">ID</SelectItem>
                <SelectItem value="alias">Alias</SelectItem>
                <SelectItem value="status">Status</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="relative w-full">
            <Input
              placeholder="Search Parameter"
              className="pl-10 text-sm w-[342px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={18}
            />
          </div>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handleRefresh}
            className="flex items-center gap-2.5 !border-none bg-[#A9363612] rounded-[8px] py-1.5 px-3 text-[#A93636] text-sm"
          >
            <RefreshCw size={18} />
            Refresh Table
          </Button>
          <Button
            variant="outline"
            onClick={handleDownload}
            className="flex items-center gap-2.5 !border-none bg-[#A9363612] rounded-[8px] py-1.5 px-3 text-[#A93636] text-sm"
          >
            <Download size={18} />
            Download Table
          </Button>
        </div>
      </div>

      <TabsContent value="all-records">
        <TableContent records={filteredRecords} />
      </TabsContent>

      <TabsContent value="request">
        <div className="text-sm text-muted-foreground">
          No request data available yet.
        </div>
      </TabsContent>
    </Tabs>
  );
};

interface TableContentProps {
  records: Record[];
}

const TableContent = ({ records }: TableContentProps) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Record;
    direction: "ascending" | "descending";
  } | null>(null);

  const requestSort = (key: keyof Record) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig?.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedRecords = [...records];
  if (sortConfig) {
    sortedRecords.sort((a, b) => {
      const aValue = a[sortConfig.key]?.toString().toLowerCase() || "";
      const bValue = b[sortConfig.key]?.toString().toLowerCase() || "";

      if (aValue < bValue) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  }

  return (
    <div className="overflow-auto">
      <table className="w-full text-sm text-left">
        <thead className="border-b">
          <tr className="text-[#606060] text-sm !font-medium whitespace-nowrap">
            <th
              className="py-2 px-4 cursor-pointer"
              onClick={() => requestSort("name")}
            >
              <div className="flex items-center gap-3">
                Customer Name/ID
                {sortConfig?.key === "name" && (
                  <span>
                    {sortConfig.direction === "ascending" ? "↑" : "↓"}
                  </span>
                )}
              </div>
            </th>
            <th
              className="py-2 px-4 cursor-pointer"
              onClick={() => requestSort("category")}
            >
              <div className="flex items-center gap-3">
                Customer Category
                <Image
                  src="/icons/filter-edit.svg"
                  width={18}
                  height={18}
                  alt="Filter"
                />
              </div>
            </th>
            <th className="py-2 px-4">Principal</th>
            <th
              className="py-2 px-4 cursor-pointer"
              onClick={() => requestSort("alias")}
            >
              <div className="flex items-center gap-3">
                User Alias
                <Image
                  src="/icons/filter-edit.svg"
                  width={18}
                  height={18}
                  alt="Filter"
                />
              </div>
            </th>
            <th
              className="py-2 px-4 cursor-pointer"
              onClick={() => requestSort("status")}
            >
              <div className="flex items-center gap-3">
                Status
                <Image
                  src="/icons/filter-edit.svg"
                  width={18}
                  height={18}
                  alt="Filter"
                />
              </div>
            </th>
            <th
              className="py-2 px-4 cursor-pointer"
              onClick={() => requestSort("date")}
            >
              <div className="flex items-center gap-3">
                Last Updated
                <Image
                  src="/icons/filter-edit.svg"
                  width={18}
                  height={18}
                  alt="Filter"
                />
              </div>
            </th>
            <th className="py-2 px-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {sortedRecords.map((r, i) => (
            <tr
              key={i}
              className={`border-b ${
                i % 2 === 0 ? "bg-[#FAF8F7]" : "bg-white"
              } hover:bg-muted/20 transition`}
            >
              <td className="py-3 px-4">
                {r.name}
                <div className="text-xs text-muted-foreground">{r.id}</div>
              </td>
              <td className="py-3 px-4">{r.category}</td>
              <td className="py-3 px-4">{r.amount}</td>
              <td className="py-3 px-4">
                {r.alias}
                <div className="text-xs text-muted-foreground">balance034</div>
              </td>
              <td className="flex items-center justify-center py-3 px-4">
                <StatusBadge status={r.status} />
              </td>
              <td className="py-3 px-4">{r.date}</td>
              <td className="py-3 px-4">
                <Image
                  src="/icons/hamburger.svg"
                  width={18}
                  height={18}
                  alt="action menu"
                  className="cursor-pointer"
                  onClick={() => console.log("Action menu clicked for", r.name)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
