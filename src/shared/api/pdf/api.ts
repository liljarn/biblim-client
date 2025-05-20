
import { pdfApiUrl } from '@/shared/config/consts';
import { createApi } from '@reduxjs/toolkit/query/react';
import { getBaseQueryWithAuth } from '../base';


type PdfLinkResponse = {
    link: string;
};


export const pdfApiWithAuth = createApi({
    reducerPath: 'pdfApiWithAuth',
    baseQuery: getBaseQueryWithAuth(pdfApiUrl),
    endpoints: (builder) => ({
        getBookPdfById: builder.query<PdfLinkResponse, string>({
            query: (id) => `${id}`,
        }),
    }),
});

export const { useGetBookPdfByIdQuery } = pdfApiWithAuth;