"use client";

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Search,
  Eye,
  Download,
  Loader2,
  Clock,
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
  CheckCircle,
  XCircle,
  AlertCircle,
  User,
  Building2,
  Mail,
  Phone,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Send,
  MapPin,
  Globe,
  Briefcase,
  CreditCard,
  Award,
  CheckSquare,
  XSquare,
  Hash,
  Users,
  FileCheck,
  Clock as ClockIcon,
  TrendingUp,
  BarChart3,
  Layers,
  Grid3x3,
  List,
  Wand2,
  UserCheck,
} from 'lucide-react';
import { useTheme } from '@/hooks/useThemeContext';
import { toast } from 'react-hot-toast';
import Image from 'next/image';
import { appConfiguration } from '@/utils/constant/appConfiguration';
import Link from 'next/link';
import { AccreditationDocument, useGetAllDocumentsQuery, useApproveDocumentMutation, useRejectDocumentMutation, useRequestRevisionMutation } from '@/redux/api/documents/accreditationDocumentApi';
import { getUserInfo } from '@/utils/helper/userFromToken';
import { useGetSubCompanyForSuperAdminByIdQuery } from '@/redux/api/authentication/subCompanyApi';
import { useCreateCertificateMutation, useGetAllCertificatesQuery } from '@/redux/api/documents/certificationDocumentApi';

const BACKEND_URL = appConfiguration.baseUrl;

interface SubCompanyData {
  id: number;
  companyName: string;
  tradeLicenseNo: string;
  binNo: string;
  tinNo: string;
  ownerName: string;
  ownerPhoto: string;
  ownerNidOrPassportNo: string;
  ownerNidFrontSide: string;
  ownerNidBackSide: string;
  phoneNo: string;
  email: string;
  website: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  businessType: string;
  yearOfEstablishment: number;
  numberOfEmployees: number;
  bankName: string;
  bankAccountNo: string;
  bankBranch: string;
  role: string;
  status: string;
  joinedDate: string;
}

interface AccreditationBodyInfo {
  id: number;
  companyName: string;
  ownerName: string;
  email: string;
  phoneNo: string;
  ownerPhoto?: string;
  address?: string;
  city?: string;
  country?: string;
  businessType?: string;
  tradeLicenseNo?: string;
  status?: string;
  website?: string;
}

interface GroupedDocument extends AccreditationDocument {
  studentDisplayName: string;
  studentDisplayId: string;
}

interface StudentGroup {
  studentName: string;
  studentUniqueId: string;
  documents: GroupedDocument[];
  allUploaded: boolean;
  hasCertificate: boolean;
  certificateNumber?: string;
  certificateId?: number;
}

// Helper component to fetch and display body details for a single body - Moved outside
const BodyDetailsFetcher: React.FC<{
  bodyId: number;
  onDetailsLoaded: (id: number, data: SubCompanyData) => void;
}> = ({ bodyId, onDetailsLoaded }) => {
  const { data, isLoading, error, refetch } = useGetSubCompanyForSuperAdminByIdQuery(bodyId.toString(), { skip: !bodyId });

  useEffect(() => {
    if (data?.data && !isLoading && !error) {
      onDetailsLoaded(bodyId, data.data);
    }
  }, [data, isLoading, error, bodyId, onDetailsLoaded]);

  return null;
};

const PendingDocuments: React.FC = () => {
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
  
  const { theme } = useTheme();
  const [user, setUser] = useState<any>(null);
  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<AccreditationDocument | null>(null);
  const [previewModal, setPreviewModal] = useState(false);
  const [approvalModal, setApprovalModal] = useState<{
    isOpen: boolean;
    document: AccreditationDocument | null;
    type: 'approve' | 'reject' | 'revision' | null;
    isBulkAction?: boolean;
    bodyId?: number;
    studentName?: string;
    studentUniqueId?: string;
  }>({
    isOpen: false,
    document: null,
    type: null,
  });
  const [remarks, setRemarks] = useState('');
  const [expandedBody, setExpandedBody] = useState<number | null>(null);
  const [accreditationBodies, setAccreditationBodies] = useState<AccreditationBodyInfo[]>([]);
  const [documentsByBody, setDocumentsByBody] = useState<Record<number, GroupedDocument[]>>({});
  const [bodyDetailsMap, setBodyDetailsMap] = useState<Record<number, SubCompanyData>>({});
  const [uniqueBodyIds, setUniqueBodyIds] = useState<number[]>([]);
  const [certificateModal, setCertificateModal] = useState<{
    isOpen: boolean;
    bodyId: number | null;
    companyName: string;
    studentName: string;
    studentUniqueId: string;
    documents: GroupedDocument[];
  }>({
    isOpen: false,
    bodyId: null,
    companyName: '',
    studentName: '',
    studentUniqueId: '',
    documents: [],
  });
  const [certificateNumber, setCertificateNumber] = useState('');
  const [activeStatus, setActiveStatus] = useState<'pending' | 'approved' | 'rejected'>('approved');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'date' | 'name' | 'size'>('date');
  const [statsData, setStatsData] = useState({
    pending: 0,
    approved: 0,
    rejected: 0,
    total: 0,
  });

  const limit = 50;

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await getUserInfo();
      setUser(userInfo);
    };
    fetchUser();
    setMounted(true);
  }, []);

  const [createCertificate] = useCreateCertificateMutation();

  // Fetch documents based on active status
  const { data, isLoading, refetch } = useGetAllDocumentsQuery({
    page: currentPage,
    limit,
    approvalStatus: activeStatus,
    search: searchTerm || undefined,
    category: categoryFilter || undefined,
  });

  // Fetch all certificates to check which students have been certified
  const { data: certificatesData } = useGetAllCertificatesQuery({
    limit: 1000, // Get all certificates
  });

  const [approveDocument] = useApproveDocumentMutation();
  const [rejectDocument] = useRejectDocumentMutation();
  const [requestRevision] = useRequestRevisionMutation();

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

  // Memoize grouped documents for better performance
  const groupedDocs = useMemo(() => {
    if (!documents.length) return {};

    const grouped: Record<number, GroupedDocument[]> = {};
    const bodyIds = new Set<number>();

    documents.forEach((doc: AccreditationDocument) => {
      const bodyId = doc.accreditationBodyId;
      bodyIds.add(bodyId);

      if (!grouped[bodyId]) {
        grouped[bodyId] = [];
      }

      grouped[bodyId].push({
        ...doc,
        studentDisplayName: doc.studentName || 'N/A',
        studentDisplayId: doc.studentUniqueId || 'N/A',
      });
    });

    setUniqueBodyIds(Array.from(bodyIds));
    return grouped;
  }, [documents]);

  // Update documents by body
  useEffect(() => {
    if (Object.keys(groupedDocs).length > 0) {
      setDocumentsByBody(groupedDocs);

      // Update body info
      const bodies: AccreditationBodyInfo[] = [];
      Object.keys(groupedDocs).forEach(bodyId => {
        const id = parseInt(bodyId);
        const docs = groupedDocs[id];
        if (docs && docs.length > 0) {
          bodies.push({
            id,
            companyName: bodyDetailsMap[id]?.companyName || `Organization ${id}`,
            ownerName: bodyDetailsMap[id]?.ownerName || 'Loading...',
            email: bodyDetailsMap[id]?.email || 'Loading...',
            phoneNo: bodyDetailsMap[id]?.phoneNo || 'Loading...',
            ownerPhoto: bodyDetailsMap[id]?.ownerPhoto,
            address: bodyDetailsMap[id]?.address,
            city: bodyDetailsMap[id]?.city,
            country: bodyDetailsMap[id]?.country,
            businessType: bodyDetailsMap[id]?.businessType,
            tradeLicenseNo: bodyDetailsMap[id]?.tradeLicenseNo,
            status: bodyDetailsMap[id]?.status,
            website: bodyDetailsMap[id]?.website,
          });
        }
      });
      setAccreditationBodies(bodies);
    } else {
      setDocumentsByBody({});
      setAccreditationBodies([]);
    }
  }, [groupedDocs, bodyDetailsMap]);

  // Handle body details loaded from the helper component
  const handleBodyDetailsLoaded = useCallback((bodyId: number, details: SubCompanyData) => {
    setBodyDetailsMap(prev => ({
      ...prev,
      [bodyId]: details
    }));
  }, []);

  // Memoize categories
  const categories = useMemo(() => {
    return [...new Set(documents.map(d => d.category).filter(Boolean))];
  }, [documents]);

  // Memoize total students
  const totalStudents = useMemo(() => {
    const students = new Set(documents.map(d => `${d.studentName}-${d.studentUniqueId}`));
    return students.size;
  }, [documents]);

  // Update stats
  useEffect(() => {
    if (documents.length > 0) {
      setStatsData(prev => ({
        ...prev,
        total: documents.length,
        [activeStatus]: documents.length,
      }));
    }
  }, [documents, activeStatus]);

  // Generate auto certificate number
  const generateCertificateNumber = useCallback((bodyName: string) => {
    // Get first 3 characters of body name (uppercase)
    const prefix = bodyName.substring(0, 3).toUpperCase();
    // Generate timestamp based unique number
    const timestamp = Date.now().toString().slice(-6);
    // Generate random number
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    // Combine to create unique certificate number
    return `${prefix}-${timestamp}${random}`;
  }, []);

  // Get student groups for a body with certificate info
  const getStudentGroups = useCallback((bodyDocs: GroupedDocument[]): StudentGroup[] => {
    const groups: Record<string, StudentGroup> = {};

    bodyDocs.forEach(doc => {
      const key = `${doc.studentName}-${doc.studentUniqueId}`;
      if (!groups[key]) {
        const certificateInfo = certificateMap.get(key);
        groups[key] = {
          studentName: doc.studentName || 'N/A',
          studentUniqueId: doc.studentUniqueId || 'N/A',
          documents: [],
          allUploaded: true,
          hasCertificate: !!certificateInfo,
          certificateNumber: certificateInfo?.certificateNumber,
          certificateId: certificateInfo?.id,
        };
      }
      groups[key].documents.push(doc);
    });

    // Check if all documents in each group are uploaded
    Object.values(groups).forEach(group => {
      group.allUploaded = group.documents.every(doc => doc.fileUrl);
    });

    return Object.values(groups);
  }, [certificateMap]);

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

  const handleApprove = async () => {
    if (!approvalModal.document) return;
    try {
      await approveDocument({
        id: approvalModal.document.id,
        approvalRemarks: remarks || undefined,
        approvedBy: user?.id,
        approvedByName: user?.name || 'Admin',
      }).unwrap();
      toast.success('Document approved successfully');
      setApprovalModal({ isOpen: false, document: null, type: null });
      setRemarks('');
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to approve document');
    }
  };

  const handleReject = async () => {
    if (!approvalModal.document) return;
    if (!remarks.trim()) {
      toast.error('Please provide a rejection reason');
      return;
    }
    try {
      await rejectDocument({
        id: approvalModal.document.id,
        rejectionReason: remarks,
        rejectedBy: user?.id,
        rejectedByName: user?.name || 'Admin',
      }).unwrap();
      toast.success('Document rejected');
      setApprovalModal({ isOpen: false, document: null, type: null });
      setRemarks('');
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to reject document');
    }
  };

  const handleRequestRevision = async () => {
    if (!approvalModal.document) return;
    if (!remarks.trim()) {
      toast.error('Please provide revision feedback');
      return;
    }
    try {
      await requestRevision({
        id: approvalModal.document.id,
        revisionFeedback: remarks,
        requestedBy: user?.id,
        requestedByName: user?.name || 'Admin',
      }).unwrap();
      toast.success('Revision requested');
      setApprovalModal({ isOpen: false, document: null, type: null });
      setRemarks('');
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to request revision');
    }
  };

  // Bulk approve for student
  const handleStudentBulkApprove = async (bodyId: number, studentName: string, studentUniqueId: string) => {
    const bodyDocs = documentsByBody[bodyId] || [];
    const studentDocs = bodyDocs.filter(d =>
      d.studentName === studentName && d.studentUniqueId === studentUniqueId
    );

    if (studentDocs.length === 0) {
      toast.error('No documents to approve for this student');
      return;
    }

    setApprovalModal({
      isOpen: true,
      document: null,
      type: 'approve',
      isBulkAction: true,
      bodyId: bodyId,
      studentName: studentName,
      studentUniqueId: studentUniqueId,
    });
  };

  // Bulk reject for student
  const handleStudentBulkReject = async (bodyId: number, studentName: string, studentUniqueId: string) => {
    const bodyDocs = documentsByBody[bodyId] || [];
    const studentDocs = bodyDocs.filter(d =>
      d.studentName === studentName && d.studentUniqueId === studentUniqueId
    );

    if (studentDocs.length === 0) {
      toast.error('No documents to reject for this student');
      return;
    }

    setApprovalModal({
      isOpen: true,
      document: null,
      type: 'reject',
      isBulkAction: true,
      bodyId: bodyId,
      studentName: studentName,
      studentUniqueId: studentUniqueId,
    });
  };

  // Open certificate modal for student
  const handleStudentCertificate = (bodyId: number, companyName: string, studentName: string, studentUniqueId: string) => {
    const bodyDocs = documentsByBody[bodyId] || [];
    const studentDocs = bodyDocs.filter(d =>
      d.studentName === studentName && d.studentUniqueId === studentUniqueId
    );

    if (studentDocs.length === 0) {
      toast.error('No documents found for this student');
      return;
    }

    // Check if student already has a certificate
    const key = `${studentName}-${studentUniqueId}`;
    const existingCert = certificateMap.get(key);

    if (existingCert) {
      toast.success(`Student already has certificate: ${existingCert.certificateNumber}`);
      return;
    }

    setCertificateModal({
      isOpen: true,
      bodyId: bodyId,
      companyName: companyName,
      studentName: studentName,
      studentUniqueId: studentUniqueId,
      documents: studentDocs,
    });

    // Auto-generate certificate number
    const autoNumber = generateCertificateNumber(companyName);
    setCertificateNumber(autoNumber);
  };

  // Execute bulk approve for student
  const executeStudentBulkApprove = async (bodyId: number, studentName: string, studentUniqueId: string) => {
    const bodyDocs = documentsByBody[bodyId] || [];
    const studentDocs = bodyDocs.filter(d =>
      d.studentName === studentName && d.studentUniqueId === studentUniqueId
    );

    let successCount = 0;
    let failCount = 0;

    toast.loading(`Approving ${studentDocs.length} documents for ${studentName}...`, { id: 'bulk-action' });

    for (const doc of studentDocs) {
      try {
        await approveDocument({
          id: doc.id,
          approvalRemarks: remarks || `Bulk approved by ${user?.name || 'Admin'}`,
          approvedBy: user?.id,
          approvedByName: user?.name || 'Admin',
        }).unwrap();
        successCount++;
      } catch (error) {
        failCount++;
      }
    }

    toast.dismiss('bulk-action');
    if (successCount > 0) {
      toast.success(`${successCount} document(s) approved for ${studentName}`);
    }
    if (failCount > 0) {
      toast.error(`${failCount} document(s) failed to approve`);
    }

    setApprovalModal({ isOpen: false, document: null, type: null });
    setRemarks('');
    refetch();
  };

  // Execute bulk reject for student
  const executeStudentBulkReject = async (bodyId: number, studentName: string, studentUniqueId: string) => {
    if (!remarks.trim()) {
      toast.error('Please provide a rejection reason for all documents');
      return;
    }

    const bodyDocs = documentsByBody[bodyId] || [];
    const studentDocs = bodyDocs.filter(d =>
      d.studentName === studentName && d.studentUniqueId === studentUniqueId
    );

    let successCount = 0;
    let failCount = 0;

    toast.loading(`Rejecting ${studentDocs.length} documents for ${studentName}...`, { id: 'bulk-action' });

    for (const doc of studentDocs) {
      try {
        await rejectDocument({
          id: doc.id,
          rejectionReason: remarks,
          rejectedBy: user?.id,
          rejectedByName: user?.name || 'Admin',
        }).unwrap();
        successCount++;
      } catch (error) {
        failCount++;
      }
    }

    toast.dismiss('bulk-action');
    if (successCount > 0) {
      toast.success(`${successCount} document(s) rejected for ${studentName}`);
    }
    if (failCount > 0) {
      toast.error(`${failCount} document(s) failed to reject`);
    }

    setApprovalModal({ isOpen: false, document: null, type: null });
    setRemarks('');
    refetch();
  };

  const submitCertificateNumber = async () => {
    if (!certificateNumber.trim()) {
      toast.error('Please enter a certificate number');
      return;
    }

    if (!certificateModal.bodyId) {
      toast.error('No accreditation body selected');
      return;
    }

    try {
      const payload = {
        accreditationBodyId: certificateModal.bodyId,
        studentName: certificateModal.studentName,
        studentUniqueId: certificateModal.studentUniqueId,
        certificateNumber: certificateNumber,
        documentIds: certificateModal.documents.map(d => d.id),
        sendSMS: true,
      };

      const response = await createCertificate(payload).unwrap();

      if (response.success) {
        toast.success(`Certificate "${response.data.certificateNumber}" generated successfully!`);
        console.log(response);
        if (response.data.smsSent) {
          toast.success('SMS notification sent successfully');
        }

        setCertificateModal({
          isOpen: false,
          bodyId: null,
          companyName: '',
          studentName: '',
          studentUniqueId: '',
          documents: [],
        });
        setCertificateNumber('');
        refetch(); // Refresh the documents list
      }
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to generate certificate');
    }
  };

  const openActionModal = (doc: AccreditationDocument, type: 'approve' | 'reject' | 'revision') => {
    setSelectedDocument(doc);
    setApprovalModal({ isOpen: true, document: doc, type });
    setRemarks('');
  };

  const handleStatusChange = (status: 'pending' | 'approved' | 'rejected') => {
    setActiveStatus(status);
    setCurrentPage(1);
    refetch();
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= (pagination?.totalPages || 1)) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Auto-generate certificate number with "Regenerate" feature
  const handleRegenerateCertificateNumber = () => {
    const body = accreditationBodies.find(b => b.id === certificateModal.bodyId);
    if (body) {
      const newNumber = generateCertificateNumber(body.companyName);
      setCertificateNumber(newNumber);
      toast.success('Certificate number regenerated');
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-orange-500 mx-auto mb-4" />
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  const totalDocuments = documents.length;
  const totalSize = documents.reduce((acc, d) => acc + (d.fileSize || 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Render BodyDetailsFetcher for each unique body ID - Always rendered */}
      {uniqueBodyIds.map(bodyId => (
        <BodyDetailsFetcher
          key={bodyId}
          bodyId={bodyId}
          onDetailsLoaded={handleBodyDetailsLoaded}
        />
      ))}

      {/* Hero Header - Enhanced */}
      <div className="relative bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.05%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-10 md:py-14">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl">
                  <FileText size={28} className="text-white" />
                </div>
                <h1 className="text-2xl md:text-4xl font-bold text-white tracking-tight">
                  Document Review Center
                </h1>
              </div>
              <p className="text-orange-100 mt-1 text-sm md:text-base">
                Review and manage accreditation documents with precision
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-all cursor-pointer flex items-center gap-2 text-sm"
              >
                <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
                Refresh
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-xs">Total Documents</p>
                  <p className="text-white font-bold text-xl">{totalDocuments}</p>
                </div>
                <div className="p-2 bg-white/10 rounded-lg">
                  <FileText size={18} className="text-white/70" />
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-xs">Organizations</p>
                  <p className="text-white font-bold text-xl">{accreditationBodies.length}</p>
                </div>
                <div className="p-2 bg-white/10 rounded-lg">
                  <Building2 size={18} className="text-white/70" />
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-xs">Students</p>
                  <p className="text-white font-bold text-xl">{totalStudents}</p>
                </div>
                <div className="p-2 bg-white/10 rounded-lg">
                  <Users size={18} className="text-white/70" />
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-xs">Total Size</p>
                  <p className="text-white font-bold text-xl">{formatFileSize(totalSize)}</p>
                </div>
                <div className="p-2 bg-white/10 rounded-lg">
                  <Package size={18} className="text-white/70" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Status Tabs - Enhanced */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => handleStatusChange('pending')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all duration-300 cursor-pointer ${activeStatus === 'pending'
              ? 'bg-yellow-500 text-white shadow-lg shadow-yellow-500/30 scale-105'
              : 'bg-white border border-gray-200 text-gray-600 hover:bg-yellow-50 hover:border-yellow-300'
              }`}
          >
            <ClockIcon size={18} />
            <span className="font-medium">Pending</span>
          </button>

          <button
            onClick={() => handleStatusChange('approved')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all duration-300 cursor-pointer ${activeStatus === 'approved'
              ? 'bg-green-500 text-white shadow-lg shadow-green-500/30 scale-105'
              : 'bg-white border border-gray-200 text-gray-600 hover:bg-green-50 hover:border-green-300'
              }`}
          >
            <CheckCircle size={18} />
            <span className="font-medium">Approved</span>
          </button>
          <button
            onClick={() => handleStatusChange('rejected')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all duration-300 cursor-pointer ${activeStatus === 'rejected'
              ? 'bg-red-500 text-white shadow-lg shadow-red-500/30 scale-105'
              : 'bg-white border border-gray-200 text-gray-600 hover:bg-red-50 hover:border-red-300'
              }`}
          >
            <XCircle size={18} />
            <span className="font-medium">Rejected</span>
          </button>
        </div>

        {/* Search and Filters */}
        <div className="rounded-2xl p-5 mb-6 bg-white border border-gray-200 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder={`Search documents, students, or organizations...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
              />
            </div>
            {categories.length > 0 && (
              <div className="relative min-w-[180px]">
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/50 appearance-none cursor-pointer"
                >
                  <option value="">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            )}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2.5 rounded-xl transition-all cursor-pointer ${viewMode === 'grid' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                <Grid3x3 size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2.5 rounded-xl transition-all cursor-pointer ${viewMode === 'list' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Documents - Enhanced Display */}
        {totalDocuments === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 rounded-2xl bg-white border shadow-lg"
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <FolderOpen className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">
              No {activeStatus} Documents
            </h3>
            <p className="mb-6 text-gray-600">
              {searchTerm || categoryFilter ? 'No matching documents found' : `No documents with status: ${activeStatus}`}
            </p>
            {(searchTerm || categoryFilter) && (
              <button
                onClick={() => { setSearchTerm(''); setCategoryFilter(''); }}
                className="px-6 py-2 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-all cursor-pointer"
              >
                Clear Filters
              </button>
            )}
          </motion.div>
        ) : (
          <div className="space-y-8">
            {accreditationBodies.map((body) => {
              const bodyDocs = documentsByBody[body.id] || [];
              const bodyDetails = bodyDetailsMap[body.id];
              if (bodyDocs.length === 0) return null;

              // Get student groups
              const studentGroups = getStudentGroups(bodyDocs);

              return (
                <motion.div
                  key={body.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  {/* Enhanced Body Header */}
                  <div
                    className="p-6 bg-gradient-to-r from-gray-50 to-orange-50/30 border-b border-gray-200 cursor-pointer hover:from-gray-100 hover:to-orange-50/50 transition-all"
                    onClick={() => setExpandedBody(expandedBody === body.id ? null : body.id)}
                  >
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                      {/* Avatar */}
                      <div className="flex-shrink-0">
                        {bodyDetails?.ownerPhoto ? (
                          <div className="w-16 h-16 rounded-full overflow-hidden ring-4 ring-orange-500/20 shadow-lg">
                            <Image
                              src={bodyDetails.ownerPhoto}
                              alt={body.companyName}
                              width={64}
                              height={64}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                            {body.companyName?.charAt(0) || 'O'}
                          </div>
                        )}
                      </div>

                      {/* Body Info */}
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                          <h2 className="text-xl font-bold text-gray-900">
                            {bodyDetails?.companyName || body.companyName}
                          </h2>
                          <span className="text-xs px-3 py-1 rounded-full bg-green-500/20 text-green-700 font-medium">
                            {bodyDetails?.status || 'Active'}
                          </span>
                          <span className="text-xs px-3 py-1 rounded-full bg-orange-500/20 text-orange-700 font-medium">
                            {bodyDocs.length} Document{bodyDocs.length > 1 ? 's' : ''}
                          </span>
                          <span className="text-xs px-3 py-1 rounded-full bg-blue-500/20 text-blue-700 font-medium">
                            {studentGroups.length} Student{studentGroups.length > 1 ? 's' : ''}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 mt-1.5 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <User size={12} className="text-gray-400" />
                            {bodyDetails?.ownerName || body.ownerName}
                          </span>
                          <span className="flex items-center gap-1">
                            <Mail size={12} className="text-gray-400" />
                            {body.email}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone size={12} className="text-gray-400" />
                            {body.phoneNo}
                          </span>
                          {bodyDetails?.city && (
                            <span className="flex items-center gap-1">
                              <MapPin size={12} className="text-gray-400" />
                              {bodyDetails.city}, {bodyDetails.country}
                            </span>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={(e) => { e.stopPropagation(); setExpandedBody(expandedBody === body.id ? null : body.id); }}
                        className="p-1.5 rounded-lg hover:bg-gray-200/70 transition-all cursor-pointer"
                      >
                        {expandedBody === body.id ? (
                          <ChevronUp className="w-5 h-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-500" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {expandedBody === body.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Student Groups */}
                        <div className="p-6 space-y-6">
                          {studentGroups.map((studentGroup) => {
                            const { studentName, studentUniqueId, documents: studentDocs, hasCertificate, certificateNumber: certNumber } = studentGroup;

                            return (
                              <div key={`${studentName}-${studentUniqueId}`} className="space-y-3">
                                {/* Student Header with Actions */}
                                <div className="flex flex-col md:flex-row items-start md:items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50/50 rounded-xl border border-blue-200/50">
                                  <div className="flex items-center gap-3 flex-1">
                                    <div className="p-2 bg-blue-500/20 rounded-lg">
                                      <User size={18} className="text-blue-600" />
                                    </div>
                                    <div>
                                      <h4 className="font-semibold text-gray-800">{studentName}</h4>
                                      <p className="text-xs text-gray-500">ID: {studentUniqueId}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                                        {studentDocs.length} File{studentDocs.length > 1 ? 's' : ''}
                                      </span>
                                      {/* Certificate Badge - Show if student has certificate */}
                                      {hasCertificate && (
                                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-medium shadow-md">
                                          <UserCheck size={12} />
                                          Certified
                                          {certNumber && (
                                            <span className="ml-0.5 text-[10px] opacity-90">({certNumber})</span>
                                          )}
                                        </span>
                                      )}
                                    </div>
                                  </div>

                                  {/* Student Level Actions - Only for pending status */}
                                  <div className="flex flex-wrap gap-2">
                                    {activeStatus === 'pending' && (
                                      <>
                                        <button
                                          onClick={() => handleStudentBulkApprove(body.id, studentName, studentUniqueId)}
                                          className="px-3 py-1.5 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition-all flex items-center gap-1.5 cursor-pointer text-xs font-medium shadow-md hover:shadow-lg"
                                          title={`Approve all documents for ${studentName}`}
                                        >
                                          <CheckSquare size={14} />
                                          Approve All
                                        </button>
                                        <button
                                          onClick={() => handleStudentBulkReject(body.id, studentName, studentUniqueId)}
                                          className="px-3 py-1.5 rounded-lg bg-rose-500 text-white hover:bg-rose-600 transition-all flex items-center gap-1.5 cursor-pointer text-xs font-medium shadow-md hover:shadow-lg"
                                          title={`Reject all documents for ${studentName}`}
                                        >
                                          <XSquare size={14} />
                                          Reject All
                                        </button>
                                      </>
                                    )}
                                    {activeStatus === 'approved' && !hasCertificate && (
                                      <button
                                        onClick={() => handleStudentCertificate(body.id, body.companyName, studentName, studentUniqueId)}
                                        className="px-3 py-1.5 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition-all flex items-center gap-1.5 cursor-pointer text-xs font-medium shadow-md hover:shadow-lg"
                                        title={`Generate certificate for ${studentName}`}
                                      >
                                        <Award size={14} />
                                        Certificate
                                      </button>
                                    )}
                                    {activeStatus === 'approved' && hasCertificate && (
                                      <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-100 text-green-700 text-xs font-medium">
                                        <CheckCircle size={14} />
                                        Certified ✓
                                      </span>
                                    )}
                                  </div>
                                </div>

                                {/* Documents Grid */}
                                <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-3'}>
                                  {studentDocs.map((doc) => (
                                    <motion.div
                                      key={doc.id}
                                      initial={{ opacity: 0, scale: 0.95 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      className={`group rounded-xl border transition-all duration-300 hover:shadow-lg ${viewMode === 'grid'
                                        ? 'p-4 bg-white border-gray-200 hover:border-orange-300'
                                        : 'p-3 bg-gray-50 border-gray-200 hover:border-orange-300'
                                        }`}
                                    >
                                      <div className="flex items-start gap-3">
                                        {/* File Icon */}
                                        <div
                                          className={`flex-shrink-0 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center cursor-pointer group-hover:scale-105 transition-transform ${viewMode === 'grid' ? 'w-20 h-20' : 'w-14 h-14'
                                            }`}
                                          onClick={() => { setSelectedDocument(doc); setPreviewModal(true); }}
                                        >
                                          {doc.mimeType?.startsWith('image/') && doc.fileUrl ? (
                                            <div className="relative w-full h-full rounded-xl overflow-hidden">
                                              <Image
                                                src={getFullFileUrl(doc.fileUrl)}
                                                alt={doc.title}
                                                fill
                                                className="object-cover"
                                              />
                                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <Eye size={viewMode === 'grid' ? 20 : 16} className="text-white" />
                                              </div>
                                            </div>
                                          ) : (
                                            getFileIcon(doc.mimeType, doc.fileName, viewMode === 'grid' ? 'lg' : 'sm')
                                          )}
                                        </div>

                                        {/* Document Info */}
                                        <div className="flex-1 min-w-0">
                                          <h5 className="font-medium text-gray-900 truncate text-sm">
                                            {doc.title}
                                          </h5>
                                          <div className="flex flex-wrap gap-1 mt-1">
                                            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 truncate max-w-[100px]">
                                              {doc.category}
                                            </span>
                                            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-600">
                                              {formatFileSize(doc.fileSize)}
                                            </span>
                                            {/* Show certificate badge on individual document if certified */}
                                            {hasCertificate && (
                                              <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700">
                                                <UserCheck size={10} className="inline mr-0.5" />
                                                Certified
                                              </span>
                                            )}
                                          </div>
                                          <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                                            <Clock size={10} />
                                            {formatTimeAgo(doc.createdAt)}
                                          </p>
                                          {doc.description && (
                                            <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                                              {doc.description}
                                            </p>
                                          )}
                                          {activeStatus === 'rejected' && doc.rejectionReason && (
                                            <div className="mt-2 p-2 rounded-lg bg-red-50 border border-red-200">
                                              <p className="text-xs text-red-600">
                                                <span className="font-semibold">Reason:</span> {doc.rejectionReason}
                                              </p>
                                            </div>
                                          )}
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex flex-col gap-1.5 flex-shrink-0">
                                          <div className='grid grid-cols-2 gap-2'>
                                            <button
                                              onClick={() => { setSelectedDocument(doc); setPreviewModal(true); }}
                                              className="p-1.5 rounded-lg bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 transition-all cursor-pointer"
                                              title="Preview"
                                            >
                                              <Eye size={14} />
                                            </button>

                                            <a
                                              href={getFullFileUrl(doc.fileUrl)}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="p-1.5 rounded-lg bg-green-500/10 text-green-600 hover:bg-green-500/20 transition-all cursor-pointer"
                                            >
                                              <Download size={16} />

                                            </a>
                                            {activeStatus === 'pending' && (
                                              <>
                                                <button
                                                  onClick={() => openActionModal(doc, 'approve')}
                                                  className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 transition-all cursor-pointer"
                                                  title="Approve"
                                                >
                                                  <CheckCircle size={14} />
                                                </button>
                                                <button
                                                  onClick={() => openActionModal(doc, 'reject')}
                                                  className="p-1.5 rounded-lg bg-rose-500/10 text-rose-600 hover:bg-rose-500/20 transition-all cursor-pointer"
                                                  title="Reject"
                                                >
                                                  <XCircle size={14} />
                                                </button>
                                              </>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </motion.div>
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Pagination - Fixed */}
        {pagination && pagination.totalPages > 1 && (
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${currentPage === 1
                ? 'opacity-50 cursor-not-allowed bg-gray-100'
                : 'bg-white hover:bg-gray-50 border border-gray-200 shadow-sm hover:shadow'
                }`}
            >
              Previous
            </button>

            <div className="flex gap-1">
              {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                let pageNum;
                if (pagination.totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= pagination.totalPages - 2) {
                  pageNum = pagination.totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-10 h-10 rounded-xl transition-all cursor-pointer ${currentPage === pageNum
                      ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                      : 'bg-white hover:bg-gray-50 border border-gray-200'
                      }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === pagination.totalPages}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${currentPage === pagination.totalPages
                ? 'opacity-50 cursor-not-allowed bg-gray-100'
                : 'bg-white hover:bg-gray-50 border border-gray-200 shadow-sm hover:shadow'
                }`}
            >
              Next
            </button>

            <span className="text-sm text-gray-500 ml-2">
              {pagination.total} total items
            </span>
          </div>
        )}
      </div>

      {/* Preview Modal - Enhanced */}
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

      {/* Action Modal */}
      <AnimatePresence>
        {approvalModal.isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 backdrop-blur-md bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setApprovalModal({ isOpen: false, document: null, type: null })}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="rounded-2xl p-6 w-full max-w-md bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${approvalModal.type === 'approve' ? 'bg-green-500/20' :
                  approvalModal.type === 'reject' ? 'bg-red-500/20' : 'bg-yellow-500/20'
                  }`}>
                  {approvalModal.type === 'approve' && <ThumbsUp className="w-8 h-8 text-green-500" />}
                  {approvalModal.type === 'reject' && <ThumbsDown className="w-8 h-8 text-red-500" />}
                  {approvalModal.type === 'revision' && <MessageSquare className="w-8 h-8 text-yellow-500" />}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  {approvalModal.type === 'approve' && (approvalModal.isBulkAction ?
                    `Approve All Documents for ${approvalModal.studentName || 'Student'}` :
                    'Approve Document')}
                  {approvalModal.type === 'reject' && (approvalModal.isBulkAction ?
                    `Reject All Documents for ${approvalModal.studentName || 'Student'}` :
                    'Reject Document')}
                  {approvalModal.type === 'revision' && 'Request Revision'}
                </h3>
                <p className="text-sm mb-4 text-gray-600">
                  {approvalModal.type === 'approve' && approvalModal.isBulkAction &&
                    `Are you sure you want to approve all documents for ${approvalModal.studentName} (${approvalModal.studentUniqueId})?`}
                  {approvalModal.type === 'approve' && !approvalModal.isBulkAction &&
                    `Are you sure you want to approve "${approvalModal.document?.title}"?`}
                  {approvalModal.type === 'reject' && approvalModal.isBulkAction &&
                    `Please provide a reason for rejecting all documents for ${approvalModal.studentName} (${approvalModal.studentUniqueId})`}
                  {approvalModal.type === 'reject' && !approvalModal.isBulkAction &&
                    `Please provide a reason for rejecting "${approvalModal.document?.title}"`}
                  {approvalModal.type === 'revision' &&
                    `Please provide feedback for revision of "${approvalModal.document?.title}"`}
                </p>

                {(approvalModal.type === 'reject' || approvalModal.type === 'revision') && (
                  <div className="mb-4">
                    <textarea
                      value={remarks}
                      onChange={(e) => setRemarks(e.target.value)}
                      placeholder={approvalModal.type === 'reject' ? "Enter rejection reason..." : "Enter revision feedback..."}
                      rows={4}
                      className="w-full px-4 py-2 rounded-xl text-sm bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/50 resize-none"
                    />
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={() => setApprovalModal({ isOpen: false, document: null, type: null })}
                    className="flex-1 py-2 rounded-xl bg-gray-100 text-gray-700 transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (approvalModal.type === 'approve') {
                        if (approvalModal.isBulkAction && approvalModal.bodyId && approvalModal.studentName && approvalModal.studentUniqueId) {
                          executeStudentBulkApprove(approvalModal.bodyId, approvalModal.studentName, approvalModal.studentUniqueId);
                        } else {
                          handleApprove();
                        }
                      } else if (approvalModal.type === 'reject') {
                        if (approvalModal.isBulkAction && approvalModal.bodyId && approvalModal.studentName && approvalModal.studentUniqueId) {
                          executeStudentBulkReject(approvalModal.bodyId, approvalModal.studentName, approvalModal.studentUniqueId);
                        } else {
                          handleReject();
                        }
                      } else {
                        handleRequestRevision();
                      }
                    }}
                    className={`flex-1 py-2 rounded-xl text-white font-semibold cursor-pointer ${approvalModal.type === 'approve' ? 'bg-green-500 hover:bg-green-600' :
                      approvalModal.type === 'reject' ? 'bg-red-500 hover:bg-red-600' : 'bg-yellow-500 hover:bg-yellow-600'
                      } transition-all`}
                  >
                    {approvalModal.type === 'approve' ? 'Approve' : approvalModal.type === 'reject' ? 'Reject' : 'Send Revision'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Certificate Number Modal */}
      <AnimatePresence>
        {certificateModal.isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 backdrop-blur-md bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setCertificateModal({ isOpen: false, bodyId: null, companyName: '', studentName: '', studentUniqueId: '', documents: [] })}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="rounded-2xl p-6 w-full max-w-md bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-indigo-500/20 flex items-center justify-center">
                  <Award className="w-8 h-8 text-indigo-500" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  Generate Certificate Number
                </h3>
                <p className="text-sm mb-1 text-gray-600">
                  For <strong>{certificateModal.studentName || certificateModal.companyName}</strong>
                </p>
                {certificateModal.studentUniqueId && (
                  <p className="text-xs text-gray-500 mb-4">
                    Student ID: {certificateModal.studentUniqueId}
                  </p>
                )}
                {certificateModal.documents.length > 0 && (
                  <p className="text-xs text-gray-500 mb-4">
                    {certificateModal.documents.length} document{certificateModal.documents.length > 1 ? 's' : ''} will be certified
                  </p>
                )}

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                    Certificate Number
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={certificateNumber}
                      onChange={(e) => setCertificateNumber(e.target.value)}
                      placeholder="e.g., FIT-000674375"
                      className="flex-1 px-4 py-2 rounded-xl text-sm bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                    />
                    <button
                      onClick={handleRegenerateCertificateNumber}
                      className="px-3 py-2 rounded-xl bg-orange-500 text-white hover:bg-orange-600 transition-all cursor-pointer flex items-center gap-1.5 text-sm"
                      title="Auto-generate certificate number"
                    >
                      <Wand2 size={16} />
                      Auto
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mt-1 text-left">
                    Auto-generated format: {certificateNumber || 'ORG-123456789'}
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setCertificateModal({ isOpen: false, bodyId: null, companyName: '', studentName: '', studentUniqueId: '', documents: [] })}
                    className="flex-1 py-2 rounded-xl bg-gray-100 text-gray-700 transition-all cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={submitCertificateNumber}
                    className="flex-1 py-2 rounded-xl bg-indigo-500 text-white hover:bg-indigo-600 transition-all cursor-pointer font-semibold"
                  >
                    Generate Certificate
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PendingDocuments;



