"use client";

import { useState, useEffect } from 'react';
import TopBar from "@/components/TopBar";
import { RecordTable } from "@/components/RecordTable";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Image from "next/image";
import { ChevronUp, CirclePlus } from "lucide-react";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'individual' | 'corporate'>('individual');
  const [lastLogin, setLastLogin] = useState<string>('');

  useEffect(() => {
    const now = new Date();
    setLastLogin(now.toLocaleString('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }));
  }, []);

  const handleNewRequest = () => {
    console.log('New request button clicked');
  };

  return (
    <div className="min-h-screen bg-muted">
      <TopBar />

      <main className="px-6 py-4">
        {/* Title and Tabs */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div className="flex justify-between items-center w-full">
            <div className="flex flex-col gap-2">
              <h1 className="text-[32px] font-semibold">Nintendo</h1>
              {/* Breadcrumb */}
              <Breadcrumb className="mb-2">
                <BreadcrumbList>
                  <BreadcrumbItem className="flex items-center gap-2">
                    <Image
                      src={"/icons/category.svg"}
                      alt="dashboard"
                      width={20}
                      height={20}
                    />
                    <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem className="flex items-center gap-2">
                    <Image
                      src={"/icons/profile.svg"}
                      alt="profile"
                      width={20}
                      height={20}
                    />
                    <BreadcrumbPage>Nintendo</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <Button 
              onClick={handleNewRequest}
              className="bg-[#A93636] hover:bg-red-700 text-white !rounded-[8px] py-[14px] px-4 flex items-center gap-2.5"
            >
              <CirclePlus />
              New Request
            </Button>
          </div>
        </div>
        {/* Tab Switch */}
        <div className="mt-4 flex gap-4 border-b text-sm font-medium">
          <button 
            className={`pb-2 ${activeTab === 'individual' ? 'text-primary border-b-2 border-[#A93636]' : 'text-muted-foreground'}`}
            onClick={() => setActiveTab('individual')}
          >
            Individual
          </button>
          <button 
            className={`pb-2 ${activeTab === 'corporate' ? 'text-primary border-b-2 border-[#A93636]' : 'text-muted-foreground'}`}
            onClick={() => setActiveTab('corporate')}
          >
            Corporate
          </button>
        </div>

        {/* Table */}
        <RecordTable activeTab={activeTab} />
      </main>

      {/* Footer */}
      <footer className="px-6 py-2 text-sm text-[#1C1C1C] border-t mt-10 flex items-center gap-6 bg-white">
        <div className="flex gap-2.5 items-center border border-[#E8E8E8] rounded-[8px] px-6 py-3">
          <span className="flex items-center gap-1 text-[#36A955]">
            Role: <span className="text-[#1C1C1C]">Super Admin</span>
          </span>
          <ChevronUp size={18} />
        </div>
        <span>Last login: {lastLogin}</span>
      </footer>
    </div>
  );
}