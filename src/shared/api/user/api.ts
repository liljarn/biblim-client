
import { userApiUrl } from '@/shared/config/consts';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getBaseQueryWithAuth } from '../base';
import { User } from './types';
import { Book } from '../book';


type UserResponse = {
    userData: User,
    bookInfo?: {
        book: Book,
        dueDate: string,
    }
};

export type ChangeUserParams = {
    email?: string,
    password?: string,
    firstName?: string,
    lastName?: string,
    birthDate?: string,
};

export type PhotoChangeState = 'unchanged' | 'removed' | 'changed';

export type ChangeUserPhotoParams = {
    profileImage?: File,
}

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({baseUrl: userApiUrl}),
    endpoints: (builder) => ({
        getUser: builder.query<UserResponse, string>({
            query: (id) => `profile/${id}`,
        }),
    }),
});

export const userApiWithAuth = createApi({
    reducerPath: 'userApiWithAuth',
    baseQuery: getBaseQueryWithAuth(userApiUrl),
    endpoints: (builder) => ({
        getSelfUser: builder.query<UserResponse, void>({
            query: () => 'profile/self',
        }),
        changeSelfUser: builder.mutation<void, ChangeUserParams>({
            query: (params) => ({
                url: 'profile/self',
                method: 'PUT',
                body: params,
            }),
        }),
        changeUserPhoto: builder.mutation<void, FormData>({
            query: (credentials) => ({
                url: 'profile/self/photo',
                method: 'PUT',
                body: credentials,
            }),
        }),
        deleteUserPhoto: builder.mutation<void, void>({
            query: () => ({
                url: 'profile/self/photo',
                method: 'DELETE',
            }),
        }),
    }),
});

export const { useGetUserQuery } = userApi;

export const { useGetSelfUserQuery, useChangeSelfUserMutation, useChangeUserPhotoMutation } = userApiWithAuth;

export const changeSelfUserMutation = userApiWithAuth.endpoints.changeSelfUser.initiate;
