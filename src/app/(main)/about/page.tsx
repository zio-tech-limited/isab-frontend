'use client';


import Image from 'next/image';
import accreditation_certificate from '@/assets/Home/accreditation_certificate.jpg';
import {
  Shield,
  Target,
  Eye,
  FileText,
  Globe,
  Users,
  Award,
  CheckCircle,
  Sparkles,
  ArrowRight,
  Building2,
  Clock,
  TrendingUp,
  Heart
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className='w-full bg-white text-gray-800'>
      {/* Hero Section */}
      <section className='relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50 pt-44 pb-20'>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-green-400/10 to-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-grid-blue-900/[0.02] bg-[size:40px_40px]" />

        <div className='max-w-6xl mx-auto px-4 relative z-10 text-center'>
          <div className="inline-flex items-center gap-2 bg-white shadow-sm rounded-full px-4 py-1.5 mb-6">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">About ISAB</span>
          </div>

          <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold mb-4'>
            Upholding Excellence in
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              Global Standards
            </span>
          </h1>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            International Standards Accreditation Board (ISAB) — Committed to safeguarding lives, protecting property, and ensuring global quality through accreditation.
          </p>
        </div>
      </section>

      {/* Vision Section */}
      <section className='py-16'>
        <div className='max-w-6xl mx-auto px-4'>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="order-2 md:order-1"
            >
              <div className="inline-flex items-center gap-2 bg-blue-50 rounded-full px-4 py-1.5 mb-4">
                <Eye className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">Our Vision</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                We aim to safeguard lives and protect property by accrediting qualified organizations that deliver essential services, products, and oversight globally.
              </p>

              <div className="mt-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Global Impact</p>
                  <p className="text-sm text-gray-500">Protecting lives worldwide</p>
                </div>
              </div>
            </motion.div>

            <div className="order-1 md:order-2 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur-2xl opacity-20" />
                <Image
                  src={accreditation_certificate}
                  alt="Accreditation Certificate"
                  width={500}
                  height={400}
                  className="rounded-2xl shadow-xl relative z-10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className='py-16 bg-gradient-to-br from-gray-50 to-white'>
        <div className='max-w-6xl mx-auto px-4'>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-500 rounded-2xl blur-2xl opacity-20" />
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl shadow-xl relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                      <Target className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <div className="inline-flex items-center gap-2 bg-white rounded-full px-3 py-0.5">
                        <span className="text-xs font-medium text-green-700">Our Mission</span>
                      </div>
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    Our mission is to offer top-tier accreditation services, prioritizing public safety and sustainability. We operate under the principle of <span className="font-semibold text-green-700">&quot;One Test, One Inspection, One Certification Worldwide&quot;</span>, ensuring efficiency and consistency in our work.
                  </p>

                  <div className="mt-6 grid grid-cols-2 gap-4">
                    {[
                      { icon: Shield, label: 'Public Safety' },
                      { icon: Globe, label: 'Sustainability' },
                      { icon: CheckCircle, label: 'Consistency' },
                      { icon: TrendingUp, label: 'Efficiency' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-2 bg-white/60 rounded-lg px-3 py-2">
                        <item.icon className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-gray-700">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <div className="inline-flex items-center gap-2 bg-blue-50 rounded-full px-4 py-1.5 mb-4">
                  <Award className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-700">Our Principle</span>
                </div>
                <blockquote className="text-2xl font-semibold text-gray-900 mb-4">
                  &quot;One Test, One Inspection, One Certification Worldwide&quot;
                </blockquote>
                <p className="text-gray-600 leading-relaxed">
                  This principle ensures that organizations can operate efficiently across borders, reducing redundant testing and certification processes while maintaining the highest standards of quality and safety.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Policy Section */}
      <section className='py-16'>
        <div className='max-w-6xl mx-auto px-4'>
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-8 md:p-12 border border-blue-100/50">
            <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-1.5 mb-4">
              <FileText className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">Our Policy</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Policy</h2>
            <p className="text-gray-700 leading-relaxed text-lg mb-6">
              At the <span className="font-semibold">International Standards Accreditation Board (ISAB)</span>, we are dedicated to running our accreditation programs in line with <span className="font-semibold">ISO/IEC Standard 17011</span>, meeting both national and international conformity standards.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Shield,
                  title: 'Quality Culture',
                  description: 'We continuously uphold a culture of quality, professionalism, and competence.'
                },
                {
                  icon: Users,
                  title: 'Internal Audits',
                  description: 'Regular internal audits ensure we maintain the highest standards.'
                },
                {
                  icon: CheckCircle,
                  title: 'Management Reviews',
                  description: 'Comprehensive management reviews and customer surveys drive continuous improvement.'
                }
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission Vision Values - Enhanced */}
      <section className='py-16 bg-gradient-to-br from-gray-50 to-white'>
        <div className='max-w-6xl mx-auto px-4'>
          <div className="text-center mb-12">
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
              Our Core Pillars
            </h2>
            <p className='text-gray-600 max-w-2xl mx-auto'>
              Guiding principles that drive our commitment to excellence and global standards
            </p>
          </div>

          <div className='grid md:grid-cols-3 gap-8'>
            <div className='group p-8 bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200'>
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Eye className="w-7 h-7 text-white" />
              </div>
              <h3 className='text-xl font-bold text-gray-900 mb-3'>Our Vision</h3>
              <p className='text-gray-600 leading-relaxed'>
                To safeguard lives and protect property by accrediting qualified organizations that deliver essential services, products, and oversight globally.
              </p>
            </div>

            <div className='group p-8 bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-green-200'>
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h3 className='text-xl font-bold text-gray-900 mb-3'>Our Mission</h3>
              <p className='text-gray-600 leading-relaxed'>
                To offer top-tier accreditation services, prioritizing public safety and sustainability through the principle of &quot;One Test, One Inspection, One Certification Worldwide.&quot;
              </p>
            </div>

            <div className='group p-8 bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-purple-200'>
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <h3 className='text-xl font-bold text-gray-900 mb-3'>Our Values</h3>
              <p className='text-gray-600 leading-relaxed'>
                We uphold a culture of quality, professionalism, and competence through regular internal audits, management reviews, and customer feedback.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ISO/IEC Standard 17011 Section */}
      <section className='py-16'>
        <div className='max-w-6xl mx-auto px-4'>
          <div className="bg-gradient-to-r from-blue-900 to-cyan-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-2xl" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 mb-4">
                <Award className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-medium text-cyan-300">ISO/IEC Standard 17011</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Commitment to International Standards
              </h2>
              <p className="text-blue-100 text-lg max-w-2xl leading-relaxed">
                Our accreditation programs are run in line with ISO/IEC Standard 17011, meeting both national and international conformity standards. We continuously uphold a culture of quality, professionalism, and competence through:
              </p>

              <div className="grid md:grid-cols-3 gap-4 mt-8">
                {[
                  { icon: Shield, label: 'Regular Internal Audits' },
                  { icon: TrendingUp, label: 'Management Reviews' },
                  { icon: Users, label: 'Customer Surveys' }
                ].map((item, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-cyan-400" />
                    <span className="text-sm font-medium text-white">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Enhanced */}
      <section className='py-16 bg-gradient-to-br from-gray-50 to-white'>
        <div className='max-w-6xl mx-auto px-4'>
          <div className="text-center mb-12">
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
              Why Choose ISAB
            </h2>
            <p className='text-gray-600 max-w-2xl mx-auto'>
              Trusted by organizations worldwide for our commitment to excellence and global standards
            </p>
          </div>

          <div className='grid md:grid-cols-4 gap-6'>
            {[
              {
                icon: Globe,
                title: 'International Standards',
                description: 'ISO/IEC 17011 compliant accreditation programs'
              },
              {
                icon: Users,
                title: 'Expert Auditors',
                description: 'Qualified professionals with industry expertise'
              },
              {
                icon: CheckCircle,
                title: 'Transparent Process',
                description: 'Clear and fair assessment procedures'
              },
              {
                icon: Clock,
                title: 'Efficient Service',
                description: 'Streamlined processes for quick turnaround'
              }
            ].map((item, index) => (
              <div
                key={index}
                className='group p-6 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 text-center'
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <item.icon className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className='font-semibold text-gray-900 mb-2'>{item.title}</h3>
                <p className='text-sm text-gray-600'>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section - Enhanced */}
      <section className='py-16 bg-gradient-to-r from-blue-700 to-cyan-600 text-white'>
        <div className='max-w-6xl mx-auto px-4'>
          <div className="text-center mb-10">
            <h2 className='text-3xl font-bold mb-2'>Our Impact</h2>
            <p className='text-blue-100'>Making a difference in global quality standards</p>
          </div>

          <div className='grid grid-cols-2 md:grid-cols-4 text-center gap-6'>
            {[
              { value: '500+', label: 'Certified Organizations' },
              { value: '50+', label: 'Expert Auditors' },
              { value: '45+', label: 'Countries Served' },
              { value: '12+', label: 'Years Experience' }
            ].map((stat, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-colors">
                <h3 className='text-3xl md:text-4xl font-bold'>{stat.value}</h3>
                <p className='text-sm text-blue-100 mt-2'>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-20 text-center'>
        <div className='max-w-3xl mx-auto px-4'>
          <div className="inline-flex items-center gap-2 bg-blue-50 rounded-full px-4 py-1.5 mb-4">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">Get Started</span>
          </div>

          <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
            Ready to Get Accredited?
          </h2>
          <p className='text-gray-600 text-lg mb-8'>
            Join hundreds of organizations that trust ISAB for certification and accreditation services. Experience the benefits of globally recognized accreditation.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/contact">
              <button className='bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer px-8 py-3 rounded-xl font-semibold flex items-center gap-2'>
                Apply Now
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
            <Link href="/service">
              <button className='border-2 border-gray-300 bg-white text-gray-700 hover:border-blue-600 hover:text-blue-600 transition-all duration-300 cursor-pointer px-8 py-3 rounded-xl font-semibold'>
                Explore Services
              </button>
            </Link>
          </div>

          <p className='text-sm text-gray-400 mt-6'>
            *No commitment required. Free consultation available.
          </p>
        </div>
      </section>
    </div>
  );
}

