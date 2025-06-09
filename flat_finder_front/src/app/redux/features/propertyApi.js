/* eslint-disable no-unused-vars */
import { api } from "../api/api";

const PropertyApi = api.injectEndpoints({
  endpoints: (builder) => ({
   getPropertyList: builder.query({
      query: (data) => (
        {
          url: `/property/all?${data?.querys}`,
          method: "GET",
          headers: {
            "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJ1eWVyMkBnbWFpbC5jb20iLCJpZCI6IjY4MzE1YmRlYmYxZjE1MjgzYTUzZmJlYyIsImlhdCI6MTc0OTQ0NTEwMiwiZXhwIjoxNzQ5NDczOTAyfQ.adjiYEZx-kPqT5mWESB7DxtqrJPXCnlpTnk-JMjIKzQ`,
            "Content-Type": "application/json",
          },
        }
      ),
      providesTags: ["propertyList"],
    }),

  }),
});

export const {
  useLazyGetPropertyListQuery,
  useGetPropertyListQuery
} = PropertyApi;
