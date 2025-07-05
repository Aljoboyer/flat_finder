/* eslint-disable no-unused-vars */
import { getAuthToken } from "@/utils/getAuthToken";
import { api } from "../api/api";
import { getListQueryCall, mutationCall } from "@/utils/reduxApiCallObj";

const RentApi = api.injectEndpoints({
  endpoints: (builder) => ({

    requestForRent: builder.mutation({
      query: (requestBody) =>(
        mutationCall('/rent/request','POST', requestBody)
      ),
      invalidatesTags: ['rentRequest'],
    }),


  }),
});

export const {
  useRequestForRentMutation,
} = RentApi;
