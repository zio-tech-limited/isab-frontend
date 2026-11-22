// components/home/CTASection.tsx
'use client';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { FaArrowRight, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

export default function CTASection() {
  const router = useRouter();

  return (
    <section className='relative py-28 overflow-hidden'>
      {/* Animated background */}
      <div className='absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900'>
        <div className='absolute inset-0 opacity-30'>
          <svg className='w-full h-full' viewBox='0 0 1000 500'>
            <path
              d='M0,250 Q250,100 500,250 T1000,250'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              className='text-green-500 animate-pulse'
            />
            <path
              d='M0,300 Q250,150 500,300 T1000,300'
              fill='none'
              stroke='currentColor'
              strokeWidth='1'
              className='text-blue-500 animate-pulse delay-1000'
            />
          </svg>
        </div>
      </div>

      <div className='relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className='text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6'>
            Ready to Achieve{' '}
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500'>
              Global Recognition
            </span>
            ?
          </h2>
          <p className='text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10'>
            Join hundreds of organizations that have elevated their credibility
            through ISAB accreditation. Start your journey today.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className='flex flex-col sm:flex-row gap-4 justify-center mb-12'
        >
          <button onClick={()=> router.push('/register')} className='group cursor-pointer relative px-8 py-3.5 rounded-full bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300'>
            <span className='relative z-10 flex items-center gap-2'>
              Get Accredited Now <FaArrowRight className='group-hover:translate-x-1 transition-transform' />
            </span>
            <div className='absolute inset-0 bg-gradient-to-r from-green-700 to-blue-700 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300' />
          </button>

          <button onClick={()=> router.push('/contact')} className='px-8 cursor-pointer py-3.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold hover:bg-white/20 transition-all duration-300'>
            Talk to an Expert
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className='flex flex-col sm:flex-row justify-center gap-6 text-gray-300 text-sm'
        >
          <div className='flex items-center justify-center gap-2'>
            <FaPhoneAlt className='text-green-400' />
            <span>+1 6024695588</span>
          </div>
          <div className='flex items-center justify-center gap-2'>
            <FaEnvelope className='text-green-400' />
            <span>info@isabinternational.com</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}