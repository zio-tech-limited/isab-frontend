// app/(main)/accreditation-services/witness-assessment/page.tsx
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
  FaPrint
} from 'react-icons/fa';

export default function WitnessAssessmentPage() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const service = {
    title: 'Witness Assessment',
    description: 'Evaluation of assessor performance and consistency through direct observation.',
    icon: <FaUsers className='text-4xl' />,
    color: 'from-pink-500 to-rose-500',
    details: {
      overview: 'Witness Assessment is a quality assurance process where experienced assessors observe and evaluate the performance of auditors, inspectors, or assessors during real assignments. This ensures consistency, competence, and adherence to accreditation requirements across the assessment team. The process provides valuable feedback and identifies opportunities for professional development.',
      benefits: [
        'Ensured consistency in assessment quality',
        'Identified training and development needs',
        'Enhanced assessor competence and confidence',
        'Improved assessment reliability',
        'Risk mitigation and quality assurance',
        'Continuous professional development',
        'Quality control and assurance'
      ],
      process: [
        'Selection of assessment to witness',
        'Pre-witness briefing and planning',
        'Observation of assessment activities',
        'Documentation of observations',
        'Feedback and coaching session',
        'Competence evaluation and reporting'
      ],
      timeline: 'Typically 1-2 days per witness event',
      industries: ['All Assessment Bodies', 'Certification Bodies', 'Inspection Bodies', 'Testing Laboratories', 'Calibration Laboratories', 'Healthcare Organizations']
    }
  };

  return (
    <section className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-pink-50/30 py-12'>
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
            className='flex items-center gap-3 px-5 cursor-pointer py-3 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg hover:border-pink-500 text-gray-700 hover:text-pink-600 transition-all duration-300 group'
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
                    1-2 Days
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
                className='bg-pink-50/50 rounded-2xl p-6 border border-pink-100'
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
                className='bg-rose-50/50 rounded-2xl p-6 border border-rose-100'
              >
                <h3 className='text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2'>
                  <FaChartLine className='text-rose-500' />
                  Process
                </h3>
                <ul className='space-y-2'>
                  {service.details.process.map((step, idx) => (
                    <li key={idx} className='flex items-start gap-2 text-gray-600 text-sm'>
                      <span className='text-rose-500 mt-1 font-bold'>{idx + 1}.</span>
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
                Schedule Witness
              </button>
              <button className='px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl hover:border-pink-500 hover:text-pink-500 transition-all duration-300 flex items-center gap-2'>
                <FaFileAlt className='w-4 h-4' />
                Learn More
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}