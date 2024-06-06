import * as yup from 'yup'


export const loginValidationSchema = yup.object().shape({
   username: yup.string().required('Email is required'),

   password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters long'),
   // .matches(/[a-zA-Z]/, 'Password must contain at least one letter')
})
