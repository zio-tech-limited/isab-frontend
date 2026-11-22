"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FileText,
    Search,
    Trash2,
    Eye,
    Download,
    X,
    Loader2,
    Filter,
    Grid,
    List,
    Clock,
    CheckCircle,
    AlertCircle,
    HardDrive,
    TrendingUp,
    Calendar,
    FolderOpen,
    ChevronDown,
    ChevronUp,
    RefreshCw,
    ImageIcon,
    File,
    FileCode,
    FileJson,
    FileSpreadsheet,
    Presentation,
    Music,
    Video,
    Package,
    Upload,
    ExternalLink,
    MessageCircle,
    XCircle,
    User,
    IdCard,
    Users,
} from 'lucide-react';
import { useTheme } from '@/hooks/useThemeContext';
import { toast } from 'react-hot-toast';
import Image from 'next/image';
import { appConfiguration } from '@/utils/constant/appConfiguration';
import Link from 'next/link';
import { getUserInfo } from '@/utils/helper/userFromToken';
import { AccreditationDocument, useDeleteDocumentMutation, useGetAllDocumentsQuery } from '@/redux/api/documents/accreditationDocumentApi';

const BACKEND_URL = appConfiguration.baseUrl;

const AllDocuments: React.FC = () => {
    const { theme } = useTheme();
    const [user, setUser] = useState<any>(null);
    const [mounted, setMounted] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [statusFilter, setStatusFilter] = useState<string>('');
    const [categoryFilter, setCategoryFilter] = useState<string>('');
    const [currentPage, setCurrentPage] = useState(1);
    const [showFilters, setShowFilters] = useState(false);
    const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; document: AccreditationDocument | null }>({ isOpen: false, document: null });
    const [selectedDocument, setSelectedDocument] = useState<AccreditationDocument | null>(null);
    const [previewModal, setPreviewModal] = useState(false);
    const [rejectionModal, setRejectionModal] = useState<{ isOpen: boolean; document: AccreditationDocument | null }>({ isOpen: false, document: null });

    const limit = 12;

    useEffect(() => {
        const fetchUser = async () => {
            const userInfo = await getUserInfo();
            setUser(userInfo);
        };
        fetchUser();
        setMounted(true);
    }, []);

    const { data, isLoading, refetch } = useGetAllDocumentsQuery({
        page: currentPage,
        limit,
        search: searchTerm || undefined,
        approvalStatus: statusFilter || undefined,
        category: categoryFilter || undefined,
        accreditationBodyId: user?.id,
    });

    const [deleteDocument] = useDeleteDocumentMutation();

    const documents = data?.data || [];
    const pagination = data?.pagination;

    // Group documents by student
    const groupedByStudent = useMemo(() => {
        const groups: Record<string, { studentName: string; studentUniqueId: string; documents: AccreditationDocument[] }> = {};

        documents.forEach(doc => {
            const key = `${doc.studentName || 'N/A'}-${doc.studentUniqueId || 'N/A'}`;
            if (!groups[key]) {
                groups[key] = {
                    studentName: doc.studentName || 'N/A',
                    studentUniqueId: doc.studentUniqueId || 'N/A',
                    documents: []
                };
            }
            groups[key].documents.push(doc);
        });

        return groups;
    }, [documents]);

    const getStatusConfig = (status: string) => {
        switch (status) {
            case 'approved':
                return { icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-500/10', label: 'Approved' };
            case 'rejected':
                return { icon: XCircle, color: 'text-red-500', bg: 'bg-red-500/10', label: 'Rejected' };
            default:
                return { icon: Clock, color: 'text-yellow-500', bg: 'bg-yellow-500/10', label: 'Pending' };
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

    const getFileTypeColor = (mimeType: string | null, fileName: string) => {
        const extension = fileName?.split('.').pop()?.toLowerCase() || '';
        if (mimeType?.startsWith('image/')) return 'from-blue-500 to-cyan-500';
        if (mimeType === 'application/pdf') return 'from-red-500 to-rose-500';
        if (mimeType?.includes('word')) return 'from-blue-600 to-indigo-600';
        if (mimeType?.includes('excel')) return 'from-green-500 to-emerald-500';
        if (mimeType?.includes('powerpoint')) return 'from-orange-500 to-red-500';
        if (extension === 'sql') return 'from-purple-500 to-violet-500';
        if (extension === 'json') return 'from-yellow-500 to-amber-500';
        return 'from-orange-500 to-red-500';
    };

    const getFullFileUrl = (fileUrl: string) => {
        if (!fileUrl) return '';
        if (fileUrl?.startsWith('http')) return fileUrl;
        return `${BACKEND_URL}${fileUrl}`;
    };

    const formatFileSize = (bytes: number | null) => {
        if (!bytes) return 'Unknown';
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

    const handleDelete = async () => {
        if (!deleteModal.document) return;
        try {
            await deleteDocument(deleteModal.document.id).unwrap();
            toast.success('Document deleted successfully');
            setDeleteModal({ isOpen: false, document: null });
            refetch();
        } catch (error: any) {
            toast.error(error?.data?.message || 'Failed to delete document');
        }
    };

    const handleDownload = async (doc: AccreditationDocument) => {
        try {
            const fileUrl = getFullFileUrl(doc.fileUrl);
            const response = await fetch(fileUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = doc.fileName || doc.title || 'document';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            toast.success('Download started');
        } catch (error) {
            toast.error('Failed to download file');
        }
    };

    const openRejectionModal = (doc: AccreditationDocument) => {
        setRejectionModal({ isOpen: true, document: doc });
    };

    const closeRejectionModal = () => {
        setRejectionModal({ isOpen: false, document: null });
    };

    const totalSize = documents.reduce((acc: number, doc: AccreditationDocument) => acc + (doc.fileSize || 0), 0);
    const totalDocuments = documents.length;
    const totalStudents = Object.keys(groupedByStudent).length;
    const categories = [...new Set(documents.map(d => d.category).filter(Boolean))];

    if (!mounted) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Header */}
            <div className="relative bg-gradient-to-r from-orange-600 to-red-600 overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.05%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
                <div className="relative max-w-7xl mx-auto px-4 py-8 md:py-12">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
                                <FolderOpen size={32} />
                                Document Vault
                            </h1>
                            <p className="text-orange-100 mt-1">Manage and track all your accreditation documents</p>
                        </div>
                        <Link href="/admin/documents/upload-new">
                            <button className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl font-semibold flex items-center gap-2 hover:bg-white/30 transition-all border border-white/30 cursor-pointer">
                                <FileText size={18} />
                                Upload New
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Stats Banner */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="p-4 rounded-xl bg-white border border-gray-200">
                        <div className="flex items-center gap-3">
                            <FileText className="text-orange-500" size={24} />
                            <div>
                                <p className="text-2xl font-bold text-gray-900">{totalDocuments}</p>
                                <p className="text-xs text-gray-500">Documents</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 rounded-xl bg-white border border-gray-200">
                        <div className="flex items-center gap-3">
                            <Users className="text-blue-500" size={24} />
                            <div>
                                <p className="text-2xl font-bold text-gray-900">{totalStudents}</p>
                                <p className="text-xs text-gray-500">Students</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 rounded-xl bg-white border border-gray-200">
                        <div className="flex items-center gap-3">
                            <TrendingUp className="text-green-500" size={24} />
                            <div>
                                <p className="text-2xl font-bold text-gray-900">
                                    {documents.filter(d => d.approvalStatus === 'approved').length}
                                </p>
                                <p className="text-xs text-gray-500">Approved</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 rounded-xl bg-white border border-gray-200">
                        <div className="flex items-center gap-3">
                            <Clock className="text-yellow-500" size={24} />
                            <div>
                                <p className="text-2xl font-bold text-gray-900">
                                    {documents.filter(d => d.approvalStatus === 'pending').length}
                                </p>
                                <p className="text-xs text-gray-500">Pending Review</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search and Filters */}
                <div className="rounded-2xl p-5 mb-6 bg-white border border-gray-200">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search by title, description, student name, or student ID..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                            />
                        </div>
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={`px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all cursor-pointer ${showFilters ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                        >
                            <Filter size={18} />
                            Filters
                            {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2.5 rounded-xl transition-all cursor-pointer ${viewMode === 'grid' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'}`}
                            >
                                <Grid size={18} />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2.5 rounded-xl transition-all cursor-pointer ${viewMode === 'list' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'}`}
                            >
                                <List size={18} />
                            </button>
                            <button
                                onClick={() => refetch()}
                                className="p-2.5 rounded-xl transition-all cursor-pointer bg-gray-100 text-gray-600 hover:bg-gray-200"
                            >
                                <RefreshCw size={18} />
                            </button>
                        </div>
                    </div>

                    <AnimatePresence>
                        {showFilters && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="mt-4 pt-4 border-t border-gray-200"
                            >
                                <div className="flex flex-wrap gap-4">
                                    <select
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                        className="px-4 py-2 rounded-xl text-sm bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                                    >
                                        <option value="">All Status</option>
                                        <option value="pending">Pending</option>
                                        <option value="approved">Approved</option>
                                        <option value="rejected">Rejected</option>
                                    </select>
                                    <select
                                        value={categoryFilter}
                                        onChange={(e) => setCategoryFilter(e.target.value)}
                                        className="px-4 py-2 rounded-xl text-sm bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                                    >
                                        <option value="">All Categories</option>
                                        {categories.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                    {(statusFilter || categoryFilter) && (
                                        <button
                                            onClick={() => { setStatusFilter(''); setCategoryFilter(''); }}
                                            className="px-4 py-2 rounded-xl text-red-500 hover:bg-red-500/10 transition-all text-sm cursor-pointer"
                                        >
                                            Clear Filters
                                        </button>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Documents Display */}
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="rounded-2xl p-4 animate-pulse bg-gray-200">
                                <div className="h-32 rounded-lg mb-4 bg-gray-300"></div>
                                <div className="h-4 rounded bg-gray-300 mb-2"></div>
                                <div className="h-3 rounded bg-gray-300 w-2/3 mb-2"></div>
                                <div className="h-3 rounded bg-gray-300 w-1/2"></div>
                            </div>
                        ))}
                    </div>
                ) : documents.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-20 rounded-2xl bg-white border shadow-lg"
                    >
                        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 flex items-center justify-center">
                            <FolderOpen className="w-12 h-12 text-orange-500" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-gray-900">No Documents Found</h3>
                        <p className="mb-6 text-gray-600">
                            {searchTerm || statusFilter || categoryFilter ? 'Try adjusting your filters' : 'Upload your first document to get started'}
                        </p>
                        <Link href="/admin/documents/upload-new">
                            <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-semibold inline-flex items-center gap-2 hover:shadow-lg transition-all cursor-pointer">
                                <Upload size={18} />
                                Upload Document
                            </button>
                        </Link>
                    </motion.div>
                ) : viewMode === 'grid' ? (
                    <div className="space-y-8">
                        {Object.entries(groupedByStudent).map(([key, group]) => {
                            const { studentName, studentUniqueId, documents: studentDocs } = group;

                            return (
                                <div key={key} className="space-y-4">
                                    {/* Student Header */}
                                    <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50/50 rounded-xl border border-blue-200/50">
                                        <div className="p-2 bg-blue-500/20 rounded-lg">
                                            <User size={20} className="text-blue-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-800">{studentName}</h3>
                                            <div className="flex items-center gap-2">
                                                <IdCard size={14} className="text-gray-400" />
                                                <p className="text-xs text-gray-500">ID: {studentUniqueId}</p>
                                            </div>
                                        </div>
                                        <div className="ml-auto flex items-center gap-2">
                                            <span className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-600">
                                                {studentDocs.length} Document{studentDocs.length > 1 ? 's' : ''}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Documents Grid for this student */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                        {studentDocs.map((doc, index) => {
                                            const StatusIcon = getStatusConfig(doc.approvalStatus).icon;
                                            const statusConfig = getStatusConfig(doc.approvalStatus);
                                            const isRejected = doc.approvalStatus === 'rejected';
                                            const hasRejectionReason = isRejected && doc.rejectionReason;

                                            return (
                                                <motion.div
                                                    key={doc.id}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: index * 0.05 }}
                                                    whileHover={{ y: -4 }}
                                                    className="group relative rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-lg transition-all duration-300 hover:shadow-xl"
                                                >
                                                    <div className="relative p-5">
                                                        <div className="absolute top-2 right-2 z-10 flex gap-1">
                                                            <span className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${getFileTypeColor(doc.mimeType, doc.fileName)} text-white shadow-lg`}>
                                                                {doc.category || 'Document'}
                                                            </span>
                                                        </div>

                                                        <div
                                                            className="relative h-32 mb-4 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center cursor-pointer"
                                                            onClick={() => { setSelectedDocument(doc); setPreviewModal(true); }}
                                                        >
                                                            {doc.mimeType?.startsWith('image/') && doc.fileUrl ? (
                                                                <Image
                                                                    src={getFullFileUrl(doc.fileUrl)}
                                                                    alt={doc.title}
                                                                    fill
                                                                    className="object-cover rounded-xl"
                                                                />
                                                            ) : (
                                                                <div className="text-center">
                                                                    {getFileIcon(doc.mimeType, doc.fileName, 'lg')}
                                                                    <p className="text-xs mt-2 text-gray-500">{doc.fileName?.split('.').pop()?.toUpperCase() || 'FILE'}</p>
                                                                </div>
                                                            )}
                                                        </div>

                                                        <h3 className="font-semibold truncate text-gray-900">
                                                            {doc.title}
                                                        </h3>
                                                        <p className="text-xs truncate mt-1 text-gray-500">
                                                            {doc.fileName} • {formatFileSize(doc.fileSize)}
                                                        </p>
                                                        {doc.description && (
                                                            <p className="text-xs text-gray-400 mt-2 line-clamp-2">
                                                                {doc.description}
                                                            </p>
                                                        )}

                                                        <div className="flex items-center justify-between mt-3">
                                                            <div className="flex items-center gap-2">
                                                                <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${statusConfig.bg}`}>
                                                                    <StatusIcon size={12} className={statusConfig.color} />
                                                                    <span className={`text-xs ${statusConfig.color}`}>{statusConfig.label}</span>
                                                                </div>
                                                                {hasRejectionReason && (
                                                                    <button
                                                                        onClick={() => openRejectionModal(doc)}
                                                                        className="p-1 rounded-full text-red-500 hover:bg-red-500/10 transition-all cursor-pointer"
                                                                        title="View rejection reason"
                                                                    >
                                                                        <MessageCircle size={14} />
                                                                    </button>
                                                                )}
                                                            </div>
                                                            <span className="text-xs text-gray-400">
                                                                {formatDate(doc.createdAt)}
                                                            </span>
                                                        </div>

                                                        <div className="flex gap-2 mt-4 pt-3 border-t border-gray-200">
                                                            <button
                                                                onClick={() => { setSelectedDocument(doc); setPreviewModal(true); }}
                                                                className="flex-1 py-2 rounded-lg bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 transition-all flex items-center justify-center gap-1 text-sm cursor-pointer"
                                                            >
                                                                <Eye size={14} /> View
                                                            </button>

                                                            <a
                                                                href={getFullFileUrl(doc.fileUrl)}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="flex-1 py-2 rounded-lg bg-green-500/10 text-green-600 hover:bg-green-500/20 transition-all flex items-center justify-center gap-1 text-sm cursor-pointer"
                                                            >
                                                                <Download size={14} /> Get

                                                            </a>

                                                            <button
                                                                onClick={() => setDeleteModal({ isOpen: true, document: doc })}
                                                                className="flex-1 py-2 rounded-lg bg-red-500/10 text-red-600 hover:bg-red-500/20 transition-all flex items-center justify-center gap-1 text-sm cursor-pointer"
                                                            >
                                                                <Trash2 size={14} /> Delete
                                                            </button>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="rounded-2xl overflow-hidden bg-white border border-gray-200">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600">File</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600">Title</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600">Student</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600">Category</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600">Status</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600">Size</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600">Date</th>
                                        <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {documents.map((doc) => {
                                        const StatusIcon = getStatusConfig(doc.approvalStatus).icon;
                                        const statusConfig = getStatusConfig(doc.approvalStatus);
                                        const isRejected = doc.approvalStatus === 'rejected';
                                        const hasRejectionReason = isRejected && doc.rejectionReason;

                                        return (
                                            <tr key={doc.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center">
                                                        {getFileIcon(doc.mimeType, doc.fileName)}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div>
                                                        <p className="font-medium text-gray-900">
                                                            {doc.title}
                                                        </p>
                                                        {doc.description && (
                                                            <p className="text-xs mt-1 text-gray-500">
                                                                {doc.description}
                                                            </p>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <User size={14} className="text-blue-500" />
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-800">
                                                                {doc.studentName || 'N/A'}
                                                            </p>
                                                            <p className="text-xs text-gray-400">
                                                                ID: {doc.studentUniqueId || 'N/A'}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-xs text-gray-600">{doc.category}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full ${statusConfig.bg}`}>
                                                            <StatusIcon size={12} className={statusConfig.color} />
                                                            <span className={`text-xs ${statusConfig.color}`}>{statusConfig.label}</span>
                                                        </div>
                                                        {hasRejectionReason && (
                                                            <button
                                                                onClick={() => openRejectionModal(doc)}
                                                                className="p-1 rounded-full text-red-500 hover:bg-red-500/10 transition-all cursor-pointer"
                                                                title="View rejection reason"
                                                            >
                                                                <MessageCircle size={14} />
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-500">{formatFileSize(doc.fileSize)}</td>
                                                <td className="px-6 py-4 text-sm text-gray-500">{formatDate(doc.createdAt)}</td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <button
                                                            onClick={() => { setSelectedDocument(doc); setPreviewModal(true); }}
                                                            className="p-2 rounded-lg text-blue-500 hover:bg-blue-500/10 transition-all cursor-pointer"
                                                        >
                                                            <Eye size={16} />
                                                        </button>

                                                        <a
                                                            href={getFullFileUrl(doc.fileUrl)}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="p-2 rounded-lg text-green-500 hover:bg-green-500/10 transition-all cursor-pointer"
                                                        >
                                                            <Download size={16} />

                                                        </a>

                                                        <button
                                                            onClick={() => setDeleteModal({ isOpen: true, document: doc })}
                                                            className="p-2 rounded-lg text-red-500 hover:bg-red-500/10 transition-all cursor-pointer"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Pagination */}
                {pagination && pagination.totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-8">
                        <button
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${currentPage === 1
                                    ? 'opacity-50 cursor-not-allowed'
                                    : 'bg-white hover:bg-gray-50 border border-gray-200'
                                }`}
                        >
                            Previous
                        </button>
                        <span className="px-4 py-2 rounded-xl bg-white border border-gray-200 text-gray-700">
                            Page {currentPage} of {pagination.totalPages}
                        </span>
                        <button
                            onClick={() => setCurrentPage(p => Math.min(pagination.totalPages, p + 1))}
                            disabled={currentPage === pagination.totalPages}
                            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${currentPage === pagination.totalPages
                                    ? 'opacity-50 cursor-not-allowed'
                                    : 'bg-white hover:bg-gray-50 border border-gray-200'
                                }`}
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>

            {/* Delete Confirmation Modal */}
            <AnimatePresence>
                {deleteModal.isOpen && deleteModal.document && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 backdrop-blur-md bg-black/50 flex items-center justify-center z-50 p-4"
                        onClick={() => setDeleteModal({ isOpen: false, document: null })}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="rounded-2xl p-8 w-full max-w-md bg-white shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="text-center">
                                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/20 flex items-center justify-center">
                                    <Trash2 className="w-10 h-10 text-red-500" />
                                </div>
                                <h3 className="text-2xl font-bold mb-3 text-gray-900">
                                    Delete Document?
                                </h3>
                                <p className="mb-6 text-gray-600">
                                    Are you sure you want to delete &quot;{deleteModal.document.title}&quot;? This action cannot be undone.
                                </p>
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => setDeleteModal({ isOpen: false, document: null })}
                                        className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-700 transition-all cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleDelete}
                                        className="flex-1 py-3 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold cursor-pointer"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Preview Modal */}
            <AnimatePresence>
                {previewModal && selectedDocument && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 backdrop-blur-md bg-black/80 flex items-center justify-center z-50 p-4"
                        onClick={() => setPreviewModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="rounded-2xl w-full max-w-4xl bg-white shadow-2xl overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                                <div>
                                    <h3 className="font-semibold text-lg text-gray-900">
                                        {selectedDocument.title}
                                    </h3>
                                    <div className="flex flex-wrap gap-2 mt-1">
                                        <span className="text-xs text-gray-500">{selectedDocument.fileName}</span>
                                        <span className="text-xs text-gray-500">• {formatFileSize(selectedDocument.fileSize)}</span>
                                        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100">{selectedDocument.category}</span>
                                        {selectedDocument.studentName && (
                                            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                                                <User size={10} className="inline mr-0.5" />
                                                {selectedDocument.studentName} ({selectedDocument.studentUniqueId})
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <button
                                    onClick={() => setPreviewModal(false)}
                                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                                >
                                    <X size={20} className="text-gray-600" />
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
                                            className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all cursor-pointer"
                                        >
                                            <Download size={16} />
                                            Download
                                        </a>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Rejection Reason Modal */}
            <AnimatePresence>
                {rejectionModal.isOpen && rejectionModal.document && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 backdrop-blur-md bg-black/50 flex items-center justify-center z-50 p-4"
                        onClick={closeRejectionModal}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="rounded-2xl p-8 w-full max-w-lg bg-white shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                                        <XCircle className="w-6 h-6 text-red-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">
                                            Rejection Reason
                                        </h3>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <User size={12} className="text-gray-400" />
                                            <p className="text-sm text-gray-500">
                                                {rejectionModal.document.studentName || 'Unknown Student'} ({rejectionModal.document.studentUniqueId || 'N/A'})
                                            </p>
                                        </div>
                                        <p className="text-xs text-gray-400">
                                            {rejectionModal.document.title}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={closeRejectionModal}
                                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer flex-shrink-0"
                                >
                                    <X size={20} className="text-gray-500" />
                                </button>
                            </div>

                            <div className="p-4 rounded-xl bg-red-50 border border-red-200">
                                <div className="flex items-start gap-3">
                                    <MessageCircle size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-red-700 mb-1">Rejection Details</p>
                                        <p className="text-sm text-gray-700 whitespace-pre-wrap">
                                            {rejectionModal.document.rejectionReason || 'No reason provided'}
                                        </p>
                                        {rejectionModal.document.rejectedAt && (
                                            <p className="text-xs text-gray-500 mt-2">
                                                Rejected on: {formatDate(rejectionModal.document.rejectedAt)}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end">
                                <button
                                    onClick={closeRejectionModal}
                                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 text-white font-medium hover:shadow-lg transition-all cursor-pointer"
                                >
                                    Got it
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AllDocuments;


