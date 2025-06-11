import { changeSelfUserMutation, ChangeUserParams, PhotoChangeState } from "@/shared/api/user";
import { userApiWithAuth } from "@/shared/api/user/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface ChangeUserInfoParams {
    userData: ChangeUserParams;
    photoState: PhotoChangeState;
    photoFile?: File;
}

export const changeUserInfo = createAsyncThunk(
    'changeUserInfo',
    async (params: ChangeUserInfoParams, { dispatch, rejectWithValue }) => {
        try {
            const { userData, photoState, photoFile } = params;
            
            // Сначала обновляем основные данные пользователя
            const userResponse = await dispatch(changeSelfUserMutation(userData));
            if (userResponse.error) {
                console.log(userResponse.error);
                return rejectWithValue(userResponse.error);
            }

            console.log(photoState)

            // Обрабатываем изменения фото только если они есть
            if (photoState !== 'unchanged') {
                if (photoState === 'changed' && photoFile) {
                    // Загружаем новое фото
                    const formData = new FormData();
                    formData.append('profileImage', photoFile);

                    const photoResponse = await dispatch(
                        userApiWithAuth.endpoints.changeUserPhoto.initiate(formData)
                    );
                    
                    if (photoResponse.error) {
                        console.log('Ошибка при изменении фото:', photoResponse.error);
                        return rejectWithValue('Ошибка при изменении фото');
                    }
                } else if (photoState === 'removed') {
                    const photoResponse = await dispatch(
                        userApiWithAuth.endpoints.deleteUserPhoto.initiate()
                    );

                    if (photoResponse.error) {
                        console.log('Ошибка при удалении фото:', photoResponse.error);
                        return rejectWithValue('Ошибка при изменении фото');
                    }
                }
                
            }

            return 'Данные успешно обновлены';
        } catch (error) {
            console.error('Ошибка изменения данных пользователя:', error);
            return rejectWithValue(error);
        }
    }
);

export const changeUserPassword = createAsyncThunk(
    'changeUserPassword',
    async (newPassword: string, { dispatch, rejectWithValue }) => {
        try {
            const userResponse = await dispatch(changeSelfUserMutation({ password: newPassword }));
            if (userResponse.error) {
                console.log(userResponse.error);
                return rejectWithValue(userResponse.error);
            }

            return 'Пароль успешно изменен';
        } catch (error) {
            console.error('Ошибка изменения пароля:', error);
            return rejectWithValue(error);
        }
    }
);