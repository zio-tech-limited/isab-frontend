// components/home/ProcessFlow.tsx
'use client';
import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  FaFileAlt,
  FaClipboardCheck,
  FaChartBar,
  FaMedal,
  FaArrowRight
} from 'react-icons/fa';

const steps = [
  {
    icon: <FaFileAlt />,
    title: 'Application',
    description:
      'Submit your organization details and required documentation online.',
    duration: '2-3 days',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: <FaClipboardCheck />,
    title: 'Document Review',
    description: 'Our experts analyze your processes against international standards.',
    duration: '7-10 days',
    color: 'from-indigo-500 to-purple-500'
  },
  {
    icon: <FaChartBar />,
    title: 'Assessment',
    description: 'On-site or virtual audit to verify compliance and effectiveness.',
    duration: '14-21 days',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: <FaMedal />,
    title: 'Certification',
    description: 'Receive your accreditation certificate and join our registry.',
    duration: '5-7 days',
    color: 'from-rose-500 to-orange-500'
  }
];

export default function ProcessFlow() {
  const [activeStep, setActiveStep] = useState(0);
  const [particles, setParticles] = useState<Array<{ x: number; y: number }>>([]);
  const [isMounted, setIsMounted] = useState(false);
  // Generate particles only on client side
  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined') {
      const newParticles = [...Array(20)].map(() => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight
      }));
      setParticles(newParticles);
    }
  }, []);

  // Auto-advance steps
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className='py-24 bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden'>
      {/* Animated background particles - only render on client */}
      {isMounted && (
        <div className='absolute inset-0'>
          {particles.map((pos, i) => (
            <motion.div
              key={i}
              className='absolute w-1 h-1 bg-white/20 rounded-full'
              initial={{
                x: pos.x,
                y: pos.y
              }}
              animate={{
                y: [pos.y, pos.y - 100, pos.y - 200],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 5
              }}
            />
          ))}
        </div>
      )}

      <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='text-center mb-16'>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className='inline-flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-4 py-2 text-white/90 text-sm mb-4'
          >
            <FaArrowRight className='animate-pulse' />
            <span>Simple 4-Step Process</span>
          </motion.div>
          <h2 className='text-4xl md:text-5xl font-bold text-white mb-4'>
            Your Path to <span className='text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500'>Accreditation</span>
          </h2>
          <p className='text-gray-300 max-w-2xl mx-auto'>
            A streamlined journey from application to certification, supported
            by our expert team at every milestone.
          </p>
        </div>

        {/* Timeline steps */}
        <div className='relative'>
          {/* Connecting line */}
          <div className='hidden lg:block absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 -translate-y-1/2 rounded-full' />
          <div className='hidden lg:block absolute top-1/2 left-[10%] h-0.5 bg-white/20 w-0 rounded-full transition-all duration-1000'
               style={{ width: `${((activeStep + 1) / steps.length) * 80}%` }} />

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.15, duration: 0.6 }}
                whileHover={{ y: -10 }}
                className={`relative group cursor-pointer transition-all duration-500 ${
                  activeStep === idx ? 'scale-105' : 'scale-100'
                }`}
                onClick={() => setActiveStep(idx)}
              >
                <div className='bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:border-green-500/50 transition-all'>
                  {/* Step number */}
                  <div className='absolute -top-4 -left-4 w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center text-white font-bold shadow-lg'>
                    {idx + 1}
                  </div>

                  {/* Icon */}
                  <div className={`text-4xl mb-4 transition-all duration-300 ${
                    activeStep === idx ? 'text-green-400 scale-110' : 'text-gray-400 group-hover:text-green-400'
                  }`}>
                    {step.icon}
                  </div>

                  {/* Title */}
                  <h3 className='text-xl font-bold text-white mb-2'>
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className='text-gray-300 text-sm mb-3'>
                    {step.description}
                  </p>

                  {/* Duration */}
                  <div className='inline-flex items-center gap-1 text-xs text-green-400'>
                    <FaArrowRight className='w-3 h-3' />
                    <span>Est. {step.duration}</span>
                  </div>
                </div>

                {/* Connector arrow for mobile */}
                {idx < steps.length - 1 && (
                  <div className='hidden lg:block absolute -right-6 top-1/2 -translate-y-1/2 text-gray-500 group-hover:text-green-400 transition-colors'>
                    <FaArrowRight className='w-5 h-5' />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className='text-center mt-16'
        >
          <button onClick={() => window.open('/register', '_blank')} className='group cursor-pointer relative px-8 py-3 rounded-full bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold overflow-hidden shadow-lg hover:shadow-xl transition-all'>
            <span className='relative z-10'>Start Your Application →</span>
            <div className='absolute inset-0 bg-gradient-to-r from-green-700 to-blue-700 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300' />
          </button>
        </motion.div>
      </div>
    </section>
  );
}