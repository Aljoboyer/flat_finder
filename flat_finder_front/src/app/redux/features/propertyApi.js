/* eslint-disable no-unused-vars */
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

    getSingleProperty: builder.query({
      query: (data) => (
        getListQueryCall('/property/property', data?.querys)
      ),
    }),

    updateProperty: builder.mutation({
      query: (requestBody) =>(
        mutationCall('/property/update','PUT', requestBody)
      ),
      invalidatesTags: ['propertyList'],
    }),

    saveProperty: builder.mutation({
      query: (requestBody) =>(
        mutationCall('/property/save','POST', requestBody)
      ),
      invalidatesTags: ['savedList'],
    }),

  }),
});

export const {
  useLazyGetPropertyListQuery,
  useCreatePropertyMutation,
  useDeletePropertyImgMutation,
  useLazyGetSinglePropertyQuery,
  useUpdatePropertyMutation,
  useSavePropertyMutation
} = PropertyApi;
