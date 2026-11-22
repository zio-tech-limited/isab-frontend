import { Suspense } from "react";
import { generateDynamicMetadata } from "@/metadata/generateMetadata";
import PublicSmsList from "@/components/communication/PublicSmsList";

export async function generateMetadata() {
  return generateDynamicMetadata({
    title: "Public SMS | Admin Dashboard",
    description: "Manage public SMS messages - view, read, reply, and delete messages from website visitors.",
    keywords: ["sms", "public messages", "contact form", "inbox", "communication"],
  });
}

export default function PublicSmsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-300">Loading messages...</p>
        </div>
      </div>
    }>
      <PublicSmsList />
    </Suspense>
  );
}