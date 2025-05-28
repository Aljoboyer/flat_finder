/* eslint-disable no-unused-vars */
import { GetVendorToken } from "@/utils/GetToken";
import { api } from "../api/api";

const invenntoryProductApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProductList: builder.query({
      query: (data) => ({
        url: `/supplier/product/v1/list?${data?.querys ? data?.querys : 'limit=10&&offset=0'}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${GetVendorToken()}`,
          "Content-Type": "application/json",
          "Accept-Language": "en",
        },
      }),
      providesTags: ["productlist"],
    }),

    addProduct: builder.mutation({
      query: (data) => ({
        url: "/supplier/product/v1/add",
        method: "POST",
        headers: {
          Authorization: `Bearer ${GetVendorToken()}`,
          "Content-Type": "application/json",
          "Accept-Language": "en",
        },
        body: data?.requst_body,
      }),
      invalidatesTags: ["productlist"],
    }),

    

  }),
});

export const {
  useAddProductMutation,
  useLazyGetProductListQuery,
} = invenntoryProductApi;
