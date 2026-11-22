'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  FaChevronRight, 
  FaCheckCircle, 
  FaShieldAlt, 
  FaLeaf, 
  FaLock, 
  FaRobot,
  FaFileAlt,
  FaGlobe,
  FaBuilding,
  FaCertificate,
  FaArrowRight
} from 'react-icons/fa';
import { standardsData } from '@/utils/constant/standards';

export default function StandardsPage() {
  const router = useRouter();

  const handleStandardClick = (id: string) => {
    router.push(`/standards/${id}`);
  };

  // Get icon based on standard name
  const getIcon = (name: string) => {
    if (name.includes('9001')) return <FaCheckCircle className='w-5 h-5' />;
    if (name.includes('14001')) return <FaLeaf className='w-5 h-5' />;
    if (name.includes('45001')) return <FaShieldAlt className='w-5 h-5' />;
    if (name.includes('27001')) return <FaLock className='w-5 h-5' />;
    if (name.includes('42001')) return <FaRobot className='w-5 h-5' />;
    if (name.includes('22000')) return <FaCertificate className='w-5 h-5' />;
    if (name.includes('22301')) return <FaBuilding className='w-5 h-5' />;
    return <FaFileAlt className='w-5 h-5' />;
  };

  // Get color based on standard name
  const getColor = (name: string) => {
    if (name.includes('9001')) return 'from-blue-500 to-cyan-500';
    if (name.includes('14001')) return 'from-emerald-500 to-teal-500';
    if (name.includes('45001')) return 'from-purple-500 to-pink-500';
    if (name.includes('27001')) return 'from-indigo-500 to-blue-500';
    if (name.includes('42001')) return 'from-rose-500 to-orange-500';
    if (name.includes('22000')) return 'from-red-500 to-orange-500';
    if (name.includes('22301')) return 'from-cyan-500 to-blue-500';
    return 'from-blue-500 to-purple-500';
  };

  // Get light color for background
  const getLightColor = (name: string) => {
    if (name.includes('9001')) return 'bg-blue-50';
    if (name.includes('14001')) return 'bg-emerald-50';
    if (name.includes('45001')) return 'bg-purple-50';
    if (name.includes('27001')) return 'bg-indigo-50';
    if (name.includes('42001')) return 'bg-rose-50';
    if (name.includes('22000')) return 'bg-red-50';
    if (name.includes('22301')) return 'bg-cyan-50';
    return 'bg-gray-50';
  };

  return (
    <div className='max-w-[1280px] mx-auto px-4 pt-24 pb-16'>
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='text-center mb-12'
      >
        <span className='inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-4'>
          Our Standards
        </span>
        <h1 className='text-4xl md:text-5xl font-bold mb-4 text-gray-800'>
          Accreditation Standards
        </h1>
        <p className='text-lg text-gray-500 max-w-2xl mx-auto'>
          We provide accreditation services based on internationally recognized
          standards ensuring quality, competence, and reliability.
        </p>
        <div className='mt-6 flex justify-center gap-2'>
          <span className='w-12 h-1 bg-gradient-to-r from-blue-500 to-transparent rounded-full'></span>
          <span className='w-12 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full'></span>
          <span className='w-12 h-1 bg-gradient-to-r from-transparent to-purple-500 rounded-full'></span>
        </div>
      </motion.div>

      {/* Grid */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6'
      >
        {standardsData.map((item, index) => {
          const color = getColor(item.name);
          const lightColor = getLightColor(item.name);
          const icon = getIcon(item.name);

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className='group cursor-pointer'
              onClick={() => handleStandardClick(item.id)}
            >
              <div className={`relative p-[1px] rounded-2xl bg-gradient-to-r ${color} shadow-md hover:shadow-2xl transition-all duration-300`}>
                <div className={`h-full ${lightColor} rounded-2xl p-6 transition-all duration-300 group-hover:bg-white`}>
                  {/* Content */}
                  <div className='flex items-start justify-between'>
                    <div className='flex items-center gap-3'>
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${color} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform duration-300`}>
                        {icon}
                      </div>
                      <div>
                        <h2 className='text-lg font-semibold text-gray-800 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300'>
                          {item.name}
                        </h2>
                       
                      </div>
                    </div>
                    <FaChevronRight className='w-4 h-4 text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300' />
                  </div>
                  
                  <p className='text-sm text-gray-600 mt-3 leading-relaxed group-hover:text-gray-700 transition-colors duration-300'>
                    {item.description}
                  </p>

                  {/* Category Tag */}
                  <div className='mt-3'>
                    <span className='inline-block px-2 py-0.5 bg-gray-100 rounded-full text-[10px] font-medium text-gray-500 group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 group-hover:text-white transition-all duration-300'>
                      {item.category}
                    </span>
                  </div>

                  {/* Hover Bottom Accent */}
                  <div className={`mt-3 h-0.5 bg-gradient-to-r ${color} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Footer Note */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className='mt-12 text-center'
      >
        <div className='inline-flex items-center gap-2 text-sm text-gray-500 bg-white px-6 py-3 rounded-full shadow-sm border border-gray-100'>
          <FaGlobe className='text-blue-500' />
          <span>Click on any standard to view detailed information</span>
          <FaArrowRight className='text-blue-500 w-3 h-3' />
        </div>
      </motion.div>
    </div>
  );
}


