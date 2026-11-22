import { Suspense } from "react";
import { Metadata } from "next";
import CompanyDashboard from "@/components/companies/CompanyDashboard";

export const metadata: Metadata = {
  title: "Rejected Companies | ISAB Admin",
  description: "View rejected or inactive companies",
  keywords: ["rejected", "companies", "inactive", "declined"],
};

export default function RejectedCompaniesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-red-900 to-gray-900">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-xl text-gray-300">Loading rejected companies...</p>
          </div>
        </div>
      }
    >
      <CompanyDashboard status="inactive" />
    </Suspense>
  );
}