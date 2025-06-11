import {useCallback, useState, useEffect} from 'react';
import {Button, Modal, TextInput} from '@gravity-ui/uikit';
import {dateTimeParse, DateTime} from '@gravity-ui/date-utils';
import {DatePicker} from '@gravity-ui/date-components';
import {ChangeUserParams, User, PhotoChangeState} from '@/shared/api/user';
import {FileUpload} from '@/shared/components';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {editUserValidationSchema, EditUserFormData} from './validation';

import block from 'bem-cn-lite';
import './UserEditPopup.scss';
const b = block('userEditPopup');

const FORMAT = 'YYYY-MM-DD';

export interface UserEditPopupProps {
    initialValue: User;
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (userData: ChangeUserParams, photoState: PhotoChangeState, photoFile?: File) => void;
}

export const UserEditPopup = ({initialValue, isOpen, onClose, onSubmit}: UserEditPopupProps) => {
    const [profileImage, setProfileImage] = useState<File | null>();
    const [photoState, setPhotoState] = useState<PhotoChangeState>('unchanged');

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<EditUserFormData>({
        resolver: yupResolver(editUserValidationSchema),
        mode: 'onChange',        defaultValues: {
            email: initialValue.email,
            firstName: initialValue.firstName,
            lastName: initialValue.lastName,
            birthDate: new Date(initialValue.birthDate),
        }
    });

    // Сброс формы при открытии модального окна
    useEffect(() => {
        if (isOpen) {            reset({
                email: initialValue.email,
                firstName: initialValue.firstName,
                lastName: initialValue.lastName,
                birthDate: new Date(initialValue.birthDate),
            });
            setProfileImage(null);
            setPhotoState('unchanged');
        }
    }, [isOpen, initialValue, reset]);

    const handleClose = () => {
        onClose();
    };

    const onPhotoChange = useCallback((file: File | null) => {
        setProfileImage(file);
        if (file) {
            setPhotoState('changed');
        } else {
            setPhotoState('removed');
        }
    }, []);    const onFormSubmit = (data: EditUserFormData) => {
        onSubmit(
            {
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                birthDate: dateTimeParse(data.birthDate.toISOString())!.format(FORMAT),
            },
            photoState,
            profileImage || undefined
        );
    };

    return (
        <Modal open={isOpen} onClose={handleClose}>
            <div className={b()}>
                <div className={b('form')}>
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <TextInput
                                label="Почта"
                                value={field.value}
                                onUpdate={field.onChange}
                                error={errors.email?.message}
                                type="email"
                                hasClear
                                size="l"
                            />
                        )}
                    />
                    
                    <Controller
                        name="firstName"
                        control={control}
                        render={({ field }) => (
                            <TextInput
                                label="Имя"
                                value={field.value}
                                onUpdate={field.onChange}
                                error={errors.firstName?.message}
                                hasClear
                                size="l"
                            />
                        )}
                    />
                    
                    <Controller
                        name="lastName"
                        control={control}
                        render={({ field }) => (
                            <TextInput
                                label="Фамилия"
                                value={field.value}
                                onUpdate={field.onChange}
                                error={errors.lastName?.message}
                                hasClear
                                size="l"
                            />
                        )}
                    />
                    
                    <Controller
                        name="birthDate"
                        control={control}
                        render={({ field }) => (
                            <DatePicker
                                label="Дата рождения"
                                placeholder=" "
                                value={field.value ? dateTimeParse(field.value.toISOString()) : null}
                                onUpdate={(value) => field.onChange(value?.toDate())}
                                validationState={errors.birthDate ? 'invalid' : undefined}
                                errorMessage={errors.birthDate?.message}
                                size="l"
                            />
                        )}                    />
                    
                    <FileUpload
                        placeholder="Изменить фото профиля"
                        onFileChange={onPhotoChange}
                        initialValue={initialValue.photoUrl}
                    />
                </div>
                <Button view="action" type="submit" onClick={handleSubmit(onFormSubmit)} size="l">
                    Изменить
                </Button>
                <Button onClick={handleClose} size="l">
                    Закрыть
                </Button>
            </div>
        </Modal>
    );
};

export default UserEditPopup;
