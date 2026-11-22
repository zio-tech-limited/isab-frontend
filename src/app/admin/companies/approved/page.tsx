import { Suspense } from "react";
import { Metadata } from "next";
import CompanyDashboard from "@/components/companies/CompanyDashboard";

export const metadata: Metadata = {
  title: "Approved Companies | ISAB Admin",
  description: "View and manage all approved companies",
  keywords: ["approved", "companies", "active", "verified"],
};

export default function ApprovedCompaniesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-green-900 to-gray-900">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-xl text-gray-300">Loading approved companies...</p>
          </div>
        </div>
      }
    >
      <CompanyDashboard status="active" />
    </Suspense>
  );
}