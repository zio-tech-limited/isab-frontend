import { apiSlice } from "../apiSlice";

export interface WhatsAppNumber {
  id: number;
  whatsappNumber: string;
  message: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface WhatsAppNumberResponse {
  success: boolean;
  data: WhatsAppNumber | WhatsAppNumber[];
  message?: string;
}

export interface PaginatedResponse {
  success: boolean;
  data: WhatsAppNumber[];
  pagination?: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    itemsPerPage: number;
  };
}

export interface ActiveWhatsAppForFrontend {
  whatsappNumber: string;
  message: string;
}

export interface ActiveWhatsAppForFrontendResponse {
  success: boolean;
  data: ActiveWhatsAppForFrontend;
}

export const whatsappApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all WhatsApp numbers with search and pagination
    getAllWhatsAppNumbers: builder.query<PaginatedResponse, { 
      page?: number; 
      limit?: number;
      search?: string;
    }>({
      query: ({ page = 1, limit = 10, search = "" }) => {
        const params = new URLSearchParams();
        params.append("page", page.toString());
        params.append("limit", limit.toString());
        if (search && search.trim() !== "") {
          params.append("search", search.trim());
        }
        
        return {
          url: `/communication/whatsapp-numbers/?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: (result) => {
        if (result?.data) {
          return [
            ...result.data.map(({ id }) => ({ type: 'WhatsApp' as const, id })),
            { type: 'WhatsApp', id: 'LIST' },
          ];
        }
        return [{ type: 'WhatsApp', id: 'LIST' }];
      },
    }),

    // Get active WhatsApp number (for admin)
    getActiveWhatsAppNumber: builder.query<WhatsAppNumberResponse, void>({
      query: () => ({
        url: "/communication/whatsapp-numbers/active",
        method: "GET",
      }),
      providesTags: ['WhatsAppActive'],
    }),

    // Get active WhatsApp number for frontend (public)
    getActiveWhatsAppNumberForFrontend: builder.query<ActiveWhatsAppForFrontendResponse, void>({
      query: () => ({
        url: "/communication/whatsapp-numbers/active-public",
        method: "GET",
      }),
      providesTags: ['WhatsAppActive'],
    }),

    // Create WhatsApp number
    createWhatsAppNumber: builder.mutation<WhatsAppNumberResponse, { 
      whatsappNumber: string; 
      message?: string;
      isActive?: boolean; 
    }>({
      query: (data) => ({
        url: "/communication/whatsapp-numbers/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [
        { type: 'WhatsApp', id: 'LIST' },
        'WhatsAppActive'
      ],
    }),

    // Update WhatsApp number
    updateWhatsAppNumber: builder.mutation<WhatsAppNumberResponse, { 
      id: number; 
      whatsappNumber?: string; 
      message?: string;
      isActive?: boolean; 
    }>({
      query: ({ id, ...data }) => ({
        url: `/communication/whatsapp-numbers/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'WhatsApp', id },
        { type: 'WhatsApp', id: 'LIST' },
        'WhatsAppActive'
      ],
    }),

    // Delete WhatsApp number
    deleteWhatsAppNumber: builder.mutation<WhatsAppNumberResponse, number>({
      query: (id) => ({
        url: `/communication/whatsapp-numbers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [
        { type: 'WhatsApp', id: 'LIST' },
        'WhatsAppActive'
      ],
    }),

    // Set WhatsApp number as active
    setActiveWhatsAppNumber: builder.mutation<WhatsAppNumberResponse, number>({
      query: (id) => ({
        url: `/communication/whatsapp-numbers/${id}/activate`,
        method: "PATCH",
      }),
      invalidatesTags: [
        { type: 'WhatsApp', id: 'LIST' },
        'WhatsAppActive'
      ],
    }),
  }),
});

export const {
  useGetAllWhatsAppNumbersQuery,
  useGetActiveWhatsAppNumberQuery,
  useGetActiveWhatsAppNumberForFrontendQuery,
  useCreateWhatsAppNumberMutation,
  useUpdateWhatsAppNumberMutation,
  useDeleteWhatsAppNumberMutation,
  useSetActiveWhatsAppNumberMutation,
} = whatsappApi;

