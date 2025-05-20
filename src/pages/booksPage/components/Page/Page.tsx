import {useState} from 'react';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {Pagination, Spin, Text} from '@gravity-ui/uikit';
import {useGetBookPageQuery} from '@/shared/api/book/api';
import {BooksFilter} from '@/features/booksFilter';
import {BookList} from '@/entities/book';
import {
    getQuery,
    getGenresFilter,
} from '@/features/booksFilter/model/slice';

import block from 'bem-cn-lite';
import './Page.scss';
const b = block('booksPage');

const PAGE_SIZE = 20;

export const Page = () => {
    const navigate = useNavigate();

    const [page, setPage] = useState(1);
    const query = useSelector(getQuery);
    const genres = useSelector(getGenresFilter);

    const {data, isLoading} = useGetBookPageQuery({
        page: page - 1,
        query,
        genres: genres && genres.length > 0 ? genres : undefined,
    });

    const totalBooks = data?.total || 0;
    const books = data?.books || [];

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    return (
        <div className={b()}>
            <BooksFilter
                onConfirm={() => {
                    console.log('confirm');
                }}
            />
            {isLoading ? (
                <Spin />
            ) : (
                <BookList
                    books={books}
                    onBookClick={(id: string) => {
                        navigate(`/book/${id}`);
                    }}
                    className={b('bookList')}
                />
            )}
            <Pagination
                className={b('pagination')}
                page={page}
                pageSize={PAGE_SIZE}
                total={totalBooks}
                onUpdate={handlePageChange}
            />
        </div>
    );
};

export default Page;
