import {useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Text} from '@gravity-ui/uikit';
import {getUserAuthorized, openAuthPopup} from '@/features/authPopup';
import {ThemeToggleButton} from '@/entities/theme';
import block from 'bem-cn-lite';
import './Header.scss';

const b = block('header');

export const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuthorized = useSelector(getUserAuthorized);

    const onUserButtonClick = useCallback(() => {
        if (isAuthorized) {
            navigate('/cabinet');
        } else {
            dispatch(openAuthPopup());
        }
    }, [dispatch, isAuthorized, navigate]);

    const onNavigationClick = (path: string) => {
        navigate(path);
    };

    return (
        <header className={b()}>
            <div className={b('buttons')}>
                <Button view="action" size="l" onClick={() => onNavigationClick('/')}>
                    О библиотеке
                </Button>
                <Button view="action" size="l" onClick={() => onNavigationClick('/books')}>
                    Книги
                </Button>
                <Button view="action" size="l" onClick={() => onNavigationClick('/authors')}>
                    Авторы
                </Button>
                <Button view="action" size="l" onClick={onUserButtonClick}>
                    Кабинет читателя
                </Button>
            </div>
            <div className={b('name')} onClick={() => onNavigationClick('/')}>
                <Text variant="header-2">литературное гнездо</Text>
                <Text variant="subheader-1">библиотека</Text>
            </div>
            <div className={b('theme')}>
                <ThemeToggleButton />
            </div>
        </header>
    );
};

export default Header;
