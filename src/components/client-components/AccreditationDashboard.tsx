"use client";

import { useState, useEffect } from "react";
import {
    Users,
    Clock,
    CheckCircle,
    ArrowUpRight,
    ArrowDownRight,
    Calendar,
    Activity,
    Award,
    Building2,
    FileText,
    Phone,
    Mail,
    MapPin,
    CreditCard,
    Briefcase,
    User,
    FolderOpen,
    ExternalLink,
    X,
    ZoomIn,
    Image as ImageIcon,
    TrendingUp,
    PieChart,
    Shield,
    BookOpen,
    Upload,
    Cloud,
    ChevronRight,
    Settings,
    LogOut,
    Menu,
    Search,
    Bell,
    Eye,
    Download,
    Copy,
    Check,
    Globe,
    Star,
    ThumbsUp,
    AlertCircle,
    Info,
    LayoutDashboard,
    FileCheck,
    Building,
    GraduationCap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart as RechartPieChart,
    Pie,
    Cell,
    LineChart,
    Line,
} from "recharts";
import { getUserInfo } from "@/utils/helper/userFromToken";
import { toast } from "react-hot-toast";
import { useGetSubCompanyByIdQuery } from "@/redux/api/authentication/subCompanyApi";
import Image from "next/image";
import Link from "next/link";

const AccreditationBodyDashboard = () => {
    const [timeRange, setTimeRange] = useState("monthly");
    const [user, setUser] = useState(null);
    const [mounted, setMounted] = useState(false);
    const [modalImage, setModalImage] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [copiedField, setCopiedField] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("overview");
    const [notifications, setNotifications] = useState([
        { id: 1, title: "New application received", message: "International University has submitted an application.", read: false, time: "2 min ago" },
        { id: 2, title: "Document uploaded", message: "Cambridge Institute uploaded accreditation documents.", read: false, time: "1 hour ago" },
        { id: 3, title: "Review completed", message: "Oxford Academy's initial review is complete.", read: true, time: "yesterday" },
    ]);
    const [showNotifications, setShowNotifications] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            const userInfo = await getUserInfo();
            setUser(userInfo);
        };
        fetchUser();
        setMounted(true);
    }, []);

    const { data: subCompanyData, isLoading: isSubCompanyLoading } = useGetSubCompanyByIdQuery(
        user?.id || "",
        { skip: !user?.id }
    );

    const company = subCompanyData?.data;

    const openModal = (imageUrl, title) => {
        setModalImage({ url: imageUrl, title });
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setModalImage(null);
    };

    const copyToClipboard = (text, field) => {
        navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 2000);
        toast.success("Copied to clipboard!");
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    const markAsRead = (id) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    if (!mounted) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-white">
                <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <>
            <div className="min-h-screen bg-white">
                <div>
                    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                        {/* Welcome Section with Notification Icon */}
                        <div className="flex justify-between items-center mb-8">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                                    Welcome back, {company?.ownerName || "Admin"}!
                                </h1>
                                <p className="text-gray-500 mt-1">
                                    Here&apos;s what&apos;s happening with your accreditation activities today.
                                </p>
                            </motion.div>

                            {/* Notification Bell */}
                            <div className="relative">
                                <button
                                    onClick={() => setShowNotifications(!showNotifications)}
                                    className="relative cursor-pointer p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
                                >
                                    <Bell className="h-5 w-5 sm:h-6 sm:w-6" />
                                    {unreadCount > 0 && (
                                        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                                            {unreadCount > 9 ? '9+' : unreadCount}
                                        </span>
                                    )}
                                </button>

                                {/* Notifications Dropdown */}
                                <AnimatePresence>
                                    {showNotifications && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-lg border border-gray-200 z-50 overflow-hidden"
                                        >
                                            <div className="p-3 border-b border-gray-200 flex justify-between items-center">
                                                <h3 className="font-semibold text-gray-900">Notifications</h3>
                                                {unreadCount > 0 && (
                                                    <button
                                                        onClick={markAllAsRead}
                                                        className="text-xs text-blue-600 hover:underline"
                                                    >
                                                        Mark all as read
                                                    </button>
                                                )}
                                            </div>
                                            <div className="max-h-96 overflow-y-auto">
                                                {notifications.length === 0 ? (
                                                    <div className="p-4 text-center text-gray-500">
                                                        No notifications
                                                    </div>
                                                ) : (
                                                    notifications.map(notification => (
                                                        <div
                                                            key={notification.id}
                                                            onClick={() => markAsRead(notification.id)}
                                                            className={`p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${!notification.read ? 'bg-blue-50' : ''}`}
                                                        >
                                                            <div className="flex justify-between items-start">
                                                                <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                                                                <span className="text-xs text-gray-400">{notification.time}</span>
                                                            </div>
                                                            <p className="text-xs text-gray-500 mt-1">{notification.message}</p>
                                                        </div>
                                                    ))
                                                )}
                                            </div>
                                            <div className="p-2 border-t border-gray-200 text-center">
                                                <button className="text-xs text-blue-600 hover:underline">View all notifications</button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Profile Card */}
                        {isSubCompanyLoading ? (
                            <div className="bg-white rounded-xl p-8 text-center mb-8 border border-gray-200">
                                <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                            </div>
                        ) : company ? (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8"
                            >
                                {/* Profile Header */}
                                <div className="p-6 sm:p-8">
                                    <div className="flex flex-col sm:flex-row gap-6">
                                        {/* Avatar */}
                                        <div
                                            onClick={() => company.ownerPhoto && openModal(company.ownerPhoto, "Profile Photo")}
                                            className="cursor-pointer group relative"
                                        >
                                            <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-r from-blue-600 to-blue-500 flex items-center justify-center shadow-md">
                                                {company.ownerPhoto ? (
                                                    <Image
                                                        src={company.ownerPhoto}
                                                        alt={company.ownerName}
                                                        width={96}
                                                        height={96}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <User className="h-10 w-10 text-white" />
                                                )}
                                            </div>
                                            <div className="absolute bottom-0 right-0 p-1 bg-white rounded-full shadow-sm">
                                                <CameraIcon className="h-3 w-3 text-gray-500" />
                                            </div>
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1">
                                            <div className="flex flex-wrap items-start justify-between gap-4">
                                                <div>
                                                    <h2 className="text-xl font-bold text-gray-900">{company.companyName}</h2>
                                                    <div className="flex flex-wrap items-center gap-3 mt-1">
                                                        <span className="text-sm text-gray-600">{company.ownerName}</span>
                                                        <span className="px-2 py-0.5 bg-gray-100 rounded-full text-xs text-gray-600">
                                                            {company.role?.replace(/-/g, " ")}
                                                        </span>
                                                        <span className="flex items-center gap-1 px-2 py-0.5 bg-green-100 rounded-full text-xs text-green-700">
                                                            <CheckCircle className="h-3 w-3" />
                                                            {company.status}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-xs text-gray-500">Joined</p>
                                                    <p className="text-sm font-medium text-gray-900">{company.joinedDate}</p>
                                                </div>
                                            </div>

                                            {/* Quick Info Grid */}
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
                                                <InfoItem icon={Mail} label="Email" value={company.email} copyable />
                                                <InfoItem icon={Phone} label="Phone" value={company.phoneNo} copyable />
                                                <InfoItem icon={MapPin} label="Location" value={`${company.city}, ${company.country}`} copyable />
                                                <InfoItem icon={Building2} label="Business" value={company.businessType} copyable />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Complete Company Information - Always Visible */}
                                    <div className="mt-6 pt-4 border-t border-gray-200">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <DetailRow label="Trade License No" value={company.tradeLicenseNo} linkable />
                                            <DetailRow label="BIN No" value={company.binNo} linkable />
                                            <DetailRow label="TIN No" value={company.tinNo} linkable />
                                            <DetailRow label="Year Established" value={company.yearOfEstablishment} linkable />
                                            <DetailRow label="Number of Employees" value={company.numberOfEmployees} linkable />
                                            <DetailRow label="Bank Name" value={company.bankName} linkable />
                                            <DetailRow label="Bank Account No" value={company.bankAccountNo} linkable />
                                            <DetailRow label="Bank Branch" value={company.bankBranch} linkable />
                                            <DetailRow label="Website" value={company.website} linkable />
                                            <DetailRow label="Postal Code" value={company.postalCode} linkable />
                                        </div>
                                    </div>

                                    {/* Documents Section */}
                                    <div className="mt-6 pt-4 border-t border-gray-200">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-2">
                                                <FolderOpen className="h-4 w-4 text-gray-500" />
                                                <h3 className="font-medium text-gray-900">Documents</h3>
                                            </div>
                                            <Link href="/admin/company/file">
                                                <button className="text-xs cursor-pointer text-blue-600 hover:underline flex items-center gap-1">
                                                    Manage Files <ExternalLink className="h-3 w-3" />
                                                </button>
                                            </Link>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                                            <DocumentCard
                                                title="Owner Photo"
                                                url={company.ownerPhoto}
                                                icon={User}
                                                onClick={() => company.ownerPhoto && openModal(company.ownerPhoto, "Owner Photo")}
                                            />
                                            <DocumentCard
                                                title="NID Front Side"
                                                url={company.ownerNidFrontSide}
                                                icon={FileText}
                                                onClick={() => company.ownerNidFrontSide && openModal(company.ownerNidFrontSide, "NID Front Side")}
                                            />
                                            <DocumentCard
                                                title="NID Back Side"
                                                url={company.ownerNidBackSide}
                                                icon={FileText}
                                                onClick={() => company.ownerNidBackSide && openModal(company.ownerNidBackSide, "NID Back Side")}
                                            />
                                            <Link href="/admin/documents/upload-new">
                                                <div className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-200 rounded-xl hover:border-blue-400 transition-colors cursor-pointer h-full min-h-[100px]">
                                                    <Upload className="h-6 w-6 text-gray-400 mb-2" />
                                                    <p className="text-xs text-gray-500 text-center">Upload<br />Documents</p>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ) : null}
                       
                    </div>
                </div>
            </div>

            {/* Image Modal */}
            <AnimatePresence>
                {modalOpen && modalImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
                        onClick={closeModal}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="relative max-w-3xl w-full bg-white rounded-xl overflow-hidden shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={closeModal}
                                className="absolute top-3 right-3 p-1.5 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors z-10"
                            >
                                <X className="h-4 w-4" />
                            </button>
                            <div className="p-3 bg-gray-100 border-b border-gray-200">
                                <h3 className="font-medium text-gray-900">{modalImage.title}</h3>
                            </div>
                            <div className="p-4 flex items-center justify-center bg-gray-50 min-h-[300px]">
                                <img src={modalImage.url} alt={modalImage.title} className="max-w-full max-h-[60vh] object-contain rounded" />
                            </div>
                            <div className="p-3 bg-gray-50 text-right border-t border-gray-200">
                                <a href={modalImage.url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline inline-flex items-center gap-1">
                                    Open original <ExternalLink className="h-3 w-3" />
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

// Helper Components
const InfoItem = ({ icon: Icon, label, value, copyable }) => {
    const [copied, setCopied] = useState(false);
    const copy = () => {
        if (value && copyable) {
            navigator.clipboard.writeText(value);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };
    return (
        <div className="flex items-center gap-2 text-sm">
            <Icon className="h-4 w-4 text-gray-400" />
            <span className="text-gray-500 text-xs">{label}:</span>
            <span className="text-gray-700 text-sm truncate flex-1">{value || "—"}</span>
            {copyable && value && (
                <button onClick={copy} className="p-0.5 text-gray-400 hover:text-gray-600">
                    {copied ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
                </button>
            )}
        </div>
    );
};

const DetailRow = ({ label, value, linkable }) => (
    <div className="flex justify-between py-2 border-b border-gray-100">
        <span className="text-xs text-gray-500">{label}</span>
        {linkable && value ? (
            <a href={value} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline truncate max-w-[200px]">
                {value}
            </a>
        ) : (
            <span className="text-xs text-gray-700 font-medium">{value || "—"}</span>
        )}
    </div>
);

const DocumentCard = ({ title, url, icon: Icon, onClick }) => (
    <div
        onClick={onClick}
        className={`flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all cursor-pointer group ${!url ? "opacity-50 pointer-events-none" : ""}`}
    >
        <div className="relative">
            <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center mb-2 group-hover:shadow transition-shadow">
                <Icon className="h-5 w-5 text-gray-500" />
            </div>
            {url && (
                <div className="absolute -top-1 -right-1 p-0.5 bg-blue-500 rounded-full">
                    <Eye className="h-2 w-2 text-white" />
                </div>
            )}
        </div>
        <p className="text-xs font-medium text-gray-700 text-center">{title}</p>
        <p className="text-xs text-gray-400 mt-1">{url ? "Click to view" : "Not uploaded"}</p>
    </div>
);

const CameraIcon = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

export default AccreditationBodyDashboard;



