// app/page.tsx
import AccreditationServices from '@/components/home/AccreditationServices';
import Banner from '@/components/home/Banner';
import BannerSlider from '@/components/home/BannerSlider';
import CertificateVerifyWidget from '@/components/home/CertificateVerifyWidget';
import CTASection from '@/components/home/CTASection';
import GlobalReachMap from '@/components/home/GlobalReachMap';
import NewsFeed from '@/components/home/NewsFeed';
import ProcessFlow from '@/components/home/ProcessFlow';
import ResourceHub from '@/components/home/ResourceHub';
import StandardsWeCover from '@/components/home/StandardsWeCover';
import StatsBar from '@/components/home/StatsBar';
import SuccessStories from '@/components/home/SuccessStories';
import TestimonialsMarquee from '@/components/home/TestimonialsMarquee';
import TrustSignals from '@/components/home/TrustSignals';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import { generateDynamicMetadata } from '@/metadata/generateMetadata';

export async function generateMetadata() {
  return generateDynamicMetadata({
    title: 'ISAB | Home',
    description:
      'Linuxeon is a cutting-edge SMS and bulk messaging platform that enables businesses to send transactional, promotional, and OTP messages globally. Reliable, scalable, and feature-rich messaging solutions.',
    keywords: [
      'linuxeon',
      'sms service',
      'bulk sms',
      'sms marketing',
      'text messaging',
      'sms gateway',
      'transactional sms',
      'promotional sms',
      'otp sms',
      'sms platform',
      'messaging api',
      'sms automation',
      'sms campaign',
      'sms software',
      'sms provider',
      'enterprise sms',
      'sms reseller',
      'sms gateway api',
      'global sms'
    ]
  });
}

export default function Home() {
  return (
    <div className='bg-[#F4F6F8] overflow-x-hidden'>
      <BannerSlider></BannerSlider>
      <Banner />
      <ResourceHub />
      <CertificateVerifyWidget />
      <StatsBar />
      <WhyChooseUs />
      <ProcessFlow />
      <AccreditationServices />
      <StandardsWeCover />
      <GlobalReachMap />
      <SuccessStories />
      <TestimonialsMarquee />
      <NewsFeed />
      <TrustSignals />
      <CTASection />
    </div>
  );
}


