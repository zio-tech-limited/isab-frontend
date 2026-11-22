// app/cookies/page.tsx
'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  FaCookieBite,
  FaCookie,
  FaUserCog,
  FaChartLine,
  FaAd,
  FaShieldAlt,
  FaCheckCircle,
  FaArrowUp,
  FaGlobe,
  FaEnvelope,
  FaWhatsapp,
  FaSlidersH,
  FaDatabase,
  FaClock,
  FaToggleOn,
  FaToggleOff,
  FaInfoCircle,
  FaExternalLinkAlt,
  FaTrashAlt,
  FaSyncAlt,
  FaMobileAlt,
  FaLaptop,
  FaTabletAlt
} from 'react-icons/fa';

export default function CookiePolicyPage() {
  const { scrollYProgress } = useScroll();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState('what-are-cookies');
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true,
    functional: true,
    analytics: false,
    marketing: false
  });
  const [showPreferences, setShowPreferences] = useState(false);

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

  const togglePreference = (key: keyof typeof cookiePreferences) => {
    if (key === 'necessary') return; // Necessary cookies cannot be disabled
    setCookiePreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const sections = [
    { id: 'what-are-cookies', title: 'What Are Cookies', icon: <FaCookieBite /> },
    { id: 'how-we-use', title: 'How We Use Cookies', icon: <FaDatabase /> },
    { id: 'types-of-cookies', title: 'Types of Cookies', icon: <FaCookie /> },
    { id: 'third-party', title: 'Third-Party Cookies', icon: <FaExternalLinkAlt /> },
    { id: 'managing-cookies', title: 'Managing Cookies', icon: <FaSlidersH /> },
    { id: 'preferences', title: 'Your Preferences', icon: <FaUserCog /> },
    { id: 'contact', title: 'Contact Us', icon: <FaEnvelope /> }
  ];

  const lastUpdated = 'June 11, 2026';

  const cookieTypes = [
    {
      type: 'Necessary Cookies',
      icon: <FaShieldAlt />,
      description: 'Essential for website functionality. Cannot be disabled.',
      duration: 'Session',
      color: 'from-green-600 to-teal-600'
    },
    {
      type: 'Functional Cookies',
      icon: <FaUserCog />,
      description: 'Remember your preferences and enhance user experience.',
      duration: '1 year',
      color: 'from-blue-600 to-cyan-600'
    },
    {
      type: 'Analytics Cookies',
      icon: <FaChartLine />,
      description: 'Help us understand how visitors interact with our website.',
      duration: '2 years',
      color: 'from-purple-600 to-pink-600'
    },
    {
      type: 'Marketing Cookies',
      icon: <FaAd />,
      description: 'Track browsing habits to deliver relevant advertisements.',
      duration: '90 days',
      color: 'from-orange-600 to-red-600'
    }
  ];

  const thirdPartyCookies = [
    { name: 'Google Analytics', purpose: 'Website analytics and user behavior', privacyLink: 'https://policies.google.com/privacy' },
    { name: 'HubSpot', purpose: 'Marketing automation and CRM', privacyLink: 'https://legal.hubspot.com/privacy-policy' },
    { name: 'Hotjar', purpose: 'User experience analytics', privacyLink: 'https://www.hotjar.com/legal/policies/privacy/' },
    { name: 'LinkedIn', purpose: 'Professional networking and advertising', privacyLink: 'https://www.linkedin.com/legal/privacy-policy' }
  ];

  return (
    <>
      {/* Progress Bar */}
      <motion.div
        className='fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 z-50 origin-left'
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
            className='fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group'
          >
            <FaArrowUp className='group-hover:-translate-y-1 transition-transform' />
          </motion.button>
        )}
      </AnimatePresence>

      <main className='bg-gradient-to-b from-gray-50 via-white to-gray-100 py-20 '>
        {/* Hero Section with Parallax */}
        <section className='relative min-h-[65vh] flex items-center justify-center overflow-hidden'>
          {/* Animated Background */}
          <div className='absolute inset-0'>
            <div className='absolute inset-0 bg-gradient-to-br from-amber-900/20 via-yellow-900/10 to-orange-900/20' />
            <motion.div
              style={{ y: backgroundY }}
              className='absolute top-20 left-10 w-72 h-72 bg-amber-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse'
            />
            <motion.div
              style={{ y: backgroundY }}
              className='absolute bottom-20 right-10 w-96 h-96 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000'
            />
            <motion.div
              style={{ y: backgroundY }}
              className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10'
            />
          </div>

          {/* Floating cookie particles */}
          <div className='absolute inset-0 pointer-events-none'>
            {[...Array(25)].map((_, i) => (
              <motion.div
                key={i}
                className='absolute text-amber-500/20'
                initial={{
                  x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                  y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                  rotate: Math.random() * 360,
                }}
                animate={{
                  y: [null, -100, -200],
                  x: [null, Math.random() * 100 - 50, Math.random() * 100 - 50],
                  opacity: [0, 0.3, 0],
                  rotate: [null, Math.random() * 720, Math.random() * 1080]
                }}
                transition={{
                  duration: 5 + Math.random() * 6,
                  repeat: Infinity,
                  delay: Math.random() * 7,
                }}
              >
                <FaCookieBite className='w-6 h-6' />
              </motion.div>
            ))}
          </div>

          <div className='relative z-10 text-center px-4 max-w-4xl mx-auto'>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, type: 'spring' }}
            >

              <h1 className='text-5xl md:text-7xl lg:text-8xl font-bold my-6'>
                <span className='text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600'>
                  Cookie Policy
                </span>
              </h1>

              <p className='text-lg md:text-xl text-gray-600 max-w-2xl mx-auto'>
                We use cookies to enhance your browsing experience, analyze site traffic,
                and personalize content. Learn how we use cookies and your choices.
              </p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className='mt-8 flex flex-wrap gap-3 justify-center'
              >
                <div className='flex items-center gap-2 text-sm text-gray-500 bg-white/50 backdrop-blur rounded-full px-4 py-1.5'>
                  <FaCheckCircle className='text-amber-500' />
                  <span>GDPR Compliant</span>
                </div>
                <div className='flex items-center gap-2 text-sm text-gray-500 bg-white/50 backdrop-blur rounded-full px-4 py-1.5'>
                  <FaCheckCircle className='text-amber-500' />
                  <span>ePrivacy Directive</span>
                </div>
                <div className='flex items-center gap-2 text-sm text-gray-500 bg-white/50 backdrop-blur rounded-full px-4 py-1.5'>
                  <FaCheckCircle className='text-amber-500' />
                  <span>CCPA Compliant</span>
                </div>
              </motion.div>

              {/* Cookie preference button */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                onClick={() => setShowPreferences(true)}
                className='mt-8 px-6 py-2.5 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 inline-flex items-center gap-2'
              >
                <FaSlidersH />
                <span>Manage Cookie Preferences</span>
              </motion.button>
            </motion.div>
          </div>

        
        </section>

        {/* Cookie Stats Cards */}
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'
          >
            {[
              { icon: <FaCookieBite />, title: 'Cookies Used', value: '12', desc: 'Active on our site' },
              { icon: <FaClock />, title: 'Retention Period', value: 'Up to 2', desc: 'Years maximum' },
              { icon: <FaDatabase />, title: 'Data Collected', value: 'Anonymous', desc: 'No PII stored' },
              { icon: <FaShieldAlt />, title: 'Security Level', value: '256-bit', desc: 'Encryption' }
            ].map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + idx * 0.1 }}
                whileHover={{ y: -5 }}
                className='bg-white rounded-2xl p-5 shadow-lg border border-gray-100 text-center'
              >
                <div className='w-12 h-12 rounded-xl bg-gradient-to-r from-amber-100 to-orange-100 flex items-center justify-center text-2xl mx-auto mb-3 text-amber-600'>
                  {card.icon}
                </div>
                <div className='text-2xl font-bold text-gray-800'>{card.value}</div>
                <h3 className='font-semibold text-gray-700 text-sm mt-1'>{card.title}</h3>
                <p className='text-xs text-gray-400'>{card.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Cookie Preferences Modal */}
        <AnimatePresence>
          {showPreferences && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm'
              onClick={() => setShowPreferences(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className='bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl'
              >
                <div className='flex items-center justify-between mb-4'>
                  <div className='flex items-center gap-2'>
                    <FaSlidersH className='text-amber-600 text-xl' />
                    <h2 className='text-xl font-bold text-gray-800'>Cookie Preferences</h2>
                  </div>
                  <button onClick={() => setShowPreferences(false)} className='text-gray-400 hover:text-gray-600 text-2xl'>
                    ×
                  </button>
                </div>
                <p className='text-sm text-gray-600 mb-6'>
                  Customize your cookie settings below. Necessary cookies are always enabled
                  as they are essential for website functionality.
                </p>
                <div className='space-y-4'>
                  {cookieTypes.map((cookie) => (
                    <div key={cookie.type} className='flex items-center justify-between p-3 bg-gray-50 rounded-xl'>
                      <div>
                        <div className='flex items-center gap-2'>
                          <span className={`text-${cookie.color.split(' ')[1]}`}>{cookie.icon}</span>
                          <span className='font-medium text-gray-800'>{cookie.type}</span>
                        </div>
                        <p className='text-xs text-gray-500 mt-1'>{cookie.description}</p>
                      </div>
                      <button
                        onClick={() => togglePreference(cookie.type === 'Necessary Cookies' ? 'necessary' : 
                                                       cookie.type === 'Functional Cookies' ? 'functional' :
                                                       cookie.type === 'Analytics Cookies' ? 'analytics' : 'marketing')}
                        disabled={cookie.type === 'Necessary Cookies'}
                        className={`transition-all duration-300 ${
                          cookie.type === 'Necessary Cookies' 
                            ? 'opacity-50 cursor-not-allowed' 
                            : 'cursor-pointer'
                        }`}
                      >
                        {cookie.type === 'Necessary Cookies' ? (
                          <FaCheckCircle className='text-green-500 text-2xl' />
                        ) : (cookiePreferences[cookie.type === 'Functional Cookies' ? 'functional' : 
                                                cookie.type === 'Analytics Cookies' ? 'analytics' : 'marketing'] ? (
                          <FaToggleOn className='text-amber-600 text-2xl' />
                        ) : (
                          <FaToggleOff className='text-gray-400 text-2xl' />
                        ))}
                      </button>
                    </div>
                  ))}
                </div>
                <div className='flex gap-3 mt-6'>
                  <button
                    onClick={() => setShowPreferences(false)}
                    className='flex-1 px-4 py-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all'
                  >
                    Save Preferences
                  </button>
                  <button
                    onClick={() => {
                      setCookiePreferences({ necessary: true, functional: true, analytics: false, marketing: false });
                      setShowPreferences(false);
                    }}
                    className='px-4 py-2 border border-gray-300 rounded-xl text-gray-600 hover:bg-gray-50 transition-all'
                  >
                    Accept All
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

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
                        className={`w-full text-left px-3 py-2.5 rounded-xl transition-all duration-300 flex items-center gap-3 text-sm font-medium group ${
                          activeSection === section.id
                            ? 'bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 border-l-4 border-amber-600'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-amber-600'
                        }`}
                      >
                        <span className={`text-lg transition-colors ${activeSection === section.id ? 'text-amber-600' : 'text-gray-400 group-hover:text-amber-500'}`}>
                          {section.icon}
                        </span>
                        <span>{section.title}</span>
                      </button>
                    ))}
                  </nav>

                  {/* Cookie Notice Badge */}
                  <div className='mt-6 pt-4 border-t border-gray-100 px-3'>
                    <div className='bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-3 text-center'>
                      <FaCookieBite className='text-2xl text-amber-600 mx-auto mb-2' />
                      <p className='text-xs text-gray-600'>
                        By using our website, you consent to our use of cookies.
                      </p>
                      <button 
                        onClick={() => setShowPreferences(true)}
                        className='mt-2 text-xs text-amber-600 font-medium hover:underline'
                      >
                        Update Preferences →
                      </button>
                    </div>
                  </div>
                </div>
              </motion.aside>
            </div>

            {/* Content Sections */}
            <div className='flex-1 space-y-8'>
              {/* What Are Cookies */}
              <motion.section
                id='what-are-cookies'
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6 }}
                className='bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100 scroll-mt-24'
              >
                <div className='flex items-center gap-3 mb-6'>
                  <div className='w-12 h-12 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 flex items-center justify-center text-white text-xl'>
                    <FaCookieBite />
                  </div>
                  <h2 className='text-2xl md:text-3xl font-bold text-gray-800'>What Are Cookies?</h2>
                </div>
                <p className='text-gray-600 leading-relaxed mb-4'>
                  Cookies are small text files that are placed on your computer, smartphone, or other
                  device when you visit a website. They are widely used to make websites work more
                  efficiently, enhance user experience, and provide valuable information to website owners.
                </p>
                <p className='text-gray-600 leading-relaxed'>
                  Cookies do not typically contain any information that personally identifies a user,
                  but personal information that we store about you may be linked to the information
                  stored in and obtained from cookies.
                </p>

                {/* Device icons */}
                <div className='flex justify-center gap-8 mt-8'>
                  {[<FaLaptop key="laptop" />, <FaMobileAlt key="mobile" />, <FaTabletAlt key="tablet" />].map((icon, idx) => (
                    <div key={idx} className='text-center'>
                      <div className='w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-amber-600 text-xl'>
                        {icon}
                      </div>
                      <span className='text-xs text-gray-500 mt-1 block'>Device</span>
                    </div>
                  ))}
                </div>
              </motion.section>

              {/* How We Use Cookies */}
              <motion.section
                id='how-we-use'
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
                  <h2 className='text-2xl md:text-3xl font-bold text-gray-800'>How We Use Cookies</h2>
                </div>
                <p className='text-gray-600 leading-relaxed mb-6'>
                  We use cookies for various purposes to improve your experience on our website:
                </p>
                <div className='grid sm:grid-cols-2 gap-4'>
                  {[
                    'To authenticate users and maintain session security',
                    'To remember your preferences and settings',
                    'To analyze how you use our website and improve performance',
                    'To deliver relevant content and advertisements',
                    'To track engagement with our accreditation services',
                    'To prevent fraud and enhance platform security'
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className='flex items-center gap-3 p-2'
                    >
                      <FaCheckCircle className='text-amber-500 text-sm' />
                      <span className='text-gray-700 text-sm'>{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              {/* Types of Cookies */}
              <motion.section
                id='types-of-cookies'
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6 }}
                className='bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100 scroll-mt-24'
              >
                <div className='flex items-center gap-3 mb-6'>
                  <div className='w-12 h-12 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white text-xl'>
                    <FaCookie />
                  </div>
                  <h2 className='text-2xl md:text-3xl font-bold text-gray-800'>Types of Cookies We Use</h2>
                </div>
                <div className='space-y-4'>
                  {cookieTypes.map((cookie, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className={`bg-gradient-to-r ${cookie.color} rounded-xl p-5 text-white`}
                    >
                      <div className='flex items-start justify-between'>
                        <div className='flex items-center gap-3'>
                          <div className='text-2xl'>{cookie.icon}</div>
                          <div>
                            <h3 className='font-semibold text-lg'>{cookie.type}</h3>
                            <p className='text-white/80 text-sm mt-1'>{cookie.description}</p>
                          </div>
                        </div>
                        <div className='text-right'>
                          <div className='text-xs text-white/70'>Duration</div>
                          <div className='font-mono text-sm'>{cookie.duration}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              {/* Third-Party Cookies */}
              <motion.section
                id='third-party'
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6 }}
                className='bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100 scroll-mt-24'
              >
                <div className='flex items-center gap-3 mb-6'>
                  <div className='w-12 h-12 rounded-xl bg-gradient-to-r from-teal-600 to-green-600 flex items-center justify-center text-white text-xl'>
                    <FaExternalLinkAlt />
                  </div>
                  <h2 className='text-2xl md:text-3xl font-bold text-gray-800'>Third-Party Cookies</h2>
                </div>
                <p className='text-gray-600 leading-relaxed mb-6'>
                  Some cookies are placed by third-party services that appear on our pages. These
                  services help us understand our audience and provide enhanced functionality.
                </p>
                <div className='space-y-3'>
                  {thirdPartyCookies.map((thirdParty, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className='flex items-center justify-between p-4 bg-gray-50 rounded-xl'
                    >
                      <div>
                        <div className='font-semibold text-gray-800'>{thirdParty.name}</div>
                        <div className='text-sm text-gray-500'>{thirdParty.purpose}</div>
                      </div>
                      <Link
                        href={thirdParty.privacyLink}
                        target='_blank'
                        className='text-amber-600 text-sm hover:underline flex items-center gap-1'
                      >
                        Privacy Policy <FaExternalLinkAlt className='w-3 h-3' />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              {/* Managing Cookies */}
              <motion.section
                id='managing-cookies'
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6 }}
                className='bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100 scroll-mt-24'
              >
                <div className='flex items-center gap-3 mb-6'>
                  <div className='w-12 h-12 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white text-xl'>
                    <FaSlidersH />
                  </div>
                  <h2 className='text-2xl md:text-3xl font-bold text-gray-800'>Managing Cookies</h2>
                </div>
                <p className='text-gray-600 leading-relaxed mb-4'>
                  Most web browsers allow you to control cookies through their settings preferences.
                  You can set your browser to refuse all cookies or to indicate when a cookie is being sent.
                </p>
                <div className='grid sm:grid-cols-2 gap-4 mt-4'>
                  {['Chrome', 'Firefox', 'Safari', 'Edge'].map((browser, idx) => (
                    <div key={idx} className='border border-gray-200 rounded-xl p-3'>
                      <div className='font-medium text-gray-800'>{browser}</div>
                      <p className='text-xs text-gray-500 mt-1'>
                        Settings → Privacy & Security → Cookies
                      </p>
                    </div>
                  ))}
                </div>
                <div className='bg-amber-50 rounded-xl p-4 mt-4'>
                  <div className='flex items-start gap-3'>
                    <FaInfoCircle className='text-amber-600 mt-0.5' />
                    <p className='text-sm text-amber-800'>
                      Please note that disabling certain cookies may affect the functionality of our
                      website and limit your ability to use certain features.
                    </p>
                  </div>
                </div>
              </motion.section>

              {/* Your Preferences */}
              <motion.section
                id='preferences'
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6 }}
                className='bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100 scroll-mt-24'
              >
                <div className='flex items-center gap-3 mb-6'>
                  <div className='w-12 h-12 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 flex items-center justify-center text-white text-xl'>
                    <FaUserCog />
                  </div>
                  <h2 className='text-2xl md:text-3xl font-bold text-gray-800'>Your Cookie Preferences</h2>
                </div>
                <p className='text-gray-600 leading-relaxed mb-6'>
                  You have the right to choose which cookies you accept. You can update your preferences
                  at any time using our cookie preference center.
                </p>
                <div className='flex flex-wrap gap-4'>
                  <button
                    onClick={() => setShowPreferences(true)}
                    className='px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all'
                  >
                    Manage Cookie Preferences
                  </button>
                  <button
                    onClick={() => {
                      // Simulate clearing cookies
                      alert('Cookie settings have been cleared. Please refresh the page.');
                    }}
                    className='px-6 py-3 border border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 transition-all flex items-center gap-2'
                  >
                    <FaTrashAlt className='text-gray-500' />
                    Clear All Cookies
                  </button>
                </div>
              </motion.section>

              {/* Contact Section */}
              <motion.section
                id='contact'
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6 }}
                className='bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600 rounded-3xl shadow-xl p-8 md:p-10 text-white scroll-mt-24'
              >
                <div className='flex items-center gap-3 mb-6'>
                  <div className='w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center text-white text-xl'>
                    <FaEnvelope />
                  </div>
                  <h2 className='text-2xl md:text-3xl font-bold'>Questions About Cookies?</h2>
                </div>
                <p className='text-white/80 leading-relaxed mb-6'>
                  If you have any questions about our use of cookies or this Cookie Policy,
                  please contact our Data Protection Team:
                </p>
                <div className='space-y-3 mb-6'>
                  <div className='flex items-center gap-3'>
                    <FaEnvelope className='text-white/60' />
                    <span>cookies@isab.org</span>
                  </div>
                  <div className='flex items-center gap-3'>
                    <FaWhatsapp className='text-white/60' />
                    <span>+1 (888) 123-4567</span>
                  </div>
                  <div className='flex items-center gap-3'>
                    <FaGlobe className='text-white/60' />
                    <span>www.isab.org/cookie-policy</span>
                  </div>
                </div>
                <div className='flex flex-wrap gap-3'>
                  <button className='px-6 py-2.5 bg-white text-amber-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors'>
                    Download Cookie Policy (PDF)
                  </button>
                  <button onClick={() => setShowPreferences(true)} className='px-6 py-2.5 bg-white/20 backdrop-blur rounded-xl font-semibold hover:bg-white/30 transition-colors'>
                    Manage Preferences                  </button>
                </div>
              </motion.section>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}