/* eslint-disable no-unused-vars */
import { api } from "../api/api";
import { getListQueryCall, mutationCall } from "@/utils/reduxApiCallObj";

const RentApi = api.injectEndpoints({
  endpoints: (builder) => ({

   getRentReqList: builder.query({
      query: (data) => (
        getListQueryCall('/rent/req-list', data?.querys)
      ),
      providesTags: ["allrentRequest"],
    }),

    requestForRent: builder.mutation({
      query: (requestBody) =>(
        mutationCall('/rent/request','POST', requestBody)
      ),
      invalidatesTags: ['allrentRequest', 'singlerentreq'],
    }),
    
    getSingleRequest: builder.query({
      query: (data) => (
        getListQueryCall('/rent/specific-request', data?.querys)
      ),
      providesTags: ["singlerentreq"],
    }),

    rentReqAction: builder.mutation({
      query: (requestBody) =>(
        mutationCall('rent/req-action','POST', requestBody)
      ),
      invalidatesTags: ['allrentRequest'],
    }),

  }),
});

export const {
  useRequestForRentMutation,
  useLazyGetSingleRequestQuery,
  useLazyGetRentReqListQuery,
  useRentReqActionMutation
} = RentApi;
