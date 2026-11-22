// components/certificate/ViewCertificate.tsx
"use client";

import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Edit,
  CheckCircle,
  XCircle,
  AlertCircle,
  Calendar,
  Building2,
  MapPin,
  FileText,
  Award,
  Globe,
  Hash,
  Briefcase,
  Verified,
  Clock,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import BackButton from "../reusable-components/BackButton";
import { useGetCertificateByIdQuery } from "@/redux/api/sms-configurations/certificateApi";

export default function ViewCertificate() {
  const params = useParams();
  const router = useRouter();
  const certificateId = params.id as string;

  const { data: certificateData, isLoading } = useGetCertificateByIdQuery(certificateId, {
    skip: !certificateId,
  });

  const certificate = certificateData?.data;

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800";
      case "expired":
        return "bg-red-100 text-red-800";
      case "suspended":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case "active":
        return <CheckCircle className="w-5 h-5" />;
      case "expired":
        return <XCircle className="w-5 h-5" />;
      default:
        return <AlertCircle className="w-5 h-5" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-white">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading certificate details...</p>
        </div>
      </div>
    );
  }

  if (!certificate) {
    return (
      <div className="text-center py-12 bg-white">
        <p className="text-gray-600">Certificate not found</p>
        <BackButton />
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 lg:p-8 bg-white min-h-screen">
      <div className="mb-8">
        <BackButton />
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Certificate Details
            </h1>
            <p className="text-gray-600 mt-2">
              Complete information for {certificate.name}
            </p>
          </div>
          <button
            onClick={() => router.push(`/certificates/edit/${certificateId}`)}
            className="px-5 cursor-pointer py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium flex items-center gap-2 shadow-lg shadow-blue-500/25 transition-all duration-200"
          >
            <Edit className="w-5 h-5" />
            Edit Certificate
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden sticky top-6 shadow-sm">
            <div className="p-6 text-center border-b border-gray-200">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mx-auto mb-4">
                <Award className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">
                {certificate.name}
              </h2>
              <p className="text-gray-600 mt-1 text-sm">
                {certificate.standard}
              </p>
              <div className="mt-4 flex items-center justify-center gap-2">
                <span className={cn(
                  "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium",
                  getStatusColor(certificate.status)
                )}>
                  {getStatusIcon(certificate.status)}
                  {certificate.status}
                </span>
                {certificate.isVerified && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                    <Verified className="w-4 h-4" />
                    Verified
                  </span>
                )}
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3 text-gray-600">
                <Hash className="w-5 h-5 text-blue-500" />
                <span className="font-mono text-sm">{certificate.certificateNumber}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Globe className="w-5 h-5 text-green-500" />
                <span>{certificate.country}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Calendar className="w-5 h-5 text-red-500" />
                <div>
                  <div>Issued: {new Date(certificate.issueDate).toLocaleDateString()}</div>
                  <div className="text-sm mt-1">Expires: {new Date(certificate.expiryDate).toLocaleDateString()}</div>
                </div>
              </div>
              {certificate.daysRemaining > 0 && (
                <div className="flex items-center gap-3 text-yellow-600">
                  <Clock className="w-5 h-5" />
                  <span>{certificate.daysRemaining} days remaining</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Organization Details */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-100">
                  <Building2 className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">Organization Details</h2>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Company Name</p>
                  <p className="text-gray-900 font-medium mt-1">{certificate.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="text-gray-900 mt-1">{certificate.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Certification Details */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-100">
                  <Award className="w-5 h-5 text-purple-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">Certification Details</h2>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Standard</p>
                  <p className="text-gray-900 font-medium mt-1">{certificate.standard}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Certificate Number</p>
                  <p className="text-gray-900 font-mono mt-1">{certificate.certificateNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Accreditation Body</p>
                  <p className="text-gray-900 mt-1">{certificate.accreditationBody}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Certification Body</p>
                  <p className="text-gray-900 mt-1">{certificate.certificationBody}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Issue Date</p>
                  <p className="text-gray-900 mt-1">{new Date(certificate.issueDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Registration Date</p>
                  <p className="text-gray-900 mt-1">{new Date(certificate.registrationDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Expiry Date</p>
                  <p className="text-gray-900 mt-1">{new Date(certificate.expiryDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Country</p>
                  <p className="text-gray-900 mt-1">{certificate.country}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Scope */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-100">
                  <FileText className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">Scope</h2>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-700 leading-relaxed">{certificate.scope}</p>
            </div>
          </div>

          {/* Notes */}
          {certificate.notes && (
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gray-100">
                    <FileText className="w-5 h-5 text-gray-600" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">Additional Notes</h2>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-700">{certificate.notes}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}