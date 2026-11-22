// redux/api/certificate/certificateApi.ts
import { apiSlice } from "../apiSlice";

export const certificateApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Create certificate
    createCertificate: builder.mutation({
      query: (certificateData) => ({
        url: "/certificate/create-certificate",
        method: "POST",
        body: certificateData,
      }),
      invalidatesTags: ["Certificate"],
    }),

    // Get all certificates
    getAllCertificates: builder.query({
      query: ({
        page = 1,
        limit = 10,
        search = "",
        status = "",
        country = "",
        isExpired = "",
      }: {
        page?: number;
        limit?: number;
        search?: string;
        status?: string;
        country?: string;
        isExpired?: string;
      }) => {
        const params = new URLSearchParams();
        params.append("page", page.toString());
        params.append("limit", limit.toString());
        if (search) params.append("search", search);
        if (status) params.append("status", status);
        if (country) params.append("country", country);
        if (isExpired) params.append("isExpired", isExpired);

        return {
          url: `/certificate/get-certificates?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: (result) => {
        return result?.data
          ? [
            ...result.data.map(({ id }: { id: string }) => ({ type: 'Certificate' as const, id })),
            { type: 'Certificate', id: 'LIST' },
          ]
          : [{ type: 'Certificate', id: 'LIST' }];
      },
    }),

    // Get certificate by ID
    getCertificateById: builder.query({
      query: (id: string) => ({
        url: `/certificate/get-certificate/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: 'Certificate', id }],
    }),

    // Get certificate by number (public) - Regular query
    getCertificateByNumber: builder.query({
      query: (certificateNumber: string) => ({
        url: `/certificate/verify/${certificateNumber}`,
        method: "GET",
      }),
    }),

    // Get certificate by number (public) - Lazy query for manual triggering
    lazyGetCertificateByNumber: builder.query({
      query: (certificateNumber: string) => ({
        url: `/certificate/verify/${certificateNumber}`,
        method: "GET",
      }),
    }),

    // Update certificate
    updateCertificate: builder.mutation({
      query: ({ id, ...data }: { id: number;[key: string]: unknown }) => ({
        url: `/certificate/update-certificate/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Certificate', id },
        { type: 'Certificate', id: 'LIST' },
      ],
    }),

    // Delete certificate
    deleteCertificate: builder.mutation({
      query: (id: number) => ({
        url: `/certificate/delete-certificate/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: 'Certificate', id: 'LIST' }],
    }),

    // Update certificate status
    updateCertificateStatus: builder.mutation({
      query: ({ id, status }: { id: number; status: 'active' | 'expired' | 'suspended' | 'pending' }) => ({
        url: `/certificate/update-certificate-status/${id}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Certificate', id },
        { type: 'Certificate', id: 'LIST' },
      ],
    }),

    // Verify certificate
    verifyCertificate: builder.mutation({
      query: ({ id, isVerified }: { id: number; isVerified: boolean }) => ({
        url: `/certificate/verify-certificate/${id}`,
        method: "PUT",
        body: { isVerified },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Certificate', id },
        { type: 'Certificate', id: 'LIST' },
      ],
    }),

    // Get certificate statistics
    getCertificateStats: builder.query({
      query: () => ({
        url: '/certificate/get-certificate-stats',
        method: 'GET',
      }),
      providesTags: ['Certificate'],
    }),

    // Get certificates by company
    getCertificatesByCompany: builder.query({
      query: (companyName: string) => ({
        url: `/certificate/get-certificates-by-company/${companyName}`,
        method: 'GET',
      }),
      providesTags: ['Certificate'],
    }),
  }),
});

export const {
  useCreateCertificateMutation,
  useGetAllCertificatesQuery,
  useGetCertificateByIdQuery,
  useGetCertificateByNumberQuery,
  useLazyGetCertificateByNumberQuery, 
  useUpdateCertificateMutation,
  useDeleteCertificateMutation,
  useUpdateCertificateStatusMutation,
  useVerifyCertificateMutation,
  useGetCertificateStatsQuery,
  useGetCertificatesByCompanyQuery,
} = certificateApi;

