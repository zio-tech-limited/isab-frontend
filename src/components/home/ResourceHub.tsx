// components/home/ResourceHub.tsx
'use client';
import { motion } from 'framer-motion';
import { 
  FaFilePdf, 
  FaVideo, 
  FaPodcast, 
  FaArrowRight, 
  FaDownload,
  FaEye,
  FaBullseye,
  FaShieldAlt
} from 'react-icons/fa';

const resources = [
  {
    type: 'Guide',
    icon: <FaFilePdf />,
    title: 'The Complete Guide to ISO Accreditation',
    description: 'Everything you need to know about the accreditation process.',
    downloads: '2.5k+',
    color: 'from-red-500 to-orange-500'
  },
  {
    type: 'Webinar',
    icon: <FaVideo />,
    title: 'Best Practices for Surveillance Audits',
    description: 'Expert panel discussion on maintaining accreditation.',
    downloads: '1.2k+',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    type: 'Podcast',
    icon: <FaPodcast />,
    title: 'The Future of Global Standards',
    description: 'Industry leaders discuss emerging trends in certification.',
    downloads: '3.1k+',
    color: 'from-purple-500 to-pink-500'
  }
];

// Vision, Mission, Policy Data
const coreValues = [
  {
    icon: <FaEye className='text-2xl' />,
    title: 'Vision',
    description: 'We aim to safeguard lives and protect property by accrediting qualified organizations that deliver essential services, products, and oversight globally.',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50'
  },
  {
    icon: <FaBullseye className='text-2xl' />,
    title: 'Mission',
    description: 'Our mission is to offer top-tier accreditation services, prioritizing public safety and sustainability. We operate under the principle of "One Test, One Inspection, One Certification Worldwide," ensuring efficiency and consistency in our work.',
    color: 'from-emerald-500 to-teal-500',
    bgColor: 'bg-emerald-50'
  },
  {
    icon: <FaShieldAlt className='text-2xl' />,
    title: 'Policy',
    description: 'At the International Standards Accreditation Board (ISAB), we are dedicated to running our accreditation programs in line with ISO/IEC Standard 17011, meeting both national and international conformity standards.',
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-50'
  }
];

export default function ResourceHub() {
  return (
    <section className='py-24 bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Vision, Mission, Policy Cards */}
        <div className='grid md:grid-cols-3 gap-6 mb-16'>
          {coreValues.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className='group'
            >
              <div className={`${item.bgColor} rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 h-full`}>
                <div className='flex items-start gap-4'>
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${item.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                    {item.icon}
                  </div>
                  <div className='flex-1'>
                    <h3 className={`text-lg font-bold text-gray-800 mb-2 bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                      {item.title}
                    </h3>
                    <p className='text-gray-600 text-sm leading-relaxed'>
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}