
import DocumentUploadWrapper from "@/components/client-components/documents/DocumentUploadWrapper";
import { generateDynamicMetadata } from "@/metadata/generateMetadata";
import { Suspense } from "react";

export async function generateMetadata() {
  return generateDynamicMetadata({
    title: "Upload Documents | Accreditation Body Dashboard",
    description: "Upload new documents for accreditation review and management",
    keywords: ["upload document", "accreditation documents", "file upload", "document submission"],
  });
}

const UploadDocumentPage = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-300">Loading Upload Portal...</p>
        </div>
      </div>
    }>
      <DocumentUploadWrapper />
    </Suspense>
  );
};

export default UploadDocumentPage;


