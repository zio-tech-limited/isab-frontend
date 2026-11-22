import { apiSlice } from "../apiSlice";

export interface Certificate {
  id: number;
  accreditationBodyId: number;
  studentId: number | null;
  studentName: string;
  studentUniqueId: string;
  certificateNumber: string;
  documentIds: number[];
  issueDate: string;
  smsSent?: string;
  expiryDate: string | null;
  issuedBy: number | null;
  issuedByName: string | null;
  status: 'active' | 'expired' | 'revoked' | 'pending';
  remarks: string | null;
  metadata: Record<string, any>;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CertificateResponse {
  success: boolean;
  data: Certificate[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface SingleCertificateResponse {
  success: boolean;
  data: Certificate;
}

export interface CertificateStatistics {
  total: number;
  active: number;
  expired: number;
  revoked: number;
  pending: number;
  issuedToday: number;
}

export interface CreateCertificateRequest {
  accreditationBodyId: number;
  studentId?: number;
  studentName: string;
  studentUniqueId: string;
  documentIds: number[];
  expiryDate?: string;
  remarks?: string;
  metadata?: Record<string, any>;
  sendSMS?: boolean;
}

export interface VerifyCertificateResponse {
  success: boolean;
  data: {
    valid: boolean;
    certificateNumber: string;
    studentName: string;
    studentUniqueId: string;
    issuedBy: string;
    issueDate: string;
    expiryDate: string | null;
    status: string;
    message: string;
  };
}

export const certificateApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Create certificate
    createCertificate: builder.mutation<SingleCertificateResponse, CreateCertificateRequest>({
      query: (data) => ({
        url: '/certificates',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Certificate'],
    }),

    // Get all certificates with filters
    getAllCertificates: builder.query<CertificateResponse, {
      page?: number;
      limit?: number;
      accreditationBodyId?: number;
      studentId?: number;
      studentName?: string;
      studentUniqueId?: string;
      certificateNumber?: string;
      status?: string;
      search?: string;
    }>({
      query: (params = {}) => {
        const queryParams = new URLSearchParams();
        if (params.page) queryParams.append('page', params.page.toString());
        if (params.limit) queryParams.append('limit', params.limit.toString());
        if (params.accreditationBodyId) queryParams.append('accreditationBodyId', params.accreditationBodyId.toString());
        if (params.studentId) queryParams.append('studentId', params.studentId.toString());
        if (params.studentName) queryParams.append('studentName', params.studentName);
        if (params.studentUniqueId) queryParams.append('studentUniqueId', params.studentUniqueId);
        if (params.certificateNumber) queryParams.append('certificateNumber', params.certificateNumber);
        if (params.status) queryParams.append('status', params.status);
        if (params.search) queryParams.append('search', params.search);
        return {
          url: `/certificates?${queryParams.toString()}`,
          method: 'GET',
        };
      },
      providesTags: ['Certificate'],
    }),

    // Get certificate by ID
    getCertificateById: builder.query<SingleCertificateResponse, number>({
      query: (id) => ({
        url: `/certificates/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'Certificate', id }],
    }),

    // Get certificate by number
    getCertificateByNumber: builder.query<SingleCertificateResponse, string>({
      query: (certificateNumber) => ({
        url: `/certificate/verify/${certificateNumber}`,
        method: 'GET',
      }),
      providesTags: ['Certificate'],
    }),

    // Verify certificate
    verifyCertificate: builder.query<VerifyCertificateResponse, string>({
      query: (certificateNumber) => ({
        url: `/certificates/verify/${certificateNumber}`,
        method: 'GET',
      }),
    }),

    // Get certificates by student
    getCertificatesByStudent: builder.query<CertificateResponse, {
      studentId: number;
      status?: string;
    }>({
      query: ({ studentId, status }) => {
        const queryParams = new URLSearchParams();
        if (status) queryParams.append('status', status);
        return {
          url: `/certificates/student/${studentId}?${queryParams.toString()}`,
          method: 'GET',
        };
      },
      providesTags: ['Certificate'],
    }),

    // Get certificates by accreditation body
    getCertificatesByAccreditationBody: builder.query<CertificateResponse, {
      accreditationBodyId: number;
      status?: string;
      page?: number;
      limit?: number;
    }>({
      query: ({ accreditationBodyId, status, page, limit }) => {
        const queryParams = new URLSearchParams();
        if (status) queryParams.append('status', status);
        if (page) queryParams.append('page', page.toString());
        if (limit) queryParams.append('limit', limit.toString());
        return {
          url: `/certificates/accreditation-body/${accreditationBodyId}?${queryParams.toString()}`,
          method: 'GET',
        };
      },
      providesTags: ['Certificate'],
    }),

    // Get certificate statistics
    getCertificateStatistics: builder.query<{ success: boolean; data: CertificateStatistics }, {
      accreditationBodyId?: number;
    }>({
      query: (params = {}) => {
        const queryParams = new URLSearchParams();
        if (params.accreditationBodyId) queryParams.append('accreditationBodyId', params.accreditationBodyId.toString());
        return {
          url: `/certificates/statistics?${queryParams.toString()}`,
          method: 'GET',
        };
      },
      providesTags: ['Certificate'],
    }),

    // Update certificate
    updateCertificate: builder.mutation<SingleCertificateResponse, {
      id: number;
      data: Partial<Certificate>;
    }>({
      query: ({ id, data }) => ({
        url: `/certificates/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Certificate', id }, 'Certificate'],
    }),

    // Delete certificate
    deleteCertificate: builder.mutation<{ success: boolean; message: string }, number>({
      query: (id) => ({
        url: `/certificates/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Certificate'],
    }),

    // Resend certificate SMS
    resendCertificateSMS: builder.mutation<{ success: boolean; message: string; data: any }, number>({
      query: (id) => ({
        url: `/certificates/${id}/resend-sms`,
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useCreateCertificateMutation,
  useGetAllCertificatesQuery,
  useGetCertificateByIdQuery,
  useGetCertificateByNumberQuery,
  useVerifyCertificateQuery,
  useGetCertificatesByStudentQuery,
  useGetCertificatesByAccreditationBodyQuery,
  useGetCertificateStatisticsQuery,
  useUpdateCertificateMutation,
  useDeleteCertificateMutation,
  useResendCertificateSMSMutation,
} = certificateApi;