'use client';

import { motion } from 'framer-motion';
import { 
    CheckCircle, ArrowRight, Shield, Award, Users, 
    Globe, Zap, BookOpen, Sparkles, Building2,
    TestTube, Microscope, Ruler, FileCheck, Clock,
    TrendingUp, Brain, Target, Heart
} from 'lucide-react';
import Link from 'next/link';

const features = [
    {
        icon: Shield,
        title: 'ISO/IEC 17020 Accreditation',
        description: 'This accreditation confirms compliance with ISO/IEC 17020 and is widely recognized by both industry and regulators.',
        gradient: 'from-purple-500 to-pink-500'
    },
    {
        icon: Microscope,
        title: 'ISO/IEC 17025 for Laboratories',
        description: 'Global recognition for laboratories demonstrating competence in testing and calibration activities.',
        gradient: 'from-blue-500 to-cyan-500'
    },
    {
        icon: Ruler,
        title: 'Maintenance & Calibration',
        description: 'Rigorous schedules for maintenance, calibration, and routine verification using control artifacts.',
        gradient: 'from-green-500 to-emerald-500'
    },
    {
        icon: Users,
        title: 'Internal Assessments',
        description: 'Regular internal assessments and intra-laboratory comparisons to evaluate technician skills and ensure repeatability.',
        gradient: 'from-orange-500 to-red-500'
    }
];

const benefits = [
    {
        title: 'Global Recognition',
        description: 'Enhances the acceptance of inspection reports internationally, reducing costs by minimizing re-inspections.'
    },
    {
        title: 'Technical Competence',
        description: 'Demonstrates the technical capabilities and management system effectiveness of your laboratory.'
    },
    {
        title: 'Accuracy & Reliability',
        description: 'Ensures the accuracy and reliability of testing and calibration results.'
    },
    {
        title: 'Traceability',
        description: 'Guarantees consistency, reliability, and traceability of measurement results.'
    }
];

export default function InspectionsTestingCalibrationPage() {
    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-pink-50 pt-44 pb-20">
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-400/10 to-purple-400/10 rounded-full blur-3xl" />
                <div className="absolute inset-0 bg-grid-purple-900/[0.02] bg-[size:40px_40px]" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2 bg-white shadow-sm rounded-full px-4 py-1.5 mb-6"
                        >
                            <Sparkles className="w-4 h-4 text-purple-600" />
                            <span className="text-sm font-medium text-gray-700">ISO/IEC 17020 & 17025</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
                        >
                            Inspections, Testing
                            <span className="ml-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
                                & Calibration
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-lg text-gray-600 mb-8 max-w-2xl"
                        >
                            ISAB Accreditation for Inspection Bodies (ISO/IEC 17020) and Laboratories (ISO/IEC 17025) ensures compliance with international standards, enhancing global acceptance of inspection reports and testing results.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex gap-4 flex-wrap"
                        >
                            <Link href="/contact">
                                <button className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2">
                                    Apply for Accreditation
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Accreditation Services
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Comprehensive accreditation solutions for inspection bodies and laboratories
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group"
                            >
                                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-purple-200">
                                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} mb-4 group-hover:scale-110 transition-transform`}>
                                        <feature.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                                    <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                                </div>
                            </motion.div>
                        ))}
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
                            Key Benefits
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Why choose ISAB accreditation for your inspection and laboratory services
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
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle className="w-6 h-6 text-purple-600" />
                                </div>
                                <h3 className="font-bold text-gray-900 mb-2">{benefit.title}</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">{benefit.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Standards Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl mx-auto"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
                            Reference Standards
                        </h2>
                        <p className="text-gray-600 text-center mb-8">
                            Our accreditation programs are built upon internationally recognized standards
                        </p>

                        <div className="space-y-4">
                            {[
                                {
                                    standard: 'ISO/IEC 17020',
                                    description: 'Conformity assessment — Requirements for the operation of various types of bodies performing inspection'
                                },
                                {
                                    standard: 'ISO/IEC 17025',
                                    description: 'General requirements for the competence of testing and calibration laboratories'
                                }
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-100/50"
                                >
                                    <h4 className="font-bold text-gray-900 mb-1">{item.standard}</h4>
                                    <p className="text-gray-600 text-sm">{item.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-purple-900 to-pink-900 relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Ready to Get Accredited?
                        </h2>
                        <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
                            Join the community of trusted inspection bodies and laboratories worldwide.
                        </p>
                        <Link href="/contact">
                            <button className="bg-white text-purple-900 px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                                Contact Us Today
                            </button>
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}