"use client"

import { useRouter } from "next/navigation";

export default function Banner() {
  const router = useRouter();
  return (
    <section className='relative py-6' id='home'>
      <div
        aria-hidden='true'
        className='absolute inset-0 grid grid-cols-2 -space-x-52 opacity-20'
      >
        <div className='blur-[106px] h-56 bg-gradient-to-br from-green-600 to-blue-700'></div>
        <div className='blur-[106px] h-32 bg-gradient-to-r from-green-700 to-blue-600'></div>
      </div>
      <div className='relative sm:pt-16 ml-auto'>
        <div className='lg:w-2/3 text-center mx-auto'>
          <h1 className='text-gray-900 font-bold text-4xl md:text-5xl xl:text-6xl'>
            Trusted Accreditation for Professional Excellence
          </h1>

          <p className='mt-8 text-gray-700'>
           iSAB is a global professional certification and credentialing platform dedicated to advancing competence, integrity, and professional excellence. Through internationally recognized certifications, secure digital credentials, and instant verification, we help professionals and organizations build trust worldwide.
          </p>

          <div className='mt-10 flex flex-wrap justify-center gap-y-4 gap-x-6'>
            <button
              onClick={() => router.push('/certificate-verification')}
              className='relative px-8 py-2.5 rounded-full bg-gradient-to-r from-blue-950 via-blue-900 to-black text-white hover:from-blue-900 hover:via-blue-800 hover:to-gray-800 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-blue-950/50 hover:scale-105 overflow-hidden group'
            >
              <span className='relative z-10 flex items-center gap-2'>
                <span className='w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse'></span>
                Verify a Certificate
              </span>
              <span className='absolute inset-0 bg-gradient-to-r from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'></span>
            </button>
            
            <button
              onClick={() => router.push('/register')}
              className='relative px-8 py-2.5 rounded-full bg-gradient-to-r from-blue-950 via-blue-900 to-black text-white hover:from-blue-900 hover:via-blue-800 hover:to-gray-800 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-blue-950/50 hover:scale-105 overflow-hidden group'
            >
              <span className='relative z-10 flex items-center gap-2'>
                <span className='w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse'></span>
                Apply for Accreditation
              </span>
              <span className='absolute inset-0 bg-gradient-to-r from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'></span>
            </button>
          </div>
          
        </div>
      </div>
    </section>
  );
}
