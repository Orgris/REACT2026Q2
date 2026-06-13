import * as yup from 'yup';

export const getRegisterSchema = (countries: string[]) => {
  return yup.object().shape({
    name: yup
      .string()
      .transform((value) => {
        return value === '' ? undefined : value;
      })
      .required('Name is required')
      .matches(/^[A-ZА-Я]/, 'First letter must be uppercase'),

    age: yup
      .number()
      .transform((_value, originalValue) => {
        if (originalValue === '') return undefined;
        const parsed = Number(originalValue);
        return isNaN(parsed) ? undefined : parsed;
      })
      .required('Age is required')
      .typeError('Age must be a number')
      .min(0, 'Age cannot be negative'),

    email: yup
      .string()
      .required('Email is required')
      .test('has-one-at', 'Must contain exactly one @ symbol', (value) => {
        if (!value) return false;
        const atIndex = value.indexOf('@');
        if (atIndex === -1) return false;
        return value.indexOf('@', atIndex + 1) === -1;
      })
      .test('non-empty-local', 'Local part cannot be empty', (value) => {
        if (!value) return false;
        const atIndex = value.indexOf('@');
        if (atIndex === -1) return false;
        const localPart = value.slice(0, atIndex);
        return localPart.length > 0;
      })
      .test(
        'domain-has-dot',
        'Domain must contain at least one dot',
        (value) => {
          if (!value) return false;
          const atIndex = value.indexOf('@');
          if (atIndex === -1) return false;
          const domain = value.slice(atIndex + 1);
          return domain.indexOf('.') !== -1;
        }
      ),

    password: yup.string().required('Password is required'),

    confirmPassword: yup
      .string()
      .transform((value) => (value === '' ? undefined : value))
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required('Confirm password is required'),

    gender: yup.string().required('Select your gender'),

    country: yup
      .string()
      .required('Select your country')
      .test('is-valid-country', 'Selected country is invalid', (value) => {
        if (!value) return false;
        return countries.some((c) => c === value);
      }),

    terms: yup
      .boolean()
      .required('You must accept the terms and conditions')
      .oneOf([true], 'You must accept terms'),

    avatar: yup
      .mixed<File>()
      .transform((value) => {
        return value?.[0];
      })
      .required('Avatar is required')
      .test('fileSize', 'File size must not exceed 2 MB', (value) => {
        return value ? value.size <= 2 * 1024 * 1024 : false;
      })
      .test('fileFormat', 'Only PNG and JPEG formats are allowed', (value) => {
        const allowedTypes = ['image/jpeg', 'image/png'];
        return value ? allowedTypes.includes(value.type) : false;
      }),
  });
};
