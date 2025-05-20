import { AuthorFullResponse } from '@/shared/api/author/types';
import { Card, Text } from '@gravity-ui/uikit';
import block from 'bem-cn-lite';
import './AuthorFullCard.scss';

const b = block('author-full-card');

interface AuthorFullCardProps {
    author: AuthorFullResponse;
}

export const AuthorFullCard = ({ author }: AuthorFullCardProps) => {
    return (
        <Card className={b()} view="outlined" size="l">
            <div className={b('content')}>
                <div className={b('imgContainer')}>
                    <img
                        className={b('img')}
                        src={author.authorPhotoUrl}
                        alt={author.authorName}
                    />
                </div>
                <div className={b('text')}>
                    <Text className={b('title')} variant="display-2">
                        {author.authorName}
                    </Text>
                    <Text className={b('description')} variant="body-3">
                        {author.authorDescription}
                    </Text>
                </div>
            </div>
        </Card>
    );
}; 