import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '' }),
  tagTypes: ['userinfo', 'productCat', 'productlist', 'productrequestlist', 'quotationlist', 'supplierreviewlist'],
  endpoints: () => ({}),
});