import { AuthorResponse } from '@/shared/api/author/types';
import { Card, Text } from '@gravity-ui/uikit';
import { Link } from 'react-router-dom';
import block from 'bem-cn-lite';
import './AuthorCard.scss';

const b = block('author-card');

interface AuthorCardProps {
    author: AuthorResponse;
}

export const AuthorCard = ({ author }: AuthorCardProps) => {
    return (
        <Link to={`/author/${author.authorId}`} className={b('link')}>
            <Card className={b()} type="action" view="outlined" size="m">
                <div className={b('imgContainer')}>
                    <img className={b('img')} src={author.authorPhotoUrl} alt={author.authorName} />
                </div>
                <div className={b('descriptionContainer')}>
                    <Text className={b('title')} variant="subheader-2">
                        {author.authorName}
                    </Text>
                </div>
            </Card>
        </Link>
    );
}; 