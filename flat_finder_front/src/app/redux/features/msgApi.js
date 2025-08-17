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

    getlAllMessages: builder.query({
      query: (data) => (
        getListQueryCall('/msg/messages', data?.querys)
      ),
    }),

    getlAllConversation: builder.query({
      query: (data) => (
        getListQueryCall('/msg/conversation-lists', data?.querys)
      ),
    }),

  }),
});

export const {
  useSentMsgMutation,
  useLazyGetlAllMessagesQuery,
  useLazyGetlAllConversationQuery
} = MessageApi;
