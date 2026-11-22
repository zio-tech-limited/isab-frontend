'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Building2,
    MapPin,
    Globe,
    Mail,
    Phone,
    User,
    Calendar,
    Award,
    CheckCircle,
    Search,
    Filter,
    X,
    ExternalLink,
    Users,
    Briefcase,
    Shield,
    Star,
    ArrowRight,
    Sparkles,
    Clock,
    Linkedin,
    Facebook,
    Twitter,
    Instagram,
    Link as LinkIcon
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useGetAllSubCompaniesForPublicQuery } from '@/redux/api/authentication/subCompanyApi';

interface SubCompany {
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
    lastLoginAt: string;
    notes: string | null;
    createdAt: string;
    updatedAt: string;
    documents: {
        ownerNidFront: string;
        ownerNidBack: string;
    };
    joinedDate: string;
}

const AllianceCard = ({ company, index }: { company: SubCompany; index: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group"
        >
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-blue-200 h-full flex flex-col">
                {/* Header with gradient accent */}
                <div className="h-2 bg-gradient-to-r from-blue-600 to-cyan-500" />

                <div className="p-6 flex-1 flex flex-col">
                    {/* Company Logo / Icon */}
                    <div className="flex items-start gap-4 mb-4">
                        <div className="flex-shrink-0">
                            {company.ownerPhoto ? (
                                <div className="relative w-16 h-16 rounded-xl overflow-hidden shadow-md">
                                    <Image
                                        src={company.ownerPhoto}
                                        alt={company.companyName}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ) : (
                                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center shadow-md">
                                    <Building2 className="w-8 h-8 text-blue-600" />
                                </div>
                            )}
                        </div>

                        <div className="flex-1 min-w-0">
                            <h3 className="text-xl font-bold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                                {company.companyName}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                    <MapPin className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                    <span>
                                        {company.city}, {company.country}
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Expandable Details */}
                    <div className="relative flex-1">
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{
                                height: 'auto',
                                opacity: 1
                            }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                        >
                            <div className="border-gray-100 space-y-3">
                                {/* Contact Info */}
                                <div className="space-y-2">
                                    {company.website && (
                                        <div className="flex items-center gap-2 text-sm text-gray-600 pt-2">
                                            <Globe className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                            <a
                                                href={company.website.startsWith('http') ? company.website : `https://${company.website}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="hover:text-blue-600 truncate"
                                            >
                                                {company.website}
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Visit Website Button */}
                    {company.website && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                            <a
                                href={company.website.startsWith('http') ? company.website : `https://${company.website}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/30 hover:scale-[1.02] transition-all duration-300 group/btn"
                            >
                                <span>Visit Website</span>
                                <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default function AlliancePage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCountry, setFilterCountry] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    const { data, isLoading, error } = useGetAllSubCompaniesForPublicQuery({
        page: currentPage,
        limit: itemsPerPage,
        search: searchTerm,
        status: filterStatus,
        city: filterCountry
    });

    // Extract countries for filter
    const countries = data?.data
        ? [...new Set(data.data.map((company: SubCompany) => company.country))]
        : [];

    // Filter and search
    const filteredCompanies = data?.data || [];

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const clearFilters = () => {
        setFilterCountry('');
        setFilterStatus('');
        setSearchTerm('');
        setCurrentPage(1);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-600">Loading accreditation bodies...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <X className="w-8 h-8 text-red-600" />
                    </div>
                    <p className="text-gray-600">Failed to load accreditation bodies</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50 pt-44 pb-20">
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-green-400/10 to-blue-400/10 rounded-full blur-3xl" />
                <div className="absolute inset-0 bg-grid-blue-900/[0.02] bg-[size:40px_40px]" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2 bg-white shadow-sm rounded-full px-4 py-1.5 mb-6"
                        >
                            <Sparkles className="w-4 h-4 text-blue-600" />
                            <span className="text-sm font-medium text-gray-700">Our Alliance</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6"
                        >
                            Global
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                                Accreditation Alliance
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto"
                        >
                            Connect with our network of accredited certification bodies and organizations
                            worldwide, committed to excellence and international standards.
                        </motion.p>

                    </div>
                </div>
            </section>

            {/* Search and Filter Section */}
            <section className="py-8 bg-white border-b border-gray-100 sticky top-20 z-20 backdrop-blur-md bg-white/90">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between max-w-6xl mx-auto">
                        {/* Search */}
                        <div className="relative flex-1 w-full">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search by company name, city, or country..."
                                value={searchTerm}
                                onChange={handleSearch}
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                        </div>

                        {/* Filters */}
                        <div className="flex gap-3 w-full md:w-auto flex-wrap">

                            {(searchTerm) && (
                                <button
                                    onClick={clearFilters}
                                    className="px-4 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-colors flex items-center gap-2"
                                >
                                    <X className="w-4 h-4" />
                                    Clear
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Companies Grid */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    {filteredCompanies.length === 0 ? (
                        <div className="text-center py-20">
                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Building2 className="w-10 h-10 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Accreditation Bodies Found</h3>
                            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                            <button
                                onClick={clearFilters}
                                className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                            >
                                Clear all filters
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                            {filteredCompanies.map((company: SubCompany, index: number) => (
                                <AllianceCard key={company.id} company={company} index={index} />
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    {data?.pagination && data.pagination.totalPages > 1 && (
                        <div className="flex justify-center gap-2 mt-12">
                            <button
                                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                disabled={currentPage === 1}
                                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Previous
                            </button>
                            <span className="px-4 py-2 text-gray-600">
                                Page {currentPage} of {data.pagination.totalPages}
                            </span>
                            <button
                                onClick={() => setCurrentPage(Math.min(data.pagination.totalPages, currentPage + 1))}
                                disabled={currentPage === data.pagination.totalPages}
                                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-blue-900 to-cyan-900 relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    {[...Array(10)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute bg-white/5 rounded-full"
                            style={{
                                width: Math.random() * 80 + 20,
                                height: Math.random() * 80 + 20,
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                y: [0, Math.random() * 30 - 15],
                            }}
                            transition={{
                                duration: Math.random() * 5 + 3,
                                repeat: Infinity,
                                repeatType: "reverse",
                            }}
                        />
                    ))}
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Join Our Alliance
                        </h2>
                        <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                            Become part of our global network of accredited certification bodies and organizations.
                        </p>
                        <Link href="/register">
                            <button className="bg-white cursor-pointer text-blue-900 px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                                Get Started Today
                            </button>
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}


