/* eslint-disable no-unused-vars */
import { api } from "../api/api";
import { getListQueryCall, mutationCall } from "@/utils/reduxApiCallObj";

const paymentApi = api.injectEndpoints({
  endpoints: (builder) => ({

    paymentIntentCreate: builder.mutation({
      query: (requestBody) =>(
        mutationCall('/payment/create-intent','POST', requestBody)
      ),

    }),

    completePayment: builder.mutation({
      query: (requestBody) =>(
        mutationCall('/payment/complete','POST', requestBody)
      ),
      invalidatesTags: ['historylist'],
    }),
    
  }),
});

export const {
  usePaymentIntentCreateMutation,
  useCompletePaymentMutation
} = paymentApi;
