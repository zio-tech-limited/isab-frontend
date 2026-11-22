import { Suspense } from "react";
import { generateDynamicMetadata } from "@/metadata/generateMetadata";
import BannerImageList from "@/components/communication/BannerImageList";

export async function generateMetadata() {
  return generateDynamicMetadata({
    title: "Home Banner | Admin Settings",
    description: "Manage home banner images - view, add, edit, and delete banner images.",
    keywords: ["banner", "settings", "home banner", "image management"],
  });
}

export default function BannerImagePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-300">Loading banner images...</p>
        </div>
      </div>
    }>
      <BannerImageList />
    </Suspense>
  );
}