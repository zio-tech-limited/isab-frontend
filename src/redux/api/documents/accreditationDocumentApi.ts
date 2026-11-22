import { apiSlice } from "../apiSlice";

export interface AccreditationDocument {
  id: number;
  title: string;
  description: string;
  fileName: string;
  fileUrl: string;
  studentName?: string;
  studentUniqueId?: string;
  fileSize: number;
  mimeType: string;
  approvalStatus: 'pending' | 'approved' | 'rejected' | 'revision_required';
  accreditationBodyId: number;
  studentId?: number;
  category: string;
  remarks?: string;
  rejectionReason?: string;
  certificationNumber?: string;
  reviewedBy?: number;
  approvedAt?: string;
  rejectedAt?: string;
  reviewedAt?: string;
  createdAt: string;
  updatedAt: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

export interface AccreditationDocumentResponse {
  success: boolean;
  data: AccreditationDocument[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface SingleDocumentResponse {
  success: boolean;
  data: AccreditationDocument;
}

export interface ApprovalStatistics {
  pending: number;
  approved: number;
  rejected: number;
  revisionRequired: number;
  total: number;
  approvalRate: number;
}

export const accreditationDocumentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Upload single document
    uploadDocument: builder.mutation<SingleDocumentResponse, FormData>({
      query: (formData) => ({
        url: '/accreditation-documents/upload',
        method: 'POST',
        body: formData,
        formData: true,
      }),
      invalidatesTags: ['AccreditationDocument'],
    }),

    // Bulk upload documents
    bulkUploadDocuments: builder.mutation<AccreditationDocumentResponse, FormData>({
      query: (formData) => ({
        url: '/accreditation-documents/bulk-upload',
        method: 'POST',
        body: formData,
        formData: true,
      }),
      invalidatesTags: ['AccreditationDocument'],
    }),

    // Get all documents with filters
    getAllDocuments: builder.query<AccreditationDocumentResponse, {
      page?: number;
      limit?: number;
      approvalStatus?: string;
      category?: string;
      status?: string;  // ← Made optional by adding ?
      search?: string;
      accreditationBodyId?: number;
      studentId?: number;
      priority?: string;
    }>({
      query: (params = {}) => {
        const queryParams = new URLSearchParams();
        if (params.page) queryParams.append('page', params.page.toString());
        if (params.limit) queryParams.append('limit', params.limit.toString());
        if (params.approvalStatus) queryParams.append('approvalStatus', params.approvalStatus);
        if (params.status) queryParams.append('status', params.status);  // ← Now handles optional status
        if (params.category) queryParams.append('category', params.category);
        if (params.search) queryParams.append('search', params.search);
        if (params.accreditationBodyId) queryParams.append('accreditationBodyId', params.accreditationBodyId.toString());
        if (params.studentId) queryParams.append('studentId', params.studentId.toString());
        if (params.priority) queryParams.append('priority', params.priority);
        return {
          url: `/accreditation-documents?${queryParams.toString()}`,
          method: 'GET',
        };
      },
      providesTags: ['AccreditationDocument'],
    }),

    // Get documents by approval status (alternative to using status filter)
    getDocumentsByApprovalStatus: builder.query<{ success: boolean; data: AccreditationDocument[] }, {
      status?: string;
      accreditationBodyId?: number;
      studentId?: number;
    }>({
      query: (params = {}) => {
        const queryParams = new URLSearchParams();
        if (params.status) queryParams.append('status', params.status);
        if (params.accreditationBodyId) queryParams.append('accreditationBodyId', params.accreditationBodyId.toString());
        if (params.studentId) queryParams.append('studentId', params.studentId.toString());
        return {
          url: `/accreditation-documents/by-status?${queryParams.toString()}`,
          method: 'GET',
        };
      },
      providesTags: ['AccreditationDocument'],
    }),

    // Get approval statistics
    getApprovalStatistics: builder.query<{ success: boolean; data: ApprovalStatistics }, {
      accreditationBodyId?: number;
    }>({
      query: (params = {}) => {
        const queryParams = new URLSearchParams();
        if (params.accreditationBodyId) queryParams.append('accreditationBodyId', params.accreditationBodyId.toString());
        return {
          url: `/accreditation-documents/statistics?${queryParams.toString()}`,
          method: 'GET',
        };
      },
      providesTags: ['AccreditationDocument'],
    }),

    // Get document by ID
    getDocumentById: builder.query<SingleDocumentResponse, number>({
      query: (id) => ({
        url: `/accreditation-documents/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'AccreditationDocument', id }],
    }),

    // Update document
    updateDocument: builder.mutation<SingleDocumentResponse, { id: number; data: Partial<AccreditationDocument> }>({
      query: ({ id, data }) => ({
        url: `/accreditation-documents/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'AccreditationDocument', id }, 'AccreditationDocument'],
    }),

    // Approve document
    approveDocument: builder.mutation<SingleDocumentResponse, { id: number; approvalRemarks?: string; approvedBy?: number; approvedByName?: string }>({
      query: ({ id, ...data }) => ({
        url: `/accreditation-documents/${id}/approve`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['AccreditationDocument'],
    }),

    // Reject document
    rejectDocument: builder.mutation<SingleDocumentResponse, { id: number; rejectionReason?: string; rejectedBy?: number; rejectedByName?: string }>({
      query: ({ id, ...data }) => ({
        url: `/accreditation-documents/${id}/reject`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['AccreditationDocument'],
    }),

    // Request revision
    requestRevision: builder.mutation<SingleDocumentResponse, { id: number; revisionFeedback?: string; requestedBy?: number; requestedByName?: string }>({
      query: ({ id, ...data }) => ({
        url: `/accreditation-documents/${id}/request-revision`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['AccreditationDocument'],
    }),

    // Delete document
    deleteDocument: builder.mutation<{ success: boolean; message: string }, number>({
      query: (id) => ({
        url: `/accreditation-documents/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['AccreditationDocument'],
    }),

    // Bulk approve documents
    bulkApproveDocuments: builder.mutation<{ success: boolean; message: string; data: { updatedCount: number } }, {
      documentIds: number[];
      approvalRemarks?: string;
      approvedBy?: number;
      approvedByName?: string;
    }>({
      query: (data) => ({
        url: '/accreditation-documents/bulk-approve',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['AccreditationDocument'],
    }),

    // Get document categories
    getDocumentCategories: builder.query<{ success: boolean; categories: string[] }, void>({
      query: () => ({
        url: '/accreditation-documents/categories',
        method: 'GET',
      }),
      providesTags: ['AccreditationDocument'],
    }),
  }),
});

export const {
  useUploadDocumentMutation,
  useBulkUploadDocumentsMutation,
  useGetAllDocumentsQuery,
  useGetDocumentsByApprovalStatusQuery,
  useGetApprovalStatisticsQuery,
  useGetDocumentByIdQuery,
  useUpdateDocumentMutation,
  useApproveDocumentMutation,
  useRejectDocumentMutation,
  useRequestRevisionMutation,
  useDeleteDocumentMutation,
  useBulkApproveDocumentsMutation,
  useGetDocumentCategoriesQuery,
} = accreditationDocumentApi;