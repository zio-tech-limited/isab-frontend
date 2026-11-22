// app/(main)/standards/[id]/page.tsx
import StandardDetailClient from '@/components/home/StandardDetailClient';
import { getStandardDetails, standardsData } from '@/utils/constant/standards';
import { notFound } from 'next/navigation';

// Generate static paths for all standards
export async function generateStaticParams() {
  return standardsData.map((standard) => ({
    id: standard.id,
  }));
}

// Page component - params is now a Promise
export default async function StandardDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // Await the params
  const { id } = await params;
  const standard = standardsData.find((s) => s.id === id);

  if (!standard) {
    notFound();
  }

  const details = getStandardDetails(id);

  return <StandardDetailClient standard={standard} details={details} />;
}

