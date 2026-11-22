'use client';

import { motion } from 'framer-motion';
import { 
    CheckCircle, ArrowRight, Shield, Award, Users, 
    Globe, Zap, BookOpen, Sparkles, Building2,
    BadgeCheck, Leaf, Star, CreditCard, FileCheck,
    Clock, TrendingUp, Brain, Target, Heart, 
    TreePine, Moon, ShieldCheck
} from 'lucide-react';
import Link from 'next/link';

const certifications = [
    {
        icon: TreePine,
        title: 'PEFC Forest Certification',
        description: 'Program for the Endorsement of Forest Certification (PEFC) is a global alliance promoting responsible forestry through independent, third-party certification.',
        gradient: 'from-green-500 to-emerald-500'
    },
    {
        icon: Moon,
        title: 'HALAL Certification',
        description: 'Ensures food, beverages, cosmetics, pharmaceuticals, and other products comply with Islamic dietary laws and are permissible for consumption by Muslims.',
        gradient: 'from-blue-500 to-cyan-500'
    },
    {
        icon: ShieldCheck,
        title: 'CE Marking',
        description: 'Mandatory conformity marking for products sold within the European Economic Area (EEA), indicating compliance with EU safety, health, and environmental standards.',
        gradient: 'from-purple-500 to-pink-500'
    }
];

const keyFeatures = [
    {
        title: 'ISO/IEC 17065 Compliance',
        description: 'Accreditation confirms compliance with ISO/IEC 17065, recognized by regulators and the marketplace both domestically and internationally.'
    },
    {
        title: 'Safety & Industry Standards',
        description: 'Provides manufacturers with verification that their products have been tested, inspected, and certified to meet safety and industry standards.'
    },
    {
        title: 'Global Market Access',
        description: 'Enables free movement of goods within the EU and EEA through CE marking and other international certifications.'
    },
    {
        title: 'Consumer Trust',
        description: 'Builds consumer and public trust in the quality, safety, and compliance of certified products.'
    }
];

export default function ProductCertificationPage() {
    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-emerald-50 pt-44 pb-20">
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-400/10 to-green-400/10 rounded-full blur-3xl" />
                <div className="absolute inset-0 bg-grid-green-900/[0.02] bg-[size:40px_40px]" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2 bg-white shadow-sm rounded-full px-4 py-1.5 mb-6"
                        >
                            <Sparkles className="w-4 h-4 text-green-600" />
                            <span className="text-sm font-medium text-gray-700">ISO/IEC 17065</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
                        >
                            Product
                            <span className="ml-4 text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">
                                Certification
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-lg text-gray-600 mb-8 max-w-2xl"
                        >
                            ISAB Accreditation for Product Certification Agencies ensures compliance with ISO/IEC 17065, providing verification that products have been tested, inspected, and certified to meet safety and industry standards.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex gap-4 flex-wrap"
                        >
                            <Link href="/contact">
                                <button className="bg-gradient-to-r from-green-600 to-emerald-500 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2">
                                    Apply for Accreditation
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Certification Types */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Product Certification Services
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Comprehensive product certification solutions across various industries and standards
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {certifications.map((cert, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group"
                            >
                                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-green-200 h-full">
                                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${cert.gradient} mb-4 group-hover:scale-110 transition-transform`}>
                                        <cert.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="font-bold text-gray-900 mb-2">{cert.title}</h3>
                                    <p className="text-sm text-gray-600 leading-relaxed">{cert.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Key Features */}
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
                            Why choose ISAB accreditation for your product certification needs
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                        {keyFeatures.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 text-center"
                            >
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle className="w-6 h-6 text-green-600" />
                                </div>
                                <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Reference Standards */}
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
                                    standard: 'ISO/IEC 17021-1',
                                    description: 'Conformity assessment — Requirements for bodies providing audit and certification of management systems'
                                },
                                {
                                    standard: 'ISO/IEC 17065',
                                    description: 'Conformity assessment — Requirements for bodies certifying products, processes and services'
                                }
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100/50"
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
            <section className="py-16 bg-gradient-to-r from-green-900 to-emerald-900 relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Ready to Get Accredited?
                        </h2>
                        <p className="text-green-100 mb-8 max-w-2xl mx-auto">
                            Join the community of trusted product certification bodies worldwide.
                        </p>
                        <Link href="/contact">
                            <button className="bg-white text-green-900 px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                                Contact Us Today
                            </button>
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}