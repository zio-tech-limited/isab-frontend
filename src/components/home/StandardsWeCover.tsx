// components/home/StandardsWeCover.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaChevronRight } from 'react-icons/fa';
import { standardsData } from '@/utils/constant/standards';

export default function StandardsWeCover() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const router = useRouter();

  // Get color for each card
  const getColor = (index: number) => {
    const colors = [
      'from-blue-500 to-blue-600',
      'from-emerald-500 to-emerald-600',
      'from-purple-500 to-purple-600',
      'from-orange-500 to-orange-600',
      'from-red-500 to-red-600',
      'from-indigo-500 to-indigo-600',
      'from-cyan-500 to-cyan-600',
      'from-pink-500 to-pink-600',
      'from-teal-500 to-teal-600',
      'from-amber-500 to-amber-600',
      'from-violet-500 to-violet-600',
      'from-rose-500 to-rose-600',
      'from-lime-500 to-lime-600',
      'from-fuchsia-500 to-fuchsia-600',
      'from-sky-500 to-sky-600',
      'from-green-500 to-green-600',
      'from-yellow-500 to-yellow-600',
      'from-cyan-500 to-cyan-600',
      'from-blue-500 to-blue-600'
    ];
    return colors[index % colors.length];
  };

  // Get light color for background
  const getLightColor = (index: number) => {
    const colors = [
      'bg-blue-50',
      'bg-emerald-50',
      'bg-purple-50',
      'bg-orange-50',
      'bg-red-50',
      'bg-indigo-50',
      'bg-cyan-50',
      'bg-pink-50',
      'bg-teal-50',
      'bg-amber-50',
      'bg-violet-50',
      'bg-rose-50',
      'bg-lime-50',
      'bg-fuchsia-50',
      'bg-sky-50',
      'bg-green-50',
      'bg-yellow-50',
      'bg-cyan-50',
      'bg-blue-50'
    ];
    return colors[index % colors.length];
  };

  const handleCardClick = (id: string) => {
    router.push(`/standards/${id}`);
  };

  return (
    <section className='bg-gray-50'>
      <div className='max-w-[1280px] mx-auto px-4 py-16'>
        {/* Header */}
        <div className='text-center mb-10'>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-800'>
            Standards We Cover
          </h2>
          <p className='text-gray-500 mt-2'>
            International accreditation standards we support
          </p>
        </div>

        {/* Bar Grid */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
          {standardsData.map((item, index) => {
            const isHovered = hoveredIndex === index;
            const color = getColor(index);
            const lightColor = getLightColor(index);

            return (
              <div
                key={index}
                className='relative group'
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => handleCardClick(item.id)}
              >
                <div
                  className={`
                    relative flex items-center gap-4 px-4 py-3 
                    rounded-xl transition-all duration-300 cursor-pointer
                    ${lightColor} border border-gray-100
                    ${isHovered ? 'shadow-xl scale-[1.02]' : 'shadow-sm hover:shadow-lg'}
                  `}
                  style={{
                    transform: isHovered ? 'translateX(8px)' : 'translateX(0)',
                    transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
                  }}
                >
                  {/* Left Color Bar */}
                  <div className={`
                    absolute left-0 top-0 bottom-0 w-1.5 rounded-l-xl
                    bg-gradient-to-b ${color}
                    transition-all duration-300
                  `}></div>

                  {/* Index Number */}
                  <div className={`
                    flex items-center justify-center w-7 h-7 rounded-lg
                    bg-white text-xs font-bold text-gray-400
                    transition-all duration-300
                    ${isHovered ? `text-white bg-gradient-to-r ${color} scale-110 shadow-md` : ''}
                  `}>
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  {/* Content */}
                  <div className='flex-1 min-w-0'>
                    <div className='flex items-center gap-2'>
                      <span className={`
                        text-sm font-semibold text-gray-800
                        transition-all duration-300
                        ${isHovered ? `text-transparent bg-clip-text bg-gradient-to-r ${color}` : ''}
                      `}>
                        {item.name.slice(0, 10)}
                      </span>
                    </div>
                    <div className='text-xs text-gray-500 truncate'>
                      {item.description}
                    </div>
                  </div>

                  {/* Arrow Icon */}
                  <div className={`
                    flex-shrink-0 text-gray-300
                    transition-all duration-300
                    ${isHovered ? 'text-blue-500 translate-x-1' : ''}
                  `}>
                    <FaChevronRight className='w-3 h-3' />
                  </div>

                  {/* Hover Glow Effect */}
                  <div className={`
                    absolute inset-0 rounded-xl bg-gradient-to-r ${color}
                    opacity-0 transition-opacity duration-300
                    ${isHovered ? 'opacity-5' : ''}
                  `}></div>
                </div>

                {/* Bottom Shadow on Hover */}
                <div className={`
                  absolute -bottom-1 left-1/2 transform -translate-x-1/2
                  w-[90%] h-4 bg-gradient-to-r from-transparent via-gray-300/30 to-transparent
                  rounded-full blur-md transition-all duration-300
                  ${isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-90'}
                `}></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}