import * as yup from 'yup';

export const changePasswordValidationSchema = yup.object({
  newPassword: yup
    .string()
    .required('Обязательное поле')
    .min(6, 'Пароль должен содержать минимум 6 символов')
    .max(50, 'Пароль не должен превышать 50 символов')
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)/,
      'Пароль должен содержать хотя бы одну букву и одну цифру'
    ),
});

export type ChangePasswordFormData = yup.InferType<typeof changePasswordValidationSchema>;
