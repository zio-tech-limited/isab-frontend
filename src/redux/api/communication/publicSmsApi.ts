import { apiSlice } from "../apiSlice";

export interface PublicSms {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  country: string | null;
  subject: string | null;
  message: string;
  isRead: boolean;
  isReplied: boolean;
  repliedAt: string | null;
  replyMessage: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PublicSmsResponse {
  success: boolean;
  data: PublicSms | PublicSms[];
  message?: string;
}

export interface PaginatedSmsResponse {
  success: boolean;
  data: PublicSms[];
  pagination?: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    itemsPerPage: number;
  };
}

export interface PublicSmsStats {
  total: number;
  unread: number;
  read: number;
  replied: number;
  unreplied: number;
  last7Days: number;
  responseRate: number;
}

export interface StatsResponse {
  success: boolean;
  data: PublicSmsStats;
}

export const publicSmsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Create public SMS (public)
    createPublicSms: builder.mutation<PublicSmsResponse, {
      name: string;
      email: string;
      phone?: string;
      country?: string;
      subject?: string;
      message: string;
    }>({
      query: (data) => ({
        url: "/communication/public-sms",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['PublicSms'],
    }),

    // Get all public SMS (admin)
    getAllPublicSms: builder.query<PaginatedSmsResponse, {
      page?: number;
      limit?: number;
      search?: string;
      isRead?: string;
      isReplied?: string;
    }>({
      query: ({ page = 1, limit = 10, search = "", isRead = "all", isReplied = "all" }) => {
        const params = new URLSearchParams();
        params.append("page", page.toString());
        params.append("limit", limit.toString());
        if (search && search.trim() !== "") {
          params.append("search", search.trim());
        }
        if (isRead !== "all") {
          params.append("isRead", isRead);
        }
        if (isReplied !== "all") {
          params.append("isReplied", isReplied);
        }
        
        return {
          url: `/communication/public-sms?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: (result) => {
        if (result?.data) {
          return [
            ...result.data.map(({ id }) => ({ type: 'PublicSms' as const, id })),
            { type: 'PublicSms', id: 'LIST' },
          ];
        }
        return [{ type: 'PublicSms', id: 'LIST' }];
      },
    }),

    // Get single public SMS (admin)
    getPublicSmsById: builder.query<PublicSmsResponse, number>({
      query: (id) => ({
        url: `/communication/public-sms/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: 'PublicSms', id }],
    }),

    // Update public SMS (admin)
    updatePublicSms: builder.mutation<PublicSmsResponse, {
      id: number;
      isRead?: boolean;
      isReplied?: boolean;
      replyMessage?: string;
    }>({
      query: ({ id, ...data }) => ({
        url: `/communication/public-sms/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'PublicSms', id },
        { type: 'PublicSms', id: 'LIST' },
      ],
    }),

    // Delete public SMS (admin)
    deletePublicSms: builder.mutation<PublicSmsResponse, number>({
      query: (id) => ({
        url: `/communication/public-sms/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [
        { type: 'PublicSms', id: 'LIST' },
      ],
    }),

    // Get public SMS statistics (admin)
    getPublicSmsStats: builder.query<StatsResponse, void>({
      query: () => ({
        url: "/communication/public-sms/stats",
        method: "GET",
      }),
      providesTags: ['PublicSms', { type: 'PublicSms', id: 'STATS' }],
    }),
  }),
});

export const {
  useCreatePublicSmsMutation,
  useGetAllPublicSmsQuery,
  useGetPublicSmsByIdQuery,
  useUpdatePublicSmsMutation,
  useDeletePublicSmsMutation,
  useGetPublicSmsStatsQuery,
} = publicSmsApi;