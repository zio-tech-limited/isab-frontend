// components/home/TestimonialsMarquee.tsx
'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';

const testimonials = [
  {
    text: 'The accreditation process was transparent and efficient. Highly recommended!',
    author: 'James Wilson',
    role: 'Quality Manager',
    rating: 5,
    company: 'GlobalTech'
  },
  {
    text: 'ISAB\'s team provided exceptional guidance throughout our certification journey.',
    author: 'Elena Rodriguez',
    role: 'Compliance Officer',
    rating: 5,
    company: 'EcoSolutions'
  },
  {
    text: 'Fast turnaround and professional assessors. Best accreditation body we\'ve worked with.',
    author: 'David Kim',
    role: 'Director',
    rating: 5,
    company: 'InnovateCorp'
  },
  {
    text: 'The digital certificate verification system is a game-changer for our clients.',
    author: 'Maria Garcia',
    role: 'Operations Head',
    rating: 5,
    company: 'SecureCert'
  },
  {
    text: 'Global recognition opened new markets for us. Worth the investment.',
    author: 'Ahmed Hassan',
    role: 'CEO',
    rating: 5,
    company: 'MetroLogistics'
  }
];

export default function TestimonialsMarquee() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className='py-16 bg-white overflow-hidden'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className='inline-block px-4 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-semibold mb-4'>
            Client Voices
          </span>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-800'>
            What Our Clients Say
          </h2>
        </motion.div>
      </div>

      <div
        className='relative overflow-hidden'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          className='flex gap-6 w-max pb-6 '
          animate={{
            x: isHovered ? 0 : ['0%', '-50%']
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
            repeatType: 'loop'
          }}
        >
          {[...testimonials, ...testimonials].map((testimonial, idx) => (
            <div
              key={idx}
              className='w-80 bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg border border-gray-100 flex-shrink-0'
            >
              <div className='flex gap-1 text-yellow-500 mb-3'>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className='w-4 h-4' />
                ))}
              </div>
              <p className='text-gray-700 text-sm leading-relaxed mb-4'>
                &quot;{testimonial.text}&quot;,
              </p>
              <div>
                <p className='font-semibold text-gray-800 text-sm'>
                  {testimonial.author}
                </p>
                <p className='text-xs text-gray-500'>
                  {testimonial.role}, {testimonial.company}
                </p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Gradient fade edges */}
        <div className='absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10' />
        <div className='absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10' />
      </div>
    </section>
  );
}