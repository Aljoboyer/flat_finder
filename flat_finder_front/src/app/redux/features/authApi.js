import { reqHeaders } from "@/constant/textdata";
import { api } from "../api/api";

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (data) => ({
        url: "/auth/signup",
        method: "POST",
        headers: reqHeaders,
        body: data,
      }),

    }),

    logIn: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        headers: reqHeaders,
        body: data,
      }),
    }),

    sendResetPassLink: builder.mutation({
      query: (data) => ({
        url: "/auth/send-reset-link",
        method: "POST",
        headers: reqHeaders,
        body: data,
      }),
    }),

    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        headers: reqHeaders,
        body: data,
      }),
    }),


  }),
});

export const {
  useSignUpMutation,
  useLogInMutation,
  useSendResetPassLinkMutation,
  useResetPasswordMutation
} = authApi;
