/* eslint-disable no-unused-vars */
import { getAuthToken } from "@/utils/getAuthToken";
import { api } from "../api/api";
import { getListQueryCall, mutationCall } from "@/utils/reduxApiCallObj";

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

  }),
});

export const {
  useUpdateProfileMutation,
  useChangePasswordMutation
} = ProfileApi;
