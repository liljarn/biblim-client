import * as yup from 'yup';

// Схема валидации для регистрации пользователя
export const signUpValidationSchema = yup.object({
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
    .matches(/^[а-яёА-ЯЁa-zA-Z\s-]+$/, 'Имя может содержать только буквы, пробелы и дефисы'),
  
  lastName: yup
    .string()
    .required('Обязательное поле')
    .min(2, 'Фамилия должна содержать минимум 2 символа')
    .max(50, 'Фамилия не должна превышать 50 символов')
    .matches(/^[а-яёА-ЯЁa-zA-Z\s-]+$/, 'Фамилия может содержать только буквы, пробелы и дефисы'),
  
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
  
  password: yup
    .string()
    .required('Обязательное поле')
    .min(6, 'Пароль должен содержать минимум 6 символов')
    .max(50, 'Пароль не должен превышать 50 символов')
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)/,
      'Пароль должен содержать хотя бы одну букву и одну цифру'
    ),
});

// Схема валидации для редактирования пользователя
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
    .matches(/^[а-яёА-ЯЁa-zA-Z\s-]+$/, 'Имя может содержать только буквы, пробелы и дефисы'),
  
  lastName: yup
    .string()
    .required('Обязательное поле')
    .min(2, 'Фамилия должна содержать минимум 2 символа')
    .max(50, 'Фамилия не должна превышать 50 символов')
    .matches(/^[а-яёА-ЯЁa-zA-Z\s-]+$/, 'Фамилия может содержать только буквы, пробелы и дефисы'),
  
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
  
  password: yup
    .string()
    .required('Обязательное поле')
    .min(6, 'Пароль должен содержать минимум 6 символов')
    .max(50, 'Пароль не должен превышать 50 символов')
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)/,
      'Пароль должен содержать хотя бы одну букву и одну цифру'
    ),
});

// Типы для форм
export type SignUpFormData = yup.InferType<typeof signUpValidationSchema>;
export type EditUserFormData = yup.InferType<typeof editUserValidationSchema>;
