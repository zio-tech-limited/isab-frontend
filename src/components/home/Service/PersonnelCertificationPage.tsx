'use client';

import { motion } from 'framer-motion';
import { 
    CheckCircle, ArrowRight, Shield, Award, Users, 
    Globe, Zap, BookOpen, Sparkles, Building2,
    UserCheck, GraduationCap, Brain, Target, Heart,
    FileCheck, Clock, TrendingUp, Briefcase, Star
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
        description: 'Accreditation confirms compliance with ISO/IEC 17024 and is widely recognized by both regulators and the marketplace.'
    },
    {
        icon: Users,
        title: 'Professional Credibility',
        description: 'Ensures personnel certification schemes meet industry and international standards, maintaining integrity and credibility.'
    },
    {
        icon: Award,
        title: 'Consumer Trust',
        description: 'Fosters consumer and public trust in the skills and competence of individuals offering specialized services.'
    },
    {
        icon: Globe,
        title: 'International Acceptance',
        description: 'Universally accepted benchmark for organizations that assess and validate the competence of personnel.'
    }
];

const processSteps = [
    {
        step: '1',
        title: 'Scheme Development',
        description: 'Develop or submit your personnel certification scheme for review.',
        icon: BookOpen
    },
    {
        step: '2',
        title: 'Documentation Review',
        description: 'Assessors review your certification processes and procedures.',
        icon: FileCheck
    },
    {
        step: '3',
        title: 'On-Site Assessment',
        description: 'Evaluation of your certification operations and competence assessment.',
        icon: Users
    },
    {
        step: '4',
        title: 'Accreditation Decision',
        description: 'Accreditation committee reviews findings and grants status.',
        icon: Award
    }
];

export default function PersonnelCertificationPage() {
    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-red-50 pt-44 pb-20">
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-orange-400/20 to-red-400/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-yellow-400/10 to-orange-400/10 rounded-full blur-3xl" />
                <div className="absolute inset-0 bg-grid-orange-900/[0.02] bg-[size:40px_40px]" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2 bg-white shadow-sm rounded-full px-4 py-1.5 mb-6"
                        >
                            <Sparkles className="w-4 h-4 text-orange-600" />
                            <span className="text-sm font-medium text-gray-700">ISO/IEC 17024</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
                        >
                            Personnel
                            <span className="ml-4 text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-500">
                                Certification
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-lg text-gray-600 mb-8 max-w-2xl"
                        >
                            ISAB Accreditation for Personnel Certification Bodies confirms compliance with ISO/IEC 17024, ensuring that personnel certification schemes meet industry and international standards, maintaining the integrity and credibility of professional certification programs.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex gap-4 flex-wrap"
                        >
                            <Link href="/contact">
                                <button className="bg-gradient-to-r from-orange-600 to-red-500 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2">
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
                            We are providing accreditation to the below-mentioned schemes of all Categories:
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto"
                    >
                        {schemes.map((scheme, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.03 }}
                                className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-orange-50 to-red-50 border border-orange-100/50 hover:shadow-md transition-all"
                            >
                                <CheckCircle className="w-5 h-5 text-orange-600 flex-shrink-0" />
                                <span className="text-gray-800 text-sm font-medium">{scheme}</span>
                            </motion.div>
                        ))}
                    </motion.div>
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
                            Benefits of being accredited by ISAB for Personnel Certification
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
                                <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-orange-100 to-red-100 mb-4">
                                    <benefit.icon className="w-6 h-6 text-orange-600" />
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
                                <div className={`flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-xl shadow-lg ${index % 2 === 1 ? 'md:ml-auto' : ''}`}>
                                    {step.step}
                                </div>
                                <div className={`flex-1 bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-xl border border-orange-100/50 ${index % 2 === 1 ? 'md:text-right' : ''}`}>
                                    <div className="flex items-center gap-3 mb-2">
                                        <step.icon className="w-5 h-5 text-orange-600" />
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
            <section className="py-16 bg-gradient-to-r from-orange-900 to-red-900 relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Ready to Get Accredited?
                        </h2>
                        <p className="text-orange-100 mb-8 max-w-2xl mx-auto">
                            Join the community of trusted personnel certification bodies worldwide.
                        </p>
                        <Link href="/contact">
                            <button className="bg-white text-orange-900 px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                                Contact Us Today
                            </button>
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}