import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
  isActivated: string;
}

interface ILoginRequest {
  email: string;
  password: string;
}

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000/api/user',
  prepareHeaders: (headers) => {
    const accessToken = sessionStorage.getItem('accessToken');

    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }

    return headers;
  },
});

export const authApi = createApi({
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation<ILoginResponse, ILoginRequest>({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
        credentials: 'include',
      }),
    }),
    registration: builder.mutation<ILoginResponse, ILoginRequest>({
      query: (credentials) => ({
        url: 'registartion',
        method: 'POST',
        body: credentials,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: 'logout',
        method: 'POST',
      }),
    }),
    loadProfile: builder.mutation<ILoginResponse, void>({
      query: (credentials) => ({
        url: 'loadProfile',
        method: 'GET',
        body: credentials,
        credentials: 'include',
      }),
    }),
    refresh: builder.mutation<ILoginResponse, void>({
      query: (credentials) => ({
        url: 'refresh',
        method: 'GET',
        body: credentials,
        credentials: 'include',
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useLoadProfileMutation,
  useRefreshMutation,
} = authApi;
