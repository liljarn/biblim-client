import { AuthorResponse } from '@/shared/api/author/types';
import { AuthorCard } from '../AuthorCard/AuthorCard';
import block from 'bem-cn-lite';
import './AuthorList.scss';

const b = block('author-list');

interface AuthorListProps {
    authors: AuthorResponse[];
}

export const AuthorList = ({ authors }: AuthorListProps) => {
    return (
        <div className={b()}>
            {authors.map((author) => (
                <div className={b('item')} key={author.authorId}>
                    <AuthorCard author={author} />
                </div>
            ))}
        </div>
    );
}; 