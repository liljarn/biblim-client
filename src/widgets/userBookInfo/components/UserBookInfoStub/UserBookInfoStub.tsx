import {Card, Text} from '@gravity-ui/uikit';

import block from 'bem-cn-lite';
import './UserBookInfoStub.scss';
const b = block('userBookInfoStub');

export const UserBookInfoStub = () => {
    return (
        <div>
            <Card view="filled" size="l">
                <div className={b('content')}>
                    <Text variant="body-2">Пока что нет истории чтения :(</Text>
                </div>
            </Card>
        </div>
    );
};

export default UserBookInfoStub;
