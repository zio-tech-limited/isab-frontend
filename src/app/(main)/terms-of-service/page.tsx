// app/terms/page.tsx
'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
    FaFileContract,
    FaGavel,
    FaUserCheck,
    FaMoneyBillWave,
    FaCopyright,
    FaShieldAlt,
    FaExclamationTriangle,
    FaHandshake,
    FaCheckCircle,
    FaArrowUp,
    FaClock,
    FaGlobe,
    FaBan,
    FaBell,
    FaLock,
    FaWhatsapp,
    FaEnvelope,
    FaBalanceScale,
    FaUserSecret,
    FaChartLine,
    FaServer
} from 'react-icons/fa';

export default function TermsOfServicePage() {
    const { scrollYProgress } = useScroll();
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [activeSection, setActiveSection] = useState('agreement');
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);

    // Progress bar width
    const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

    // Parallax effects
    const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
    const opacityHero = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 500);

            // Update active section based on scroll position
            const sections = document.querySelectorAll('section[id]');
            let current = '';
            sections.forEach((section) => {
                const sectionTop = (section as HTMLElement).offsetTop - 100;
                const sectionBottom = sectionTop + (section as HTMLElement).offsetHeight;
                if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                    current = section.getAttribute('id') || '';
                }
            });
            setActiveSection(current);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setActiveSection(id);
        }
    };

    const sections = [
        { id: 'agreement', title: 'Agreement', icon: <FaHandshake /> },
        { id: 'eligibility', title: 'Eligibility', icon: <FaUserCheck /> },
        { id: 'services', title: 'Services', icon: <FaServer /> },
        { id: 'fees', title: 'Fees & Payment', icon: <FaMoneyBillWave /> },
        { id: 'intellectual', title: 'Intellectual Property', icon: <FaCopyright /> },
        { id: 'prohibited', title: 'Prohibited Conduct', icon: <FaBan /> },
        { id: 'termination', title: 'Termination', icon: <FaGavel /> },
        { id: 'liability', title: 'Liability', icon: <FaExclamationTriangle /> },
        { id: 'governing', title: 'Governing Law', icon: <FaBalanceScale /> },
        { id: 'contact', title: 'Contact', icon: <FaEnvelope /> }
    ];

    const lastUpdated = 'June 11, 2026';
    const effectiveDate = 'January 1, 2026';

    const prohibitedItems = [
        'Fraudulent or misleading activities',
        'Unauthorized access to systems',
        'Harassment or abuse of users',
        'Distribution of malware',
        'Infringement of intellectual property',
        'Violation of data protection laws'
    ];

    const serviceLevels = [
        { level: 'Basic', uptime: '99.5%', response: '48 hours', support: 'Email only' },
        { level: 'Professional', uptime: '99.9%', response: '24 hours', support: 'Email + Chat' },
        { level: 'Enterprise', uptime: '99.99%', response: '4 hours', support: '24/7 Priority' }
    ];

    return (
        <>
            {/* Progress Bar */}
            <motion.div
                className='fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 z-50 origin-left'
                style={{ scaleX }}
            />

            {/* Scroll to Top Button */}
            <AnimatePresence>
                {showScrollTop && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        onClick={scrollToTop}
                        className='fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group'
                    >
                        <FaArrowUp className='group-hover:-translate-y-1 transition-transform' />
                    </motion.button>
                )}
            </AnimatePresence>

            <main className='bg-gradient-to-b from-gray-50 via-white to-gray-100'>
                {/* Hero Section with Parallax */}
                <section className='relative min-h-[60vh] flex items-center justify-center overflow-hidden'>
                    {/* Animated Background */}
                    <div className='absolute inset-0'>
                        <div className='absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/10 to-red-900/20' />
                        <motion.div
                            style={{ y: backgroundY }}
                            className='absolute top-20 left-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse'
                        />
                        <motion.div
                            style={{ y: backgroundY }}
                            className='absolute bottom-20 right-10 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000'
                        />
                        <motion.div
                            style={{ y: backgroundY }}
                            className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10'
                        />
                    </div>

                    {/* Floating particles */}
                    <div className='absolute inset-0 pointer-events-none'>
                        {[...Array(40)].map((_, i) => (
                            <motion.div
                                key={i}
                                className='absolute w-1 h-1 bg-purple-500/30 rounded-full'
                                initial={{
                                    x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                                    y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                                }}
                                animate={{
                                    y: [null, -150, -300],
                                    x: [null, Math.random() * 100 - 50, Math.random() * 100 - 50],
                                    opacity: [0, 1, 0],
                                    scale: [0, 1.5, 0]
                                }}
                                transition={{
                                    duration: 4 + Math.random() * 5,
                                    repeat: Infinity,
                                    delay: Math.random() * 6,
                                }}
                            />
                        ))}
                    </div>

                    <div className='relative z-10 text-center px-4 max-w-4xl mx-auto'>
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, type: 'spring' }}
                        >

                            <h1 className='text-5xl md:text-7xl lg:text-8xl font-bold mb-6'>
                                <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-red-600'>
                                    Terms of Service
                                </span>
                            </h1>

                            <p className='text-lg md:text-xl text-gray-600 max-w-2xl mx-auto'>
                                By accessing or using ISAB&apos;s services, you agree to be bound by these
                                terms and conditions. Please read them carefully.
                            </p>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className='mt-8 flex flex-wrap gap-3 justify-center'
                            >
                                <div className='flex items-center gap-2 text-sm text-gray-500 bg-white/50 backdrop-blur rounded-full px-4 py-1.5'>
                                    <FaCheckCircle className='text-purple-500' />
                                    <span>Legally Binding</span>
                                </div>
                                <div className='flex items-center gap-2 text-sm text-gray-500 bg-white/50 backdrop-blur rounded-full px-4 py-1.5'>
                                    <FaCheckCircle className='text-purple-500' />
                                    <span>Global Compliance</span>
                                </div>
                                <div className='flex items-center gap-2 text-sm text-gray-500 bg-white/50 backdrop-blur rounded-full px-4 py-1.5'>
                                    <FaCheckCircle className='text-purple-500' />
                                    <span>Regular Updates</span>
                                </div>
                            </motion.div>

                           
                        </motion.div>
                    </div>

                    <motion.div
                        style={{ opacity: opacityHero }}
                        className='absolute bottom-16 left-1/2 -translate-x-1/2'
                    >
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className='text-gray-400 text-sm flex flex-col items-center gap-1'
                        >
                            <span>Scroll to explore</span>
                            <svg className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 14l-7 7m0 0l-7-7m7 7V3' />
                            </svg>
                        </motion.div>
                    </motion.div>
                </section>

                {/* Quick Summary Cards */}
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20'>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'
                    >
                        {[
                            { icon: <FaHandshake />, title: 'Fair Use', desc: 'Responsible service usage' },
                            { icon: <FaLock />, title: 'Data Protection', desc: 'Your privacy matters' },
                            { icon: <FaClock />, title: '24/7 Support', desc: 'Always here to help' },
                            { icon: <FaShieldAlt />, title: 'Secure Platform', desc: 'Enterprise security' }
                        ].map((card, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 + idx * 0.1 }}
                                whileHover={{ y: -5 }}
                                onHoverStart={() => setHoveredCard(idx)}
                                onHoverEnd={() => setHoveredCard(null)}
                                className='bg-white rounded-2xl p-5 shadow-lg border border-gray-100 text-center'
                            >
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center text-2xl mx-auto mb-3 transition-all duration-300 ${hoveredCard === idx ? 'scale-110 bg-gradient-to-r from-purple-600 to-pink-600 text-white' : 'text-purple-600'}`}>
                                    {card.icon}
                                </div>
                                <h3 className='font-semibold text-gray-800 mb-1'>{card.title}</h3>
                                <p className='text-xs text-gray-500'>{card.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Main Content with Sidebar Navigation */}
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
                    <div className='flex flex-col lg:flex-row gap-8 items-start'>
                        {/* Sticky Sidebar Navigation */}
                        <div className='lg:w-72 flex-shrink-0 lg:sticky lg:top-24'>
                            <motion.aside
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className='bg-white rounded-2xl shadow-lg p-4 border border-gray-100'>
                                    <h3 className='text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4 px-3'>
                                        On this page
                                    </h3>
                                    <nav className='space-y-1'>
                                        {sections.map((section) => (
                                            <button
                                                key={section.id}
                                                onClick={() => scrollToSection(section.id)}
                                                className={`w-full text-left px-3 py-2.5 rounded-xl transition-all duration-300 flex items-center gap-3 text-sm font-medium group ${activeSection === section.id
                                                        ? 'bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 border-l-4 border-purple-600'
                                                        : 'text-gray-600 hover:bg-gray-50 hover:text-purple-600'
                                                    }`}
                                            >
                                                <span className={`text-lg transition-colors ${activeSection === section.id ? 'text-purple-600' : 'text-gray-400 group-hover:text-purple-500'}`}>
                                                    {section.icon}
                                                </span>
                                                <span>{section.title}</span>
                                            </button>
                                        ))}
                                    </nav>

                                    {/* Version Badge */}
                                    <div className='mt-6 pt-4 border-t border-gray-100 px-3'>
                                        <div className='bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-3 text-center'>
                                            <div className='text-2xl font-bold text-purple-600 mb-1'>3.2.0</div>
                                            <p className='text-xs text-gray-600'>
                                                Latest Version
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.aside>
                        </div>

                        {/* Content Sections */}
                        <div className='flex-1 space-y-8'>
                            {/* Agreement Section */}
                            <motion.section
                                id='agreement'
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-100px' }}
                                transition={{ duration: 0.6 }}
                                className='bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100 scroll-mt-24'
                            >
                                <div className='flex items-center gap-3 mb-6'>
                                    <div className='w-12 h-12 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white text-xl'>
                                        <FaHandshake />
                                    </div>
                                    <h2 className='text-2xl md:text-3xl font-bold text-gray-800'>Legal Agreement</h2>
                                </div>
                                <p className='text-gray-600 leading-relaxed mb-4'>
                                    These Terms of Service constitute a legally binding agreement made between you,
                                    whether personally or on behalf of an entity (&quot;you&quot;) and ISAB (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;),
                                    concerning your access to and use of the ISAB website, accreditation services, and
                                    any related applications or platforms.
                                </p>
                                <p className='text-gray-600 leading-relaxed mb-4'>
                                    By accessing or using our services, you acknowledge that you have read, understood,
                                    and agree to be bound by all of these Terms of Service. If you do not agree with all
                                    of these terms, you are expressly prohibited from using our services and must
                                    discontinue use immediately.
                                </p>
                                <div className='bg-purple-50 rounded-xl p-4 border border-purple-100 mt-4'>
                                    <div className='flex items-start gap-3'>
                                        <FaBell className='text-purple-600 mt-0.5' />
                                        <div>
                                            <p className='text-sm text-purple-800 font-medium mb-1'>Important Notice</p>
                                            <p className='text-sm text-purple-700'>
                                                Supplemental terms and conditions or documents that may be posted on our
                                                services from time to time are hereby expressly incorporated herein by reference.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.section>

                            {/* Eligibility Section */}
                            <motion.section
                                id='eligibility'
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-100px' }}
                                transition={{ duration: 0.6 }}
                                className='bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100 scroll-mt-24'
                            >
                                <div className='flex items-center gap-3 mb-6'>
                                    <div className='w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center text-white text-xl'>
                                        <FaUserCheck />
                                    </div>
                                    <h2 className='text-2xl md:text-3xl font-bold text-gray-800'>User Eligibility</h2>
                                </div>
                                <p className='text-gray-600 leading-relaxed mb-4'>
                                    By using our services, you represent and warrant that:
                                </p>
                                <div className='space-y-3'>
                                    {[
                                        'You are at least 18 years of age or the age of majority in your jurisdiction',
                                        'You have the full power and authority to enter into this agreement',
                                        'You are not located in a country that is subject to a US government embargo',
                                        'You have not been previously suspended or removed from our services',
                                        'You will provide accurate, current, and complete information'
                                    ].map((item, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.05 }}
                                            className='flex items-center gap-3'
                                        >
                                            <FaCheckCircle className='text-green-500 text-sm' />
                                            <span className='text-gray-700 text-sm'>{item}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.section>

                            {/* Services Section with SLA Table */}
                            <motion.section
                                id='services'
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-100px' }}
                                transition={{ duration: 0.6 }}
                                className='bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100 scroll-mt-24'
                            >
                                <div className='flex items-center gap-3 mb-6'>
                                    <div className='w-12 h-12 rounded-xl bg-gradient-to-r from-teal-600 to-green-600 flex items-center justify-center text-white text-xl'>
                                        <FaServer />
                                    </div>
                                    <h2 className='text-2xl md:text-3xl font-bold text-gray-800'>Services Provided</h2>
                                </div>
                                <p className='text-gray-600 leading-relaxed mb-6'>
                                    ISAB provides accreditation services including but not limited to: certification
                                    verification, accreditation assessments, standards compliance, and professional
                                    certification management.
                                </p>

                                {/* SLA Table */}
                                <div className='overflow-x-auto'>
                                    <table className='w-full text-sm'>
                                        <thead>
                                            <tr className='border-b border-gray-200'>
                                                <th className='text-left py-3 px-4 font-semibold text-gray-700'>Service Level</th>
                                                <th className='text-left py-3 px-4 font-semibold text-gray-700'>Uptime Guarantee</th>
                                                <th className='text-left py-3 px-4 font-semibold text-gray-700'>Response Time</th>
                                                <th className='text-left py-3 px-4 font-semibold text-gray-700'>Support Access</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {serviceLevels.map((sla, idx) => (
                                                <motion.tr
                                                    key={idx}
                                                    initial={{ opacity: 0 }}
                                                    whileInView={{ opacity: 1 }}
                                                    transition={{ delay: idx * 0.1 }}
                                                    className='border-b border-gray-100 hover:bg-gray-50 transition-colors'
                                                >
                                                    <td className='py-3 px-4 font-medium text-gray-800'>{sla.level}</td>
                                                    <td className='py-3 px-4 text-gray-600'>{sla.uptime}</td>
                                                    <td className='py-3 px-4 text-gray-600'>{sla.response}</td>
                                                    <td className='py-3 px-4 text-gray-600'>{sla.support}</td>
                                                </motion.tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <p className='text-xs text-gray-400 mt-4'>
                                    * Service Level Agreements may vary based on subscription tier.
                                </p>
                            </motion.section>

                            {/* Fees & Payment */}
                            <motion.section
                                id='fees'
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-100px' }}
                                transition={{ duration: 0.6 }}
                                className='bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100 scroll-mt-24'
                            >
                                <div className='flex items-center gap-3 mb-6'>
                                    <div className='w-12 h-12 rounded-xl bg-gradient-to-r from-yellow-600 to-orange-600 flex items-center justify-center text-white text-xl'>
                                        <FaMoneyBillWave />
                                    </div>
                                    <h2 className='text-2xl md:text-3xl font-bold text-gray-800'>Fees & Payment Terms</h2>
                                </div>
                                <p className='text-gray-600 leading-relaxed mb-4'>
                                    All fees for our accreditation services are outlined on our pricing page and may be
                                    subject to change with 30 days notice. Payments are processed securely through our
                                    payment partners.
                                </p>
                                <div className='grid sm:grid-cols-2 gap-4'>
                                    <div className='bg-gray-50 rounded-xl p-4'>
                                        <div className='text-sm font-semibold text-gray-700 mb-2'>Payment Methods</div>
                                        <div className='flex gap-2 flex-wrap'>
                                            {['Credit Card', 'Bank Transfer', 'PayPal', 'Wire Transfer'].map((method, idx) => (
                                                <span key={idx} className='text-xs bg-white px-2 py-1 rounded border border-gray-200'>{method}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className='bg-gray-50 rounded-xl p-4'>
                                        <div className='text-sm font-semibold text-gray-700 mb-2'>Refund Policy</div>
                                        <p className='text-xs text-gray-600'>All accreditation fees are non-refundable once the assessment process has begun.</p>
                                    </div>
                                </div>
                            </motion.section>

                            {/* Intellectual Property */}
                            <motion.section
                                id='intellectual'
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-100px' }}
                                transition={{ duration: 0.6 }}
                                className='bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100 scroll-mt-24'
                            >
                                <div className='flex items-center gap-3 mb-6'>
                                    <div className='w-12 h-12 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white text-xl'>
                                        <FaCopyright />
                                    </div>
                                    <h2 className='text-2xl md:text-3xl font-bold text-gray-800'>Intellectual Property</h2>
                                </div>
                                <p className='text-gray-600 leading-relaxed mb-4'>
                                    Our services, including all content, features, and functionality, are owned by ISAB
                                    and are protected by international copyright, trademark, patent, trade secret, and
                                    other intellectual property laws.
                                </p>
                                <div className='bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4'>
                                    <p className='text-sm text-indigo-800'>
                                        You may not reproduce, distribute, modify, create derivative works of, publicly
                                        display, or transmit any of our intellectual property without our prior written consent.
                                    </p>
                                </div>
                            </motion.section>

                            {/* Prohibited Conduct */}
                            <motion.section
                                id='prohibited'
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-100px' }}
                                transition={{ duration: 0.6 }}
                                className='bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100 scroll-mt-24'
                            >
                                <div className='flex items-center gap-3 mb-6'>
                                    <div className='w-12 h-12 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 flex items-center justify-center text-white text-xl'>
                                        <FaBan />
                                    </div>
                                    <h2 className='text-2xl md:text-3xl font-bold text-gray-800'>Prohibited Conduct</h2>
                                </div>
                                <p className='text-gray-600 leading-relaxed mb-6'>
                                    You agree not to use our services for any unlawful purpose or in any way that could
                                    damage, disable, overburden, or impair our platform.
                                </p>
                                <div className='grid sm:grid-cols-2 gap-3'>
                                    {prohibitedItems.map((item, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: idx * 0.05 }}
                                            className='flex items-center gap-2 p-2 rounded-lg bg-red-50'
                                        >
                                            <FaExclamationTriangle className='text-red-500 text-xs' />
                                            <span className='text-sm text-gray-700'>{item}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.section>

                            {/* Termination */}
                            <motion.section
                                id='termination'
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-100px' }}
                                transition={{ duration: 0.6 }}
                                className='bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100 scroll-mt-24'
                            >
                                <div className='flex items-center gap-3 mb-6'>
                                    <div className='w-12 h-12 rounded-xl bg-gradient-to-r from-gray-600 to-gray-800 flex items-center justify-center text-white text-xl'>
                                        <FaGavel />
                                    </div>
                                    <h2 className='text-2xl md:text-3xl font-bold text-gray-800'>Termination</h2>
                                </div>
                                <p className='text-gray-600 leading-relaxed mb-4'>
                                    We reserve the right to terminate or suspend your account immediately, without prior
                                    notice or liability, for any reason whatsoever, including without limitation if you
                                    breach these Terms of Service.
                                </p>
                                <p className='text-gray-600 leading-relaxed'>
                                    Upon termination, your right to use our services will immediately cease. You may also
                                    terminate this agreement by discontinuing use of our services and deleting your account.
                                </p>
                            </motion.section>

                            {/* Limitation of Liability */}
                            <motion.section
                                id='liability'
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-100px' }}
                                transition={{ duration: 0.6 }}
                                className='bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100 scroll-mt-24'
                            >
                                <div className='flex items-center gap-3 mb-6'>
                                    <div className='w-12 h-12 rounded-xl bg-gradient-to-r from-orange-600 to-red-600 flex items-center justify-center text-white text-xl'>
                                        <FaExclamationTriangle />
                                    </div>
                                    <h2 className='text-2xl md:text-3xl font-bold text-gray-800'>Limitation of Liability</h2>
                                </div>
                                <p className='text-gray-600 leading-relaxed mb-4'>
                                    To the fullest extent permitted by law, in no event shall ISAB be liable for any
                                    indirect, incidental, special, consequential, or punitive damages, including without
                                    limitation, loss of profits, data, use, goodwill, or other intangible losses.
                                </p>
                                <div className='bg-amber-50 rounded-xl p-4 border border-amber-100'>
                                    <p className='text-sm text-amber-800'>
                                        Our total liability to you for all claims arising from or relating to these terms
                                        or your use of our services shall not exceed the amount you have paid to us in the
                                        past twelve months.
                                    </p>
                                </div>
                            </motion.section>

                            {/* Governing Law */}
                            <motion.section
                                id='governing'
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-100px' }}
                                transition={{ duration: 0.6 }}
                                className='bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100 scroll-mt-24'
                            >
                                <div className='flex items-center gap-3 mb-6'>
                                    <div className='w-12 h-12 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 flex items-center justify-center text-white text-xl'>
                                        <FaBalanceScale />
                                    </div>
                                    <h2 className='text-2xl md:text-3xl font-bold text-gray-800'>Governing Law</h2>
                                </div>
                                <p className='text-gray-600 leading-relaxed mb-4'>
                                    These Terms of Service shall be governed by and construed in accordance with the laws
                                    of the State of Delaware, without regard to its conflict of law provisions.
                                </p>
                                <p className='text-gray-600 leading-relaxed'>
                                    Any legal action or proceeding arising under these terms shall be brought exclusively
                                    in the federal or state courts located in Wilmington, Delaware, and you consent to the
                                    personal jurisdiction of such courts.
                                </p>
                            </motion.section>

                            {/* Contact Section */}
                            <motion.section
                                id='contact'
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-100px' }}
                                transition={{ duration: 0.6 }}
                                className='bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-3xl shadow-xl p-8 md:p-10 text-white scroll-mt-24'
                            >
                                <div className='flex items-center gap-3 mb-6'>
                                    <div className='w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center text-white text-xl'>
                                        <FaEnvelope />
                                    </div>
                                    <h2 className='text-2xl md:text-3xl font-bold'>Contact Us</h2>
                                </div>
                                <p className='text-white/80 leading-relaxed mb-6'>
                                    If you have any questions about these Terms of Service, please contact our legal
                                    department:
                                </p>
                                <div className='space-y-3 mb-6'>
                                    <div className='flex items-center gap-3'>
                                        <FaEnvelope className='text-white/60' />
                                        <span>legal@isab.org</span>
                                    </div>
                                    <div className='flex items-center gap-3'>
                                        <FaWhatsapp className='text-white/60' />
                                        <span>+1 (888) 123-4567</span>
                                    </div>
                                    <div className='flex items-center gap-3'>
                                        <FaGlobe className='text-white/60' />
                                        <span>www.isab.org/legal</span>
                                    </div>
                                </div>
                                <div className='flex flex-wrap gap-3'>
                                    <button className='px-6 py-2.5 bg-white text-purple-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors'>
                                        Download Terms (PDF)
                                    </button>
                                    <button className='px-6 py-2.5 bg-white/20 backdrop-blur rounded-xl font-semibold hover:bg-white/30 transition-colors'>
                                        Request Legal Review
                                    </button>
                                </div>
                            </motion.section>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}


