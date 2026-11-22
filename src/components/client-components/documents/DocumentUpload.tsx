"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload,
  X,
  Plus,
  Trash2,
  CheckCircle,
  Loader2,
  FileText,
  ImageIcon,
  File,
  FileCode,
  FileJson,
  FileSpreadsheet,
  Presentation,
  Music,
  Video,
  Package,
  Info,
  ChevronDown,
  FolderOpen,
  Database,
  Code,
  Archive,
  Film,
  Volume2,
  User,
  IdCard,
  Award,
  Files,
} from 'lucide-react';
import { useTheme } from '@/hooks/useThemeContext';
import { toast } from 'react-hot-toast';
import Image from 'next/image';
import { appConfiguration } from '@/utils/constant/appConfiguration';
import { useGetDocumentCategoriesQuery, useUploadDocumentMutation } from '@/redux/api/documents/accreditationDocumentApi';

const BACKEND_URL = appConfiguration.baseUrl;

// Represents a single file within a student's document group
interface FileEntry {
  fileId: string;
  title: string;
  description: string;
  category: string;
  file: File | null;
  previewUrl: string | null;
  uploaded: boolean;
  uploadProgress: number;
}

// Represents a student with potentially multiple files
interface StudentDocumentGroup {
  id: string;
  studentName: string;
  studentUniqueId: string;
  certificationNumber: string;
  files: FileEntry[];
  expanded: boolean;
}

interface DocumentUploadProps {
  accreditationBodyId: number;
  studentId?: number;
  onUploadComplete?: () => void;
  maxFiles?: number;
  maxFileSize?: number; // in MB
  defaultStudentName?: string;
  defaultStudentUniqueId?: string;
  defaultCertificationNumber?: string;
}

const createEmptyFileEntry = (): FileEntry => ({
  fileId: `file-${Date.now()}-${Math.random().toString(36).slice(2)}`,
  title: '',
  description: '',
  category: '',
  file: null,
  previewUrl: null,
  uploaded: false,
  uploadProgress: 0,
});

const createEmptyStudentGroup = (
  defaultStudentName = '',
  defaultStudentUniqueId = '',
  defaultCertificationNumber = ''
): StudentDocumentGroup => ({
  id: `student-${Date.now()}-${Math.random().toString(36).slice(2)}`,
  studentName: defaultStudentName,
  studentUniqueId: defaultStudentUniqueId,
  certificationNumber: defaultCertificationNumber,
  files: [createEmptyFileEntry()],
  expanded: true,
});

const DocumentUpload: React.FC<DocumentUploadProps> = ({
  accreditationBodyId,
  studentId,
  onUploadComplete,
  maxFiles = 10,
  maxFileSize = 500,
  defaultStudentName = '',
  defaultStudentUniqueId = '',
  defaultCertificationNumber = '',
}) => {
  const { theme } = useTheme();
  const [studentGroups, setStudentGroups] = useState<StudentDocumentGroup[]>([
    createEmptyStudentGroup(defaultStudentName, defaultStudentUniqueId, defaultCertificationNumber),
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragActiveFor, setDragActiveFor] = useState<string | null>(null); // fileId

  const [uploadDocument] = useUploadDocumentMutation();
  const { data: categoriesData } = useGetDocumentCategoriesQuery();
  const categories = categoriesData?.categories || [
    'Certificate', 'Report', 'Application', 'License', 'Financial Statement',
    'Audit Report', 'Compliance Document', 'Quality Assurance', 'Accreditation Form',
    'Supporting Document', 'Other',
  ];

  // ─── Helpers ────────────────────────────────────────────────────────────────

  const totalFileCount = studentGroups.reduce((sum, g) => sum + g.files.length, 0);

  const getFileIcon = (file: File | null, size?: 'sm' | 'lg') => {
    if (!file) return <FileText className="w-8 h-8 text-gray-400" />;
    const iconSize = size === 'lg' ? 'w-12 h-12' : 'w-8 h-8';
    const extension = file.name.split('.').pop()?.toLowerCase() || '';
    const mimeType = file.type;

    if (mimeType.startsWith('image/') || ['jpg','jpeg','png','gif','webp','svg','bmp','ico','tiff'].includes(extension))
      return <ImageIcon className={`${iconSize} text-blue-500`} />;
    if (mimeType === 'application/pdf' || extension === 'pdf')
      return <FileText className={`${iconSize} text-red-500`} />;
    if (mimeType.includes('word') || ['doc','docx','dot','dotx'].includes(extension))
      return <FileText className={`${iconSize} text-blue-600`} />;
    if (mimeType.includes('excel') || ['xls','xlsx','xlsm','csv','tsv'].includes(extension))
      return <FileSpreadsheet className={`${iconSize} text-green-600`} />;
    if (mimeType.includes('powerpoint') || ['ppt','pptx','pps','ppsx'].includes(extension))
      return <Presentation className={`${iconSize} text-orange-600`} />;
    if (['sql','db','sqlite'].includes(extension))
      return <Database className={`${iconSize} text-purple-500`} />;
    if (['json','xml','yaml','yml'].includes(extension))
      return <FileJson className={`${iconSize} text-yellow-600`} />;
    if (['js','ts','jsx','tsx','py','java','c','cpp','h','html','css','scss','php','rb','go','rs'].includes(extension))
      return <Code className={`${iconSize} text-cyan-500`} />;
    if (['zip','rar','7z','tar','gz','bz2','xz','iso'].includes(extension))
      return <Archive className={`${iconSize} text-gray-500`} />;
    if (mimeType.startsWith('video/') || ['mp4','avi','mkv','mov','wmv','flv','webm','m4v','3gp'].includes(extension))
      return <Film className={`${iconSize} text-purple-500`} />;
    if (mimeType.startsWith('audio/') || ['mp3','wav','ogg','flac','aac','m4a','wma'].includes(extension))
      return <Volume2 className={`${iconSize} text-pink-500`} />;
    if (['exe','msi','app','dmg','deb','rpm'].includes(extension))
      return <Package className={`${iconSize} text-red-400`} />;
    return <File className={`${iconSize} text-gray-400`} />;
  };

  const getFilePreview = (file: File | null, previewUrl: string | null) => {
    if (!file) return null;
    if (file.type.startsWith('image/') && previewUrl) {
      return (
        <div className="relative w-16 h-16 rounded-xl overflow-hidden shadow-md flex-shrink-0">
          <Image src={previewUrl} alt="Preview" fill className="object-cover" />
        </div>
      );
    }
    if (file.type.startsWith('video/')) {
      return (
        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center shadow-md flex-shrink-0">
          <Film className="w-8 h-8 text-purple-500" />
        </div>
      );
    }
    if (file.type.startsWith('audio/')) {
      return (
        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-pink-500/20 to-rose-500/20 flex items-center justify-center shadow-md flex-shrink-0">
          <Volume2 className="w-8 h-8 text-pink-500" />
        </div>
      );
    }
    return (
      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center shadow-md flex-shrink-0">
        {getFileIcon(file)}
      </div>
    );
  };

  const getFileTypeLabel = (file: File) => {
    const extension = file.name.split('.').pop()?.toUpperCase() || '';
    const mimeType = file.type;
    if (mimeType.startsWith('image/')) return 'IMAGE';
    if (mimeType === 'application/pdf') return 'PDF';
    if (mimeType.includes('word')) return 'DOCUMENT';
    if (mimeType.includes('excel')) return 'SPREADSHEET';
    if (mimeType.includes('powerpoint')) return 'PRESENTATION';
    if (mimeType.startsWith('video/')) return 'VIDEO';
    if (mimeType.startsWith('audio/')) return 'AUDIO';
    if (extension === 'SQL') return 'DATABASE';
    if (extension === 'JSON') return 'DATA';
    if (['ZIP','RAR','7Z','TAR','GZ'].includes(extension)) return 'ARCHIVE';
    if (['JS','TS','PY','JAVA','HTML','CSS'].includes(extension)) return 'CODE';
    return extension || 'FILE';
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Certificate: 'from-purple-500 to-pink-500',
      Report: 'from-blue-500 to-cyan-500',
      Application: 'from-green-500 to-emerald-500',
      License: 'from-orange-500 to-red-500',
      'Financial Statement': 'from-yellow-500 to-amber-500',
      'Audit Report': 'from-indigo-500 to-purple-500',
      'Compliance Document': 'from-teal-500 to-green-500',
      'Quality Assurance': 'from-cyan-500 to-blue-500',
      'Accreditation Form': 'from-rose-500 to-pink-500',
      'Supporting Document': 'from-slate-500 to-gray-500',
      Other: 'from-gray-500 to-slate-500',
    };
    return colors[category] || 'from-orange-500 to-red-500';
  };

  const validateFile = (file: File): boolean => {
    if (file.size > maxFileSize * 1024 * 1024) {
      toast.error(`File "${file.name}" exceeds ${maxFileSize}MB limit`);
      return false;
    }
    return true;
  };

  // ─── Student group operations ────────────────────────────────────────────────

  const addStudentGroup = () => {
    if (totalFileCount >= maxFiles) {
      toast.error(`Maximum ${maxFiles} files allowed across all students`);
      return;
    }
    setStudentGroups(prev => [...prev, createEmptyStudentGroup()]);
  };

  const removeStudentGroup = (groupId: string) => {
    if (studentGroups.length === 1) {
      toast.error('At least one student is required');
      return;
    }
    setStudentGroups(prev => {
      const group = prev.find(g => g.id === groupId);
      group?.files.forEach(f => { if (f.previewUrl) URL.revokeObjectURL(f.previewUrl); });
      return prev.filter(g => g.id !== groupId);
    });
  };

  const toggleGroupExpanded = (groupId: string) => {
    setStudentGroups(prev =>
      prev.map(g => g.id === groupId ? { ...g, expanded: !g.expanded } : g)
    );
  };

  const updateGroupField = (groupId: string, field: keyof Pick<StudentDocumentGroup, 'studentName' | 'studentUniqueId' | 'certificationNumber'>, value: string) => {
    setStudentGroups(prev =>
      prev.map(g => g.id === groupId ? { ...g, [field]: value } : g)
    );
  };

  // ─── File entry operations ────────────────────────────────────────────────────

  const addFileEntry = (groupId: string) => {
    if (totalFileCount >= maxFiles) {
      toast.error(`Maximum ${maxFiles} files allowed`);
      return;
    }
    setStudentGroups(prev =>
      prev.map(g => g.id === groupId
        ? { ...g, files: [...g.files, createEmptyFileEntry()] }
        : g
      )
    );
  };

  const removeFileEntry = (groupId: string, fileId: string) => {
    setStudentGroups(prev =>
      prev.map(g => {
        if (g.id !== groupId) return g;
        if (g.files.length === 1) {
          toast.error('At least one file per student is required');
          return g;
        }
        const entry = g.files.find(f => f.fileId === fileId);
        if (entry?.previewUrl) URL.revokeObjectURL(entry.previewUrl);
        return { ...g, files: g.files.filter(f => f.fileId !== fileId) };
      })
    );
  };

  const updateFileField = (groupId: string, fileId: string, field: keyof FileEntry, value: any) => {
    setStudentGroups(prev =>
      prev.map(g => g.id !== groupId ? g : {
        ...g,
        files: g.files.map(f => f.fileId === fileId ? { ...f, [field]: value } : f),
      })
    );
  };

  const handleFileSelect = (groupId: string, fileId: string, file: File) => {
    if (!validateFile(file)) return;
    setStudentGroups(prev =>
      prev.map(g => g.id !== groupId ? g : {
        ...g,
        files: g.files.map(f => {
          if (f.fileId !== fileId) return f;
          if (f.previewUrl) URL.revokeObjectURL(f.previewUrl);
          const previewUrl = file.type.startsWith('image/') ? URL.createObjectURL(file) : null;
          return { ...f, file, previewUrl, uploaded: false, uploadProgress: 0 };
        }),
      })
    );
  };

  // Multi-file drop/select: first slot filled by replacement, rest appended
  const handleMultiFileSelect = (groupId: string, fileId: string, files: File[]) => {
    const valid = files.filter(validateFile);
    if (valid.length === 0) return;

    const slotsNeeded = valid.length;
    const remaining = maxFiles - totalFileCount;

    setStudentGroups(prev => {
      const group = prev.find(g => g.id === groupId);
      if (!group) return prev;

      // Replace the current file slot with the first valid file
      const firstFile = valid[0];
      const firstPreview = firstFile.type.startsWith('image/') ? URL.createObjectURL(firstFile) : null;

      // Additional files become new entries (up to limit)
      const additionalFiles = valid.slice(1).slice(0, remaining - 1);
      const additionalEntries: FileEntry[] = additionalFiles.map(af => {
        const preview = af.type.startsWith('image/') ? URL.createObjectURL(af) : null;
        return {
          fileId: `file-${Date.now()}-${Math.random().toString(36).slice(2)}`,
          title: '',
          description: '',
          category: '',
          file: af,
          previewUrl: preview,
          uploaded: false,
          uploadProgress: 0,
        };
      });

      if (valid.length > remaining) {
        toast(`Only ${remaining} more file(s) can be added (limit reached)`, { icon: '⚠️' });
      }

      return prev.map(g => g.id !== groupId ? g : {
        ...g,
        files: g.files.map(f => {
          if (f.fileId !== fileId) return f;
          if (f.previewUrl) URL.revokeObjectURL(f.previewUrl);
          return { ...f, file: firstFile, previewUrl: firstPreview, uploaded: false, uploadProgress: 0 };
        }).concat(additionalEntries),
      });
    });
  };

  const handleDrop = (e: React.DragEvent, groupId: string, fileId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActiveFor(null);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 1) {
      handleMultiFileSelect(groupId, fileId, files);
    } else if (files.length === 1) {
      handleFileSelect(groupId, fileId, files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, groupId: string, fileId: string) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 1) {
      handleMultiFileSelect(groupId, fileId, files);
    } else if (files.length === 1) {
      handleFileSelect(groupId, fileId, files[0]);
    }
    // Reset input so same files can be re-selected
    e.target.value = '';
  };

  // ─── Upload ──────────────────────────────────────────────────────────────────

  const uploadSingleEntry = async (group: StudentDocumentGroup, entry: FileEntry): Promise<boolean> => {
    if (!entry.file) throw new Error('No file selected');
    if (!entry.title.trim()) throw new Error('Document title is required');
    if (!entry.category) throw new Error('Category is required');
    if (!group.studentName.trim()) throw new Error('Student name is required');
    if (!group.studentUniqueId.trim()) throw new Error('Student unique ID is required');

    const formData = new FormData();
    formData.append('document', entry.file);
    formData.append('accreditationBodyId', accreditationBodyId.toString());
    if (studentId) formData.append('studentId', studentId.toString());
    formData.append('studentName', group.studentName);
    formData.append('studentUniqueId', group.studentUniqueId);
    formData.append('certificationNumber', group.certificationNumber);
    formData.append('title', entry.title);
    if (entry.description) formData.append('description', entry.description);
    if (entry.category) formData.append('category', entry.category);

    const progressInterval = setInterval(() => {
      setStudentGroups(prev =>
        prev.map(g => g.id !== group.id ? g : {
          ...g,
          files: g.files.map(f =>
            f.fileId === entry.fileId
              ? { ...f, uploadProgress: Math.min(f.uploadProgress + 10, 90) }
              : f
          ),
        })
      );
    }, 200);

    try {
      await uploadDocument(formData).unwrap();
      clearInterval(progressInterval);
      setStudentGroups(prev =>
        prev.map(g => g.id !== group.id ? g : {
          ...g,
          files: g.files.map(f =>
            f.fileId === entry.fileId ? { ...f, uploaded: true, uploadProgress: 100 } : f
          ),
        })
      );
      return true;
    } catch (error: any) {
      clearInterval(progressInterval);
      throw new Error(error?.data?.message || 'Failed to upload document');
    }
  };

  const handleUploadAll = async () => {
    for (const group of studentGroups) {
      if (!group.studentName.trim()) {
        toast.error('Student name is required for all students');
        return;
      }
      if (!group.studentUniqueId.trim()) {
        toast.error('Student unique ID is required for all students');
        return;
      }
      for (const entry of group.files) {
        if (!entry.title.trim()) {
          toast.error(`Please enter title for all documents (student: ${group.studentName || 'unnamed'})`);
          return;
        }
        if (!entry.category) {
          toast.error(`Please select category for "${entry.title || 'a document'}" (student: ${group.studentName || 'unnamed'})`);
          return;
        }
        if (!entry.file) {
          toast.error(`Please select a file for "${entry.title || 'a document'}" (student: ${group.studentName || 'unnamed'})`);
          return;
        }
      }
    }

    setIsSubmitting(true);
    let successCount = 0;

    try {
      for (const group of studentGroups) {
        for (const entry of group.files) {
          try {
            await uploadSingleEntry(group, entry);
            successCount++;
            toast.success(`Uploaded: ${entry.title}`);
          } catch (error: any) {
            toast.error(`Failed to upload ${entry.title}: ${error.message}`);
          }
        }
      }

      if (successCount > 0) {
        toast.success(`${successCount} document${successCount > 1 ? 's' : ''} uploaded successfully`);
        onUploadComplete?.();
        setStudentGroups([createEmptyStudentGroup()]);
      }
    } catch (error: any) {
      toast.error(error?.message || 'Upload failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isUploadDisabled =
    isSubmitting ||
    studentGroups.some(g =>
      !g.studentName.trim() ||
      !g.studentUniqueId.trim() ||
      g.files.some(f => !f.file || !f.title.trim() || !f.category)
    );

  //! ─── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-6">
      {studentGroups.map((group, groupIndex) => (
        <motion.div
          key={group.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm"
        >
          {/* ── Student header ── */}
          <div
            className="p-5 cursor-pointer flex items-center justify-between transition-colors hover:bg-gray-50 border-b border-gray-100"
            onClick={() => toggleGroupExpanded(group.id)}
          >
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center flex-shrink-0">
                <User className="w-6 h-6 text-orange-500" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-gray-900 truncate">
                    {group.studentName || `Student ${groupIndex + 1}`}
                  </h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-orange-100 text-orange-600 font-medium flex-shrink-0">
                    {group.files.length} file{group.files.length !== 1 ? 's' : ''}
                  </span>
                  {group.files.every(f => f.uploaded) && group.files.length > 0 && group.files[0].file && (
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  )}
                </div>
                <div className="flex items-center gap-3 mt-0.5 text-xs text-gray-400 flex-wrap">
                  {group.studentUniqueId && (
                    <span className="flex items-center gap-1">
                      <IdCard className="w-3 h-3" />{group.studentUniqueId}
                    </span>
                  )}
                  {group.certificationNumber && (
                    <span className="flex items-center gap-1">
                      <Award className="w-3 h-3" />{group.certificationNumber}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0 ml-3">
              {studentGroups.length > 1 && (
                <button
                  onClick={(e) => { e.stopPropagation(); removeStudentGroup(group.id); }}
                  className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              )}
              <ChevronDown
                className={`w-5 h-5 transition-transform text-gray-400 ${group.expanded ? 'rotate-180' : ''}`}
              />
            </div>
          </div>

          <AnimatePresence>
            {group.expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-5 space-y-5">
                  {/* ── Student info fields ── */}
                  <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
                    <div className="flex items-center gap-2 mb-3">
                      <User className="w-4 h-4 text-blue-600" />
                      <h4 className="font-semibold text-sm text-blue-800">Student Information</h4>
                      <span className="text-xs text-blue-500 ml-2">Applies to all files below</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-sm font-medium mb-1.5 text-gray-700">
                          Student Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={group.studentName}
                          onChange={(e) => updateGroupField(group.id, 'studentName', e.target.value)}
                          placeholder="Enter student name..."
                          className="w-full px-3 py-2 rounded-lg text-sm bg-white border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1.5 text-gray-700">
                          Student Unique ID <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={group.studentUniqueId}
                          onChange={(e) => updateGroupField(group.id, 'studentUniqueId', e.target.value)}
                          placeholder="Enter student unique ID..."
                          className="w-full px-3 py-2 rounded-lg text-sm bg-white border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1.5 text-gray-700">
                          Certification Number
                        </label>
                        <input
                          type="text"
                          value={group.certificationNumber}
                          onChange={(e) => updateGroupField(group.id, 'certificationNumber', e.target.value)}
                          placeholder="Enter certification number..."
                          className="w-full px-3 py-2 rounded-lg text-sm bg-white border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* ── File entries ── */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <Files className="w-4 h-4 text-orange-500" />
                        Documents ({group.files.length})
                      </h4>
                    </div>

                    {group.files.map((entry, fileIndex) => (
                      <div
                        key={entry.fileId}
                        className={`rounded-xl border p-4 space-y-4 transition-colors ${
                          entry.uploaded ? 'border-green-300 bg-green-50/40' : 'border-gray-200 bg-gray-50/50'
                        }`}
                      >
                        {/* File entry header */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            {entry.file
                              ? getFilePreview(entry.file, entry.previewUrl)
                              : (
                                <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center flex-shrink-0">
                                  <FileText className="w-5 h-5 text-gray-400" />
                                </div>
                              )
                            }
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-sm font-medium text-gray-700 truncate">
                                  {entry.title || `Document ${fileIndex + 1}`}
                                </span>
                                {entry.file && (
                                  <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 flex-shrink-0">
                                    {getFileTypeLabel(entry.file)}
                                  </span>
                                )}
                                {entry.uploaded && (
                                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                )}
                              </div>
                              {entry.file && (
                                <p className="text-xs text-gray-400 mt-0.5 truncate">
                                  {entry.file.name} • {formatFileSize(entry.file.size)}
                                </p>
                              )}
                            </div>
                          </div>
                          {group.files.length > 1 && (
                            <button
                              onClick={() => removeFileEntry(group.id, entry.fileId)}
                              className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 transition-colors flex-shrink-0 ml-2"
                            >
                              <X size={16} />
                            </button>
                          )}
                        </div>

                        {/* Title & Category row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-sm font-medium mb-1.5 text-gray-700">
                              Document Title <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              value={entry.title}
                              onChange={(e) => updateFileField(group.id, entry.fileId, 'title', e.target.value)}
                              placeholder="Enter document title..."
                              className="w-full px-3 py-2 rounded-lg text-sm bg-white border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1.5 text-gray-700">
                              Category <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <select
                                value={entry.category}
                                onChange={(e) => updateFileField(group.id, entry.fileId, 'category', e.target.value)}
                                className="w-full px-3 py-2 rounded-lg text-sm appearance-none bg-white border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all cursor-pointer"
                              >
                                <option value="">Select category</option>
                                {categories.map(cat => (
                                  <option key={cat} value={cat}>{cat}</option>
                                ))}
                              </select>
                              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>
                            {entry.category && (
                              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs mt-1.5 bg-gradient-to-r ${getCategoryColor(entry.category)} text-white`}>
                                {entry.category}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Description */}
                        <div>
                          <label className="block text-sm font-medium mb-1.5 text-gray-700">
                            Description <span className="text-gray-400 text-xs">(Optional)</span>
                          </label>
                          <textarea
                            value={entry.description}
                            onChange={(e) => updateFileField(group.id, entry.fileId, 'description', e.target.value)}
                            placeholder="Enter document description..."
                            rows={2}
                            className="w-full px-3 py-2 rounded-lg text-sm bg-white border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all resize-none"
                          />
                        </div>

                        {/* File drop zone */}
                        <div>
                          <label className="block text-sm font-medium mb-1.5 text-gray-700">
                            File <span className="text-red-500">*</span>
                            <span className="text-gray-400 text-xs ml-2">— drop multiple files to auto-add them</span>
                          </label>
                          <div
                            onDragEnter={(e) => { e.preventDefault(); e.stopPropagation(); setDragActiveFor(entry.fileId); }}
                            onDragLeave={(e) => { e.preventDefault(); e.stopPropagation(); setDragActiveFor(null); }}
                            onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                            onDrop={(e) => handleDrop(e, group.id, entry.fileId)}
                            onClick={() => document.getElementById(`file-${group.id}-${entry.fileId}`)?.click()}
                            className={`relative border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all ${
                              dragActiveFor === entry.fileId
                                ? 'border-orange-500 bg-orange-500/10'
                                : entry.file
                                  ? 'border-green-400 bg-green-50/40'
                                  : 'border-gray-300 hover:border-orange-400 hover:bg-orange-50/20'
                            }`}
                          >
                            <input
                              id={`file-${group.id}-${entry.fileId}`}
                              type="file"
                              multiple
                              className="hidden"
                              onChange={(e) => handleInputChange(e, group.id, entry.fileId)}
                            />
                            {entry.file ? (
                              <div className="flex items-center justify-center gap-3">
                                {getFilePreview(entry.file, entry.previewUrl)}
                                <div className="text-left">
                                  <p className="text-sm font-medium text-gray-800">{entry.file.name}</p>
                                  <p className="text-xs text-gray-400">{formatFileSize(entry.file.size)}</p>
                                  <p className="text-xs text-orange-500 mt-1">Click or drop to replace • drop multiple to add more</p>
                                </div>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center gap-2">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center">
                                  <Upload size={20} className="text-orange-500" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-700">
                                    Drag & drop or click to browse
                                  </p>
                                  <p className="text-xs text-gray-400 mt-0.5">
                                    Select multiple files to add them all at once • Max {maxFileSize}MB each
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Progress bar */}
                        {entry.uploadProgress > 0 && entry.uploadProgress < 100 && (
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-500">Uploading...</span>
                              <span className="text-orange-500">{entry.uploadProgress}%</span>
                            </div>
                            <div className="h-1.5 rounded-full bg-gray-200 overflow-hidden">
                              <div
                                className="h-full rounded-full bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-300"
                                style={{ width: `${entry.uploadProgress}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}

                    {/* Add file button */}
                    <button
                      onClick={() => addFileEntry(group.id)}
                      disabled={totalFileCount >= maxFiles}
                      className={`w-full py-3 rounded-xl border-2 border-dashed text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                        totalFileCount >= maxFiles
                          ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                          : 'border-orange-300 text-orange-500 hover:bg-orange-50 cursor-pointer'
                      }`}
                    >
                      <Plus size={16} />
                      Add Another File for This Student
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}

      {/* Add student group button */}
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={addStudentGroup}
        disabled={totalFileCount >= maxFiles}
        className={`w-full py-4 rounded-xl border-2 border-dashed font-semibold flex items-center justify-center gap-2 transition-all ${
          totalFileCount >= maxFiles
            ? 'border-gray-200 text-gray-300 cursor-not-allowed'
            : 'border-orange-500 text-orange-500 hover:bg-orange-50 cursor-pointer'
        }`}
      >
        <Plus size={20} />
        Add Another Student
        {totalFileCount >= maxFiles && ` (Max ${maxFiles} files reached)`}
      </motion.button>

      {/* Upload all button */}
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={handleUploadAll}
        disabled={isUploadDisabled}
        className="w-full cursor-pointer py-4 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-300 text-lg"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={22} className="animate-spin" />
            Uploading Documents...
          </>
        ) : (
          <>
            <Upload size={22} />
            Upload All Documents ({totalFileCount})
          </>
        )}
      </motion.button>

      {/* Guidelines */}
      <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
        <div className="flex items-start gap-3">
          <Info size={18} className="text-blue-500 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-medium text-blue-700">Document Guidelines</p>
            <ul className="text-xs mt-1 space-y-1 text-blue-600">
              <li>• All file types are supported (Images, PDF, Word, Excel, PowerPoint, Video, Audio, Archives, Code files, etc.)</li>
              <li>• Drop multiple files onto any drop zone to add them all at once for that student</li>
              <li>• Each student can have multiple documents — student info is shared across their files</li>
              <li>• Maximum file size: {maxFileSize}MB per document</li>
              <li>• Maximum {maxFiles} documents total across all students per session</li>
              <li>• All uploaded documents will be reviewed by administrators</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentUpload;