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
      invalidatesTags: ['allrentRequest'],
    }),
    
  }),
});

export const {
  usePaymentIntentCreateMutation,
  useCompletePaymentMutation
} = paymentApi;
