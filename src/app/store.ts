import type { Action, ThunkAction } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import { themeSlice } from '@/entities/theme';
import { booksFilterSlice } from '@/features/booksFilter/model/slice';
import { authorizationSlice } from '@/features/authPopup';
import { bookApi, bookApiWithAuth } from '@/shared/api/book';
import { authorizationApi } from '@/shared/api/auth';
import { commentApiWithAuth } from '@/shared/api/comment';
import { userApi, userApiWithAuth } from '@/shared/api/user';
import { pdfApiWithAuth } from '@/shared/api/pdf';
import { authorApi } from '@/shared/api/author/api';

export const store = configureStore({
  reducer: {
    theme: themeSlice.reducer,
    booksFilter: booksFilterSlice.reducer,
    authorization: authorizationSlice.reducer,
    [authorizationApi.reducerPath]: authorizationApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [userApiWithAuth.reducerPath]: userApiWithAuth.reducer,
    [bookApi.reducerPath]: bookApi.reducer,
    [bookApiWithAuth.reducerPath]: bookApiWithAuth.reducer,
    [commentApiWithAuth.reducerPath]: commentApiWithAuth.reducer,
    [pdfApiWithAuth.reducerPath]: pdfApiWithAuth.reducer,
    [authorApi.reducerPath]: authorApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
        authorizationApi.middleware,
        bookApi.middleware,
        bookApiWithAuth.middleware,
        commentApiWithAuth.middleware,
        userApi.middleware,
        userApiWithAuth.middleware,
        pdfApiWithAuth.middleware,
        authorApi.middleware,
    ]),
})

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>