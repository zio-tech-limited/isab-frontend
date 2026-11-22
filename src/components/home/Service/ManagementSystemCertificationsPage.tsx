'use client';

import { motion } from 'framer-motion';
import { 
    CheckCircle, ArrowRight, Shield, Award, Users, 
    Globe, Zap, BookOpen, Sparkles, Building2,
    ClipboardList, FileCheck, Clock, TrendingUp,
    Briefcase, Brain, Target, Heart
} from 'lucide-react';
import Link from 'next/link';

const schemes = [
    'ISO 9001 QMS (Quality)',
    'ISO 14001 EMS (Environmental)',
    'ISO 45001 OHSAS (Occupational)',
    'ISO 22000 FSMS (Food Safety)',
    'FSSC 22000 V6 (New) (Food Safety)',
    'FSSC 24000 (New) (Social Accountability)',
    'ISO/IEC 27001 ISMS (Information Security)',
    'ISO/IEC 20000-1 ITSMS (Information Technology)',
    'ISO 22301 BCMS (Business Continuity)',
    'ISO 13485 MDQMS (Medical Devices)',
    'ISO 50001 EnMS (Energy)',
    'ISO 37001 ABMS (Anti-Bribery)',
    'ISO 55001 AMS (Asset Management)',
    'ISO 20121 ESMS (Event Sustainability)',
    'ISO 39001 RTSMS (Road Traffic Safety)',
    'ISO 21001 EOMS (Educational Organizations)',
    'ISO/IEC 27701 PIMS (Information Security Privacy)',
    'ISO 37301 CMS (Compliance Management)',
    'ISO 42001 (New) AIMS (Artificial Intelligence)'
];

const benefits = [
    {
        icon: Shield,
        title: 'Global Recognition',
        description: 'ISAB accreditation is widely accepted by regulators and industries worldwide, offering assurance of competence and best practices.'
    },
    {
        icon: Users,
        title: 'Market Acceptance',
        description: 'Your certification marks become recognized by the marketplace and regulatory agencies responsible for service or product approval.'
    },
    {
        icon: Clock,
        title: 'Reduced Audits',
        description: 'Helps minimize the need for repeated audits by other third-party providers, saving time and resources.'
    },
    {
        icon: Award,
        title: 'Credibility & Trust',
        description: 'Demonstrates your commitment to quality and compliance, building trust with clients and stakeholders.'
    }
];

const processSteps = [
    {
        step: '1',
        title: 'Application',
        description: 'Submit your application and documentation for review.',
        icon: FileCheck
    },
    {
        step: '2',
        title: 'Documentation Review',
        description: 'Assessors review your management system documentation.',
        icon: BookOpen
    },
    {
        step: '3',
        title: 'On-Site Assessment',
        description: 'Comprehensive evaluation of your operations and systems.',
        icon: Users
    },
    {
        step: '4',
        title: 'Accreditation Decision',
        description: 'Accreditation committee reviews findings and grants status.',
        icon: Award
    }
];

export default function ManagementSystemCertificationsPage() {
    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50 pt-44 pb-20">
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-green-400/10 to-blue-400/10 rounded-full blur-3xl" />
                <div className="absolute inset-0 bg-grid-blue-900/[0.02] bg-[size:40px_40px]" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2 bg-white shadow-sm rounded-full px-4 py-1.5 mb-6"
                        >
                            <Sparkles className="w-4 h-4 text-blue-600" />
                            <span className="text-sm font-medium text-gray-700">ISO/IEC 17021</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
                        >
                            Management System
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                                Certifications
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-lg text-gray-600 mb-8 max-w-2xl"
                        >
                            ISAB Accreditation for Management System Certification Bodies confirms adherence to ISO/IEC 17021, providing credentials that ensure certification marks are recognized by the marketplace and regulatory agencies.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex gap-4 flex-wrap"
                        >
                            <Link href="/contact">
                                <button className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2">
                                    Apply for Accreditation
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Scope Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-12"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Scope of Accreditation
                            </h2>
                            <p className="text-gray-600">
                                We are providing accreditation to the below-mentioned schemes of all 39 Categories:
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        >
                            {schemes.map((scheme, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.03 }}
                                    className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100/50 hover:shadow-md transition-all"
                                >
                                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                                    <span className="text-gray-800 text-sm font-medium">{scheme}</span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Why Choose ISAB Accreditation?
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Benefits of being accredited by ISAB for Management System Certification
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 text-center"
                            >
                                <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100 mb-4">
                                    <benefit.icon className="w-6 h-6 text-blue-600" />
                                </div>
                                <h3 className="font-bold text-gray-900 mb-2">{benefit.title}</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">{benefit.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Accreditation Process
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            A transparent and structured pathway to achieving accreditation
                        </p>
                    </motion.div>

                    <div className="max-w-4xl mx-auto">
                        {processSteps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`flex flex-col md:flex-row items-start gap-6 mb-8 last:mb-0 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                            >
                                <div className={`flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xl shadow-lg ${index % 2 === 1 ? 'md:ml-auto' : ''}`}>
                                    {step.step}
                                </div>
                                <div className={`flex-1 bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-100/50 ${index % 2 === 1 ? 'md:text-right' : ''}`}>
                                    <div className="flex items-center gap-3 mb-2">
                                        <step.icon className="w-5 h-5 text-blue-600" />
                                        <h3 className="font-bold text-gray-900">{step.title}</h3>
                                    </div>
                                    <p className="text-gray-600">{step.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-blue-900 to-cyan-900 relative overflow-hidden">
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
                            Ready to Get Accredited?
                        </h2>
                        <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                            Join the community of trusted certification bodies and demonstrate your commitment to excellence.
                        </p>
                        <Link href="/contact">
                            <button className="bg-white text-blue-900 px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                                Contact Us Today
                            </button>
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}


