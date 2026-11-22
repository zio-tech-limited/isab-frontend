"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Search,
  Eye,
  Download,
  Loader2,
  CheckCircle,
  Calendar,
  FolderOpen,
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
  ChevronDown,
  ChevronUp,
  Filter,
  ExternalLink,
  X,
  TrendingUp,
  HardDrive,
  User,
  IdCard,
  Users,
  Award,
  UserCheck,
} from 'lucide-react';
import { useTheme } from '@/hooks/useThemeContext';
import { toast } from 'react-hot-toast';
import { getUserInfo } from '@/utils/helper/userFromToken';
import Image from 'next/image';
import { appConfiguration } from '@/utils/constant/appConfiguration';
import Link from 'next/link';
import { AccreditationDocument, useGetAllDocumentsQuery } from '@/redux/api/documents/accreditationDocumentApi';
import { useGetAllCertificatesQuery } from '@/redux/api/documents/certificationDocumentApi';

const BACKEND_URL = appConfiguration.baseUrl;

interface GroupedDocument extends AccreditationDocument {
  studentDisplayName: string;
  studentDisplayId: string;
}

interface StudentGroup {
  studentName: string;
  studentUniqueId: string;
  documents: GroupedDocument[];
  hasCertificate: boolean;
  certificateNumber?: string;
  certificateId?: number;
}

const ApprovedDocuments: React.FC = () => {
  const { theme } = useTheme();
  const [user, setUser] = useState<any>(null);
  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDocument, setSelectedDocument] = useState<AccreditationDocument | null>(null);
  const [previewModal, setPreviewModal] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

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
    approvalStatus: 'approved',
    accreditationBodyId: user?.id,
    search: searchTerm || undefined,
  });

  // Fetch all certificates to check which students have been certified
  const { data: certificatesData } = useGetAllCertificatesQuery({
    limit: 1000, // Get all certificates
  });

  const documents = data?.data || [];
  const pagination = data?.pagination;
  const certificates = certificatesData?.data || [];

  // Create a map of student certificates for quick lookup
  const certificateMap = useMemo(() => {
    const map = new Map<string, { certificateNumber: string; id: number }>();
    certificates.forEach(cert => {
      const key = `${cert.studentName}-${cert.studentUniqueId}`;
      map.set(key, {
        certificateNumber: cert.certificateNumber,
        id: cert.id,
      });
    });
    return map;
  }, [certificates]);

  // Group documents by student
  const groupedByStudent = useMemo(() => {
    const groups: Record<string, StudentGroup> = {};

    documents.forEach(doc => {
      const key = `${doc.studentName || 'N/A'}-${doc.studentUniqueId || 'N/A'}`;
      const certificateInfo = certificateMap.get(key);

      if (!groups[key]) {
        groups[key] = {
          studentName: doc.studentName || 'N/A',
          studentUniqueId: doc.studentUniqueId || 'N/A',
          documents: [],
          hasCertificate: !!certificateInfo,
          certificateNumber: certificateInfo?.certificateNumber,
          certificateId: certificateInfo?.id,
        };
      }
      groups[key].documents.push({
        ...doc,
        studentDisplayName: doc.studentName || 'N/A',
        studentDisplayId: doc.studentUniqueId || 'N/A',
      });
    });

    return groups;
  }, [documents, certificateMap]);

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

  const totalSize = documents.reduce((acc, doc) => acc + (doc.fileSize || 0), 0);
  const totalDocuments = documents.length;
  const totalStudents = Object.keys(groupedByStudent).length;
  const totalCertified = Object.values(groupedByStudent).filter(g => g.hasCertificate).length;

  if (!mounted || isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-green-500 mx-auto mb-4" />
          <p className="text-gray-500">Loading approved documents...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-r from-green-600 to-emerald-600 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.05%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-8 md:py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
                <CheckCircle size={32} />
                Approved Documents
              </h1>
              <p className="text-green-100 mt-1">Documents that have been approved by administrators</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => refetch()}
                className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-all cursor-pointer flex items-center gap-2 text-sm"
              >
                <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
                Refresh
              </button>
              <Link href="/admin/documents/upload-new">
                <button className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl font-semibold flex items-center gap-2 hover:bg-white/30 transition-all border border-white/30 cursor-pointer">
                  <FileText size={18} />
                  Upload New
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 rounded-xl bg-green-50 border border-green-200">
            <div className="flex items-center gap-3">
              <CheckCircle className="text-green-500" size={24} />
              <div>
                <p className="text-2xl font-bold text-gray-900">{totalDocuments}</p>
                <p className="text-xs text-gray-500">Approved Documents</p>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
            <div className="flex items-center gap-3">
              <Users className="text-blue-500" size={24} />
              <div>
                <p className="text-2xl font-bold text-gray-900">{totalStudents}</p>
                <p className="text-xs text-gray-500">Students</p>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-200">
            <div className="flex items-center gap-3">
              <Award className="text-indigo-500" size={24} />
              <div>
                <p className="text-2xl font-bold text-gray-900">{totalCertified}</p>
                <p className="text-xs text-gray-500">Certified Students</p>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-white border border-gray-200">
            <div className="flex items-center gap-3">
              <HardDrive className="text-purple-500" size={24} />
              <div>
                <p className="text-2xl font-bold text-gray-900">{formatFileSize(totalSize)}</p>
                <p className="text-xs text-gray-500">Total Size</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and View Toggle */}
        <div className="rounded-2xl p-5 mb-6 bg-white border border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search by title, student name, or student ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500/50"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2.5 rounded-xl transition-all cursor-pointer ${viewMode === 'grid' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2.5 rounded-xl transition-all cursor-pointer ${viewMode === 'list' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Documents Display */}
        {Object.keys(groupedByStudent).length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 rounded-2xl bg-white border shadow-lg"
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">No Approved Documents</h3>
            <p className="mb-6 text-gray-600">
              {searchTerm ? 'No matching documents found' : 'Your approved documents will appear here'}
            </p>
            <Link href="/admin/documents/upload-new">
              <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold inline-flex items-center gap-2 hover:shadow-lg transition-all cursor-pointer">
                <FileText size={18} />
                Upload New Document
              </button>
            </Link>
          </motion.div>
        ) : viewMode === 'grid' ? (
          <div className="space-y-8">
            {Object.entries(groupedByStudent).map(([key, group]) => {
              const { studentName, studentUniqueId, documents: studentDocs, hasCertificate, certificateNumber } = group;

              return (
                <div key={key} className="space-y-4">
                  {/* Student Header */}
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50/50 rounded-xl border border-green-200/50">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="p-2 bg-green-500/20 rounded-lg">
                        <User size={20} className="text-green-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold text-gray-800">{studentName}</h3>
                          {hasCertificate && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-medium shadow-md">
                              <UserCheck size={12} />
                              Certified
                              {certificateNumber && (
                                <span className="ml-0.5 text-[10px] opacity-90">({certificateNumber})</span>
                              )}
                            </span>
                          )}
                        </div>
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
                  </div>

                  {/* Documents Grid for this student */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {studentDocs.map((doc, index) => (
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
                            <span className="text-xs px-2 py-1 rounded-full bg-green-500 text-white shadow-lg flex items-center gap-1">
                              <CheckCircle size={10} />
                              Approved
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

                          {/* Show certificate badge on individual document if certified */}
                          {hasCertificate && (
                            <div className="mt-2">
                              <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700">
                                <UserCheck size={10} className="inline mr-0.5" />
                                Certified
                              </span>
                            </div>
                          )}

                          <div className="flex items-center justify-between mt-3">
                            <span className="text-xs text-gray-400">
                              {formatDate(doc.createdAt)}
                            </span>
                            {doc.approvedAt && (
                              <span className="text-xs text-green-600">
                                Approved: {formatDate(doc.approvedAt)}
                              </span>
                            )}
                          </div>

                          <div className="flex gap-2 mt-4 pt-3 border-t border-gray-200">
                            <button
                              onClick={() => { setSelectedDocument(doc); setPreviewModal(true); }}
                              className="flex-1 py-2 rounded-lg bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 transition-all flex items-center justify-center gap-1 text-sm cursor-pointer"
                            >
                              <Eye size={14} /> View
                            </button>
                            <button
                              onClick={() => handleDownload(doc)}
                              className="flex-1 py-2 rounded-lg bg-green-500/10 text-green-600 hover:bg-green-500/20 transition-all flex items-center justify-center gap-1 text-sm cursor-pointer"
                            >
                              <Download size={14} /> Get
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
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
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600">Size</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600">Approved On</th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {documents.map((doc) => {
                    const key = `${doc.studentName || 'N/A'}-${doc.studentUniqueId || 'N/A'}`;
                    const studentGroup = groupedByStudent[key];
                    const hasCertificate = studentGroup?.hasCertificate || false;

                    return (
                      <tr key={doc.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
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
                            <User size={14} className="text-green-500" />
                            <div>
                              <p className="text-sm font-medium text-gray-800">
                                {doc.studentName || 'N/A'}
                              </p>
                              <div className="flex items-center gap-2">
                                <p className="text-xs text-gray-400">
                                  ID: {doc.studentUniqueId || 'N/A'}
                                </p>
                                {hasCertificate && (
                                  <span className="text-xs px-1.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 flex items-center gap-0.5">
                                    <UserCheck size={10} />
                                    Certified
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/10 text-green-600">
                            <CheckCircle size={12} />
                            <span className="text-xs">Approved</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">{formatFileSize(doc.fileSize)}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {doc.approvedAt ? formatDate(doc.approvedAt) : formatDate(doc.createdAt)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => { setSelectedDocument(doc); setPreviewModal(true); }}
                              className="p-2 rounded-lg text-blue-500 hover:bg-blue-500/10 transition-all cursor-pointer"
                            >
                              <Eye size={16} />
                            </button>
                            <button
                              onClick={() => handleDownload(doc)}
                              className="p-2 rounded-lg text-green-500 hover:bg-green-500/10 transition-all cursor-pointer"
                            >
                              <Download size={16} />
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
            <span className="px-4 py-2 rounded-xl bg-white border border-gray-200">
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
                    {selectedDocument.studentName && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                        <User size={10} className="inline mr-0.5" />
                        {selectedDocument.studentName} ({selectedDocument.studentUniqueId})
                      </span>
                    )}
                    <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                      <CheckCircle size={10} className="inline mr-0.5" />
                      Approved
                    </span>
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
                      className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all cursor-pointer"
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
    </div>
  );
};

export default ApprovedDocuments;


