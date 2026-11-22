// components/home/GlobalReachMap.tsx
'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaGlobeAsia, FaChartPie } from 'react-icons/fa';

const regions = [
  { name: 'North America', count: 128, percentage: 28, color: 'from-red-500 to-orange-500' },
  { name: 'Europe', count: 156, percentage: 34, color: 'from-blue-500 to-cyan-500' },
  { name: 'Asia-Pacific', count: 112, percentage: 24, color: 'from-green-500 to-emerald-500' },
  { name: 'Middle East', count: 42, percentage: 9, color: 'from-yellow-500 to-amber-500' },
  { name: 'Africa', count: 28, percentage: 5, color: 'from-purple-500 to-pink-500' }
];

export default function GlobalReachMap() {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  return (
    <section className='py-24 bg-white relative overflow-hidden'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='text-center mb-16'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className='inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-4'>
              Worldwide Presence
            </span>
            <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
              Accredited Across{' '}
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600'>
                45+ Countries
              </span>
            </h2>
            <p className='text-gray-600 max-w-2xl mx-auto text-lg'>
              Our certification is recognized globally, empowering organizations
              to operate with confidence across borders.
            </p>
          </motion.div>
        </div>

        <div className='grid lg:grid-cols-2 gap-12 items-center'>
          {/* Animated Map Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className='relative'
          >
            <div className='relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 shadow-xl'>
              {/* Map background effect */}
              <div className='absolute inset-0 rounded-3xl overflow-hidden'>
                <svg className='w-full h-full opacity-10' viewBox='0 0 800 400'>
                  <path
                    d='M150,100 L200,80 L300,90 L350,120 L400,100 L500,130 L550,110 L600,140 L650,120 L700,150'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    className='text-green-600'
                  />
                  <circle cx='200' cy='120' r='4' fill='currentColor' className='text-green-600' />
                  <circle cx='350' cy='180' r='4' fill='currentColor' className='text-blue-600' />
                  <circle cx='500' cy='150' r='4' fill='currentColor' className='text-purple-600' />
                </svg>
              </div>

              {/* Interactive map dots */}
              <div className='relative h-80 flex items-center justify-center'>
                {regions.map((region, idx) => (
                  <motion.div
                    key={region.name}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: idx * 0.1, type: 'spring' }}
                    className='absolute'
                    style={{
                      top: `${30 + idx * 12}%`,
                      left: `${15 + idx * 18}%`
                    }}
                    onMouseEnter={() => setHoveredRegion(region.name)}
                    onMouseLeave={() => setHoveredRegion(null)}
                  >
                    <motion.div
                      animate={{
                        scale: hoveredRegion === region.name ? [1, 1.5, 1] : 1,
                        opacity: [0.8, 1, 0.8]
                      }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className={`w-4 h-4 rounded-full bg-gradient-to-r ${region.color} cursor-pointer shadow-lg`}
                    />
                    {hoveredRegion === region.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className='absolute top-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs rounded-lg px-3 py-1.5 whitespace-nowrap z-20'
                      >
                        {region.name}: {region.count} accreditations
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Stats Panel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className='bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 shadow-2xl'>
              <div className='flex items-center gap-3 mb-6'>
                <FaGlobeAsia className='text-3xl text-green-400' />
                <h3 className='text-2xl font-bold text-white'>Global Impact</h3>
              </div>

              <div className='space-y-6'>
                {regions.map((region, idx) => (
                  <div key={region.name} className='space-y-2'>
                    <div className='flex justify-between text-sm'>
                      <span className='text-gray-300'>{region.name}</span>
                      <span className='text-white font-semibold'>
                        {region.percentage}%
                      </span>
                    </div>
                    <div className='h-2 bg-gray-700 rounded-full overflow-hidden'>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${region.percentage}%` }}
                        transition={{ delay: idx * 0.1, duration: 1 }}
                        className={`h-full rounded-full bg-gradient-to-r ${region.color}`}
                      />
                    </div>
                    <div className='text-right'>
                      <span className='text-xs text-gray-400'>
                        {region.count.toLocaleString()} accredited bodies
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className='mt-8 pt-6 border-t border-gray-700'>
                <div className='flex items-center justify-between'>
                  <div>
                    <div className='text-3xl font-bold text-white'>466+</div>
                    <div className='text-sm text-gray-400'>Total Accredited</div>
                  </div>
                  <div>
                    <div className='text-3xl font-bold text-white'>1.2M+</div>
                    <div className='text-sm text-gray-400'>Certificates Issued</div>
                  </div>
                  <FaChartPie className='text-4xl text-green-400 opacity-50' />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}