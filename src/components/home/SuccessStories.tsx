// components/home/SuccessStories.tsx
'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaArrowLeft, FaArrowRight, FaStar } from 'react-icons/fa';
import Image from 'next/image';

const stories = [
  {
    id: 1,
    company: 'TechGlobal Solutions',
    industry: 'IT Services',
    logo: '/logos/techglobal.png',
    quote: 'ISAB accreditation opened doors to Fortune 500 clients. Our credibility skyrocketed within 6 months.',
    author: 'Sarah Chen',
    role: 'CEO',
    image: '/avatars/sarah.jpg',
    stats: '+245% revenue growth',
    rating: 5
  },
  {
    id: 2,
    company: 'EcoCert International',
    industry: 'Environmental Consulting',
    logo: '/logos/ecocert.png',
    quote: 'The most thorough accreditation process we\'ve experienced. Worth every minute for the global recognition.',
    author: 'Marcus Williams',
    role: 'Quality Director',
    image: '/avatars/marcus.jpg',
    stats: 'Expanded to 12 new countries',
    rating: 5
  },
  {
    id: 3,
    company: 'MediTrust Labs',
    industry: 'Healthcare',
    logo: '/logos/meditrust.png',
    quote: 'ISO 17025 accreditation from ISAB was crucial for our FDA approval process.',
    author: 'Dr. Priya Sharma',
    role: 'Lab Director',
    image: '/avatars/priya.jpg',
    stats: '100% audit success rate',
    rating: 5
  }
];

export default function SuccessStories() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % stories.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + stories.length) % stories.length);

  return (
    <section className='py-24 bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-hidden'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='text-center mb-16'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className='inline-block px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-sm font-semibold mb-4'>
              Success Stories
            </span>
            <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
              Trusted by Industry{' '}
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600'>
                Leaders
              </span>
            </h2>
            <p className='text-gray-600 max-w-2xl mx-auto text-lg'>
              Real results from organizations that chose excellence through
              accreditation.
            </p>
          </motion.div>
        </div>

        {/* Carousel */}
        <div className='relative'>
          <AnimatePresence mode='wait'>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, type: 'spring' }}
              className='bg-white rounded-3xl shadow-2xl overflow-hidden'
            >
              <div className='grid lg:grid-cols-2 gap-0'>
                {/* Quote side */}
                <div className='p-8 lg:p-12 bg-gradient-to-br from-gray-900 to-gray-800 text-white'>
                  <FaQuoteLeft className='text-4xl text-purple-400 mb-6 opacity-50' />
                  <p className='text-xl lg:text-2xl leading-relaxed mb-8'>
                    &quot;{stories[currentIndex].quote}&quot;
                  </p>
                  <div className='flex items-center gap-4 mb-6'>
                    <div className='w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xl'>
                      {stories[currentIndex].author.charAt(0)}
                    </div>
                    <div>
                      <div className='font-bold'>{stories[currentIndex].author}</div>
                      <div className='text-sm text-gray-400'>{stories[currentIndex].role}</div>
                    </div>
                  </div>
                  <div className='flex gap-1 text-yellow-400 mb-4'>
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                  <div className='inline-block px-4 py-2 bg-white/10 rounded-full text-sm'>
                    📈 {stories[currentIndex].stats}
                  </div>
                </div>

                {/* Info side */}
                <div className='p-8 lg:p-12 bg-white'>
                  <div className='mb-6'>
                    <h3 className='text-2xl font-bold text-gray-800'>
                      {stories[currentIndex].company}
                    </h3>
                    <p className='text-gray-500'>{stories[currentIndex].industry}</p>
                  </div>
                  <div className='space-y-4'>
                    <div className='flex items-center gap-3 text-gray-600'>
                      <div className='w-2 h-2 rounded-full bg-green-500' />
                      <span>Globally recognized accreditation</span>
                    </div>
                    <div className='flex items-center gap-3 text-gray-600'>
                      <div className='w-2 h-2 rounded-full bg-green-500' />
                      <span>Enhanced market credibility</span>
                    </div>
                    <div className='flex items-center gap-3 text-gray-600'>
                      <div className='w-2 h-2 rounded-full bg-green-500' />
                      <span>Access to international contracts</span>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className='mt-8 grid grid-cols-2 gap-4 pt-6 border-t border-gray-100'>
                    <div>
                      <div className='text-2xl font-bold text-green-600'>100%</div>
                      <div className='text-xs text-gray-500'>Client Retention</div>
                    </div>
                    <div>
                      <div className='text-2xl font-bold text-blue-600'>45+</div>
                      <div className='text-xs text-gray-500'>Countries Served</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <button
            onClick={prev}
            className='absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-600 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:text-white transition-all duration-300 z-10'
          >
            <FaArrowLeft />
          </button>
          <button
            onClick={next}
            className='absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-600 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:text-white transition-all duration-300 z-10'
          >
            <FaArrowRight />
          </button>
        </div>

        {/* Dots */}
        <div className='flex justify-center gap-2 mt-8'>
          {stories.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? 'w-8 bg-purple-600'
                  : 'w-2 bg-gray-300 hover:bg-purple-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}