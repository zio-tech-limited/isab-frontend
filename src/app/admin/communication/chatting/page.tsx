'use client';

import AdminChatDashboard from '@/components/communication/AdminChatDashboard';
import { motion } from 'framer-motion';

export default function AdminChatsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-2 md:p-3 lg:p-4 "
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Chat Management</h1>
          <p className="text-gray-500 text-sm">Monitor and respond to Public inquiries</p>
        </div>
      </div>
      
      <AdminChatDashboard />
    </motion.div>
  );
}