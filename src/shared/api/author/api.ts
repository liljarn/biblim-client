import { authorApiUrl } from '@/shared/config/consts';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AuthorFullResponse, AuthorPageResponse } from './types';

type AuthorPageParams = {
    page: number;
    query?: string;
};

export const authorApi = createApi({
    reducerPath: 'authorApi',
    baseQuery: fetchBaseQuery({ baseUrl: authorApiUrl }),
    endpoints: (builder) => ({
        getAuthors: builder.query<AuthorPageResponse, AuthorPageParams>({
            query: (params) => ({
                url: 'list',
                params: {page: params.page, query: params.query ? params.query : undefined},
            }),
        }),
        getAuthorById: builder.query<AuthorFullResponse, string>({
            query: (id) => `${id}`,
        }),
    }),
});

export const { useGetAuthorsQuery, useGetAuthorByIdQuery } = authorApi; 