// components/home/WhyChooseUs.tsx
'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useAnimation, Variants } from 'framer-motion';
import {
  FaShieldAlt,
  FaGlobeAmericas,
  FaClock,
  FaChartLine,
  FaUsers,
  FaRobot,
  FaMedal,
  FaStar,
  FaCogs
} from 'react-icons/fa';

const features = [
  {
    icon: <FaMedal />,
    title: 'Industry Expertise',
    description:
      'With years of experience in the field, we boast unparalleled expertise in ISO certification and accreditation services.',
    color: 'from-emerald-500 to-teal-500'
  },
  {
    icon: <FaStar />,
    title: 'Commitment to Excellence',
    description:
      'We are committed to delivering excellence in all that we do. Our rigorous standards and continuous improvement culture ensure the highest quality of service delivery.',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: <FaCogs />,
    title: 'Comprehensive Services',
    description:
      'We offer a wide range of services tailored to meet the diverse needs of individuals and organizations, from initial accreditation to continuous support and development.',
    color: 'from-orange-500 to-amber-500'
  }
];

export default function WhyChooseUs() {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true,});

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  };

  return (
    <section className='relative py-24 overflow-hidden'>
      {/* Animated background */}
      <div className='absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100' />
      <div className='absolute inset-0 opacity-30'>
        <div className='absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse' />
        <div className='absolute bottom-20 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000' />
      </div>

      <div className='relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='text-center mb-16'
        >
          <span className='inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-green-100 to-blue-100 text-green-800 text-sm font-semibold mb-4'>
            Why Leading Organizations Choose Us
          </span>
          <h2 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent'>
            Excellence Beyond Accreditation
          </h2>
          <p className='text-gray-600 max-w-2xl mx-auto mt-4 text-lg'>
            We don&apos;t just certify — we empower organizations to achieve
            worldwide recognition and operational excellence.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial='hidden'
          animate={controls}
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
        >
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ scale: 1.03, y: -5 }}
              className='group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden'
            >
              {/* Gradient hover effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
              />

              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white text-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className='text-xl font-bold text-gray-800 mb-3'>
                {feature.title}
              </h3>
              <p className='text-gray-600 leading-relaxed'>
                {feature.description}
              </p>

              {/* Animated underline */}
              <div className='absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-green-600 to-blue-600 group-hover:w-full transition-all duration-500' />
            </motion.div>
          ))}
        </motion.div>

        {/* Trust badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className='mt-16 text-center'
        >
          <div className='inline-flex items-center gap-3 bg-white rounded-full py-3 px-6 shadow-md'>
            <div className='flex -space-x-2'>
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className='w-8 h-8 rounded-full bg-gradient-to-r from-green-600 to-blue-600 flex items-center justify-center text-white text-xs font-bold'
                >
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <span className='text-gray-700 font-medium'>
              Trusted by <strong className='text-green-600'>500+</strong>{' '}
              organizations worldwide
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}