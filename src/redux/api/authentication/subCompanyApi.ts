// redux/api/authentication/authApi.ts
import { apiSlice } from "../apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Existing client login
    login: builder.mutation({
      query: (credentials: { email: string; password: string }) => ({
        url: "/authentication/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Client"],
    }),

    // Sub Company login
    subCompanyLogin: builder.mutation({
      query: (credentials: { email: string; password: string }) => ({
        url: "/authentication/login-sub-company",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["SubCompany"],
    }),

    // Register Sub Company
    registerSubCompany: builder.mutation({
      query: (enterpriseData: {
        companyName: string;
        tradeLicenseNo?: string;
        binNo?: string;
        tinNo?: string;
        ownerName: string;
        ownerPhoto?: string;
        ownerNidOrPassportNo?: string;
        ownerNidFrontSide?: string;
        ownerNidBackSide?: string;
        phoneNo: string;
        email: string;
        website?: string;
        address: string;
        city: string;
        state: string;
        postalCode?: string;
        country?: string;
        businessType?: string;
        yearOfEstablishment?: number;
        numberOfEmployees?: number;
        bankName?: string;
        bankAccountNo?: string;
        bankBranch?: string;
        password?: string;
        role?: string;
        status?: string;
      }) => ({
        url: "/authentication/register-sub-company",
        method: "POST",
        body: enterpriseData,
      }),
      invalidatesTags: ["SubCompany"],
    }),

    // Update client
    updateClient: builder.mutation({
      query: ({ id, ...data }: { id: number;[key: string]: unknown }) => ({
        url: `/authentication/update-client/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Client', id },
        { type: 'Client', id: 'LIST' },
      ],
    }),

    // Update sub company
    updateSubCompany: builder.mutation({
      query: ({ id, ...data }: { id: number;[key: string]: unknown }) => ({
        url: `/authentication/update-sub-company/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'SubCompany', id },
        { type: 'SubCompany', id: 'LIST' },
      ],
    }),

    // Get all clients
    getAllClients: builder.query({
      query: ({
        page = 1,
        limit = 10,
        search = "",
        status = "",
        role = "client"
      }: {
        page?: number;
        limit?: number;
        search?: string;
        status?: string;
        role?: string;
      }) => {
        const params = new URLSearchParams();
        params.append("page", page.toString());
        params.append("limit", limit.toString());
        if (search) params.append("search", search);
        if (status) params.append("status", status);
        if (role) params.append("role", role);

        return {
          url: `/authentication/get-clients?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: (result) => {
        return result?.data
          ? [
            ...result.data.map(({ id }: { id: string }) => ({ type: 'Client' as const, id })),
            { type: 'Client', id: 'LIST' },
          ]
          : [{ type: 'Client', id: 'LIST' }];
      },
    }),


    // Get all sub companies
    getAllSubCompanies: builder.query({
      query: ({
        page = 1,
        limit = 10,
        search = "",
        status = "",
        city = ""
      }: {
        page?: number;
        limit?: number;
        search?: string;
        status?: string;
        city?: string;
      }) => {
        const params = new URLSearchParams();
        params.append("page", page.toString());
        params.append("limit", limit.toString());
        if (search) params.append("search", search);
        if (status) params.append("status", status);
        if (city) params.append("city", city);

        return {
          url: `/authentication/get-sub-companies?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: (result) => {
        return result?.data
          ? [
            ...result.data.map(({ id }: { id: string }) => ({ type: 'SubCompany' as const, id })),
            { type: 'SubCompany', id: 'LIST' },
          ]
          : [{ type: 'SubCompany', id: 'LIST' }];
      },
    }),

    getAllSubCompaniesForPublic: builder.query({
      query: ({
        page = 1,
        limit = 10,
        search = "",
        status = "",
        city = ""
      }: {
        page?: number;
        limit?: number;
        search?: string;
        status?: string;
        city?: string;
      }) => {
        const params = new URLSearchParams();
        params.append("page", page.toString());
        params.append("limit", limit.toString());
        if (search) params.append("search", search);
        if (status) params.append("status", status);
        if (city) params.append("city", city);

        return {
          url: `/authentication/get-sub-companies-for-public?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: (result) => {
        return result?.data
          ? [
            ...result.data.map(({ id }: { id: string }) => ({ type: 'SubCompany' as const, id })),
            { type: 'SubCompany', id: 'LIST' },
          ]
          : [{ type: 'SubCompany', id: 'LIST' }];
      },
    }),

    // Get client by ID
    getClientById: builder.query({
      query: (id: string) => ({
        url: `/authentication/get-client-according-to-id/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: 'Client', id }],
    }),

    // Get sub company by ID
    getSubCompanyById: builder.query({
      query: (id: string) => ({
        url: `/authentication/get-sub-company/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: 'SubCompany', id }],
    }),



    getSubCompanyForSuperAdminById: builder.query({
      query: (id: string) => ({
        url: `/authentication/get-sub-company-for-super-admin/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: 'SubCompany', id }],
    }),

    // Get pending client for activation
    getPendingClientForAccountActivationById: builder.query({
      query: (id: string) => ({
        url: `/authentication/get-pending-client-for-account-activation/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: 'Client', id }],
    }),

    // Get pending enterprise for activation
    getPendingEnterpriseForActivationById: builder.query({
      query: (id: string) => ({
        url: `/authentication/get-pending-enterprise-for-activation/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: 'Enterprise', id }],
    }),

    // Get pending sub company for activation
    getPendingSubCompanyForActivationById: builder.query({
      query: (id: string) => ({
        url: `/authentication/get-pending-sub-company-for-activation/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: 'SubCompany', id }],
    }),

    // Delete client
    deleteClient: builder.mutation({
      query: (id: number) => ({
        url: `/authentication/delete-client/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Client', id: 'LIST' }],
    }),

    // Delete enterprise
    deleteEnterprise: builder.mutation({
      query: (id: number) => ({
        url: `/authentication/delete-enterprise/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Enterprise', id: 'LIST' }],
    }),

    // Delete sub company
    deleteSubCompany: builder.mutation({
      query: (id: number) => ({
        url: `/authentication/delete-sub-company/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'SubCompany', id: 'LIST' }],
    }),

    // Update client status
    updateClientStatus: builder.mutation({
      query: ({ id, status }: { id: number; status: 'active' | 'pending' | 'inactive' }) => ({
        url: `/authentication/update-client/${id}`,
        method: 'PUT',
        body: { status },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Client', id },
        { type: 'Client', id: 'LIST' },
      ],
    }),

    // Update enterprise status
    updateEnterpriseStatus: builder.mutation({
      query: ({ id, status }: { id: number; status: 'active' | 'pending' | 'inactive' }) => ({
        url: `/authentication/update-super-admin-status/${id}`,
        method: 'PUT',
        body: { status },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Enterprise', id },
        { type: 'Enterprise', id: 'LIST' },
      ],
    }),

    // Update sub company status
    updateSubCompanyStatus: builder.mutation({
      query: ({ id, status }: { id: number; status: 'active' | 'pending' | 'inactive' }) => ({
        url: `/authentication/update-sub-company-status/${id}`,
        method: 'PUT',
        body: { status },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'SubCompany', id },
        { type: 'SubCompany', id: 'LIST' },
      ],
    }),

    // Change password
    changePassword: builder.mutation({
      query: ({ id, currentPassword, newPassword, confirmNewPassword }: {
        id: string;
        currentPassword: string;
        newPassword: string;
        confirmNewPassword: string;
      }) => ({
        url: `/authentication/change-password/${id}`,
        method: 'PUT',
        body: { currentPassword, newPassword, confirmNewPassword },
      }),
    }),

    // Change enterprise password
    changeEnterprisePassword: builder.mutation({
      query: ({ id, currentPassword, newPassword, confirmNewPassword }: {
        id: string;
        currentPassword: string;
        newPassword: string;
        confirmNewPassword: string;
      }) => ({
        url: `/authentication/change-enterprise-password/${id}`,
        method: 'PUT',
        body: { currentPassword, newPassword, confirmNewPassword },
      }),
    }),

    // Change sub company password
    changeSubCompanyPassword: builder.mutation({
      query: ({ id, currentPassword, newPassword, confirmNewPassword }: {
        id: string;
        currentPassword: string;
        newPassword: string;
        confirmNewPassword: string;
      }) => ({
        url: `/authentication/change-sub-company-password/${id}`,
        method: 'PUT',
        body: { currentPassword, newPassword, confirmNewPassword },
      }),
    }),

    // Get enterprise statistics
    getEnterpriseStats: builder.query({
      query: () => ({
        url: '/authentication/get-enterprise-stats',
        method: 'GET',
      }),
      providesTags: ['Enterprise'],
    }),

    // Get sub company statistics
    getSubCompanyStats: builder.query({
      query: () => ({
        url: '/authentication/get-sub-company-stats',
        method: 'GET',
      }),
      providesTags: ['SubCompany'],
    }),

    // Payment APIs
    processPayment: builder.mutation({
      query: (data) => ({
        url: '/payment/process-payment',
        method: 'POST',
        body: data,
      }),
    }),

    processRechargePayment: builder.mutation({
      query: (data) => ({
        url: '/payment/process-recharge',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (result, error, { userId }) => [{ type: 'Payments', id: userId }],
    }),

    refreshToken: builder.mutation({
      query: (refreshToken: string) => ({
        url: "/authentication/refresh",
        method: "POST",
        body: { refreshToken },
      }),
    }),
  }),
});

export const {
  useRegisterSubCompanyMutation,
  useSubCompanyLoginMutation,
  useGetAllSubCompaniesQuery,
  useGetAllSubCompaniesForPublicQuery,
  useGetSubCompanyByIdQuery,
  useGetSubCompanyForSuperAdminByIdQuery,
  useUpdateSubCompanyMutation,
  useDeleteSubCompanyMutation,
  useUpdateSubCompanyStatusMutation,
  useChangeSubCompanyPasswordMutation,
  useGetSubCompanyStatsQuery,
  useGetPendingSubCompanyForActivationByIdQuery,
  useDeleteEnterpriseMutation,
  useUpdateEnterpriseStatusMutation,
  useChangeEnterprisePasswordMutation,
  useGetEnterpriseStatsQuery,
  useGetPendingEnterpriseForActivationByIdQuery,
  useLoginMutation,
  useUpdateClientMutation,
  useGetAllClientsQuery,
  useGetClientByIdQuery,
  useGetPendingClientForAccountActivationByIdQuery,
  useDeleteClientMutation,
  useUpdateClientStatusMutation,
  useChangePasswordMutation,
  useProcessPaymentMutation,
  useProcessRechargePaymentMutation,
  useRefreshTokenMutation,
} = authApi;