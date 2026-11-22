import PendingDocuments from "@/components/client-components/documents/RequestDocuments";
import { generateDynamicMetadata } from "@/metadata/generateMetadata";
import { Suspense } from "react";

export async function generateMetadata() {
  return generateDynamicMetadata({
    title: "Pending Documents | Super Admin Dashboard",
    description: "Review and manage pending accreditation documents from all bodies",
    keywords: ["pending documents", "accreditation review", "document approval", "super admin"],
  });
}

const PendingDocumentsPage = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-300">Loading Pending Documents...</p>
        </div>
      </div>
    }>
      <PendingDocuments />
    </Suspense>
  );
};

export default PendingDocumentsPage;




