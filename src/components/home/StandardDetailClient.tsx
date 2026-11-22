// app/(main)/standards/[id]/StandardDetailClient.tsx
'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  FaArrowLeft, 
  FaCheckCircle, 
  FaShieldAlt, 
  FaLeaf, 
  FaLock, 
  FaRobot,
  FaFileAlt,
  FaUsers,
  FaGlobe,
  FaBuilding,
  FaCertificate,
  FaDownload,
  FaShare,
  FaPrint
} from 'react-icons/fa';

// Map icon based on standard name
const getIcon = (name: string) => {
  if (name.includes('9001')) return <FaCheckCircle className='text-4xl' />;
  if (name.includes('14001')) return <FaLeaf className='text-4xl' />;
  if (name.includes('45001')) return <FaShieldAlt className='text-4xl' />;
  if (name.includes('27001')) return <FaLock className='text-4xl' />;
  if (name.includes('42001')) return <FaRobot className='text-4xl' />;
  if (name.includes('22000')) return <FaCertificate className='text-4xl' />;
  if (name.includes('22301')) return <FaBuilding className='text-4xl' />;
  return <FaFileAlt className='text-4xl' />;
};

// Get gradient based on standard name
const getGradient = (name: string) => {
  if (name.includes('9001')) return 'from-blue-500 to-cyan-500';
  if (name.includes('14001')) return 'from-emerald-500 to-teal-500';
  if (name.includes('45001')) return 'from-purple-500 to-pink-500';
  if (name.includes('27001')) return 'from-indigo-500 to-blue-500';
  if (name.includes('42001')) return 'from-rose-500 to-orange-500';
  if (name.includes('22000')) return 'from-red-500 to-orange-500';
  if (name.includes('22301')) return 'from-cyan-500 to-blue-500';
  return 'from-blue-500 to-purple-500';
};

export default function StandardDetailClient({ standard, details }) {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const icon = getIcon(standard.name);
  const gradient = getGradient(standard.name);
  const isNew = standard.isNew;

  return (
    <section className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 py-12'>
      <div className='max-w-[1400px] mx-auto px-4'>
        {/* Back Button - More Visible */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className='mt-16 mb-4  '
        >
          <button
            onClick={handleBack}
            className='flex cursor-pointer items-center gap-3 px-5 py-3 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg hover:border-blue-500 text-gray-700 hover:text-blue-600 transition-all duration-300 group'
          >
            <FaArrowLeft className='group-hover:-translate-x-1 transition-transform duration-300 w-4 h-4' />
            <span className='font-medium'>Back to Standards</span>
          </button>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100'
        >
          {/* Header Section */}
          <div className={`bg-gradient-to-r ${gradient} p-8 text-white relative overflow-hidden`}>
            <div className='absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl'></div>
            <div className='absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-3xl'></div>
            
            <div className='relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6'>
              <div className='w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg'>
                {icon}
              </div>
              <div className='flex-1'>
                <div className='flex items-center gap-3 flex-wrap'>
                  <h1 className='text-3xl md:text-4xl font-bold'>
                    {standard.name}
                  </h1>
                  {isNew && (
                    <span className='px-3 py-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full animate-pulse'>
                      NEW
                    </span>
                  )}
                </div>
                <p className='text-white/90 text-lg mt-1'>
                  {details.fullName}
                </p>
                <div className='flex items-center gap-4 mt-3 text-sm text-white/80'>
                  <span className='flex items-center gap-1'>
                    <FaCheckCircle className='w-4 h-4' />
                    {standard.category}
                  </span>
                  <span className='flex items-center gap-1'>
                    <FaUsers className='w-4 h-4' />
                    International Standard
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className='p-8'>
            {/* Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className='mb-8'
            >
              <h2 className='text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2'>
                <span className={`w-1 h-8 bg-gradient-to-b ${gradient} rounded-full`}></span>
                Overview
              </h2>
              <p className='text-gray-600 leading-relaxed'>
                {details.overview}
              </p>
            </motion.div>

            {/* Benefits and Requirements Grid */}
            <div className='grid md:grid-cols-2 gap-6 mb-8'>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className='bg-blue-50/50 rounded-2xl p-6 border border-blue-100'
              >
                <h3 className='text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2'>
                  <FaCheckCircle className='text-green-500' />
                  Key Benefits
                </h3>
                <ul className='space-y-2'>
                  {details.benefits.map((benefit: string, idx: number) => (
                    <li key={idx} className='flex items-start gap-2 text-gray-600 text-sm'>
                      <span className='text-green-500 mt-1'>✓</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className='bg-purple-50/50 rounded-2xl p-6 border border-purple-100'
              >
                <h3 className='text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2'>
                  <FaShieldAlt className='text-purple-500' />
                  Key Requirements
                </h3>
                <ul className='space-y-2'>
                  {details.requirements.map((req: string, idx: number) => (
                    <li key={idx} className='flex items-start gap-2 text-gray-600 text-sm'>
                      <span className='text-purple-500 mt-1'>•</span>
                      {req}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Industries Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className='mb-8'
            >
              <h3 className='text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2'>
                <FaGlobe className='text-blue-500' />
                Applicable Industries
              </h3>
              <div className='flex flex-wrap gap-2'>
                {details.industries.map((industry: string, idx: number) => (
                  <span
                    key={idx}
                    className={`px-3 py-1.5 bg-gradient-to-r ${gradient} text-white text-sm rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-default`}
                  >
                    {industry}
                  </span>
                ))}
              </div>
            </motion.div> 
          </div>
        </motion.div>
      </div>
    </section>
  );
}