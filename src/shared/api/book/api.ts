import { bookApiUrl } from '@/shared/config/consts';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Book, BookStatus, Genre } from './types';
import { getBaseQueryWithAuth } from '../base';

type BookPageParams = {
    page: number;
    query?: string;
    genres?: number[];
};

type BookPageResponse = {
    total?: number;
    books: Book[];
};

type ResponseBookPageResponse = {
    total?: number;
    rentedBooks: Book[];
};

type BookResponse = {
    book: Book;
    status: BookStatus;
};

type UserRentHistoryParams = {
    userId: string;
    page: number;
};

export const bookApi = createApi({
    reducerPath: 'bookApi',
    baseQuery: fetchBaseQuery({ baseUrl: bookApiUrl }),
    tagTypes: ['Book', 'BookList'],
    endpoints: (builder) => ({
        getBookPage: builder.query<BookPageResponse, BookPageParams>({
            query: (params) => ({
                url: 'book/list',
                params: {page: params.page, query: params.query ? params.query : undefined, genres: params.genres?.join(',')},
            }),
            providesTags: ['BookList']
        }),
        getGenreList: builder.query<Genre[], void>({
            query: () => `genre`,
        }),
        findAuthorsBooks: builder.query<BookPageResponse, { authorId: string; page: number }>({
            query: ({ authorId, page }) => ({
                url: `book/author/${authorId}`,
                params: { page },
            }),
        }),
    }),
});

export const bookApiWithAuth = createApi({
    reducerPath: 'bookApiWithAuth',
    baseQuery: getBaseQueryWithAuth(bookApiUrl),
    endpoints: (builder) => ({
        getBookById: builder.query<BookResponse, string>({
            query: (id) => `book/info/${id}`,
        }),
        getUserRentHistory: builder.query<ResponseBookPageResponse, UserRentHistoryParams>({
            query: (params) => ({
                url: `rent/${params.userId}/history`,
                params: { page: params.page},
            }),
        }),
        reserveBook: builder.mutation<void, { bookId: string }>({
            query: ({ bookId, }) => ({
                url: `reservation/${bookId}`,
                method: 'POST',
                body: { dueDate: new Date().toISOString().split('T')[0] },
            }),
        }),
        cancelBookReservation: builder.mutation<void, void>({
            query: () => ({
                url: 'reservation',
                method: 'DELETE',
            }),
        }),
    }),
});

export const { useGetBookPageQuery, useGetGenreListQuery, useFindAuthorsBooksQuery } = bookApi;

export const { useGetBookByIdQuery, useReserveBookMutation, useCancelBookReservationMutation, useGetUserRentHistoryQuery } = bookApiWithAuth;