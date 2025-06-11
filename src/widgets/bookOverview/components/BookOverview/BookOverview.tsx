import React from 'react';
import {Button, Card, Icon, Link, Text, UserLabel} from '@gravity-ui/uikit';
import {AuthorInfo, GenreInfo} from '@/entities/book';
import {Book, BookStatus} from '@/shared/api/book';
import {useReserveBookMutation, useCancelBookReservationMutation} from '@/shared/api/book';
import {AgeLimit, Rating} from '@/shared/components';
import {BookActions} from '@/features/bookActions';
import stubImage from '@/shared/assets/stub.jpg';

import block from 'bem-cn-lite';
import './BookOverview.scss';
import { FileArrowDown } from '@gravity-ui/icons';
import { LocalStorageKey } from '@/shared/config/consts';
const b = block('bookOverview');

export interface BookOverviewProps {
    book: Book;
    bookLink?: string;
    status: BookStatus;
    refetch: () => void;
}

export const BookOverview: React.FC<BookOverviewProps> = ({
    book,
    bookLink,
    status,
    refetch,
}: BookOverviewProps) => {
    const {
        bookId,
        bookName,
        authorName,
        authorPhotoUrl,
        releaseYear,
        ageLimit,
        description,
        photoUrl,
        rating,
        genres,
    } = book;

    console.log(status);

    const [reserveBook] = useReserveBookMutation();
    const [cancelBookReservation] = useCancelBookReservationMutation();

    const handleReserve = async () => {
        reserveBook({bookId: bookId.toString()});
        setTimeout(() => {refetch()}, 500);
    };

    const handleCancelReservation = async () => {
        await cancelBookReservation();
        refetch();
    };

    return (
        <Card view="filled">
            <div className={b()}>
                <div className={b('bookInfo')}>
                    <div className={b('bookName')}>
                        <Text variant="display-2">{bookName}</Text>
                        {rating > 0 && <Rating rating={rating} className={b('rate')} />}
                        <AgeLimit ageLimit={ageLimit} className={b('ageLimit')} />
                    </div>
                    <Text className={b('description')} variant="body-2">
                        {description}
                    </Text>
                    <div className={b('info')}>
                        <Text className={b('text')}>Жанр</Text>
                        {!!genres && genres.length > 0 && (
                            <GenreInfo genres={genres.map(({genreName}) => genreName)} />
                        )}
                        <Text className={b('text')}>Автор</Text>
                        <AuthorInfo authorName={authorName} authorImgSrc={authorPhotoUrl} />
                        <Text className={b('text')}>Год издания</Text>
                        <UserLabel type="empty" size={'m'} view="outlined">
                            {releaseYear}
                        </UserLabel>
                    </div>
                    {bookLink && localStorage.getItem(LocalStorageKey.AuthToken) && <Link view='primary' href={bookLink} target='blank'>Скачать и читать книгу <Icon data={FileArrowDown} size={18} /></Link>}
                    {book.downloadable && !localStorage.getItem(LocalStorageKey.AuthToken) && <Text variant='body-2' color='warning-heavy'>Для скачивания войдите в систему</Text>}
                    <div className={b('rentBlock')}>
                        <BookActions
                            status={status}
                            handleReserve={handleReserve}
                            handleCancelReservation={handleCancelReservation}

                        />
                    </div>
                </div>
                <img className={b('bookImage')} src={photoUrl || stubImage} alt={bookName} />
            </div>
        </Card>
    );
};

export default BookOverview;
