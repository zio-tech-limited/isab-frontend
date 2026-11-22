"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Building2,
  CheckCircle2,
  Clock,
  XCircle,
  TrendingUp,
  Users,
  MapPin,
} from "lucide-react";
import { useTheme } from "@/hooks/useThemeContext";

interface CompanyStatsCardsProps {
  stats: {
    total: number;
    active: number;
    pending: number;
    inactive: number;
    byCity?: Array<{ city: string; count: string }>;
  };
}

const CompanyStatsCards: React.FC<CompanyStatsCardsProps> = ({ stats }) => {
  const { theme } = useTheme();

  const statCards = [
    {
      title: "Total Companies",
      value: stats.total || 0,
      icon: Building2,
      color: "blue",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-500/10 to-cyan-500/10",
    },
    {
      title: "Active Companies",
      value: stats.active || 0,
      icon: CheckCircle2,
      color: "green",
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-500/10 to-emerald-500/10",
    },
    {
      title: "Pending Companies",
      value: stats.pending || 0,
      icon: Clock,
      color: "orange",
      gradient: "from-orange-500 to-yellow-500",
      bgGradient: "from-orange-500/10 to-yellow-500/10",
    },
    {
      title: "Rejected/Inactive",
      value: stats.inactive || 0,
      icon: XCircle,
      color: "red",
      gradient: "from-red-500 to-pink-500",
      bgGradient: "from-red-500/10 to-pink-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {statCards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
          whileHover={{ scale: 1.02, y: -5 }}
          className="relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 cursor-pointer group"
        >
          <div
            className={`absolute inset-0 bg-gradient-to-br ${card.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
          />
          <div className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div
                className={`p-3 rounded-xl bg-gradient-to-br ${card.gradient} shadow-lg`}
              >
                <card.icon className="w-6 h-6 text-white" />
              </div>
              <TrendingUp className="w-5 h-5 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <h3 className="text-3xl font-bold mb-1 text-gray-900">
              {card.value.toLocaleString()}
            </h3>
            <p className="text-sm text-gray-600">
              {card.title}
            </p>
            <div className="mt-4 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(card.value / (stats.total || 1)) * 100}%` }}
                transition={{ duration: 1, delay: index * 0.1 }}
                className={`h-full bg-gradient-to-r ${card.gradient} rounded-full`}
              />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default CompanyStatsCards;