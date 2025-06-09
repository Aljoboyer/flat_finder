/* eslint-disable no-unused-vars */
import { getAuthToken } from "@/utils/getAuthToken";
import { api } from "../api/api";
import { getListQueryCall } from "@/utils/reduxApiCallObj";

const PropertyApi = api.injectEndpoints({
  endpoints: (builder) => ({
   getPropertyList: builder.query({
      query: (data) => (
        getListQueryCall('/property/all', data?.querys)
      ),
      providesTags: ["propertyList"],
    }),

  }),
});

export const {
  useLazyGetPropertyListQuery,
  useGetPropertyListQuery
} = PropertyApi;
