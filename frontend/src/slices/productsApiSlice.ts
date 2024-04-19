import { PRODUCTS_URL } from '@/constants';
import { apiSlice } from './apiSlice';

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ keyword, pageNumber }) => ({
        url: PRODUCTS_URL,
        params: { keyword, pageNumber },
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Product'],
    }),
    syncShopify: builder.mutation({
      query: () => ({
        url: '/api/shopify',
        method: 'POST',
      }),
    }),
  }),
});

export const { useSyncShopifyMutation, useGetProductsQuery } = productsApiSlice;
