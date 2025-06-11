import * as yup from 'yup';

export const editUserValidationSchema = yup.object({
  email: yup
    .string()
    .required('Обязательное поле')
    .email('Неверный формат email')
    .max(100, 'Email не должен превышать 100 символов'),
    firstName: yup
    .string()
    .required('Обязательное поле')
    .min(2, 'Имя должно содержать минимум 2 символа')
    .max(50, 'Имя не должно превышать 50 символов')
    .matches(/^[а-яёА-ЯЁa-zA-Z]+$/, 'Имя может содержать только буквы'),
  
  lastName: yup
    .string()
    .required('Обязательное поле')
    .min(2, 'Фамилия должна содержать минимум 2 символа')
    .max(50, 'Фамилия не должна превышать 50 символов')
    .matches(/^[а-яёА-ЯЁa-zA-Z]+$/, 'Фамилия может содержать только буквы'),
  
  birthDate: yup
    .date()
    .required('Обязательное поле')
    .max(new Date(), 'Дата рождения не может быть в будущем')
    .test('age', 'Возраст должен быть от 5 до 120 лет', function (value) {
      if (!value) return false;
      const today = new Date();
      const age = today.getFullYear() - value.getFullYear();
      const monthDiff = today.getMonth() - value.getMonth();
      const dayDiff = today.getDate() - value.getDate();
      
      let actualAge = age;
      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        actualAge--;
      }
      
      return actualAge >= 5 && actualAge <= 120;
    }),
});

export type EditUserFormData = yup.InferType<typeof editUserValidationSchema>;
