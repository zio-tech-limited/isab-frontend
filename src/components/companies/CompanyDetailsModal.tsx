"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Building2,
    Mail,
    Phone,
    MapPin,
    Calendar,
    User,
    Briefcase,
    Landmark,
    FileText,
    Hash,
    X,
    CheckCircle2,
    XCircle,
    Clock,
    Eye,
    CreditCard,
    Globe,
    Users,
    MapPinned,
    Banknote,
} from "lucide-react";
import { useTheme } from "@/hooks/useThemeContext";
import Image from "next/image";

interface Company {
    id: number;
    companyName: string;
    tradeLicenseNo?: string;
    binNo?: string;
    tinNo?: string;
    ownerName: string;
    ownerPhoto?: string;
    ownerNidOrPassportNo?: string;
    ownerNidFrontSide?: string;
    ownerNidBackSide?: string;
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

interface CompanyDetailsModalProps {
    company: Company | null;
    isOpen: boolean;
    onClose: () => void;
    onUpdateStatus: (id: number, status: "active" | "pending" | "inactive") => void;
}

const CompanyDetailsModal: React.FC<CompanyDetailsModalProps> = ({
    company,
    isOpen,
    onClose,
    onUpdateStatus,
}) => {
    const { theme } = useTheme();
    const [isUpdating, setIsUpdating] = useState(false);
    const [showImageModal, setShowImageModal] = useState<string | null>(null);

    if (!company) return null;

    const handleStatusUpdate = async (status: "active" | "pending" | "inactive") => {
        setIsUpdating(true);
        try {
            await onUpdateStatus(company.id, status);
        } catch (error) {
            console.error("Status update failed:", error);
        } finally {
            setIsUpdating(false);
        }
    };

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
                    icon: XCircle,
                    text: "Unknown",
                    bg: "bg-gray-500/10",
                    border: "border-gray-500/20",
                    textColor: "text-gray-500",
                };
        }
    };

    const statusBadge = getStatusBadge(company.status);
    const StatusIcon = statusBadge.icon;

    const infoSections = [
        {
            title: "Company Information",
            icon: Building2,
            fields: [
                { label: "Company Name", value: company.companyName, icon: Building2 },
                { label: "Trade License No", value: company.tradeLicenseNo || "N/A", icon: FileText },
                { label: "BIN No", value: company.binNo || "N/A", icon: Hash },
                { label: "TIN No", value: company.tinNo || "N/A", icon: Banknote },
            ],
        },
        {
            title: "Owner Information",
            icon: User,
            fields: [
                { label: "Owner Name", value: company.ownerName, icon: User },
                { label: "NID/Passport No", value: company.ownerNidOrPassportNo || "N/A", icon: CreditCard },
            ],
        },
        {
            title: "Contact Information",
            icon: Mail,
            fields: [
                { label: "Email", value: company.email, icon: Mail },
                { label: "Phone", value: company.phoneNo, icon: Phone },
                { label: "Website", value: company.website || "N/A", icon: Globe },
            ],
        },
        {
            title: "Address",
            icon: MapPin,
            fields: [
                { label: "Address", value: company.address, icon: MapPinned },
                { label: "City", value: company.city, icon: MapPin },
                { label: "State", value: company.state, icon: MapPinned },
                { label: "Postal Code", value: company.postalCode || "N/A", icon: Hash },
                { label: "Country", value: company.country, icon: Globe },
            ],
        },
        {
            title: "Business Information",
            icon: Briefcase,
            fields: [
                { label: "Business Type", value: company.businessType || "N/A", icon: Briefcase },
                { label: "Year Established", value: company.yearOfEstablishment || "N/A", icon: Calendar },
                { label: "Employees", value: company.numberOfEmployees || "N/A", icon: Users },
            ],
        },
        {
            title: "Bank Information",
            icon: Landmark,
            fields: [
                { label: "Bank Name", value: company.bankName || "N/A", icon: Landmark },
                { label: "Account No", value: company.bankAccountNo || "N/A", icon: CreditCard },
                { label: "Branch", value: company.bankBranch || "N/A", icon: Building2 },
            ],
        },
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="fixed inset-4 md:inset-10 z-50 overflow-auto rounded-2xl bg-white shadow-2xl"
                    >
                        <div className="sticky top-0 z-10 flex justify-between items-center p-4 border-b bg-white">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
                                    <Building2 className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">{company.companyName}</h2>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span
                                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${statusBadge.bg} ${statusBadge.border} ${statusBadge.textColor}`}
                                        >
                                            <StatusIcon size={12} />
                                            {statusBadge.text}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                <X size={20} className="text-gray-600" />
                            </button>
                        </div>

                        <div className="p-6">
                            {/* Owner Photo Section */}
                            {company.ownerPhoto && (
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-900">
                                        <User size={18} />
                                        Owner Photo
                                    </h3>
                                    <div
                                        className="relative w-32 h-32 rounded-full overflow-hidden cursor-pointer mx-auto md:mx-0 border-4 border-blue-500/20"
                                        onClick={() => setShowImageModal(company.ownerPhoto!)}
                                    >
                                        <Image
                                            src={company.ownerPhoto}
                                            alt={company.ownerName}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Information Sections */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {infoSections.map((section) => (
                                    <div
                                        key={section.title}
                                        className="rounded-xl p-4 bg-gray-50"
                                    >
                                        <h3 className="font-semibold mb-3 flex items-center gap-2 text-gray-900">
                                            <section.icon size={18} className="text-blue-500" />
                                            {section.title}
                                        </h3>
                                        <div className="space-y-2">
                                            {section.fields.map((field) => (
                                                <div key={field.label} className="flex items-start gap-2">
                                                    <field.icon size={14} className="text-gray-400 mt-0.5" />
                                                    <div className="flex-1">
                                                        <span className="text-xs text-gray-500">{field.label}:</span>
                                                        <p className="text-sm text-gray-900">{field.value}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Documents Section */}
                            {(company.ownerNidFrontSide || company.ownerNidBackSide) && (
                                <div className="mt-6">
                                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-900">
                                        <FileText size={18} />
                                        Documents
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {company.ownerNidFrontSide && (
                                            <div
                                                className="rounded-xl p-4 cursor-pointer bg-gray-50 hover:shadow-lg transition-shadow"
                                                onClick={() => setShowImageModal(company.ownerNidFrontSide!)}
                                            >
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-sm font-medium text-gray-700">NID Front Side</span>
                                                    <Eye size={16} className="text-blue-500" />
                                                </div>
                                                <div className="relative h-40 rounded-lg overflow-hidden">
                                                    <Image
                                                        src={company.ownerNidFrontSide}
                                                        alt="NID Front"
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                        {company.ownerNidBackSide && (
                                            <div
                                                className="rounded-xl p-4 cursor-pointer bg-gray-50 hover:shadow-lg transition-shadow"
                                                onClick={() => setShowImageModal(company.ownerNidBackSide!)}
                                            >
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-sm font-medium text-gray-700">NID Back Side</span>
                                                    <Eye size={16} className="text-blue-500" />
                                                </div>
                                                <div className="relative h-40 rounded-lg overflow-hidden">
                                                    <Image
                                                        src={company.ownerNidBackSide}
                                                        alt="NID Back"
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            {company.status !== "active" && (
                                <div className="mt-6 flex gap-3">
                                    <button
                                        onClick={() => handleStatusUpdate("active")}
                                        disabled={isUpdating}
                                        className="flex-1 cursor-pointer px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        <CheckCircle2 size={18} />
                                        Approve Company
                                    </button>

                                    <button
                                        onClick={() => handleStatusUpdate("inactive")}
                                        disabled={isUpdating}
                                        className="flex-1 cursor-pointer px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        <XCircle size={18} />
                                        Reject Company
                                    </button>
                                </div>
                            )}

                            {company.status === "inactive" && (
                                <div className="mt-3">
                                    <button
                                        onClick={() => handleStatusUpdate("active")}
                                        disabled={isUpdating}
                                        className="w-full cursor-pointer px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        <CheckCircle2 size={18} />
                                        Reactivate Company
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* Image Modal */}
                    {showImageModal && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-md"
                                onClick={() => setShowImageModal(null)}
                            />
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                className="fixed inset-10 z-[61] flex items-center justify-center"
                                onClick={() => setShowImageModal(null)}
                            >
                                <div className="relative max-w-4xl max-h-full w-full h-full">
                                    <img
                                        src={showImageModal}
                                        alt="Full size"
                                        className="w-full h-full object-contain"
                                    />
                                    <button
                                        onClick={() => setShowImageModal(null)}
                                        className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
                                    >
                                        <X size={24} />
                                    </button>
                                </div>
                            </motion.div>
                        </>
                    )}
                </>
            )}
        </AnimatePresence>
    );
};

export default CompanyDetailsModal;