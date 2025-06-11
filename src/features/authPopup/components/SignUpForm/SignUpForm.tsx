import {FC, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {DatePicker} from '@gravity-ui/date-components';
import {dateTimeParse, DateTime} from '@gravity-ui/date-utils';
import {AppDispatch} from '@/app/store';
import {getIsAuthPopupLoading, signUpUser} from '../../model/slice';
import {Button, TextInput} from '@gravity-ui/uikit';
import {FileUpload} from '@/shared/components';
import {useNavigate} from 'react-router-dom';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {signUpValidationSchema, SignUpFormData} from './validation';

import block from 'bem-cn-lite';
import './SignUpForm.scss';
const b = block('signUpForm');

const FORMAT = 'YYYY-MM-DD';

export const SignUpForm: FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const isLoading = useSelector(getIsAuthPopupLoading);
    
    const [profileImage, setProfileImage] = useState<File | null>(null);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpFormData>({
        resolver: yupResolver(signUpValidationSchema),
        mode: 'onChange',
        defaultValues: {
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            birthDate: undefined,
        }
    });

    const onSubmit = (data: SignUpFormData) => {
        dispatch(
            signUpUser({
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                birthDate: dateTimeParse(data.birthDate.toISOString())!.format(FORMAT),
                password: data.password,
                profileImage: profileImage || undefined,
                navigate,
            }),
        );
    };

    return (
        <div className={b()}>
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
                )}
            />
            
            <Controller
                name="password"
                control={control}
                render={({ field }) => (
                    <TextInput
                        label="Пароль"
                        value={field.value}
                        onUpdate={field.onChange}
                        type="password"
                        error={errors.password?.message}
                        hasClear
                        size="l"
                    />
                )}
            />

            <FileUpload
                placeholder="Добавить фото профиля"
                onFileChange={setProfileImage}
                value={profileImage ? URL.createObjectURL(profileImage) : ''}
            />

            <Button onClick={handleSubmit(onSubmit)} loading={isLoading} type="submit" view="action" size="l">
                Зарегистрироваться
            </Button>
        </div>
    );
};
