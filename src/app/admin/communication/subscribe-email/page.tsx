import { Suspense } from "react";
import { generateDynamicMetadata } from "@/metadata/generateMetadata";
import EmailSubscriptionList from "@/components/communication/EmailSubscriptionList";

export async function generateMetadata() {
  return generateDynamicMetadata({
    title: "Email Subscriptions | Admin Dashboard",
    description: "Manage email subscriptions - view, search, and delete subscribed emails.",
    keywords: ["email", "subscriptions", "newsletter", "email management"],
  });
}

export default function EmailSubscriptionsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-300">Loading email subscriptions...</p>
        </div>
      </div>
    }>
      <EmailSubscriptionList />
    </Suspense>
  );
}


