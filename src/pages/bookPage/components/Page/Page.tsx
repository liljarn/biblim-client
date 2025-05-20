import {useParams} from 'react-router-dom';
import {Spin, Text} from '@gravity-ui/uikit';
import {useGetBookByIdQuery} from '@/shared/api/book';
import {BookOverview} from '@/widgets/bookOverview';
import block from 'bem-cn-lite';
import './Page.scss';
import {CommentBlock} from '@/widgets/commentBlock';
import { useGetBookPdfByIdQuery } from '@/shared/api/pdf/api';
import { LocalStorageKey } from '@/shared/config/consts';

const b = block('bookPage');

export const Page = () => {
    const {id} = useParams();

    if (!id) {
        return 'Произошла ошибка :(';
    }

    const {data: bookData, isLoading: isBookLoading, isError: isBookError, refetch: refetchBook} = useGetBookByIdQuery(id);
    const {data: pdfData, isLoading: isPdfLoading, isError: isPdfError} = useGetBookPdfByIdQuery(id, {
        skip: !bookData?.book.downloadable || !localStorage.getItem(LocalStorageKey.AuthToken)
    });

    if (isBookLoading || isPdfLoading) {
        return <Spin className={'loader'} />;
    }

    if (isBookError || !bookData || isPdfError) {
        return 'Произошла ошибка :(';
    }

    return (
        <div className={b()}>
            <BookOverview
                book={bookData.book}
                bookLink={pdfData?.link}
                status={bookData.status}
                refetch={refetchBook}
            />
            <CommentBlock bookId={bookData.book.bookId.toString()} />
        </div>
    );
};
