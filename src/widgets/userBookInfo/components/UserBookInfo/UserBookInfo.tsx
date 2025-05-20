import {Label, Spin, Text} from '@gravity-ui/uikit';
import {BookCard, BookList} from '@/entities/book';
import {Book, BookStatus, useGetUserRentHistoryQuery} from '@/shared/api/book';
import {useNavigate} from 'react-router-dom';
import {Carousel} from '@/shared/components';

import block from 'bem-cn-lite';
import './UserBookInfo.scss';
import {formatDate} from '@/shared/helpers';
import UserBookInfoStub from '../UserBookInfoStub/UserBookInfoStub';
const b = block('userBookInfo');

export interface UserBookInfoProps {
    userId: string;
    book?: Book;
    dueTime?: string;
}

export const UserBookInfo = ({userId, book, dueTime}: UserBookInfoProps) => {
    const navigate = useNavigate();

    const {data, isLoading} = useGetUserRentHistoryQuery({
        page: 0,
        userId,
    });

    return (
        <div className={b()}>
            {!book && !data && <UserBookInfoStub />}
            {book && (
                <div className={b('readingNow')}>
                    <Text className={b('header')} variant="display-1">
                        Выдана книга
                    </Text>
                    {dueTime &&
                        book &&
                        (book?.status === BookStatus.BOOKED ? (
                            <Text variant="body-2">
                                Нужно забрать из библиотеки до{' '}
                                <Label size="m" theme="unknown">
                                    {formatDate(dueTime)}
                                </Label>
                            </Text>
                        ) : (
                            <Text variant="body-2">
                                Нужно вернуть в библиотеку до{' '}
                                <Label size="m" theme="unknown">
                                    {formatDate(dueTime)}
                                </Label>
                            </Text>
                        ))}
                    <BookCard book={book} />
                </div>
            )}

            {!!data && data.books?.length > 0 && (
                <div className={b('bookHistory')}>
                    <Text className={b('header')} variant="display-1">
                        История чтения
                    </Text>
                    {isLoading ? (
                        <Spin className="loader" />
                    ) : (
                        <Carousel itemCount={20}>
                            <BookList
                                className={b('bookList')}
                                books={data?.books ?? []}
                                onBookClick={(id) => navigate(`book/${id}`)}
                            />
                        </Carousel>
                    )}
                </div>
            )}
        </div>
    );
};

export default UserBookInfo;
