/* eslint-disable no-unused-vars */
import { api } from "../api/api";
import { getListQueryCall, mutationCall } from "@/utils/reduxApiCallObj";

const DropDownApi = api.injectEndpoints({
  endpoints: (builder) => ({
   getAreaNames: builder.query({
      query: (data) => (
        getListQueryCall('/dm/area-names', data?.querys)
      ),
      
    }),

  }),
});

export const {
  useLazyGetAreaNamesQuery,
} = DropDownApi;
