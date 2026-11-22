import { Suspense } from "react";
import { generateDynamicMetadata } from "@/metadata/generateMetadata";
import WhatsAppNumberList from "@/components/communication/WhatsAppNumberList";

export async function generateMetadata() {
  return generateDynamicMetadata({
    title: "WhatsApp Numbers | Admin Dashboard",
    description: "Manage WhatsApp numbers - view, add, edit, and delete WhatsApp numbers.",
    keywords: ["whatsapp", "communication", "whatsapp management", "phone numbers"],
  });
}

export default function WhatsAppNumberPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-300">Loading WhatsApp numbers...</p>
        </div>
      </div>
    }>
      <WhatsAppNumberList />
    </Suspense>
  );
}