import { useGetAuthorByIdQuery } from '@/shared/api/author/api';
import { useFindAuthorsBooksQuery } from '@/shared/api/book/api';
import { Pagination, Text } from '@gravity-ui/uikit';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BookList } from '@/entities/book';
import './AuthorPage.scss';
import { AuthorFullCard } from '@/entities/author';
import { Carousel } from '@/shared/components';

export const AuthorPage = () => {
    const navigate = useNavigate();
    
    const { id } = useParams<{ id: string }>();
    const [page, setPage] = useState(1);
    const { data: authorData, isLoading: isAuthorLoading } = useGetAuthorByIdQuery(id || '');
    const { data: booksData, isLoading: isBooksLoading } = useFindAuthorsBooksQuery(
        { authorId: id || '', page: page - 1 },
        { skip: !id }
    );

    const handlePageChange = (value: number) => {
        setPage(value);
    };

    if (isAuthorLoading || isBooksLoading) {
        return <Text>Загрузка...</Text>;
    }

    if (!authorData) {
        return <Text>Автор не найден</Text>;
    }

    return (
        <div className="author-page">
            <AuthorFullCard author={authorData} />
            <Text variant="header-2" className="author-page-books-title">
                Книги автора
            </Text>
            {booksData && (
                <>
                    <Carousel itemCount={booksData?.total && 20 < booksData?.total ? 20 : booksData?.total || 0}>
                        <BookList
                            className='author-page-list'
                            books={booksData.books ?? []}
                            onBookClick={(id) => navigate(`/book/${id}`)}
                        />
                    </Carousel>
                    {/* <BookList books={booksData.books} /> */}
                    <div className="author-page-pagination">
                        <Pagination
                            total={booksData?.total || 0}
                            page={page}
                            onUpdate={handlePageChange}
                            pageSize={20}
                        />
                    </div>
                </>
            )}
        </div>
    );
}; 