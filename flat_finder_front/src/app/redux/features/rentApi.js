/* eslint-disable no-unused-vars */
import { getAuthToken } from "@/utils/getAuthToken";
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
      invalidatesTags: ['allrentRequest'],
    }),
    
    getSingleRequest: builder.query({
      query: (data) => (
        getListQueryCall('/rent/specific-request', data?.querys)
      ),
    }),

  }),
});

export const {
  useRequestForRentMutation,
  useLazyGetSingleRequestQuery,
  useLazyGetRentReqListQuery
} = RentApi;
