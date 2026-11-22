"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    Award,
    Globe,
    Phone,
    MessageCircle,
    XCircle,
    AlertCircle,
    FileQuestion,
    ZoomIn,
    CheckCircle,
    User,
    Calendar,
    Hash,
    Shield,
    BadgeCheck,
    Sparkles,
    CreditCard,
    Building2,
    MapPin,
    ClipboardList,
    Landmark,
    FileText,
} from "lucide-react";
import Image from "next/image";
import { useVerifyCertificateQuery } from "@/redux/api/documents/certificationDocumentApi";
import siteLogo from "../../../../public/The_Logo/linuxeon_logo.png";
import { useGetCertificateByNumberQuery } from "@/redux/api/sms-configurations/certificateApi";

// Helper: determines whether a certificate number belongs to the "document"
// type certificates (e.g. FIT-184997917) which have a dash at the 4th
// character position and a total length of 13 characters.
const isDocumentCertificateNumber = (certificateNumber: string) => {
    return certificateNumber.length === 13 && certificateNumber.charAt(3) === "-";
};

// Helper: safely formats a date string, falling back gracefully if the
// value is missing or not a valid date.
const formatDate = (dateStr?: string | null) => {
    if (!dateStr) return "N/A";
    const parsed = new Date(dateStr);
    if (isNaN(parsed.getTime())) return dateStr;
    return parsed.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

const CertificateVerification = () => {
    const [certificateNumber, setCertificateNumber] = useState("");
    const [searchedNumber, setSearchedNumber] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const [shouldSearch, setShouldSearch] = useState(false);
    const [showCertificate, setShowCertificate] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const [validCertificateData, setValidCertificateData] = useState<any>(null);
    const [copied, setCopied] = useState(false);

    // Tracks whether the currently searched certificate number is a
    // "document" type certificate (FIT-XXXXXXXXX) or a general certificate.
    const [isDocType, setIsDocType] = useState(true);

    // Document-type certificates use the existing certification document API.
    const {
        data: documentData,
        isLoading: isDocumentLoading,
        isFetching: isDocumentFetching,
        error: documentError,
    } = useVerifyCertificateQuery(searchedNumber, {
        skip: !shouldSearch || !searchedNumber || !isDocType,
        refetchOnMountOrArgChange: true,
    });

    console.log(isDocType);
    // General certificates use the certificate API's public verify endpoint.
    const {
        data: generalData,
        isLoading: isGeneralLoading,
        isFetching: isGeneralFetching,
        error: generalError,
    } = useGetCertificateByNumberQuery(searchedNumber, {
        skip: !shouldSearch || !searchedNumber || isDocType,
        refetchOnMountOrArgChange: true,
    });

    // Unified references to whichever API is currently active based on the
    // detected certificate number format.
    const data = isDocType ? documentData : generalData;
    const isLoading = isDocType ? isDocumentLoading : isGeneralLoading;
    const isFetching = isDocType ? isDocumentFetching : isGeneralFetching;
    const error = isDocType ? documentError : generalError;

    useEffect(() => {
        setIsVisible(true);
    }, []);

    useEffect(() => {
        if (!shouldSearch || !searchedNumber) return;
        if (isLoading || isFetching) return;

        // Check if we have data and it's successful
        if (data?.success === true) {
            let isValid = false;
            let certificateData = null;

            if (isDocType) {
                // Document type certificate (FIT-XXXXXXXXX)
                // Structure: { success: true, data: { valid: true, ... } }
                isValid = data?.data?.valid === true &&
                    data?.data?.certificateNumber === searchedNumber;
                if (isValid) {
                    certificateData = data.data;
                }
            } else {
                // General certificate
                // Structure: { success: true, data: { ... } }
                // The certificate number might be in data.certificateNumber or data.certificationNumber
                const certNum = data?.data?.certificateNumber || data?.data?.certificationNumber;
                isValid = certNum === searchedNumber;

                // Also check if the certificate is not expired (optional)
                // You can add more validation here if needed
                if (isValid && data?.data?.status !== 'expired') {
                    certificateData = data.data;
                }
            }

            if (isValid && certificateData) {
                setValidCertificateData(certificateData);
                localStorage.setItem('verifiedCertificateId', certificateData.certificateNumber || certificateData.certificationNumber);
                setShowCertificate(true);
                setHasSearched(false);
                setShouldSearch(false);
            } else {
                setValidCertificateData(null);
                setShowCertificate(false);
                setHasSearched(true);
                setShouldSearch(false);
                localStorage.removeItem('verifiedCertificateId');
            }
        } else {
            // Handle error case
            setValidCertificateData(null);
            setShowCertificate(false);
            setHasSearched(true);
            setShouldSearch(false);
            localStorage.removeItem('verifiedCertificateId');
        }
    }, [data, isLoading, isFetching, shouldSearch, searchedNumber, error, isDocType]);


    const handleSearch = useCallback(() => {
        const trimmed = certificateNumber.trim();
        console.log(trimmed, isDocumentCertificateNumber(trimmed));
        if (!trimmed) return;

        localStorage.removeItem('verifiedCertificateId');
        setValidCertificateData(null);
        setShowCertificate(false);
        setHasSearched(false);
        setShouldSearch(false);
        setSearchedNumber("");
        setIsDocType(isDocumentCertificateNumber(trimmed));

        setTimeout(() => {
            setSearchedNumber(trimmed);
            setShouldSearch(true);
        }, 0);
    }, [certificateNumber]);

    const handleReset = () => {
        localStorage.removeItem('verifiedCertificateId');
        setCertificateNumber("");
        setSearchedNumber("");
        setShouldSearch(false);
        setShowCertificate(false);
        setHasSearched(false);
        setValidCertificateData(null);
    };

    // Not Found Component
    const NotFoundMessage = () => (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="max-w-2xl mx-auto my-24 "
        >
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-red-200">
                <div className="relative">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-orange-500"></div>

                    <div className="p-6 md:p-8 text-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.2 }}
                            className="relative"
                        >
                            <div className="w-24 h-24 md:w-28 md:h-28 mx-auto relative">
                                <div className="absolute inset-0 bg-red-100 rounded-full animate-ping opacity-75"></div>
                                <div className="relative w-24 h-24 md:w-28 md:h-28 bg-gradient-to-br from-red-100 to-orange-100 rounded-full flex items-center justify-center shadow-lg">
                                    <FileQuestion className="w-12 h-12 md:w-14 md:h-14 text-red-500" />
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mt-6 mb-2">Certificate Not Found</h3>
                            <div className="w-16 h-0.5 bg-gradient-to-r from-red-500 to-orange-500 mx-auto mb-4"></div>
                            <p className="text-gray-600 mb-4 text-sm md:text-base">
                                We couldn&apos;t find any certificate with the number:
                            </p>
                            <p className="font-mono text-base md:text-lg font-bold text-red-600 bg-red-50 inline-block px-4 py-2 rounded-lg mb-6">
                                {searchedNumber}
                            </p>

                            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-6 text-left">
                                <div className="flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-semibold text-amber-800 mb-1">What can I do?</p>
                                        <ul className="text-sm text-amber-700 space-y-1">
                                            <li>• Double-check the certificate number for any typos</li>
                                            <li>• Ensure you&apos;re entering the complete certificate number</li>
                                            <li>• Contact our support team if you believe this is an error</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleReset}
                                className="mt-6 px-6 py-2.5 cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
                            >
                                Try Again
                            </button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
    );

    const notFound = hasSearched &&
        !isLoading &&
        !isFetching &&
        !showCertificate &&
        !validCertificateData &&
        !shouldSearch &&
        searchedNumber !== "";

    if (notFound) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4 relative">
                <div className="relative z-10">
                    <AnimatePresence mode="wait">
                        <NotFoundMessage />
                    </AnimatePresence>
                </div>
            </div>
        );
    }

    // Mind-Blowing Full-Screen Loading Component
    const LoadingSpinner = () => (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
        >
            <motion.div
                initial={{ scale: 1 }}
                animate={{
                    scale: [1, 1.05, 1],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900"
            >
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{
                            x: -200,
                            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                        }}
                        animate={{
                            x: (typeof window !== 'undefined' ? window.innerWidth : 1200) + 200,
                        }}
                        transition={{
                            duration: Math.random() * 20 + 15,
                            repeat: Infinity,
                            ease: "linear",
                            delay: Math.random() * 10,
                        }}
                        className="absolute"
                    >
                        <div className="w-32 h-20 bg-white/10 rounded-full blur-2xl" />
                    </motion.div>
                ))}
            </motion.div>

            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-20 right-20 w-32 h-32 bg-purple-400 rounded-full blur-3xl"
            />

            <div className="relative z-10 text-center">
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                        delay: 0.2,
                    }}
                    className="relative mb-8"
                >
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 10, -10, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-blue-500/20 rounded-full blur-xl" />
                        <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto">
                            <div className="absolute inset-0 border-8 border-white/20 rounded-full" />
                            <div className="absolute inset-0 border-4 border-white/30 rounded-full" />
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-full" />
                            <ZoomIn className="w-24 h-24 md:w-32 md:h-32 text-white drop-shadow-2xl animate-pulse" />
                        </div>
                        <motion.div
                            animate={{ rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-8 h-16 bg-gradient-to-r from-gray-600 to-gray-400 rounded-b-full"
                        />
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-4"
                >
                    <motion.h2
                        animate={{
                            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent bg-[length:200%_auto]"
                    >
                        Verifying Certificate
                    </motion.h2>

                    <motion.p
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-white/70 text-base md:text-xl"
                    >
                        Please wait while we authenticate your certificate...
                    </motion.p>

                    <div className="flex items-center justify-center gap-3 mt-6">
                        {[...Array(3)].map((_, i) => (
                            <motion.div
                                key={i}
                                animate={{
                                    y: [0, -20, 0],
                                    scale: [1, 1.5, 1],
                                }}
                                transition={{
                                    duration: 0.8,
                                    repeat: Infinity,
                                    delay: i * 0.2,
                                    ease: "easeInOut",
                                }}
                                className="w-3 h-3 bg-white rounded-full shadow-lg"
                            />
                        ))}
                    </div>

                    <motion.div
                        animate={{
                            y: [-100, 100],
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute left-0 right-0 h-32 bg-gradient-to-b from-transparent via-white/10 to-transparent pointer-events-none"
                        style={{ top: "50%" }}
                    />
                </motion.div>

                {[...Array(30)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{
                            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
                            y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 100,
                        }}
                        animate={{
                            y: -100,
                            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
                            rotate: 360,
                        }}
                        transition={{
                            duration: Math.random() * 5 + 3,
                            repeat: Infinity,
                            ease: "linear",
                            delay: Math.random() * 2,
                        }}
                        className="absolute w-1 h-1 bg-white/30 rounded-full"
                    />
                ))}
            </div>
        </motion.div>
    );

    // Professional Certificate Found Modal
    const CertificateFoundModal = () => {
        const certData = validCertificateData;

        if (!certData) return null;

        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                className="max-w-4xl mx-auto my-24"
            >
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-green-200 relative">
                    <motion.div
                        animate={{
                            background: [
                                "linear-gradient(90deg, #10b981, #34d399, #10b981)",
                                "linear-gradient(270deg, #10b981, #34d399, #10b981)",
                            ],
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="absolute top-0 left-0 right-0 h-1"
                    />

                    <div className="relative p-6 md:p-8 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-200">
                        <div className="flex flex-col md:flex-row items-center gap-4">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                className="relative flex-shrink-0"
                            >
                                <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-xl">
                                    <CheckCircle className="w-10 h-10 md:w-12 md:h-12 text-white" />
                                </div>
                                <motion.div
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        opacity: [0.5, 1, 0.5],
                                    }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="absolute inset-0 bg-green-500 rounded-full blur-xl opacity-30"
                                />
                            </motion.div>

                            <div className="flex-1 text-center md:text-left">
                                <motion.h2
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center justify-center md:justify-start gap-2"
                                >
                                    <BadgeCheck className="text-green-500" />
                                    Certificate Verified
                                </motion.h2>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-gray-600 text-sm md:text-base"
                                >
                                    This certificate is valid and authentic
                                </motion.p>
                            </div>

                            <button
                                onClick={handleReset}
                                className="px-4 py-2 cursor-pointer rounded-full bg-gray-100 hover:bg-gray-200 transition-all text-sm flex items-center gap-2"
                            >
                                <XCircle size={16} />
                                New Search
                            </button>
                        </div>
                    </div>

                    <div className="p-6 md:p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="col-span-2 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-200"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-indigo-500/20 rounded-lg">
                                            <Hash className="w-5 h-5 text-indigo-500" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Certificate Number</p>
                                            <p className="font-mono font-bold text-lg text-indigo-600">
                                                {certData.certificateNumber}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {isDocType && <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="bg-gray-50 rounded-xl p-4 border border-gray-200"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-500/20 rounded-lg">
                                        <User className="w-5 h-5 text-blue-500" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Student Name</p>
                                        <p className="font-semibold text-gray-800">{certData.studentName}</p>
                                    </div>
                                </div>
                            </motion.div>}

                            {isDocType && <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="bg-gray-50 rounded-xl p-4 border border-gray-200"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-purple-500/20 rounded-lg">
                                        <CreditCard className="w-5 h-5 text-purple-500" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Student ID</p>
                                        <p className="font-semibold text-gray-800">{certData.studentUniqueId}</p>
                                    </div>
                                </div>
                            </motion.div>}

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 }}
                                className="bg-gray-50 rounded-xl p-4 border border-gray-200"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-green-500/20 rounded-lg">
                                        <Calendar className="w-5 h-5 text-green-500" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Issue Date</p>
                                        <p className="font-semibold text-gray-800">
                                            {new Date(certData.issueDate).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                                className="bg-gray-50 rounded-xl p-4 border border-gray-200"
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg ${certData.status === 'active' ? 'bg-green-500/20' : 'bg-yellow-500/20'
                                        }`}>
                                        <Shield className={`w-5 h-5 ${certData.status === 'active' ? 'text-green-500' : 'text-yellow-500'
                                            }`} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Status</p>
                                        <p className={`font-semibold ${certData.status === 'active' ? 'text-green-600' : 'text-yellow-600'
                                            }`}>
                                            {certData.status.charAt(0).toUpperCase() + certData.status.slice(1)}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1 }}
                            className="mt-6 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl border border-green-200 text-center"
                        >
                            <div className="flex items-center justify-center gap-2">
                                <Sparkles className="w-5 h-5 text-green-500" />
                                <span className="text-green-700 font-medium">
                                    ✓ This certificate is valid and has been officially issued
                                </span>
                                <Sparkles className="w-5 h-5 text-green-500" />
                            </div>
                            {certData.expiryDate && (
                                <p className="text-xs text-gray-500 mt-2">
                                    Expires: {new Date(certData.expiryDate).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </p>
                            )}
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        );
    };


    const GeneralCertificateDetailsTable = () => {
        const certData = validCertificateData;

        if (!certData) return null;

        const rows: { label: string; value: string; icon: React.ReactNode }[] = [
            {
                label: "Name",
                value: certData.companyName || certData.name || certData.organizationName || "N/A",
                icon: <Building2 className="w-4 h-4 text-blue-500" />,
            },
            {
                label: "Address",
                value: certData.address || "N/A",
                icon: <MapPin className="w-4 h-4 text-rose-500" />,
            },
            {
                label: "Standard(S)",
                value: Array.isArray(certData.standard)
                    ? certData.standard.join(", ")
                    : certData.standard || certData.standards || "N/A",
                icon: <Shield className="w-4 h-4 text-purple-500" />,
            },
            {
                label: "Accreditation Body",
                value: certData.accreditationBody || "N/A",
                icon: <Landmark className="w-4 h-4 text-amber-500" />,
            },
            {
                label: "Certification Body",
                value: certData.certificationBody || "N/A",
                icon: <Landmark className="w-4 h-4 text-indigo-500" />,
            },
            {
                label: "Country",
                value: certData.country || "N/A",
                icon: <Globe className="w-4 h-4 text-emerald-500" />,
            },
            {
                label: "Scope",
                value: certData.scope || "N/A",
                icon: <FileText className="w-4 h-4 text-cyan-500" />,
            },
            {
                label: "Certification Number",
                value: certData.certificateNumber || certData.certificationNumber || "N/A",
                icon: <Hash className="w-4 h-4 text-indigo-500" />,
            },
            {
                label: "Issue Date",
                value: formatDate(certData.issueDate),
                icon: <Calendar className="w-4 h-4 text-green-500" />,
            },
            {
                label: "Registration Date",
                value: formatDate(certData.registrationDate),
                icon: <ClipboardList className="w-4 h-4 text-orange-500" />,
            },
            {
                label: "Expiry Date",
                value: formatDate(certData.expiryDate),
                icon: <Calendar className="w-4 h-4 text-red-500" />,
            },
        ];

        return (
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ type: "spring", damping: 20, stiffness: 300, delay: 0.15 }}
                className="max-w-4xl mx-auto mb-24"
            >
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-indigo-200">
                    <div className="relative p-5 md:p-6 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-indigo-200 flex items-center gap-3">
                        <div className="p-2 bg-indigo-500/20 rounded-lg">
                            <Award className="w-5 h-5 text-indigo-600" />
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-gray-800">
                            Certificate Details
                        </h3>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm md:text-base">
                            <tbody>
                                {rows.map((row, idx) => (
                                    <tr
                                        key={row.label}
                                        className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                                    >
                                        <td className="px-5 md:px-6 py-3 md:py-4 font-semibold text-gray-600 whitespace-nowrap align-top w-1/3">
                                            <div className="flex items-center gap-2">
                                                {row.icon}
                                                <span>{row.label}</span>
                                            </div>
                                        </td>
                                        <td className="px-5 md:px-6 py-3 md:py-4 text-gray-800 align-top">
                                            {row.value}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </motion.div>
        );
    };

    if (showCertificate && validCertificateData) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4 relative overflow-y-auto">
                <div className="relative z-10 max-w-6xl mx-auto">
                    <AnimatePresence mode="wait">
                        <CertificateFoundModal />
                    </AnimatePresence>
                    {!isDocType && (
                        <AnimatePresence mode="wait">
                            <GeneralCertificateDetailsTable />
                        </AnimatePresence>
                    )}
                </div>
            </div>
        );
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants: any = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 120,
                damping: 14,
            },
        },
    };

    const cardVariants: any = {
        hidden: { scale: 0.95, opacity: 0, y: 20 },
        visible: {
            scale: 1,
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 20,
                duration: 0.5,
            },
        },
    };

    return (
        <>
            <AnimatePresence>
                {(isLoading || isFetching) && shouldSearch && <LoadingSpinner />}
            </AnimatePresence>

            <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    {/* Gradient Orbs */}
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl"
                    />
                    <motion.div
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.2, 0.5, 0.2],
                        }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl"
                    />
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 90, 0],
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"
                    />

                    {/* Grid Pattern Overlay */}
                    <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px] pointer-events-none" />

                    {/* Floating dots */}
                    {[...Array(50)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1.5 h-1.5 bg-white/30 rounded-full"
                            initial={{
                                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
                            }}
                            animate={{
                                y: [null, -40, 40, -30, 30, 0],
                                x: [null, 30, -30, 25, -25, 0],
                                opacity: [0, 1, 0.5, 1, 0],
                            }}
                            transition={{
                                duration: Math.random() * 6 + 4,
                                repeat: Infinity,
                                delay: Math.random() * 3,
                                ease: "easeInOut",
                            }}
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                        />
                    ))}

                    {/* Decorative Rings */}
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 180, 360],
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full"
                    />
                    <motion.div
                        animate={{
                            scale: [1, 1.15, 1],
                            rotate: [360, 180, 0],
                        }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full"
                    />
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"}
                    className="relative z-10 w-full max-w-4xl"
                >
                    <motion.div variants={itemVariants} className="text-center mb-8 max-w-3xl mx-auto">
                        <motion.div
                            animate={{
                                scale: [1, 1.02, 1],
                            }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/10"
                        >
                            <Sparkles className="w-4 h-4 text-yellow-400" />
                            <span className="text-white/80 text-sm font-medium">Secure Verification</span>
                            <Sparkles className="w-4 h-4 text-yellow-400" />
                        </motion.div>

                        <motion.h1
                            animate={{
                                color: ["#ffffff", "#fbbf24", "#fcd34d", "#fde68a", "#ffffff"]
                            }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg"
                        >
                            Certificate Verification
                        </motion.h1>
                        <motion.p
                            animate={{
                                color: [
                                    "rgba(255,255,255,0.9)",
                                    "rgba(251,191,36,0.9)",
                                    "rgba(252,211,77,0.9)",
                                    "rgba(253,230,138,0.9)",
                                    "rgba(255,255,255,0.9)"
                                ]
                            }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                            className="text-base md:text-lg max-w-2xl mx-auto text-white/80"
                        >
                            Verify the authenticity of certificates issued by our organization
                        </motion.p>
                    </motion.div>

                    <motion.div variants={cardVariants} className="max-w-2xl mx-auto">
                        <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-6 md:p-8 border border-white/20">
                            {/* Logo Section */}
                            <div className="flex items-center justify-center gap-3 mb-6">
                                <div className="relative">
                                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full flex items-center justify-center shadow-lg border border-white/20">
                                        <Award className="w-8 h-8 md:w-10 md:h-10 text-yellow-400" />
                                    </div>
                                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-[10px] md:text-xs px-3 py-0.5 rounded-full whitespace-nowrap shadow-lg">
                                        CERTIFICATE
                                    </div>
                                </div>
                                <Image
                                    src={siteLogo}
                                    alt="Logo"
                                    width={160}
                                    height={60}
                                    className="w-28 md:w-36 h-auto object-contain brightness-0 invert"
                                />
                            </div>

                            <div className="flex items-center justify-center gap-2 mb-6">
                                <div className="w-8 h-0.5 bg-gradient-to-r from-yellow-400 to-purple-400"></div>
                                <div className="flex items-center gap-1">
                                    <Globe className="w-4 h-4 text-white/60" />
                                    <p className="text-center text-white/80 font-medium text-sm md:text-base">
                                        Enter Certificate Number to Verify
                                    </p>
                                </div>
                                <div className="w-8 h-0.5 bg-gradient-to-r from-purple-400 to-yellow-400"></div>
                            </div>

                            {/* Input Field */}
                            <div className="relative mb-5">
                                <input
                                    type="text"
                                    value={certificateNumber}
                                    onChange={(e) => setCertificateNumber(e.target.value)}
                                    placeholder="Enter Certificate Number (e.g., FIT-445102436)"
                                    className="w-full px-5 py-3 rounded-full text-center bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-sm text-white placeholder-white/50 outline-none border border-white/20 focus:border-white/40 focus:ring-2 focus:ring-purple-400/50 transition-all shadow-lg text-sm md:text-base"
                                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                                />

                                {/* Animated gradient overlay on input */}
                                <motion.div
                                    animate={{
                                        opacity: [0, 0.5, 0],
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                    className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 pointer-events-none"
                                />
                            </div>

                            <div className="flex justify-center gap-3">
                                <motion.button
                                    type="button"
                                    onClick={handleSearch}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    disabled={isLoading || isFetching || !certificateNumber.trim()}
                                    className="px-6 md:px-8 py-2.5 cursor-pointer rounded-full flex items-center justify-center gap-2 font-semibold tracking-wider shadow-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base transition-all duration-300"
                                >
                                    <Search size={18} />
                                    {(isLoading || isFetching) ? "Searching..." : "Verify Certificate"}
                                </motion.button>
                            </div>

                            {/* Help Line Marquee */}
                            <div className="mt-6 pt-4 border-t border-white/10 overflow-hidden">
                                <div className="flex items-center gap-6 whitespace-nowrap animate-marquee">
                                    <div className="flex items-center gap-2">
                                        <Phone className="w-4 h-4 text-yellow-400" />
                                        <span className="text-sm text-white/70">Help Line: +880 9696 366 908</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MessageCircle className="w-4 h-4 text-green-400" />
                                        <span className="text-sm text-white/70">For Any Query (WhatsApp): +880 1813 366 908</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Phone className="w-4 h-4 text-yellow-400" />
                                        <span className="text-sm text-white/70">Help Line: +880 9696 366 908</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MessageCircle className="w-4 h-4 text-green-400" />
                                        <span className="text-sm text-white/70">For Any Query (WhatsApp): +880 1813 366 908</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                <style jsx>{`
                    @keyframes marquee {
                        0% { transform: translateX(0%); }
                        100% { transform: translateX(-50%); }
                    }
                    .animate-marquee {
                        animation: marquee 12s linear infinite;
                        display: inline-flex;
                        width: fit-content;
                    }
                    .animate-marquee:hover {
                        animation-play-state: paused;
                    }
                    
                    @keyframes shimmer {
                        0% { background-position: -200% center; }
                        100% { background-position: 200% center; }
                    }
                `}</style>
            </div>
        </>
    );
};

export default CertificateVerification;