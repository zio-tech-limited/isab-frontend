import { Suspense } from "react";
import { generateDynamicMetadata } from "@/metadata/generateMetadata";
import AddCertificate from "@/components/authentication/AddCertificate";

export async function generateMetadata() {
  return generateDynamicMetadata({
    title: "Add Certificate | Admin Dashboard",
    description: "Add a new certificate to the system.",
    keywords: ["add certificate", "new certificate", "ISO certification"],
  });
}

export default function AddCertificatePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center ">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-300">Loading form...</p>
        </div>
      </div>
    }>
      <AddCertificate />
    </Suspense>
  );
}