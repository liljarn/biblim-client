import {useState, useCallback} from 'react';
import {Button, Spin} from '@gravity-ui/uikit';
import {ChangeUserParams, useGetSelfUserQuery, PhotoChangeState} from '@/shared/api/user';
import {UserDetailedInfo} from '@/entities/user';
import {UserEditPopup} from '@/features/userEditPopup';
import {ChangePasswordPopup} from '@/features/changePasswordPopup';
import {changeUserInfo, changeUserPassword} from '../../model/thunks';

import block from 'bem-cn-lite';
import './Page.scss';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '@/app/store';
import {UserBookInfo} from '@/widgets/userBookInfo';
import {LocalStorageKey} from '@/shared/config/consts';
import {useNavigate} from 'react-router-dom';

const b = block('cabinetPage');

export const Page = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();    const {data, isLoading, isError, refetch} = useGetSelfUserQuery();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [isPasswordLoading, setIsPasswordLoading] = useState(false);

    const handleOpenModal = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    const handleOpenPasswordModal = useCallback(() => {
        setIsPasswordModalOpen(true);
    }, []);

    const handleClosePasswordModal = useCallback(() => {
        setIsPasswordModalOpen(false);
    }, []);
      const handleModalSubmit = useCallback(async (userData: ChangeUserParams, photoState: PhotoChangeState, photoFile?: File) => {
        handleCloseModal();
        await dispatch(changeUserInfo({userData, photoState, photoFile}));
        window.location.reload();
    }, [dispatch, refetch, handleCloseModal]);

    const handlePasswordSubmit = useCallback(async (newPassword: string) => {
        setIsPasswordLoading(true);
        try {
            await dispatch(changeUserPassword(newPassword));
            handleClosePasswordModal();
        } catch (error) {
            console.error('Ошибка изменения пароля:', error);
        } finally {
            setIsPasswordLoading(false);
        }
    }, [dispatch, handleClosePasswordModal]);

    const handleLogOut = useCallback(() => {
        localStorage.removeItem(LocalStorageKey.AuthToken);
        navigate('/');
        window.location.reload();
    }, []);

    if (isLoading) {
        return <Spin className={'loader'} />;
    }

    if (isError || !data) {
        return 'Произошла ошибка :(';
    }

    return (
        <>
            <div className={b()}>
                <UserBookInfo
                    userId={data.userData.userId}
                    book={data.bookInfo?.book}
                    dueTime={data.bookInfo?.dueDate}
                />
                <div className={b('userInfo')}>
                    <UserDetailedInfo self userData={data.userData} />                    <div className={b('buttons')}>
                        <Button view="action" onClick={handleOpenModal} size="l">
                            Изменить данные
                        </Button>
                        <Button view="outlined" onClick={handleOpenPasswordModal} size="l">
                            Изменить пароль
                        </Button>
                        <Button view="normal" onClick={handleLogOut} size="l">
                            Выйти из аккаунта
                        </Button>
                    </div>
                </div>
            </div>
            <UserEditPopup
                initialValue={data?.userData}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleModalSubmit}
            />
            <ChangePasswordPopup
                isOpen={isPasswordModalOpen}
                onClose={handleClosePasswordModal}
                onSubmit={handlePasswordSubmit}
                isLoading={isPasswordLoading}
            />
        </>
    );
};

export default Page;
