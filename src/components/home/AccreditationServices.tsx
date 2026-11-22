'use client';

import { 
  ClipboardList, 
  TestTube, 
  BadgeCheck, 
  UserCheck 
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AccreditationServices() {
  const router = useRouter();

  const dropdownItems = [
    {
      name: 'Management System Certifications',
      path: '/service/management-system-certifications',
      icon: <ClipboardList className='w-6 h-6' />,
      description: 'ISO/IEC 17021 for Management System'
    },
    {
      name: 'Inspections, Testing & Calibration',
      path: '/service/inspections-testing-calibration',
      icon: <TestTube className='w-6 h-6' />,
      description: 'ISO/IEC 17020 & ISO/IEC 17025'
    },
    {
      name: 'Product Certification',
      path: '/service/product-certification',
      icon: <BadgeCheck className='w-6 h-6' />,
      description: 'ISO/IEC 17065 for Product Certification'
    },
    {
      name: 'Personnel Certification',
      path: '/service/personnel-certification',
      icon: <UserCheck className='w-6 h-6' />,
      description: 'ISO/IEC 17024 for Personnel Certification'
    }
  ];

  return (
    <section className='max-w-[1280px] mx-auto w-full px-4 py-16'>
      {/* Header */}
      <div className='text-center mb-12'>
        <h2 className='text-3xl md:text-4xl font-bold text-gray-800'>
          Accreditation Services
        </h2>
        <p className='text-gray-500 mt-3 max-w-xl mx-auto'>
          Explore our core accreditation services designed to ensure quality,
          compliance, and continuous improvement.
        </p>
      </div>

      {/* Cards */}
      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
        {dropdownItems.map((service, index) => (
          <div
            key={index}
            className='group bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition duration-300 hover:-translate-y-1 cursor-pointer'
            onClick={() => router.push(service.path)}
          >
            {/* Icon */}
            <div className='mb-4 text-green-600 group-hover:text-green-700 transition'>
              {service.icon}
            </div>

            {/* Title */}
            <h3 className='text-lg font-semibold text-gray-800 mb-2'>
              {service.name}
            </h3>

            {/* Description */}
            <p className='text-sm text-gray-500 leading-relaxed'>
              {service.description}
            </p>

            {/* Bottom accent */}
            <div className='mt-4 h-[2px] w-0 bg-gradient-to-r from-green-700 to-blue-600 group-hover:w-full transition-all duration-300'></div>
          </div>
        ))}
      </div>
    </section>
  );
}