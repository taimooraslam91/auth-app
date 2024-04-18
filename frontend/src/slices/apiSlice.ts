import {
  fetchBaseQuery,
  createApi,
  BaseQueryFn,
} from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants';
import { logout } from './authSlice';

interface BaseQueryArgs {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: BodyInit | object;
  headers?: HeadersInit;
}

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }: any) => {
    const token = getState().auth?.userInfo?.token || null;
    if (token) {
      headers.set('authorization', `${token}`);
    }
    return headers;
  },
});

const baseQueryWithAuth: BaseQueryFn<
  BaseQueryArgs,
  unknown,
  unknown,
  {},
  {}
> = async (args, api, extra) => {
  const result = await baseQuery(args, api, extra);

  if (result.error && (result.error as any).status === 401) {
    api.dispatch(logout());
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithAuth,
  tagTypes: ['User', 'Product'],
  endpoints: (builder) => ({}),
});
