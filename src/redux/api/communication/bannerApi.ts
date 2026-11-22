import { apiSlice } from "../apiSlice";

export interface BannerImage {
  id: number;
  image: string;
  altText: string;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface BannerImageResponse {
  success: boolean;
  data: BannerImage | BannerImage[];
  message?: string;
}

export interface PaginatedResponse {
  success: boolean;
  data: BannerImage[];
  pagination?: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    itemsPerPage: number;
  };
}

export interface BannerStats {
  total: number;
  active: number;
  inactive: number;
}

export const bannerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all banner images with search and pagination
    getAllBannerImages: builder.query<PaginatedResponse, { 
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
          url: `/settings/banner-images/?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: (result) => {
        if (result?.data) {
          return [
            ...result.data.map(({ id }) => ({ type: 'Banner' as const, id })),
            { type: 'Banner', id: 'LIST' },
          ];
        }
        return [{ type: 'Banner', id: 'LIST' }];
      },
    }),

    // Get active banner images for frontend
    getActiveBannerImages: builder.query<BannerImageResponse, void>({
      query: () => ({
        url: "/settings/banner-images/active",
        method: "GET",
      }),
      providesTags: ['BannerActive'],
    }),

    // Get single banner image
    getBannerImageById: builder.query<BannerImageResponse, number>({
      query: (id) => ({
        url: `/settings/banner-images/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: 'Banner', id }],
    }),

    // Create banner image
    createBannerImage: builder.mutation<BannerImageResponse, { 
      image: string; 
      altText?: string;
      isActive?: boolean;
      order?: number;
    }>({
      query: (data) => ({
        url: "/settings/banner-images/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [
        { type: 'Banner', id: 'LIST' },
        'BannerActive'
      ],
    }),

    // Update banner image
    updateBannerImage: builder.mutation<BannerImageResponse, { 
      id: number; 
      image?: string; 
      altText?: string;
      isActive?: boolean;
      order?: number;
    }>({
      query: ({ id, ...data }) => ({
        url: `/settings/banner-images/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Banner', id },
        { type: 'Banner', id: 'LIST' },
        'BannerActive'
      ],
    }),

    // Delete banner image
    deleteBannerImage: builder.mutation<BannerImageResponse, number>({
      query: (id) => ({
        url: `/settings/banner-images/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [
        { type: 'Banner', id: 'LIST' },
        'BannerActive'
      ],
    }),

    // Set banner image as active
    setActiveBannerImage: builder.mutation<BannerImageResponse, number>({
      query: (id) => ({
        url: `/settings/banner-images/${id}/activate`,
        method: "PATCH",
      }),
      invalidatesTags: [
        { type: 'Banner', id: 'LIST' },
        'BannerActive'
      ],
    }),

    // Toggle multiple banner images active
    toggleBannerImagesActive: builder.mutation<BannerImageResponse, { ids: number[] }>({
      query: (data) => ({
        url: "/settings/banner-images/toggle-active",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [
        { type: 'Banner', id: 'LIST' },
        'BannerActive'
      ],
    }),

    // Get banner statistics
    getBannerStats: builder.query<{ success: boolean; data: BannerStats }, void>({
      query: () => ({
        url: "/settings/banner-images/stats",
        method: "GET",
      }),
      providesTags: ['BannerStats'],
    }),
  }),
});

export const {
  useGetAllBannerImagesQuery,
  useGetActiveBannerImagesQuery,
  useGetBannerImageByIdQuery,
  useCreateBannerImageMutation,
  useUpdateBannerImageMutation,
  useDeleteBannerImageMutation,
  useSetActiveBannerImageMutation,
  useToggleBannerImagesActiveMutation,
  useGetBannerStatsQuery,
} = bannerApi;