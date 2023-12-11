import * as Yup from 'yup';

export const AddArticleValidation = Yup.object().shape({
  title: Yup.string().required("This field is required"),
  paragraph: Yup.string().required("This field is required"),
  header: Yup.string().required("This field is required"),
  sameImage: Yup.boolean(),
  avatar: Yup.mixed()
  .test('fileType', 'Invalid file type', (value: any) => {
    if (!value) return true; // No file selected
    return ['image/jpeg',"image/jpg"].includes(value.type);
  })
  .test('fileSize', 'File size too large', (value: any) => {
    if (!value) return true; // No file selected
    return value.size <= 1002400; // 100 KB
  }),
  image: Yup.mixed()
  .test('fileType', 'Invalid file type', (value: any) => {
    if (!value) return true; // No file selected
    return ['image/jpeg',"image/jpg"].includes(value.type);
  })
  .test('fileSize', 'File size too large', (value: any) => {
    if (!value) return true; // No file selected
    return value.size <= 1002400; // 100 KB
  })
  .when("sameImage", {
    is: false,
    then: (schema) => schema.required(),
    otherwise: (schema) => schema.notRequired(),
  })
})

export const AddQuestionbank = Yup.object().shape({
  name: Yup.string().required("This field is required"),
  description: Yup.string().required("This field is required"),
  isDefault: Yup.boolean(),
  // sameImage: Yup.boolean(),
  
})

export const ValidateQuestion = Yup.object().shape({
  question: Yup.string().required("Write a question"),
  answer: Yup.string().required("Pick an answer for this question"),
  options: Yup.array().of(
    Yup.object().shape({
      character: Yup.string().required('Character is required'),
      value: Yup.string().required('Please enter all options for this question'),
    })
  ),
  
})

export const RegistrationValidation = Yup.object().shape({
  email: Yup.string()
    .email('The email is invalid')
    .required('This field is required'),
  password: Yup.string()
    .min(8, 'The password is too short')
    .max(50, 'The password is too long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, 'must contain at least one uppercase, one number, and one special character')
    .required('This field is required'),
  validPassword: Yup.string().required('this field is required')
  .oneOf([Yup.ref('password')], 'Your passwords do not match.'),
})

export const LoginValidation = Yup.object().shape({
  email: Yup.string()
    .email('The email is invalid')
    .required('This field is required'),
  password: Yup.string()
    .min(8, 'The password is too short')
    .max(50, 'The password is too long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, 'must contain at least one uppercase, one number, and one special character')
    .required('This field is required')
})