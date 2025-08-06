/* eslint-disable no-unused-vars */
import { api } from "../api/api";
import { getListQueryCall, mutationCall } from "@/utils/reduxApiCallObj";

const RentApi = api.injectEndpoints({
  endpoints: (builder) => ({

   getNotificationList: builder.query({
      query: (data) => (
        getListQueryCall('/notification/list', data?.querys)
      ),
      providesTags: ["notificationlist"],
    }),

  }),
});

export const {
    useLazyGetNotificationListQuery,
} = RentApi;
