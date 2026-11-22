"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  Trash2,
  RefreshCw,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  User,
  Briefcase,
  Landmark,
  FileText,
  Hash,
  AlertCircle,
  Users,
} from "lucide-react";
import { useTheme } from "@/hooks/useThemeContext";
import Image from "next/image";
import { toast } from "react-hot-toast";

interface Company {
  id: number;
  companyName: string;
  tradeLicenseNo?: string;
  binNo?: string;
  tinNo?: string;
  ownerName: string;
  ownerPhoto?: string;
  ownerNidOrPassportNo?: string;
  phoneNo: string;
  email: string;
  website?: string;
  address: string;
  city: string;
  state: string;
  postalCode?: string;
  country: string;
  businessType?: string;
  yearOfEstablishment?: number;
  numberOfEmployees?: number;
  bankName?: string;
  bankAccountNo?: string;
  bankBranch?: string;
  status: "pending" | "active" | "inactive";
  role: string;
  joinedDate?: string;
  createdAt: string;
  documents?: {
    ownerNidFront?: string;
    ownerNidBack?: string;
  };
}

interface CompanyListProps {
  companies: Company[];
  isLoading: boolean;
  filters: {
    search: string;
    status: string;
  };
  setFilters: React.Dispatch<React.SetStateAction<{
    search: string;
    status: string;
  }>>;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  totalItems: number;
  onRefresh: () => void;
  onViewDetails: (company: Company) => void;
  onUpdateStatus: (id: number, status: "active" | "pending" | "inactive") => void;
  onDelete: (id: number) => void;
}

const CompanyList: React.FC<CompanyListProps> = ({
  companies,
  isLoading,
  filters,
  setFilters,
  currentPage,
  setCurrentPage,
  totalPages,
  totalItems,
  onRefresh,
  onViewDetails,
  onUpdateStatus,
  onDelete,
}) => {
  const { theme } = useTheme();
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [companyToDelete, setCompanyToDelete] = useState<number | null>(null);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return {
          color: "green",
          icon: CheckCircle2,
          text: "Active",
          bg: "bg-green-500/10",
          border: "border-green-500/20",
          textColor: "text-green-500",
        };
      case "pending":
        return {
          color: "orange",
          icon: Clock,
          text: "Pending",
          bg: "bg-orange-500/10",
          border: "border-orange-500/20",
          textColor: "text-orange-500",
        };
      case "inactive":
        return {
          color: "red",
          icon: XCircle,
          text: "Rejected",
          bg: "bg-red-500/10",
          border: "border-red-500/20",
          textColor: "text-red-500",
        };
      default:
        return {
          color: "gray",
          icon: AlertCircle,
          text: "Unknown",
          bg: "bg-gray-500/10",
          border: "border-gray-500/20",
          textColor: "text-gray-500",
        };
    }
  };

  const handleDeleteClick = (id: number) => {
    setCompanyToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (companyToDelete) {
      onDelete(companyToDelete);
      setShowDeleteModal(false);
      setCompanyToDelete(null);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-xl overflow-hidden bg-white shadow-lg animate-pulse"
          >
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="h-6 bg-gray-300 rounded w-1/3 mb-3" />
                  <div className="h-4 bg-gray-300 rounded w-1/2 mb-2" />
                  <div className="h-4 bg-gray-300 rounded w-1/4" />
                </div>
                <div className="w-20 h-20 bg-gray-300 rounded-lg" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (companies.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16 rounded-2xl bg-white shadow-lg"
      >
        <Building2 className="w-20 h-20 mx-auto mb-4 text-gray-400" />
        <h3 className="text-xl font-semibold mb-2 text-gray-900">
          No Companies Found
        </h3>
        <p className="text-gray-600">
          Try adjusting your search or filter criteria
        </p>
        <button
          onClick={onRefresh}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition inline-flex items-center gap-2"
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </motion.div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {/* Search and Filter Bar */}
        <div className="rounded-xl p-4 bg-white shadow-lg mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="text"
                placeholder="Search by company name, owner name, email, or phone..."
                value={filters.search}
                onChange={(e) =>
                  setFilters({ ...filters, search: e.target.value })
                }
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
              <select
                value={filters.status}
                onChange={(e) =>
                  setFilters({ ...filters, status: e.target.value })
                }
                className="pl-10 pr-8 py-2 rounded-lg border border-gray-200 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 appearance-none cursor-pointer bg-white"
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="active">Active</option>
                <option value="inactive">Rejected</option>
              </select>
            </div>
            <button
              onClick={onRefresh}
              className="px-4 py-2 rounded-lg transition-colors flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700"
            >
              <RefreshCw size={16} />
              Refresh
            </button>
          </div>
        </div>

        {/* Company Cards */}
        <AnimatePresence>
          {companies.map((company, index) => {
            const statusBadge = getStatusBadge(company.status);
            const StatusIcon = statusBadge.icon;

            return (
              <motion.div
                key={company.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                whileHover={{ scale: 1.01 }}
                className="rounded-xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100"
                onClick={() => onViewDetails(company)}
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    {/* Company Info */}
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
                          <Building2 className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-1 text-gray-900">
                            {company.companyName}
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusBadge.bg} ${statusBadge.border} ${statusBadge.textColor}`}
                            >
                              <StatusIcon size={12} />
                              {statusBadge.text}
                            </span>
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                              <User size={12} />
                              {company.ownerName}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">
                            {company.email}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">
                            {company.phoneNo}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">
                            {company.city}, {company.country}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">
                            Joined: {company.joinedDate || new Date(company.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      {/* Additional Info */}
                      <div className="flex flex-wrap gap-4 mt-4 pt-3 border-t border-gray-200">
                        {company.tradeLicenseNo && (
                          <div className="flex items-center gap-1">
                            <FileText size={12} className="text-gray-400" />
                            <span className="text-xs text-gray-500">
                              License: {company.tradeLicenseNo}
                            </span>
                          </div>
                        )}
                        {company.businessType && (
                          <div className="flex items-center gap-1">
                            <Briefcase size={12} className="text-gray-400" />
                            <span className="text-xs text-gray-500">
                              {company.businessType}
                            </span>
                          </div>
                        )}
                        {company.numberOfEmployees && (
                          <div className="flex items-center gap-1">
                            <Users size={12} className="text-gray-400" />
                            <span className="text-xs text-gray-500">
                              {company.numberOfEmployees} employees
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-row lg:flex-col gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewDetails(company);
                        }}
                        className="p-2 cursor-pointer rounded-lg bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-200"
                        title="View Details"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteClick(company.id);
                        }}
                        className="p-2 cursor-pointer rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200"
                        title="Delete Company"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 pt-4 border-t border-gray-200">
            <div className="text-sm text-gray-600">
              Showing {companies.length} of {totalItems} companies
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-gray-100 hover:bg-gray-200 text-gray-700"
              >
                <ChevronLeft size={18} />
              </button>
              <div className="flex gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-10 h-10 rounded-lg transition-colors ${
                        currentPage === pageNum
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-gray-100 hover:bg-gray-200 text-gray-700"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="max-w-md w-full rounded-2xl bg-white shadow-2xl overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-red-500/10 rounded-full">
                  <AlertCircle className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Delete Company
                </h3>
              </div>
              <p className="mb-6 text-gray-600">
                Are you sure you want to delete this company? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 py-2 rounded-lg transition-colors bg-gray-100 hover:bg-gray-200 text-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default CompanyList;