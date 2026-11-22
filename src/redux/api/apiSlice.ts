import { appConfiguration } from "@/utils/constant/appConfiguration";
import { shareWithCookies } from "@/utils/helper/shareWithCookies";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = appConfiguration.baseUrl;

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token = shareWithCookies("get", `${appConfiguration.appCode}token`, 0) as string | null;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  refetchOnMountOrArgChange: true, 
  refetchOnFocus: true,
  refetchOnReconnect: true,
  tagTypes: [
    "Certificate",
    "StudentDocument",
    "SubCompany",
    "AccreditationDocument",
    "WhatsAppActive",
    "WhatsApp",
    "EmailSubscription",
    "PublicSms",
    "BannerStats",
    "BannerActive",
    "Banner",
    "Chat",
    "ChatStats",





















    
    "Student",
    "StudentStats",



















    "Enterprise",
    "Supplier",
    "Retailer",
    "RetailerStats",
    "RetailerSearch",
    "SupplierCalculation",
    "CustomerCalculation",
    "RetailerCalculation",
    "PurchaseHistory",
    "SellHistory",











    "Customer",
    "Customer",
    "CustomerStats",
    "CustomerSearch",
    "SupplierStats",
    "SupplierSearch",
    "Drivers",
    "DriverStats",
    "DriverTrips",
    "Client",
    "File",
    "SMS",
    "Audience",
    "AudienceStats",
    "SMSHistory",
    "Payments",
    "Payment"
  ],
  endpoints: () => ({}),
});