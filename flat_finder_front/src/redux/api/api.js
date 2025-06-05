import { BASEURL } from '@/constant/urls';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: BASEURL }),
  tagTypes: ['userinfo', ],
  endpoints: () => ({}),
});