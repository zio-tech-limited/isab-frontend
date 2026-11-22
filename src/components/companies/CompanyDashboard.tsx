"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Clock,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/hooks/useThemeContext";
import { toast } from "react-hot-toast";
import { useDeleteSubCompanyMutation, useGetAllSubCompaniesQuery, useGetSubCompanyStatsQuery, useUpdateSubCompanyStatusMutation } from "@/redux/api/authentication/subCompanyApi";
import CompanyStatsCards from "./CompanyStatsCards";
import CompanyList from "./CompanyList";
import CompanyDetailsModal from "./CompanyDetailsModal";

interface CompanyDashboardProps {
  status?: "pending" | "active" | "inactive" | "";
}

const CompanyDashboard: React.FC<CompanyDashboardProps> = ({ status = "" }) => {
  const { theme } = useTheme();
  const router = useRouter();
  const [filters, setFilters] = useState({
    search: "",
    status: status,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCompany, setSelectedCompany] = useState<any>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const { data: statsData, isLoading: statsLoading, refetch: refetchStats } = useGetSubCompanyStatsQuery(undefined);
  
  const {
    data: companiesData,
    isLoading: companiesLoading,
    isError,
    refetch: refetchCompanies,
  } = useGetAllSubCompaniesQuery({
    page: currentPage,
    limit: 10,
    search: filters.search,
    status: filters.status,
  });

  const [updateStatus] = useUpdateSubCompanyStatusMutation();
  const [deleteCompany] = useDeleteSubCompanyMutation();

  const handleRefresh = () => {
    refetchStats();
    refetchCompanies();
    toast.success("Data refreshed successfully!");
  };

  const handleViewDetails = (company: any) => {
    setSelectedCompany(company);
    setShowDetailsModal(true);
  };

  const handleUpdateStatus = async (id: number, newStatus: "active" | "pending" | "inactive") => {
    try {
      await updateStatus({ id, status: newStatus }).unwrap();
      toast.success(`Company ${newStatus === "active" ? "approved" : newStatus === "inactive" ? "rejected" : "status updated"} successfully!`);
      refetchCompanies();
      refetchStats();
      setShowDetailsModal(false);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update status");
      throw error;
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteCompany(id).unwrap();
      toast.success("Company deleted successfully!");
      refetchCompanies();
      refetchStats();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete company");
    }
  };

  // Set title based on status
  const getTitle = () => {
    switch (status) {
      case "pending":
        return "Pending Companies";
      case "active":
        return "Approved Companies";
      case "inactive":
        return "Rejected Companies";
      default:
        return "Company Management";
    }
  };

  const getDescription = () => {
    switch (status) {
      case "pending":
        return "Review and manage pending company registration requests";
      case "active":
        return "View and manage all approved companies";
      case "inactive":
        return "View rejected or inactive companies";
      default:
        return "Manage all registered companies - approve, reject, and track company information";
    }
  };

  const getWelcomeMessage = () => {
    switch (status) {
      case "pending":
        return `${statsData?.data?.pending || 0} companies waiting for review`;
      case "active":
        return `${statsData?.data?.active || 0} active companies in the system`;
      case "inactive":
        return `${statsData?.data?.inactive || 0} rejected/inactive companies`;
      default:
        return `${statsData?.data?.total || 0} total companies registered`;
    }
  };

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="text-6xl mb-4 text-gray-400">⚠️</div>
          <p className="text-lg text-gray-600">
            Failed to load companies
          </p>
          <button
            onClick={handleRefresh}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-4 md:p-6 lg:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              {getTitle()}
            </h1>
            <p className="mt-1 text-sm md:text-base text-gray-600">
              {getDescription()}
            </p>
          </div>
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors bg-white hover:bg-gray-100 text-gray-700 border border-gray-200"
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>

        {/* Welcome Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-6 shadow-lg"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
                <Building2 className="w-10 h-10 text-blue-500" />
              </div>
            </div>

            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900">
                Welcome to ISAB Company Management
              </h2>
              <p className="mt-2 text-gray-600">
                Here you can manage all registered companies. Review applications, verify company information,
                approve or reject registrations, and manage company details.
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-100">
                    <Building2 className="w-4 h-4 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Total Companies
                    </p>
                    <p className="text-xs text-gray-500">
                      {statsData?.data?.total || 0} registered
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-100">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Active
                    </p>
                    <p className="text-xs text-gray-500">
                      {statsData?.data?.active || 0} companies
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-orange-100">
                    <Clock className="w-4 h-4 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Pending
                    </p>
                    <p className="text-xs text-gray-500">
                      {statsData?.data?.pending || 0} waiting
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-red-100">
                    <XCircle className="w-4 h-4 text-red-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Rejected
                    </p>
                    <p className="text-xs text-gray-500">
                      {statsData?.data?.inactive || 0} companies
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Statistics Cards */}
      {!statsLoading && statsData?.data && (
        <CompanyStatsCards stats={statsData.data} />
      )}

      {/* Companies List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <CompanyList
          companies={companiesData?.data || []}
          isLoading={companiesLoading}
          filters={filters}
          setFilters={setFilters}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={companiesData?.pagination?.totalPages || 1}
          totalItems={companiesData?.pagination?.totalItems || 0}
          onRefresh={handleRefresh}
          onViewDetails={handleViewDetails}
          onUpdateStatus={handleUpdateStatus}
          onDelete={handleDelete}
        />
      </motion.div>

      {/* Company Details Modal */}
      <CompanyDetailsModal
        company={selectedCompany}
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
};

export default CompanyDashboard;