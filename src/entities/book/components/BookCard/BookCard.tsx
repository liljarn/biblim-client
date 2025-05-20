import {useCallback} from 'react';
import {Card, Label, Text} from '@gravity-ui/uikit';
import {Book} from '@/shared/api/book';
import AuthorInfo from '../AuthorInfo/AuthorInfo';
import GenreInfo from '../GenreInfo/GenreInfo';
import stubImage from '@/shared/assets/stub.jpg';
import {AgeLimit, Rating} from '@/shared/components';

import block from 'bem-cn-lite';
import './BookCard.scss';
const b = block('bookcard');

export interface BookCardProps {
    book: Book;
    onClick?: (bookId: string) => void;
}

export const BookCard = ({book, onClick}: BookCardProps) => {
    const {bookId, bookName, authorName, authorPhotoUrl, ageLimit, photoUrl, rating, genres, downloadable} = book;

    const handleClick = useCallback(() => {
        onClick?.(bookId.toString());
    }, [bookId, onClick]);

    return (
        <Card className={b()} type="action" view="outlined" size="m" onClick={handleClick}>
            <div className={b('imgContainer')}>
                {rating > 0 && <Rating rating={rating} className={b('rate')} />}
                {ageLimit > 12 && <AgeLimit ageLimit={ageLimit} className={b('ageLimit')} />}
                <img className={b('img')} src={photoUrl || stubImage} alt={bookName} />
            </div>

            <div className={b('descriptionContainer')}>
                <Text className={b('title')} variant="subheader-2">
                    {bookName}
                </Text>
                <AuthorInfo authorImgSrc={authorPhotoUrl} authorName={authorName} />
                <GenreInfo genres={genres.map(({genreName}) => genreName)} />
                {downloadable && <Label theme='warning' size='m'>Можно скачать и читать!</Label>}
            </div>
        </Card>
    );
};

export default BookCard;
