import { apiSlice } from "../apiSlice";

export interface EmailSubscription {
  id: number;
  email: string;
  isSubscribed: boolean;
  subscribedAt: string;
  unsubscribedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface EmailSubscriptionResponse {
  success: boolean;
  data: EmailSubscription | EmailSubscription[];
  message?: string;
}

export interface PaginatedEmailResponse {
  success: boolean;
  data: EmailSubscription[];
  pagination?: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    itemsPerPage: number;
  };
}

export interface SubscriptionStats {
  total: number;
  totalSubscribed: number;
  totalUnsubscribed: number;
  recentSubscriptions: number;
  subscriptionRate: number;
}

export interface StatsResponse {
  success: boolean;
  data: SubscriptionStats;
}

export const emailSubscriptionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Subscribe email (public)
    subscribeEmail: builder.mutation<EmailSubscriptionResponse, { email: string }>({
      query: (data) => ({
        url: "/communication/email-subscribe",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['EmailSubscription'],
    }),

    // Unsubscribe email (public)
    unsubscribeEmail: builder.mutation<EmailSubscriptionResponse, { email: string }>({
      query: (data) => ({
        url: "/communication/email-unsubscribe",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['EmailSubscription'],
    }),

    // Get all subscribed emails (admin)
    getAllSubscribedEmails: builder.query<PaginatedEmailResponse, {
      page?: number;
      limit?: number;
      search?: string;
      isSubscribed?: string;
    }>({
      query: ({ page = 1, limit = 10, search = "", isSubscribed = "true" }) => {
        const params = new URLSearchParams();
        params.append("page", page.toString());
        params.append("limit", limit.toString());
        if (search && search.trim() !== "") {
          params.append("search", search.trim());
        }
        params.append("isSubscribed", isSubscribed);
        
        return {
          url: `/communication/email-subscriptions?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: (result) => {
        if (result?.data) {
          return [
            ...result.data.map(({ id }) => ({ type: 'EmailSubscription' as const, id })),
            { type: 'EmailSubscription', id: 'LIST' },
          ];
        }
        return [{ type: 'EmailSubscription', id: 'LIST' }];
      },
    }),

    // Delete email subscription (admin)
    deleteEmailSubscription: builder.mutation<EmailSubscriptionResponse, number>({
      query: (id) => ({
        url: `/communication/email-subscriptions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [
        { type: 'EmailSubscription', id: 'LIST' },
        { type: 'EmailSubscription', id: 'STATS' },
      ],
    }),

    // Get subscription statistics (admin)
    getSubscriptionStats: builder.query<StatsResponse, void>({
      query: () => ({
        url: "/communication/email-subscriptions/stats",
        method: "GET",
      }),
      providesTags: ['EmailSubscription', { type: 'EmailSubscription', id: 'STATS' }],
    }),
  }),
});

export const {
  useSubscribeEmailMutation,
  useUnsubscribeEmailMutation,
  useGetAllSubscribedEmailsQuery,
  useDeleteEmailSubscriptionMutation,
  useGetSubscriptionStatsQuery,
} = emailSubscriptionApi;