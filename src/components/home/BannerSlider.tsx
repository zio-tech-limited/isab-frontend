"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { BannerImage, useGetActiveBannerImagesQuery } from "@/redux/api/communication/bannerApi";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination, Keyboard } from 'swiper/modules';
import { useState, useEffect, useRef } from "react";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Banner() {
  const { data: bannerData, isLoading, error } = useGetActiveBannerImagesQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeImages = bannerData?.data as BannerImage[] || [];

  // If no images, don't render
  if (!activeImages.length) return null;

  // Handle navigation with immediate response
  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  return (
    <section className='relative overflow-hidden' id='home'>
      <div className='relative'>
        {/* Gradient Background - Professional subtle gradient */}
        <div
          aria-hidden='true'
          className='absolute inset-0 grid grid-cols-2 -space-x-52 opacity-30 z-0'
        >
          <div className='blur-[106px] h-56 bg-gradient-to-br from-blue-600/30 to-emerald-600/30'></div>
          <div className='blur-[106px] h-32 bg-gradient-to-r from-emerald-600/30 to-blue-600/30'></div>
        </div>

        {/* Swiper Slider */}
        <div className='relative z-10'>
          <Swiper
            modules={[Autoplay, EffectFade, Navigation, Pagination, Keyboard]}
            effect="fade"
            fadeEffect={{ 
              crossFade: true
            }}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={1}
            spaceBetween={0}
            loop={true}
            speed={800}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={false} // Disable default navigation
            pagination={{
              clickable: true,
              dynamicBullets: true,
              renderBullet: (index, className) => {
                return `<span class="${className} !w-3 !h-3 !bg-white/80 !opacity-60 !transition-all !duration-300 hover:!opacity-100"></span>`;
              },
            }}
            mousewheel={false} // Disable mouse wheel
            keyboard={{
              enabled: true,
              onlyInViewport: true,
            }}
            touchEventsTarget='wrapper' // Ensure touch events work properly
            touchRatio={1} // Enable touch interaction
            touchAngle={45} // Touch angle sensitivity
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            className="h-[450px] md:h-[550px] lg:h-[650px] xl:h-[700px] w-full"
          >
            {activeImages.map((image: BannerImage, index: number) => (
              <SwiperSlide key={image.id}>
                {({ isActive }) => (
                  <div className="relative w-full h-full overflow-hidden">
                    {/* Image with slow zoom animation */}
                    <div className={`absolute inset-0 ${isActive ? 'animate-zoom-in' : ''}`}>
                      <Image
                        src={image.image}
                        alt={image.altText || `Banner ${index + 1}`}
                        fill
                        className="object-cover"
                        priority={index === 0}
                        sizes="100vw"
                        quality={100}
                      />
                    </div>
                    
                    {/* Sophisticated overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
                    
                    {/* Alt Text with animation - Positioned at center-bottom */}
                    {image.altText && (
                      <div className={`absolute bottom-12 md:bottom-16 left-1/2 -translate-x-1/2 w-full px-4 md:px-8 text-center transition-all duration-1000 ${
                        isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                      }`}>
                        <h2 className="text-white text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-wide drop-shadow-lg">
                          {image.altText}
                        </h2>
                        <div className="w-20 md:w-32 h-1 bg-emerald-400 mx-auto mt-4 rounded-full"></div>
                      </div>
                    )}
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Arrows - Immediate response */}
          <button 
            onClick={handlePrev}
            className="custom-prev absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 group hover:scale-105 transition-transform duration-300"
            aria-label="Previous slide"
          >
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 hover:border-white/40 hover:backdrop-blur-md transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 md:w-7 md:h-7 text-white group-hover:scale-110 transition-transform duration-300">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </div>
          </button>
          
          <button 
            onClick={handleNext}
            className="custom-next absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 group hover:scale-105 transition-transform duration-300"
            aria-label="Next slide"
          >
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 hover:border-white/40 hover:backdrop-blur-md transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 md:w-7 md:h-7 text-white group-hover:scale-110 transition-transform duration-300">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </div>
          </button>

          {/* Custom Pagination */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 swiper-pagination-custom"></div>
        </div>
      </div>

      <style jsx global>{`
        /* Slow zoom animation for images */
        @keyframes zoomIn {
          0% { 
            transform: scale(1); 
          }
          100% { 
            transform: scale(1.15); 
          }
        }

        @keyframes zoomOut {
          0% { 
            transform: scale(1.15); 
          }
          100% { 
            transform: scale(1); 
          }
        }

        .animate-zoom-in {
          animation: zoomIn 12s ease-in-out forwards;
        }

        /* Professional fade transition */
        .swiper-slide {
          transition: opacity 0.8s ease-in-out !important;
        }

        .swiper-slide-prev,
        .swiper-slide-next {
          opacity: 0 !important;
        }

        .swiper-slide-active {
          opacity: 1 !important;
        }

        /* Hide default swiper navigation */
        .swiper-button-prev,
        .swiper-button-next {
          display: none !important;
        }

        /* Custom pagination styling */
        .swiper-pagination-custom .swiper-pagination-bullet {
          width: 10px !important;
          height: 10px !important;
          background: rgba(255, 255, 255, 0.5) !important;
          opacity: 0.6 !important;
          margin: 0 6px !important;
          transition: all 0.3s ease !important;
        }

        .swiper-pagination-custom .swiper-pagination-bullet-active {
          background: #10b981 !important;
          opacity: 1 !important;
          width: 30px !important;
          border-radius: 5px !important;
        }

        /* Professional loading state */
        .swiper-slide {
          background: #0a0a0f;
        }

        /* Glassmorphism refinement */
        .backdrop-blur-sm {
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        /* Responsive adjustments */
        @media (max-width: 640px) {
          .swiper-pagination-custom .swiper-pagination-bullet {
            width: 8px !important;
            height: 8px !important;
          }
          .swiper-pagination-custom .swiper-pagination-bullet-active {
            width: 20px !important;
          }
        }

        /* Hover effect for navigation buttons */
        .custom-prev:hover,
        .custom-next:hover {
          transform: scale(1.05);
        }

        /* Touch and mouse interaction improvements */
        .swiper-wrapper {
          cursor: grab;
        }

        .swiper-wrapper:active {
          cursor: grabbing;
        }

        /* Disable mouse wheel scrolling on swiper container */
        .swiper-container {
          touch-action: pan-y pinch-zoom;
        }
      `}</style>
    </section>
  );
}


