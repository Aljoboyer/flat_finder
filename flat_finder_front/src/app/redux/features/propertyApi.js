/* eslint-disable no-unused-vars */
import { getAuthToken } from "@/utils/getAuthToken";
import { api } from "../api/api";
import { getListQueryCall, mutationCall } from "@/utils/reduxApiCallObj";

const PropertyApi = api.injectEndpoints({
  endpoints: (builder) => ({
   getPropertyList: builder.query({
      query: (data) => (
        getListQueryCall('/property/all', data?.querys)
      ),
      providesTags: ["propertyList"],
    }),

    createProperty: builder.mutation({
      query: (requestBody) =>(
        mutationCall('/property/post','POST', requestBody)
      ),
      invalidatesTags: ['propertyList'],
    }),

    deletePropertyImg: builder.mutation({
      query: (requestBody) =>(
        mutationCall('/file/delete/','POST', requestBody)
      ),
   
    }),

  }),
});

export const {
  useLazyGetPropertyListQuery,
  useCreatePropertyMutation,
  useDeletePropertyImgMutation
} = PropertyApi;
