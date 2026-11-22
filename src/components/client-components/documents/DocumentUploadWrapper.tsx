"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload, FileText, Shield, Clock, CheckCircle } from 'lucide-react';
import { useTheme } from '@/hooks/useThemeContext';
import DocumentUpload from './DocumentUpload';
import { getUserInfo } from '@/utils/helper/userFromToken';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

const DocumentUploadWrapper: React.FC = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [user, setUser] = useState<any>(null);
  const [mounted, setMounted] = useState(false);
  const studentId = searchParams.get('studentId');

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await getUserInfo();
      setUser(userInfo);
    };
    fetchUser();
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="w-8 h-8 border-2 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="relative bg-gradient-to-r from-orange-600 to-red-600 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.05%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-8 md:py-12">
          <Link href={studentId ? `/admin/students/${studentId}/documents` : "/admin/documents/all"}>
            <button className="mb-4 flex items-center gap-2 text-white/80 hover:text-white transition-colors cursor-pointer">
              <ArrowLeft size={18} />
              Back to Documents
            </button>
          </Link>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
                <Upload size={32} />
                Document Upload Portal
              </h1>
              <p className="text-orange-100 mt-1">Upload important documents for accreditation review</p>
            </div>
            <div className="flex gap-3">
              <div className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-lg backdrop-blur-sm">
                <Shield size={16} className="text-white" />
                <span className="text-white text-sm">Secure Upload</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-lg backdrop-blur-sm">
                <Clock size={16} className="text-white" />
                <span className="text-white text-sm">24/7 Access</span>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-4 rounded-xl bg-white border border-gray-200"
          >
            <FileText className="text-orange-500 mb-2" size={24} />
            <h3 className="font-semibold text-gray-900">Document Guidelines</h3>
            <p className="text-xs mt-1 text-gray-500">
              Ensure all documents are clear, legible, and meet the specified requirements
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-4 rounded-xl bg-white border border-gray-200"
          >
            <Shield className="text-green-500 mb-2" size={24} />
            <h3 className="font-semibold text-gray-900">Secure & Compliant</h3>
            <p className="text-xs mt-1 text-gray-500">
              Your documents are encrypted and stored securely in compliance with regulations
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-4 rounded-xl bg-white border border-gray-200"
          >
            <CheckCircle className="text-blue-500 mb-2" size={24} />
            <h3 className="font-semibold text-gray-900">Quick Review</h3>
            <p className="text-xs mt-1 text-gray-500">
              Submitted documents will be reviewed within 2-3 business days
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-2xl p-6 bg-white shadow-xl border border-gray-200"
        >
          <DocumentUpload
            accreditationBodyId={user?.id}
            studentId={studentId ? parseInt(studentId) : undefined}
            onUploadComplete={() => {
              setTimeout(() => {
                if (studentId) {
                  router.push(`/admin/students/${studentId}/documents`);
                } else {
                  router.push('/admin/documents/all');
                }
              }, 2000);
            }}
            maxFiles={10}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default DocumentUploadWrapper;


