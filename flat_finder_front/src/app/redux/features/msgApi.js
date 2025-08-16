/* eslint-disable no-unused-vars */
import { api } from "../api/api";
import {  getListQueryCall, mutationCall } from "@/utils/reduxApiCallObj";

const MessageApi = api.injectEndpoints({
  endpoints: (builder) => ({

    sentMsg: builder.mutation({
      query: (requestBody) =>(
        mutationCall('/msg/sent','POST', requestBody)
      ),
    }),

  }),
});

export const {
  useSentMsgMutation,
} = MessageApi;
