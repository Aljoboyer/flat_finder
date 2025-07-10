/* eslint-disable no-unused-vars */
import { api } from "../api/api";
import {  mutationCall } from "@/utils/reduxApiCallObj";

const ProfileApi = api.injectEndpoints({
  endpoints: (builder) => ({

    updateProfile: builder.mutation({
      query: (requestBody) =>(
        mutationCall('/user/update-profile','PUT', requestBody)
      ),
    
    }),

    changePassword: builder.mutation({
      query: (requestBody) =>(
        mutationCall('/user/password-change','PUT', requestBody)
      ),
      
    }),

    followSeller: builder.mutation({
      query: (requestBody) =>(
        mutationCall('/user/follow','POST', requestBody)
      ),
    
    }),

    followCheck: builder.mutation({
      query: (requestBody) =>(
        mutationCall('/user/check-follow','POST', requestBody)
      ),
    
    }),


  }),
});

export const {
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useFollowCheckMutation,
  useFollowSellerMutation,
} = ProfileApi;
