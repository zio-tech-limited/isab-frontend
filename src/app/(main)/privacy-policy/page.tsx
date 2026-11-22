// app/privacy-policy/page.tsx
'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  FaShieldAlt,
  FaDatabase,
  FaCookieBite,
  FaUserSecret,
  FaEnvelope,
  FaGlobe,
  FaGavel,
  FaCheckCircle,
  FaArrowUp,
  FaLock,
  FaServer,
  FaChartLine,
  FaUsers,
  FaFileContract,
  FaWhatsapp,
  FaHeadset
} from 'react-icons/fa';

export default function PrivacyPolicyPage() {
  const { scrollYProgress } = useScroll();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');

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
    { id: 'overview', title: 'Overview', icon: <FaShieldAlt /> },
    { id: 'information', title: 'Information We Collect', icon: <FaDatabase /> },
    { id: 'usage', title: 'How We Use Data', icon: <FaChartLine /> },
    { id: 'cookies', title: 'Cookies & Tracking', icon: <FaCookieBite /> },
    { id: 'sharing', title: 'Data Sharing', icon: <FaUsers /> },
    { id: 'security', title: 'Security Measures', icon: <FaLock /> },
    { id: 'rights', title: 'Your Rights', icon: <FaUserSecret /> },
    { id: 'contact', title: 'Contact Us', icon: <FaEnvelope /> }
  ];

  const lastUpdated = 'June 11, 2026';

  return (
    <>
      {/* Progress Bar */}
      <motion.div
        className='fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 z-50 origin-left'
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
            className='fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group'
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
            <div className='absolute inset-0 bg-gradient-to-br from-green-900/20 via-blue-900/10 to-purple-900/20' />
            <motion.div
              style={{ y: backgroundY }}
              className='absolute top-20 left-10 w-72 h-72 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse'
            />
            <motion.div
              style={{ y: backgroundY }}
              className='absolute bottom-20 right-10 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000'
            />
            <motion.div
              style={{ y: backgroundY }}
              className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10'
            />
          </div>

          {/* Floating particles */}
          <div className='absolute inset-0 pointer-events-none'>
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className='absolute w-1 h-1 bg-green-500/30 rounded-full'
                initial={{
                  x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                  y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                }}
                animate={{
                  y: [null, -100, -200],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 5,
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
                <span className='text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-blue-600 to-purple-600'>
                  Privacy Policy
                </span>
              </h1>

              <p className='text-lg md:text-xl text-gray-600 max-w-2xl mx-auto'>
                Your trust is our priority. We are committed to protecting your
                personal information with the highest standards of security and
                transparency.
              </p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className='mt-8 flex flex-wrap gap-3 justify-center'
              >
                <div className='flex items-center gap-2 text-sm text-gray-500 bg-white/50 backdrop-blur rounded-full px-4 py-1.5'>
                  <FaCheckCircle className='text-green-500' />
                  <span>GDPR Compliant</span>
                </div>
                <div className='flex items-center gap-2 text-sm text-gray-500 bg-white/50 backdrop-blur rounded-full px-4 py-1.5'>
                  <FaCheckCircle className='text-green-500' />
                  <span>CCPA Ready</span>
                </div>
                <div className='flex items-center gap-2 text-sm text-gray-500 bg-white/50 backdrop-blur rounded-full px-4 py-1.5'>
                  <FaCheckCircle className='text-green-500' />
                  <span>ISO 27001 Certified</span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            style={{ opacity: opacityHero }}
            className='absolute bottom-10 left-1/2 -translate-x-1/2'
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

        {/* Main Content with Sidebar Navigation - Fixed sticky positioning */}
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
          <div className='flex flex-col lg:flex-row gap-8 items-start'>
            {/* Sticky Sidebar Navigation - FIXED */}
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
                        className={`w-full text-left px-3 py-2.5 rounded-xl transition-all duration-300 flex items-center gap-3 text-sm font-medium group ${
                          activeSection === section.id
                            ? 'bg-gradient-to-r from-green-50 to-blue-50 text-green-700 border-l-4 border-green-600'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-green-600'
                        }`}
                      >
                        <span className={`text-lg transition-colors ${activeSection === section.id ? 'text-green-600' : 'text-gray-400 group-hover:text-green-500'}`}>
                          {section.icon}
                        </span>
                        <span>{section.title}</span>
                      </button>
                    ))}
                  </nav>

                  {/* Trust Badge */}
                  <div className='mt-6 pt-4 border-t border-gray-100 px-3'>
                    <div className='bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-3 text-center'>
                      <div className='flex justify-center gap-1 mb-2'>
                        {[1, 2, 3, 4, 5].map((i) => (
                          <FaCheckCircle key={i} className='text-green-500 text-xs' />
                        ))}
                      </div>
                      <p className='text-xs text-gray-600'>
                        Trusted by <strong className='text-green-600'>10,000+</strong> organizations
                      </p>
                    </div>
                  </div>
                </div>
              </motion.aside>
            </div>

            {/* Content Sections */}
            <div className='flex-1 space-y-8'>
              {/* Overview Section */}
              <motion.section
                id='overview'
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6 }}
                className='bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100 scroll-mt-24'
              >
                <div className='flex items-center gap-3 mb-6'>
                  <div className='w-12 h-12 rounded-xl bg-gradient-to-r from-green-600 to-blue-600 flex items-center justify-center text-white text-xl'>
                    <FaShieldAlt />
                  </div>
                  <h2 className='text-2xl md:text-3xl font-bold text-gray-800'>Overview</h2>
                </div>
                <p className='text-gray-600 leading-relaxed mb-4'>
                  At ISAB, we take your privacy seriously. This Privacy Policy explains how we collect,
                  use, disclose, and safeguard your information when you visit our website or use our
                  accreditation services. Please read this privacy policy carefully. If you do not agree
                  with the terms of this privacy policy, please do not access the site.
                </p>
                <p className='text-gray-600 leading-relaxed'>
                  We reserve the right to make changes to this Privacy Policy at any time and for any
                  reason. We will alert you about any changes by updating the &quot;Last Updated&quot; date of
                  this Privacy Policy. You are encouraged to periodically review this Privacy Policy to
                  stay informed of updates.
                </p>

                {/* Key principles */}
                <div className='grid sm:grid-cols-3 gap-4 mt-8'>
                  {[
                    { title: 'Transparency', desc: 'Clear about data usage' },
                    { title: 'Security', desc: 'Enterprise-grade protection' },
                    { title: 'Control', desc: 'You own your data' }
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      className='bg-gray-50 rounded-xl p-4 text-center'
                    >
                      <div className='font-semibold text-gray-800 mb-1'>{item.title}</div>
                      <div className='text-xs text-gray-500'>{item.desc}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              {/* Information We Collect */}
              <motion.section
                id='information'
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6 }}
                className='bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100 scroll-mt-24'
              >
                <div className='flex items-center gap-3 mb-6'>
                  <div className='w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center text-white text-xl'>
                    <FaDatabase />
                  </div>
                  <h2 className='text-2xl md:text-3xl font-bold text-gray-800'>Information We Collect</h2>
                </div>
                <p className='text-gray-600 leading-relaxed mb-6'>
                  We collect information that you voluntarily provide to us when you register on the
                  website, express an interest in our services, participate in activities, or contact us.
                </p>

                <div className='space-y-6'>
                  <div className='group'>
                    <div className='flex items-center gap-2 mb-2'>
                      <FaUserSecret className='text-green-600' />
                      <h3 className='font-semibold text-gray-800'>Personal Data</h3>
                    </div>
                    <p className='text-sm text-gray-500 pl-6'>
                      Name, email address, phone number, job title, organization details, and any other
                      information you choose to provide.
                    </p>
                  </div>
                  <div className='group'>
                    <div className='flex items-center gap-2 mb-2'>
                      <FaServer className='text-blue-600' />
                      <h3 className='font-semibold text-gray-800'>Usage Data</h3>
                    </div>
                    <p className='text-sm text-gray-500 pl-6'>
                      IP address, browser type, device information, pages visited, time spent, and other
                      diagnostic data.
                    </p>
                  </div>
                  <div className='group'>
                    <div className='flex items-center gap-2 mb-2'>
                      <FaFileContract className='text-purple-600' />
                      <h3 className='font-semibold text-gray-800'>Accreditation Data</h3>
                    </div>
                    <p className='text-sm text-gray-500 pl-6'>
                      Certificate details, audit reports, assessment results, and compliance documentation
                      necessary for accreditation services.
                    </p>
                  </div>
                </div>

                {/* Data flow visualization */}
                <div className='mt-8 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6'>
                  <div className='text-center text-sm text-gray-500 mb-4'>How Your Data Flows</div>
                  <div className='flex items-center justify-between flex-wrap gap-4'>
                    {['You', 'Our Platform', 'Secure Storage', 'Accreditation'].map((step, idx) => (
                      <div key={idx} className='flex items-center'>
                        <div className='text-center'>
                          <div className='w-10 h-10 rounded-full bg-white shadow flex items-center justify-center text-sm font-semibold text-gray-700'>
                            {idx + 1}
                          </div>
                          <div className='text-xs text-gray-500 mt-1'>{step}</div>
                        </div>
                        {idx < 3 && (
                          <div className='text-gray-300 mx-2'>
                            <svg className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                            </svg>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.section>

              {/* How We Use Data */}
              <motion.section
                id='usage'
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6 }}
                className='bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100 scroll-mt-24'
              >
                <div className='flex items-center gap-3 mb-6'>
                  <div className='w-12 h-12 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white text-xl'>
                    <FaChartLine />
                  </div>
                  <h2 className='text-2xl md:text-3xl font-bold text-gray-800'>How We Use Your Data</h2>
                </div>
                <div className='grid sm:grid-cols-2 gap-5'>
                  {[
                    'Process accreditation applications',
                    'Verify certificate authenticity',
                    'Send important notifications',
                    'Improve our services',
                    'Comply with legal obligations',
                    'Prevent fraudulent activities'
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className='flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors'
                    >
                      <FaCheckCircle className='text-green-500 flex-shrink-0' />
                      <span className='text-gray-700 text-sm'>{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              {/* Cookies & Tracking */}
              <motion.section
                id='cookies'
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6 }}
                className='bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100 scroll-mt-24'
              >
                <div className='flex items-center gap-3 mb-6'>
                  <div className='w-12 h-12 rounded-xl bg-gradient-to-r from-orange-600 to-red-600 flex items-center justify-center text-white text-xl'>
                    <FaCookieBite />
                  </div>
                  <h2 className='text-2xl md:text-3xl font-bold text-gray-800'>Cookies & Tracking</h2>
                </div>
                <p className='text-gray-600 leading-relaxed mb-4'>
                  We use cookies and similar tracking technologies to track activity on our website and
                  store certain information. Cookies are files with a small amount of data which may
                  include an anonymous unique identifier.
                </p>
                <div className='bg-amber-50 rounded-xl p-4 border border-amber-100'>
                  <p className='text-sm text-amber-800'>
                    <strong>Your Choice:</strong> You can instruct your browser to refuse all cookies or
                    to indicate when a cookie is being sent. However, if you do not accept cookies, you
                    may not be able to use some portions of our website.
                  </p>
                </div>
              </motion.section>

              {/* Data Sharing */}
              <motion.section
                id='sharing'
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6 }}
                className='bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100 scroll-mt-24'
              >
                <div className='flex items-center gap-3 mb-6'>
                  <div className='w-12 h-12 rounded-xl bg-gradient-to-r from-teal-600 to-green-600 flex items-center justify-center text-white text-xl'>
                    <FaUsers />
                  </div>
                  <h2 className='text-2xl md:text-3xl font-bold text-gray-800'>Data Sharing</h2>
                </div>
                <p className='text-gray-600 leading-relaxed mb-4'>
                  We do not sell, trade, or rent your personal information to third parties. We may share
                  your information in the following limited circumstances:
                </p>
                <ul className='list-disc list-inside text-gray-600 space-y-2 ml-4'>
                  <li>With your consent</li>
                  <li>To comply with legal obligations</li>
                  <li>With service providers who assist in our operations</li>
                  <li>In connection with a business transfer or acquisition</li>
                </ul>
              </motion.section>

              {/* Security Measures */}
              <motion.section
                id='security'
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6 }}
                className='bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100 scroll-mt-24'
              >
                <div className='flex items-center gap-3 mb-6'>
                  <div className='w-12 h-12 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 flex items-center justify-center text-white text-xl'>
                    <FaLock />
                  </div>
                  <h2 className='text-2xl md:text-3xl font-bold text-gray-800'>Security Measures</h2>
                </div>
                <p className='text-gray-600 leading-relaxed mb-4'>
                  We implement industry-standard security measures to protect your personal information.
                  These include:
                </p>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
                  {['256-bit SSL Encryption', 'Regular Security Audits', 'Access Controls', 'Data Backup & Recovery'].map((item, idx) => (
                    <div key={idx} className='bg-gray-50 rounded-lg p-3 text-center'>
                      <div className='text-xs font-medium text-gray-700'>{item}</div>
                    </div>
                  ))}
                </div>
              </motion.section>

              {/* Your Rights */}
              <motion.section
                id='rights'
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6 }}
                className='bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100 scroll-mt-24'
              >
                <div className='flex items-center gap-3 mb-6'>
                  <div className='w-12 h-12 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white text-xl'>
                    <FaGavel />
                  </div>
                  <h2 className='text-2xl md:text-3xl font-bold text-gray-800'>Your Rights</h2>
                </div>
                <p className='text-gray-600 leading-relaxed mb-4'>
                  Depending on your location, you may have certain rights regarding your personal information:
                </p>
                <div className='space-y-3'>
                  {[
                    'Right to access your personal data',
                    'Right to rectification of inaccurate data',
                    'Right to erasure (right to be forgotten)',
                    'Right to restrict processing',
                    'Right to data portability',
                    'Right to object to processing'
                  ].map((right, idx) => (
                    <div key={idx} className='flex items-center gap-2 text-sm text-gray-700'>
                      <FaCheckCircle className='text-green-500 text-xs' />
                      <span>{right}</span>
                    </div>
                  ))}
                </div>
              </motion.section>

              {/* Contact Us */}
              <motion.section
                id='contact'
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6 }}
                className='bg-gradient-to-r from-green-600 to-blue-600 rounded-3xl shadow-xl p-8 md:p-10 text-white scroll-mt-24'
              >
                <div className='flex items-center gap-3 mb-6'>
                  <div className='w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center text-white text-xl'>
                    <FaEnvelope />
                  </div>
                  <h2 className='text-2xl md:text-3xl font-bold'>Contact Us</h2>
                </div>
                <p className='text-white/80 leading-relaxed mb-6'>
                  If you have any questions about this Privacy Policy or our data practices, please
                  contact our Data Protection Officer:
                </p>
                <div className='space-y-3 mb-6'>
                  <div className='flex items-center gap-3'>
                    <FaEnvelope className='text-white/60' />
                    <span>privacy@isab.org</span>
                  </div>
                  <div className='flex items-center gap-3'>
                    <FaWhatsapp className='text-white/60' />
                    <span>+1 (888) 123-4567</span>
                  </div>
                  <div className='flex items-center gap-3'>
                    <FaHeadset className='text-white/60' />
                    <span>Available 24/7 for privacy concerns</span>
                  </div>
                </div>
                <div className='flex flex-wrap gap-3'>
                  <button className='px-6 py-2.5 bg-white text-green-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors'>
                    Submit Privacy Request
                  </button>
                  <button className='px-6 py-2.5 bg-white/20 backdrop-blur rounded-xl font-semibold hover:bg-white/30 transition-colors'>
                    Download Privacy Policy (PDF)
                  </button>
                </div>
              </motion.section>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className='text-center py-12 border-t border-gray-200'
        >
          <div className='max-w-3xl mx-auto px-4'>
            <FaGlobe className='text-3xl text-gray-300 mx-auto mb-3' />
            <p className='text-sm text-gray-500'>
              This Privacy Policy applies to all ISAB websites, services, and applications.
              Last updated: {lastUpdated}
            </p>
            <div className='flex justify-center gap-6 mt-4 text-xs text-gray-400'>
              <Link href='/' className='hover:text-green-600 transition-colors'>Home</Link>
              <Link href='/terms' className='hover:text-green-600 transition-colors'>Terms of Service</Link>
              <Link href='/cookies' className='hover:text-green-600 transition-colors'>Cookie Policy</Link>
            </div>
          </div>
        </motion.div>
      </main>
    </>
  );
}