// app/(main)/accreditation-services/re-accreditation/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  FaArrowLeft, 
  FaCheckCircle, 
  FaClock, 
  FaBuilding,
  FaFileAlt,
  FaUsers,
  FaChartLine,
  FaShieldAlt,
  FaGlobe,
  FaDownload,
  FaShare,
  FaPrint,
  FaRedoAlt
} from 'react-icons/fa';

export default function ReAccreditationPage() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const service = {
    title: 'Re-Accreditation',
    description: 'Re-evaluation process to maintain accreditation status after the validity period expires.',
    icon: <FaRedoAlt className='text-4xl' />,
    color: 'from-purple-500 to-pink-500',
    details: {
      overview: 'Re-Accreditation is the comprehensive re-evaluation of an accredited organization to renew its accreditation status. This process ensures that the organization continues to meet all requirements and has maintained or improved its competence since initial accreditation. The re-accreditation process involves a thorough review of the organization\'s performance history, changes in operations, and continued compliance with all applicable standards.',
      benefits: [
        'Renewed accreditation status and recognition',
        'Demonstrated sustained competence and quality',
        'Opportunity for scope expansion',
        'Updated compliance with latest standards',
        'Enhanced organizational reputation',
        'Continued market access and growth',
        'Improved operational efficiency'
      ],
      process: [
        'Application for renewal',
        'Documentation review and updates',
        'Full on-site assessment',
        'Evaluation of performance history',
        'Corrective action verification',
        'Accreditation renewal decision'
      ],
      timeline: 'Typically 2-4 months before expiration date',
      industries: ['All Accredited Organizations', 'Certification Bodies', 'Testing Laboratories', 'Inspection Bodies', 'Calibration Laboratories', 'Healthcare Organizations']
    }
  };

  return (
    <section className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30 py-12'>
      <div className='max-w-[1400px] mx-auto px-4'>
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className='mt-16 mb-6'
        >
          <button
            onClick={handleBack}
            className='flex items-center gap-3 px-5 cursor-pointer py-3 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg hover:border-purple-500 text-gray-700 hover:text-purple-600 transition-all duration-300 group'
          >
            <FaArrowLeft className='group-hover:-translate-x-1 transition-transform duration-300 w-4 h-4' />
            <span className='font-medium'>Back to Services</span>
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
          <div className={`bg-gradient-to-r ${service.color} p-8 text-white relative overflow-hidden`}>
            <div className='absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl'></div>
            <div className='absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-3xl'></div>
            
            <div className='relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6'>
              <div className='w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg'>
                {service.icon}
              </div>
              <div className='flex-1'>
                <h1 className='text-3xl md:text-4xl font-bold'>
                  {service.title}
                </h1>
                <p className='text-white/90 text-lg mt-1'>
                  {service.description}
                </p>
                <div className='flex items-center gap-4 mt-3 text-sm text-white/80'>
                  <span className='flex items-center gap-1'>
                    <FaCheckCircle className='w-4 h-4' />
                    Accreditation Service
                  </span>
                  <span className='flex items-center gap-1'>
                    <FaClock className='w-4 h-4' />
                    2-4 Months Before Expiration
                  </span>
                </div>
              </div>
              <div className='flex gap-2'>
                <button className='px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all duration-300 flex items-center gap-2 text-sm'>
                  <FaShare className='w-4 h-4' />
                  Share
                </button>
                <button className='px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all duration-300 flex items-center gap-2 text-sm'>
                  <FaPrint className='w-4 h-4' />
                  Print
                </button>
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
                <span className={`w-1 h-8 bg-gradient-to-b ${service.color} rounded-full`}></span>
                Overview
              </h2>
              <p className='text-gray-600 leading-relaxed'>
                {service.details.overview}
              </p>
            </motion.div>

            {/* Benefits and Process Grid */}
            <div className='grid md:grid-cols-2 gap-6 mb-8'>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className='bg-purple-50/50 rounded-2xl p-6 border border-purple-100'
              >
                <h3 className='text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2'>
                  <FaCheckCircle className='text-green-500' />
                  Key Benefits
                </h3>
                <ul className='space-y-2'>
                  {service.details.benefits.map((benefit, idx) => (
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
                className='bg-pink-50/50 rounded-2xl p-6 border border-pink-100'
              >
                <h3 className='text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2'>
                  <FaChartLine className='text-pink-500' />
                  Process
                </h3>
                <ul className='space-y-2'>
                  {service.details.process.map((step, idx) => (
                    <li key={idx} className='flex items-start gap-2 text-gray-600 text-sm'>
                      <span className='text-pink-500 mt-1 font-bold'>{idx + 1}.</span>
                      {step}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className='bg-amber-50/50 rounded-2xl p-6 border border-amber-100 mb-8'
            >
              <h3 className='text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2'>
                <FaClock className='text-amber-500' />
                Timeline
              </h3>
              <p className='text-gray-600 text-sm'>
                {service.details.timeline}
              </p>
            </motion.div>

            {/* Industries Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className='mb-8'
            >
              <h3 className='text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2'>
                <FaBuilding className='text-blue-500' />
                Applicable Industries
              </h3>
              <div className='flex flex-wrap gap-2'>
                {service.details.industries.map((industry, idx) => (
                  <span
                    key={idx}
                    className={`px-3 py-1.5 bg-gradient-to-r ${service.color} text-white text-sm rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-default`}
                  >
                    {industry}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className='flex flex-wrap gap-4 pt-6 border-t border-gray-200'
            >
              <button className={`px-6 py-3 bg-gradient-to-r ${service.color} text-white rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2`}>
                <FaDownload className='w-4 h-4' />
                Download Brochure
              </button>
              <button className='px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-300 flex items-center gap-2'>
                <FaUsers className='w-4 h-4' />
                Apply for Renewal
              </button>
              <button className='px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl hover:border-purple-500 hover:text-purple-500 transition-all duration-300 flex items-center gap-2'>
                <FaFileAlt className='w-4 h-4' />
                Check Eligibility
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}