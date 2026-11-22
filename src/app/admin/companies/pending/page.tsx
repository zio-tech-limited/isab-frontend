import { Suspense } from "react";
import { Metadata } from "next";
import CompanyDashboard from "@/components/companies/CompanyDashboard";

export const metadata: Metadata = {
  title: "Pending Companies | ISAB Admin",
  description: "Review and manage pending company registration requests",
  keywords: ["pending", "companies", "approval", "registration"],
};

export default function PendingCompaniesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-xl text-gray-300">Loading pending companies...</p>
          </div>
        </div>
      }
    >
      <CompanyDashboard status="pending" />
    </Suspense>
  );
}

