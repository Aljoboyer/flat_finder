import { api } from "../api/api";

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (data) => ({
        url: "/supplier/auth/v1/registration",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": "en",
        },
        body: data,
      }),
      //   invalidatesTags: [''],
    }),

    logIn: builder.mutation({
      query: (data) => ({
        url: "/supplier/auth/v1/login",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": "en",
        },
        body: data,
      }),
      //   invalidatesTags: [''],
    }),


  }),
});

export const {
  useSignUpMutation,
  useLogInMutation,
} = authApi;
