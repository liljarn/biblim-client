import {useCallback} from 'react';
import {Button, Modal, TextInput} from '@gravity-ui/uikit';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {changePasswordValidationSchema, ChangePasswordFormData} from './validation';

import block from 'bem-cn-lite';
import './ChangePasswordPopup.scss';
const b = block('changePasswordPopup');

export interface ChangePasswordPopupProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (newPassword: string) => void;
    isLoading?: boolean;
}

export const ChangePasswordPopup = ({isOpen, onClose, onSubmit, isLoading}: ChangePasswordPopupProps) => {    const {
        control,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<ChangePasswordFormData>({
        resolver: yupResolver(changePasswordValidationSchema),
        mode: 'onChange',
        defaultValues: {
            newPassword: '',
        }
    });

    const handleClose = useCallback(() => {
        reset();
        onClose();
    }, [onClose, reset]);

    const onFormSubmit = (data: ChangePasswordFormData) => {
        onSubmit(data.newPassword);
    };

    return (
        <Modal open={isOpen} onClose={handleClose}>            <div className={b()}>
                <div className={b('form')}>
                    <Controller
                        name="newPassword"
                        control={control}
                        render={({ field }) => (
                            <TextInput
                                label="Новый пароль"
                                value={field.value}
                                onUpdate={field.onChange}
                                type="password"
                                error={errors.newPassword?.message}
                                hasClear
                                size="l"
                            />
                        )}
                    />
                </div>
                
                <Button 
                    view="action" 
                    type="submit" 
                    onClick={handleSubmit(onFormSubmit)} 
                    size="l"
                    loading={isLoading}
                >
                    Изменить пароль
                </Button>
                <Button onClick={handleClose} size="l">
                    Отменить
                </Button>
            </div>
        </Modal>
    );
};

export default ChangePasswordPopup;
