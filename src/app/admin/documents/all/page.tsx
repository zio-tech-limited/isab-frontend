
import AllDocuments from "@/components/client-components/documents/AllDocuments";
import { generateDynamicMetadata } from "@/metadata/generateMetadata";
import { Suspense } from "react";

export async function generateMetadata() {
  return generateDynamicMetadata({
    title: "All Documents | Accreditation Body Dashboard",
    description: "View and manage all uploaded documents for accreditation",
    keywords: ["documents", "accreditation documents", "file management", "document vault"],
  });
}

const AllDocumentsPage = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-300">Loading Documents...</p>
        </div>
      </div>
    }>
      <AllDocuments />
    </Suspense>
  );
};

export default AllDocumentsPage;