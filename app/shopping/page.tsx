"use client";

import { Navbar } from "@/components/navbar";
import Layout from "@/components/layout/layout";
import SideBarPayments from "@/app/shopping/components/SideBarPayments";
import RegistrationForm from "./components/RegistrationForm";

export default function DashboardPage() {
  return (
    <Layout>
      <Navbar />
      <div className="flex flex-col md:flex-row justify-center items-start p-5 gap-5 min-h-[calc(100vh-64px)]">
        <div className="w-full md:w-2/3">
          <RegistrationForm />
        </div>
        <div className="w-full md:w-1/3">
          <SideBarPayments />
        </div>
      </div>
    </Layout>
  );
}
