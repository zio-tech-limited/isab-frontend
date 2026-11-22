// components/certificate/CertificateList.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle,
  Award,
  Calendar,
  Building2,
  Loader2,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  FileText,
  Globe,
  Verified,
  Clock,
  FileCheck,
  FileQuestion,
  Download,
  ImageIcon,
  File,
  FileCode,
  FileJson,
  FileSpreadsheet,
  Presentation,
  Music,
  Video,
  Package,
  User,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  useDeleteCertificateMutation,
  useGetAllCertificatesQuery,
  useUpdateCertificateStatusMutation,
} from "@/redux/api/sms-configurations/certificateApi";
import { useGetAllDocumentsQuery, AccreditationDocument } from "@/redux/api/documents/accreditationDocumentApi";
import { appConfiguration } from "@/utils/constant/appConfiguration";
import Image from "next/image";

const BACKEND_URL = appConfiguration.baseUrl;

interface Certificate {
  id: number;
  name: string;
  certificateNumber: string;
  standard: string;
  accreditationBody: string;
  certificationBody: string;
  country: string;
  issueDate: string;
  expiryDate: string;
  status: string;
  isVerified: boolean;
  daysRemaining: number;
  isExpired: boolean;
  createdAt: string;
}

type TabType = "issued" | "documented";

export default function CertificateList() {
 useEffect(() => {
    if (typeof window !== 'undefined') {
      // Get the last reload time
      const lastReload = sessionStorage.getItem('certificate_list_last_reload');
      const currentTime = Date.now();
      
      // If no last reload or it was more than 5 seconds ago, reload
      if (!lastReload || (currentTime - parseInt(lastReload)) > 5000) {
        // Update the last reload time
        sessionStorage.setItem('certificate_list_last_reload', currentTime.toString());
        
        // Reload the page
        window.location.reload();
      }
    }
  }, []);


  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("issued");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | AccreditationDocument | null>(null);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<"active" | "expired" | "suspended" | "pending">("active");
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<AccreditationDocument | null>(null);

  // Fetch issued certificates
  const { data, isLoading, refetch } = useGetAllCertificatesQuery({
    page: currentPage,
    limit: itemsPerPage,
    search: searchTerm,
    status: statusFilter,
  });

  // Fetch documented certificates (approved accreditation documents)
  const { 
    data: documentedData, 
    isLoading: documentedLoading, 
    refetch: refetchDocumented 
  } = useGetAllDocumentsQuery({
    page: currentPage,
    limit: itemsPerPage,
    approvalStatus: "approved",
    search: searchTerm || undefined,
  });

  const [deleteCertificate] = useDeleteCertificateMutation();
  const [updateStatus] = useUpdateCertificateStatusMutation();

  const certificates = data?.data || [];
  const pagination = data?.pagination;
  
  const documentedCertificates = documentedData?.data || [];
  const documentedPagination = documentedData?.pagination;

  const handleView = (id: number) => {
    router.push(`/admin/certificates/view/${id}`);
  };

  const handleEdit = (id: number) => {
    router.push(`/admin/certificates/edit/${id}`);
  };

  const handleDelete = async () => {
    if (!selectedCertificate) return;
    
    try {
      await deleteCertificate((selectedCertificate as Certificate).id).unwrap();
      toast.success("Certificate deleted successfully!");
      setDeleteModalOpen(false);
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete certificate");
    }
  };

  const handleStatusChange = async () => {
    if (!selectedCertificate) return;
    
    try {
      await updateStatus({ id: (selectedCertificate as Certificate).id, status: newStatus }).unwrap();
      toast.success(`Certificate status updated to ${newStatus}!`);
      setStatusModalOpen(false);
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update status");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800";
      case "expired":
        return "bg-red-100 text-red-800";
      case "suspended":
        return "bg-orange-100 text-orange-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case "active":
      case "approved":
        return <CheckCircle className="w-4 h-4" />;
      case "expired":
      case "rejected":
        return <XCircle className="w-4 h-4" />;
      case "suspended":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getFileIcon = (mimeType: string | null, fileName: string, size?: 'sm' | 'lg') => {
    const iconSize = size === 'lg' ? 'w-12 h-12' : 'w-8 h-8';
    const extension = fileName?.split('.').pop()?.toLowerCase() || '';

    if (mimeType?.startsWith('image/') || ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(extension)) {
      return <ImageIcon className={`${iconSize} text-blue-500`} />;
    }
    if (mimeType === 'application/pdf' || extension === 'pdf') {
      return <FileText className={`${iconSize} text-red-500`} />;
    }
    if (mimeType?.includes('word') || ['doc', 'docx'].includes(extension)) {
      return <FileText className={`${iconSize} text-blue-600`} />;
    }
    if (mimeType?.includes('excel') || ['xls', 'xlsx', 'csv'].includes(extension)) {
      return <FileSpreadsheet className={`${iconSize} text-green-600`} />;
    }
    if (mimeType?.includes('powerpoint') || ['ppt', 'pptx'].includes(extension)) {
      return <Presentation className={`${iconSize} text-orange-600`} />;
    }
    if (extension === 'sql') return <FileCode className={`${iconSize} text-purple-500`} />;
    if (extension === 'json') return <FileJson className={`${iconSize} text-yellow-600`} />;
    if (['zip', 'rar', '7z', 'tar', 'gz'].includes(extension)) {
      return <Package className={`${iconSize} text-gray-500`} />;
    }
    if (mimeType?.startsWith('video/') || ['mp4', 'avi', 'mkv', 'mov'].includes(extension)) {
      return <Video className={`${iconSize} text-purple-500`} />;
    }
    if (mimeType?.startsWith('audio/') || ['mp3', 'wav', 'ogg'].includes(extension)) {
      return <Music className={`${iconSize} text-pink-500`} />;
    }
    return <File className={`${iconSize} text-gray-400`} />;
  };

  const getFullFileUrl = (fileUrl: string) => {
    if (!fileUrl) return '';
    if (fileUrl?.startsWith('http')) return fileUrl;
    return `${BACKEND_URL}${fileUrl}`;
  };

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return '0 Bytes';
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return formatDate(dateString);
  };

  const handlePreview = (doc: AccreditationDocument) => {
    setSelectedDocument(doc);
    setPreviewModalOpen(true);
  };

  // Calculate stats for current tab
  const getIssuedStats = () => {
    const total = certificates.length;
    const active = certificates.filter((c: Certificate) => c.status === "active").length;
    const expired = certificates.filter((c: Certificate) => c.status === "expired").length;
    const suspended = certificates.filter((c: Certificate) => c.status === "suspended").length;
    const pending = certificates.filter((c: Certificate) => c.status === "pending").length;
    return { total, active, expired, suspended, pending };
  };

  const getDocumentedStats = () => {
    const total = documentedCertificates.length;
    const withCertNumber = documentedCertificates.filter((c: AccreditationDocument) => c.certificationNumber).length;
    const withoutCertNumber = documentedCertificates.filter((c: AccreditationDocument) => !c.certificationNumber).length;
    return { total, withCertNumber, withoutCertNumber };
  };

  const issuedStats = getIssuedStats();
  const documentedStats = getDocumentedStats();

  if (isLoading || documentedLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading certificates...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 lg:p-8"> 
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Certificates
            </h1>
            <p className="text-gray-600 mt-2">
              Manage your organization&apos;s certificates and their information
            </p>
          </div>
         {activeTab === "issued" &&  <button
            onClick={() => router.push("/admin/certificates/issue")}
            className="px-5 cursor-pointer py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium flex items-center gap-2 shadow-lg shadow-blue-500/25 transition-all duration-200"
          >
            <Plus className="w-5 h-5" />
            Issue Certificate
          </button>}
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex gap-8" aria-label="Tabs">
            <button
              onClick={() => {
                setActiveTab("issued");
                setCurrentPage(1);
                setSearchTerm("");
                setStatusFilter("");
              }}
              className={cn(
                "py-3 px-1 cursor-pointer border-b-2 font-medium text-sm transition-colors relative",
                activeTab === "issued"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              )}
            >
              <div className="flex items-center gap-2">
                <FileCheck className="w-4 h-4" />
                Issued Certificates
              </div>
            </button>
            <button
              onClick={() => {
                setActiveTab("documented");
                setCurrentPage(1);
                setSearchTerm("");
                setStatusFilter("");
              }}
              className={cn(
                "py-3 px-1 cursor-pointer border-b-2 font-medium text-sm transition-colors relative",
                activeTab === "documented"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              )}
            >
              <div className="flex items-center gap-2">
                <FileQuestion className="w-4 h-4" />
                Documented Certificates
              </div>
            </button>
          </nav>
        </div>
      </div>

      {/* Stats Cards */}
      {activeTab === "issued" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{issuedStats.total}</p>
              </div>
              <div className="p-3 rounded-xl bg-blue-100">
                <Award className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-2xl font-bold text-green-600 mt-1">{issuedStats.active}</p>
              </div>
              <div className="p-3 rounded-xl bg-green-100">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Expired</p>
                <p className="text-2xl font-bold text-red-600 mt-1">{issuedStats.expired}</p>
              </div>
              <div className="p-3 rounded-xl bg-red-100">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600 mt-1">{issuedStats.pending}</p>
              </div>
              <div className="p-3 rounded-xl bg-yellow-100">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Suspended</p>
                <p className="text-2xl font-bold text-orange-600 mt-1">{issuedStats.suspended}</p>
              </div>
              <div className="p-3 rounded-xl bg-orange-100">
                <AlertCircle className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Documents</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{documentedStats.total}</p>
              </div>
              <div className="p-3 rounded-xl bg-blue-100">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">With Certificate</p>
                <p className="text-2xl font-bold text-green-600 mt-1">{documentedStats.withCertNumber}</p>
              </div>
              <div className="p-3 rounded-xl bg-green-100">
                <Verified className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Without Certificate</p>
                <p className="text-2xl font-bold text-yellow-600 mt-1">{documentedStats.withoutCertNumber}</p>
              </div>
              <div className="p-3 rounded-xl bg-yellow-100">
                <AlertCircle className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-6 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder={activeTab === "issued" ? "Search by name, certificate number, or standard..." : "Search by student name, ID, or document title..."}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200"
            />
          </div>
          
          {activeTab === "issued" && (
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-4 py-2.5 rounded-xl border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="expired">Expired</option>
              <option value="suspended">Suspended</option>
              <option value="pending">Pending</option>
            </select>
          )}
          
          <button
            onClick={() => {
              setSearchTerm("");
              setStatusFilter("");
              setCurrentPage(1);
              if (activeTab === "issued") {
                refetch();
              } else {
                refetchDocumented();
              }
            }}
            className="px-4 cursor-pointer py-2.5 rounded-xl border border-gray-300 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center gap-2"
          >
            Reset
          </button>

           <button
            onClick={() => window.location.reload()}
            className="px-4 cursor-pointer py-2.5 rounded-xl border border-gray-300 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Page Refresh
          </button>
        </div>
      </div>

      {/* Certificate Table */} 
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {activeTab === "issued" ? (
                  <>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Certificate</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Certificate No</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Standard</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Expiry Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Actions</th>
                  </>
                ) : (
                  <>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Document</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Student</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Category</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Cert. Number</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Actions</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {activeTab === "issued" ? (
                // Issued Certificates
                certificates.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <Award className="w-12 h-12 text-gray-400" />
                        <p className="text-gray-500">No certificates found</p>
                        <button
                          onClick={() => router.push("/admin/certificates/issue")}
                          className="mt-2 text-blue-600 hover:text-blue-700 font-medium"
                        >
                          Add your first certificate
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  certificates.map((certificate: Certificate) => (
                    <tr key={certificate.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">{certificate.name}</p>
                          <p className="text-sm text-gray-500 mt-1">{certificate.accreditationBody}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                          {certificate.certificateNumber}
                        </code>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {certificate.standard?.split("-")[0]}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span>{certificate.expiryDate}</span>
                          </div>
                          {certificate.daysRemaining > 0 && certificate.daysRemaining <= 30 && (
                            <span className="text-xs text-yellow-600">
                              {certificate.daysRemaining} days remaining
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className={cn(
                            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
                            getStatusColor(certificate.status)
                          )}>
                            {getStatusIcon(certificate.status)}
                            {certificate.status}
                          </span>
                          {certificate.isVerified && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                              <Verified className="w-3 h-3" />
                              Verified
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleView(certificate.id)}
                            className="p-2 cursor-pointer rounded-lg hover:bg-blue-100 transition-colors"
                            title="View"
                          >
                            <Eye className="w-4 h-4 text-blue-600" />
                          </button>
                          <button
                            onClick={() => handleEdit(certificate.id)}
                            className="p-2 cursor-pointer rounded-lg hover:bg-purple-100 transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4 text-purple-600" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedCertificate(certificate);
                              setStatusModalOpen(true);
                            }}
                            className="p-2 cursor-pointer rounded-lg hover:bg-yellow-100 transition-colors"
                            title="Change Status"
                          >
                            <RefreshCw className="w-4 h-4 text-yellow-600" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedCertificate(certificate);
                              setDeleteModalOpen(true);
                            }}
                            className="p-2 cursor-pointer rounded-lg hover:bg-red-100 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )
              ) : (
                // Documented Certificates
                documentedCertificates.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <FileQuestion className="w-12 h-12 text-gray-400" />
                        <p className="text-gray-500">No documented certificates found</p>
                        <button
                          onClick={() => router.push("/admin/certificates/issue")}
                          className="mt-2 text-blue-600 hover:text-blue-700 font-medium"
                        >
                          Issue your first certificate
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  documentedCertificates.map((doc: AccreditationDocument) => (
                    <tr key={doc.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex-shrink-0">
                            {getFileIcon(doc.mimeType, doc.fileName, 'sm')}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{doc.title}</p>
                            <p className="text-sm text-gray-500 mt-1">
                              {doc.fileName}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">{doc.studentName}</p>
                          <p className="text-sm text-gray-500">{doc.studentUniqueId}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                          {doc.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {doc.certificationNumber ? (
                          <code className="text-sm font-mono bg-green-100 px-2 py-1 rounded text-green-700">
                            {doc.certificationNumber}
                          </code>
                        ) : (
                          <span className="text-sm text-gray-400">Not issued</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
                          getStatusColor(doc.approvalStatus)
                        )}>
                          {getStatusIcon(doc.approvalStatus)}
                          {doc.approvalStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handlePreview(doc)}
                            className="p-2 cursor-pointer rounded-lg hover:bg-blue-100 transition-colors"
                            title="Preview"
                          >
                            <Eye className="w-4 h-4 text-blue-600" />
                          </button>
                          <a
                            href={getFullFileUrl(doc.fileUrl)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 cursor-pointer rounded-lg hover:bg-green-100 transition-colors"
                            title="Download"
                          >
                            <Download className="w-4 h-4 text-green-600" />
                          </a>
                          <button
                            onClick={() => {
                              setSelectedCertificate(doc as any);
                              setStatusModalOpen(true);
                            }}
                            className="p-2 cursor-pointer rounded-lg hover:bg-yellow-100 transition-colors"
                            title="Change Status"
                          >
                            <RefreshCw className="w-4 h-4 text-yellow-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {(pagination && pagination.totalPages > 1) || (documentedPagination && documentedPagination.totalPages > 1) ? (
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {activeTab === "issued" ? 
                ((pagination?.page || 1) - 1) * itemsPerPage + 1 : 
                ((documentedPagination?.page || 1) - 1) * itemsPerPage + 1
              } to{" "}
              {activeTab === "issued" ?
                Math.min((pagination?.page || 1) * itemsPerPage, pagination?.total || 0) :
                Math.min((documentedPagination?.page || 1) * itemsPerPage, documentedPagination?.total || 0)
              } of {activeTab === "issued" ? pagination?.total || 0 : documentedPagination?.total || 0} certificates
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(activeTab === "issued" ? pagination?.totalPages || 1 : documentedPagination?.totalPages || 1, prev + 1))}
                disabled={currentPage === (activeTab === "issued" ? pagination?.totalPages || 1 : documentedPagination?.totalPages || 1)}
                className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        ) : null}
      </div>

      {/* Preview Modal for Documented Certificates */}
      {previewModalOpen && selectedDocument && (
        <div className="fixed inset-0 backdrop-blur-md bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setPreviewModalOpen(false)}>
          <div className="rounded-2xl w-full max-w-4xl bg-white shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-lg text-gray-900">{selectedDocument.title}</h3>
                <div className="flex flex-wrap gap-2 mt-1">
                  <span className="text-xs text-gray-500">{selectedDocument.fileName}</span>
                  <span className="text-xs text-gray-500">• {formatFileSize(selectedDocument.fileSize)}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100">{selectedDocument.category}</span>
                  {selectedDocument.studentName && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                      {selectedDocument.studentName} ({selectedDocument.studentUniqueId})
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={() => setPreviewModalOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <XCircle className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            <div className="p-6 flex items-center justify-center min-h-[400px] max-h-[70vh] overflow-auto bg-gray-50">
              {selectedDocument.mimeType?.startsWith('image/') ? (
                <Image
                  src={getFullFileUrl(selectedDocument.fileUrl)}
                  alt={selectedDocument.title}
                  width={800}
                  height={600}
                  className="max-w-full h-auto rounded-lg object-contain"
                />
              ) : selectedDocument.mimeType === 'application/pdf' ? (
                <iframe
                  src={getFullFileUrl(selectedDocument.fileUrl)}
                  className="w-full h-[600px] rounded-lg"
                  title={selectedDocument.title}
                />
              ) : (
                <div className="text-center">
                  {getFileIcon(selectedDocument.mimeType, selectedDocument.fileName, 'lg')}
                  <p className="mt-4 text-gray-500">Preview not available for this file type</p>
                  <a
                    href={getFullFileUrl(selectedDocument.fileUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all cursor-pointer"
                  >
                    <Download size={16} />
                    Download
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && selectedCertificate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Delete Certificate
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this certificate? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteModalOpen(false)}
                  className="flex-1 px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Status Change Modal */}
      {statusModalOpen && selectedCertificate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <RefreshCw className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Change Status
              </h3>
              <p className="text-gray-600 mb-6">
                Update status for this certificate
              </p>
              <div className="space-y-3 mb-6">
                <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="status"
                    value="active"
                    checked={newStatus === "active"}
                    onChange={(e) => setNewStatus(e.target.value as any)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <div>
                    <p className="font-medium text-gray-900">Active</p>
                    <p className="text-sm text-gray-500">Certificate is valid</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="status"
                    value="expired"
                    checked={newStatus === "expired"}
                    onChange={(e) => setNewStatus(e.target.value as any)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <div>
                    <p className="font-medium text-gray-900">Expired</p>
                    <p className="text-sm text-gray-500">Certificate has expired</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="status"
                    value="suspended"
                    checked={newStatus === "suspended"}
                    onChange={(e) => setNewStatus(e.target.value as any)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <div>
                    <p className="font-medium text-gray-900">Suspended</p>
                    <p className="text-sm text-gray-500">Certificate is suspended</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="status"
                    value="pending"
                    checked={newStatus === "pending"}
                    onChange={(e) => setNewStatus(e.target.value as any)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <div>
                    <p className="font-medium text-gray-900">Pending</p>
                    <p className="text-sm text-gray-500">Awaiting approval</p>
                  </div>
                </label>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setStatusModalOpen(false)}
                  className="flex-1 px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleStatusChange}
                  className="flex-1 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium transition-colors"
                >
                  Update Status
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

